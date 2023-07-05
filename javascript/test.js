// 构造函数继承
function Parent1(){
  this.name = this.names = ['kevin', 'daisy'];
}

function Child1(){
  Parent1.call(this)
}

const child1demo1 = new Child1()
console.log(child1demo1);