/** 继承 */
// 1. 原型链继承
function Parent1 () {
  this.name = 'parent1'
  this.play=[1, 2]
}
function Child1 (){
  this.type = 'child1'
}

Child1.prototype = new Parent1()
const c1 = new Child1()
const c2 = new Child1()
console.log(c1, c2);


// 构造函数继承
// 可以看到，父类原型对象中一旦存在父类之前自己定义的方法，那么子类将无法继承这些方法
function Parent2 () {
  this.name = 'parent1'
  this.play=[1, 2]
}

Parent2.prototype.getName = function(){
  return this.name
}

function Child2 (){
  Parent1.call(this)
  this.type = 'child2'
}
let child = new Child()
console.log(child);
// console.log(child.getName()); 报错 无法继承这个方法



// 组合继承
function Parent3 () {
  this.name = 'parent1'
  this.play=[1, 2]
}
Parent3.prototype.getName = function(){
  return this.name
}
function Child3 (){
  Parent3.call(this)
  this.type = 'child3'
}

Child3.prototype = new Parent3() // 多了一次
Child3.prototype.constructor = Child3

const s3 = new Child3();
const s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);  // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'


// 原型式继承
// Object.create() 浅拷贝多个实例的引用类型属性指向相同的内存

// 寄生式继承
// Object.create() + 增加额外属性

// 寄生组合式继承 ？构造

// es6 extends class继承


