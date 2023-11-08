// 树遍历
// 树的对象表示
const tree = {
  value: 'A',
  children: [
    {
      value: 'B',
      children: [
        { value: 'D', children: [] },
        { value: 'E', children: [] }
      ]
    },
    {
      value: 'C',
      children: [
        { value: 'F', children: [] },
        { value: 'G', children: [] }
      ]
    }
  ]
};

// 打印node value



// // 递归实现的 DFS 树遍历
function dfsTree(node) {
  console.log(node.value);
  for (let child of node.children) {
    dfsTree(child);
  }
}

// // 调用 DFS 树遍历
dfsTree(tree);