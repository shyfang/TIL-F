let virtualDom = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['周杰伦']),
  createElement('li', {class: 'item'}, ['林俊杰']),
  createElement('li', {class: 'item'}, ['王力宏'])    
]);


// +++
// 创建另一个新的虚拟DOM
let virtualDom2 = createElement('ul', {class: 'list-group'}, [
  createElement('li', {class: 'item active'}, ['七里香']),
  createElement('li', {class: 'item'}, ['一千年以后']),
  createElement('li', {class: 'item'}, ['需要人陪'])    
]);
// diff一下两个不同的虚拟DOM
let patches = diff(virtualDom, virtualDom2);

console.log('patches',patches)