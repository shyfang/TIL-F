// 树转为列表
// dfs
const data = [
  {
    id: 1,
    text: '节点1',
    parentId: 0,
    children: [
      {
        id: 2,
        text: '节点1_1',
        parentId: 1
      }
    ]
  }
]

function treeToList(data) {
  const res = dfs(data, [])
  return res
}

function dfs(children = [], list = []) {
  children.forEach(item => {
    list.push(item)
    if (item.children?.length) {
      dfs(item.children, list)
      delete item.children
    }
  })
  return list
}


function treeToList1(tree) {
  let res = []
  const dfs = (tree) => {
    tree.forEach(item => {
      res.push(item)
      if (item.children) {
        dfs(item.children)
        delete item.children
      }
    })
  }
  dfs(data)
  return res
}

console.log(treeToList(data));


// list to tree
const list = [
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

function listToTree(list) {
  let tree = []
  let tmpObj = {}
  list.forEach(item => {
    if (!tmpObj[item.parentId]) {
      tmpObj[item.parentId] = []
    }
    tmpObj[item.parentId].push(item)

  })

  list.forEach(item => {
    if (item.parentId === 0) {
      tree.push(item)
      if (tmpObj[item.id]) {
        item.children = tmpObj[item.id]
      }
    }
  })

  return tree
}

console.log(JSON.stringify(listToTree(list)));