<!-- https://juejin.cn/post/6844904132164190221 -->
- hook
  本质原理 链表

- 自定义Hook
<!-- ahooks react-use -->

- deps依赖
  将Effect函数所用到的外部数据全部加入到依赖数组中

  依赖数组在判断元素是否发生改变时使用了 Object.is 进行比较，因此当 deps 中某一元素为非原始类型时（例如函数、对象等），每次渲染都会发生改变，从而每次都会触发 Effect，失去了 deps 本身的意义。

  Effect循环问题？？



------


- 虚拟DOM
虚拟DOM简而言之就是，用JS去按照DOM结构来实现的树形结构对象，你也可以叫做DOM对象

``` javascript
// Element
// createElement(type, props, children)
```

- 渲染虚拟DOM
<!-- render -->
```javascript

```

- DOM-diff
<!-- 先序深度优先遍历 -->
```javascript
function diff(oldTree, newTree){
  let patches = {}

  let index = 0

  walk(oldTree, newTree, index, patches)
}


function walk(oldNode, newNode, index, patches){
  let current = []
  
  if(!newNode) {//?
    current.push({ type: "REMOVE", index})
  } elsse if(isString(oldNode) && isString(newNode)){
    current.push({type: 'TEXT', text: newNode})
  } else if(oldNode.type === newNode.type){
    let attr = diffAttr(oldNode.props, newNode.props);
      if (Object.keys(attr).length > 0) {
        current.push({ type: 'ATTR', attr });
      }
    // 如果有子节点，遍历子节点
    diffChildren(oldNode.children, newNode.children, patches);
  } else {    // 说明节点被替换了
    current.push({ type: 'REPLACE', newNode});
  }

  if(current.length) {
    patches[index] = current;
  }
}
```

```javascript
  let allPatches;
  let index - 0;
  funtcion patch(node, patches) {
    allPatches = patches;

    walk(node);
  }

  function walk(node) {
    let current = allPatches[index++];
    let childNode =  node.childNodes;
    childNodes.forEach(child => walk(child));

    if(current) {
      doPatch(node, current)
    }
  }

  funtcion doPatch(node, patches){
    patches.forEach(patch => {
      switch (patch.type) {
        case 'ATTR':
          for (const key of patch.attr) {
            let value =  patch.attr[key]
            if(value) {
              setAttr(node, key, value)
            } else {
              node.removeAttribute(key)
            }
          }
          break;
        
        case 'TEXT': 
          node.textContent =  patch.text
          break;
        
        // case''
      
        default:
          break;
      }
    });
  }

```