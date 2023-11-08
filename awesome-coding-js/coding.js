
// 36. 大数相加
function add(a, b) {
  // 最大长度
  const maxLength = Math.max(a.length, b.length)
  // 补全
  a = a.padStart(maxLength, 0)
  b = b.padStart(maxLength, 0)
  // 遍历
  let t = ''
  let f = ''
  let sum =''
  for (let i = 0; i < maxLength; i++) {
    t = parseInt(a[i]) + parseInt(b[i]) + f
    f = Math.floor(t/10)
    sum = t % 10 + sum
  }
  if(f !== 0 ) {
    sum = '' + f + sum
  }
  return sum
}

const list1 = [
  {
      id: 1,
      text: '节点1',
      parentId: 0 //这里用0表示为顶级节点
  },
  {
      id: 2,
      text: '节点1_1',
      parentId: 1 //通过这个字段来确定子父级
  }
]


// 列表转树
function listToTree(data) {
  // 数组 -》 对象 {[id]: {},}
  let tmp = {}
  let treeData = []
  data.forEach(item => {
    tmp[item.id] = item
  });

  // 遍历对象 主要是parentId ——》 有 children元素
  for (const i in tmp) { // tmp[i] -> temp[i].parentId ? 插入到tmp[temp[i].parentId].children // 插入treeData
    if(+tmp[i].parentId !== 0) {
      if(!tmp[tmp[i].parentId].children) {
        tmp[tmp[i].parentId].children = []
      }
      tmp[tmp[i].parentId].children.push(tmp[i])
    } else {
      treeData.push(tmp[i])
    }
  }
  return treeData
}

const resList1 = listToTree(list1)
console.log('tree to list', JSON.stringify(resList1));


const treeData = [
  {
      id: 1,
      text: '节点1',
      parentId: 0,
      children: [
          {
              id:2,
              text: '节点1_1',
              parentId:1,
              children: [
                {
                  id: 3,
                  text: '节点1_1_1',
                  parentId: 2,
                }
              ]
          }
      ]
  }
]

// 树转列表
function treeToList(data) {
  let listData = []
  function dfs(tree=[]) {
    tree.forEach(item => {
      if(item.children) {
        dfs(item.children)
        delete item.children
      }
      listData.push(item)
    })
  }
  dfs(data)
  return listData
}

// function treeToList(data) {
//   let res = [];
//   const dfs = (tree) => {
//     tree.forEach((item) => {
//       if (item.children) {
//         dfs(item.children);
//         delete item.children;
//       }
//       res.push(item);
//     });
//   };
//   dfs(data);
//   return res;
// }

const listRes = treeToList(treeData)
console.log('list to tree',listRes);
// 对象 转 树列表



// 33 实现一个对象的 flatten 方法
const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }


function isObject(val) {
  return typeof val === 'object' && val !== null
}
function flatten(data){
  if(!isObject(data)) return

  let res = {}
  // 递归遍历
  function dfs(cur, prefix){
    // 对象
    if(isObject(cur)) {
      if(Array.isArray(cur)){
        cur.forEach((item, index) => {
          if(isObject(item)) {
            dfs(item, `${prefix}[${index}]`)
          } else {
            res[`${prefix}[${index}]`] = item
          }
        });
      } else {
        for (const key in cur) {
          if (Object.hasOwnProperty.call(cur, key)) {
            const item = cur[key];
            if(isObject(item)) {
              dfs(item, `${prefix}${prefix ? "." : ""}${key}`)
            } else {
              res[`${prefix}${prefix ? "." : ""}${key}`] = item
            }
          }
        }
      }
    } else {
      res[prefix] = cur
    }
  }
  dfs(obj, "")
  return res
}

console.log(flatten(obj));


// 字符串解析
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
function renderStr(template, data) {
  const str = template.replace(/\{\{(\w+)\}\}/g, function(match, key) {
    return data[key] || ''
  })
  return str
}

console.log(renderStr(template, data));


// 题目描述:JSON 格式的虚拟 Dom 怎么转换成真实 Dom
const virtualDom = {
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: "link" }
      ]
    }
  ]
}

// // 
// function _render (vNode){
//   if (typeof vNode === "number") {
//     vNode = String(vNode);
//   }
//   // 字符串类型直接就是文本节点
//   if (typeof vNode === "string") {
//     return document.createTextNode(vNode);
//   }

//   // 深度优先遍历
//   const dom = document.createElement(vNode.tag)
//   // 属性
//   if(vNode.attrs){
//     const attrs = Object.keys(vNode.attrs)
//     attrs.forEach(key => {
//       const val = attrs[key]
//       dom.setAttribute(key, val);
//     });
//   }

//   if(Array.isArray(vNode)) {
//     vNode.children.forEach((child) => {
//       const childNode = _render(child)
//       dom.appendChild(childNode)
//     });
//   } else {
//     const childNode = _render(child)
//     dom.appendChild(childNode)
//   }
 

//   return dom
//   // React.createElement(tag, props, ...children)
// }

// console.log(_render(virtualDom));

// const domdata = <div>
// <span>
//   <a></a>
// </span>
// <span>
//   <a></a>
//   <a></a>
// </span>
// </div>
// // DOM2JSON
// function dom2Json(domtree) {
//   let obj = {};
//   obj.name = domtree.tagName;
//   obj.children = [];
//   domtree.childNodes.forEach((child) => obj.children.push(dom2Json(child)));
//   return obj;
// }
// console.log(dom2Json(domdata));


// 使用xhr 实现ajax

// Object.is
// Object.is 和 === 区别
// 相同：不进行类型转换 进行比较
// 不同：NaN !== NaN, 但是在Object.is 相等
// +0 === -0 但是在Object.is不等
function ObjectIs(x, y) {
  if(x === y) {
    // x !== 0 返回 true
    // x===0 需要判断+0 === -0 1/+0 = Infinity 1/-0 =-Infinity
    return x !== 0 || 1/x === 1/y
  }

  // NaN !== NaN, x 和 y同时为NaN, 用x !== x y!== y判断
  return x!== x && y !== y
}

// 类数组转化为数组的方法
// const arrayLike=document.querySelectorAll('div')
// // 1.扩展运算符
// [...arrayLike]
// // 2.Array.from
// Array.from(arrayLike)
// // 3.Array.prototype.slice
// Array.prototype.slice.call(arrayLike)
// // 4.Array.apply
// Array.apply(null, arrayLike)
// // 5.Array.prototype.concat
// Array.prototype.concat.apply([], arrayLike)


// 排序 全排序
// 冒泡排序
const array = [5, 3, 8, 4, 2];
// // 输出 [2, 3, 4, 5, 8]

function bubbleSort(data) {

} 



// 动态规划
