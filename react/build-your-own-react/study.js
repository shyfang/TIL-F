// JSX 、React Element、DOM
// const element = <h1 title="foo">Hello</h1>
// const container = document.getElementById("root")
// ReactDOM.render(element, container)


// React.createElement
// 入参：Tag、props、children
// const element = React.createElement(
//   "h1",
//   { title: "foo" },
//   "Hello"
// )

// 返回：element
const element = {
  type: "h1", // DOM node的类型 ——》 document.createElement.tagName
  props: { // JSX attributes
    title: "foo",
    children: "Hello",
  },
}


//  children ： element trees


// ReactDOM.render
const node = document.createElement(element.type)
node["title"] = element.props.title


const text = document.createTextNode("")
text["nodeValue"] = element.props.children


node.appendChild(text)
container.appendChild(node)


// Step1 createElement 返回 element
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : crateTextElement(child))
    }
  }
}

function crateTextElement(text) {
  return {
    type: 'TEXT_ELEMNET',
    props: {
      nodeValue: text,
      children: []
    }
  }
}


// Step2 render 创建 DOM node =》 实现将JSX转为DOM
// ReactDOM.render
function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)


  // element props 分配给 DOM node
  const isProperty = key => key !== 'children'
  Object.keys(element.props).filter(isProperty).forEach(
    name => {
      dom[name] = element.props[name]
    }
  )

  // children递归 为 每个child做同样的事
  element.props.children.forEach(child => {
    render(child, dom)
  });

  // 
  container.appendChild(dom)
}

// Step1 Step2 实现将JSX转为DOM：creatElement、render
export const Didact = {
  createElement,
  render,
}


//-------------------------------------------------
// Step3
// 一旦我们开始渲染，在整棵 element tree 渲染完成之前程序是不会停止的。如果这棵 element tree 过于庞大，它有可能会阻塞主进程太长时间。如果浏览器需要做类似于用户输入或者保持动画流畅这样的高优先级任务，则必须等到渲染完成为止。

// 将渲染工作分成几个小部分，在完成每个单元后，如果需要执行其他操作，我们将让浏览器中断渲染。
//   element.props.children.forEach(child => {
//   render(child, dom)
// });


// Step 4 Fibers
// 将为每一个 element 分配一个 fiber，而每个 fiber 将成为一个工作单元
// performUnitOfWork 为每个 fiber 做三件事:
// 1. element添加至DOM
// 2. 为element的children创建fiber
// 3. 选出下一个工作单元
// 如果完成Fiber工作时，如果它有child-》child被当作下一个工作单元
// fiber的sibling节点作为下一个工作单元
// 没有sibling，其prent的sibling
// 不断查找父节点的父节点 知道找到有sibling的parent节点，或直接找到root
// 如果到root 则完成此次渲染的所有工作

// child、sibling、parent
function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)

  const isProperty = key => key !== "children"
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })

  return dom
}

function render(element, container) {
  // nextUnitOfWork 设置为 Fiber Tree 的根节点
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  }
  // 当浏览器准备好
  // 它将会调用我们的 workLoop 函数，从根节点开始执行 performUnitOfWork


}
let nextUnitOfWork = null


function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (nextUnitOfWork !== null && !shouldYield()) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
}


function performUnitOfWork(fiber) {
  // 1. 创建一个 node 节点, 然后将其添加至 DOM
  // 将这个 DOM node 保存在 fiber.dom 属性中以持续跟踪
  if (!fiber.dom) {
    createDom(fiber)
  }

  // 将「添加节点至 DOM」这个动作延迟至所有节点 render 完成。这个动作也被称为 commit。
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  //   // 
  // }


  // reconcileChildren
  // 2. create new fibers, 为每一个child创建一个新的fiber
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null

  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }


    // 将其添加到 Fiber Tree 中，它是 child 还是 sibling ，取决于它是否是第一个 child
    if (index === 0) {// child
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }

  // 选出下一个工作单元
  // 首先寻找 child ,其次 sibling ,然后是 uncle （ parent 的 sibling）
  // return next unit of work
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }


}

// phase 分阶段 render commit
// 将「添加节点至 DOM」这个动作延迟至所有节点 render 完成。这个动作也被称为 commit。
// 
// 进行中root wipRoot (work in progress)
let wipRoot = null


// 完成所有工作（直到没有 nextUnitOfWork) 将Fiber Tree 交给 DOM
function commitRoot() {
  commitWork(wipRoot.child)

  currentRoot = wipRoot

  wipRoot = null

}

function commitWork(fiber) {
  if (!fiber) return

  // 将所有节点 递归附加到DOM
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)

  // 根据effectTag处理dom插入/更新/删除操作
  if (
    fiber.effectTag === "PLACEMENT" &&
    fiber.dom != null
  ) {
    domParent.appendChild(fiber.dom)
  } else if (
    fiber.effectTag === "UPDATE" &&
    fiber.dom != null
  ) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom)
  }


  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  }
  nextUnitOfWork = wipRoot
}


function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    // 
  }

  // ...
  nextUnitOfWork = wipRoot
}


// ----------------------------------
// Reconciliation
// 更新和删除节点的过程
let currentRoot = null
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    //
    alternate: currentRoot
  }

  // ...
  nextUnitOfWork = wipRoot
}

// Reconcile

function reconcileChildren(wipFiber, elements) {
  let index = 0
  let oldFiber =
    wipFiber.alternate && wipFiber.alternate.child
  let prevSibling = null


  // while(){

  // }
  const newFiber = {
    type: element.type,
    props: element.props,
    parent: wipFiber,
    dom: null,
  }

  if (index === 0) {
    wipFiber.child = newFiber
  } else {
    prevSibling.sibling = newFiber
  }

  prevSibling = newFiber
  index++
}


function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key => !(key in nextProps) || isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
}


// Function Components
