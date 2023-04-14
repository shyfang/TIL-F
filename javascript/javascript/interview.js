/** 深浅拷贝 */
// 深度拷贝deepClone
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

// 广度优先 深度优先的 拷贝函数

/** 闭包：如果没有利用到闭包的熬出，避免私用闭包 */
// 1.创建私有变量
// 2.延长变量的生命周期

// 柯里化
// js没有支持声明私有变量，闭包模拟私有变量？
// 计数器、延迟调用、回调

/** 作用域: 作用域决定了代码区块中变量和其他资源的可见性 */
// 1. 全剧作用域 函数作用域 块级作用域
// 2. 词法作用域
// 3. 作用域链

const a = 2
function foo() {
  // console.log(a);
}
function bar() {
  const a = 3
  // foo()
  // function foo(){
  //   console.log(a);
  // }
  foo()
}
bar()

/** 原型链 */
// 原型对象 Object.prototype
//_proto_

/** 继承 */
class Car {
  constructorco(color, speed) {
    this.color = color
    this.speed = speed
  }
}

class Truck extends Car {
  constructor(color, speed) {
    super(color, speed) //
    this.color = 'black'
    this.Container = true
  }
}

// 继承方式
// ？不同继承方式有什么优缺点？最优继承方式，es6 extends
// 1.原型链继承：构造函数、原型对象、实例
// 2.构造函数继承？

function Parent2() {
  this.name = 'parent1'
}

/** this */
//  默认绑定
//  隐式绑定
//  显式绑定：apply call bind 改变函数的调用对象,有什么区别（第一个参数表示改变后的调用这个函数的对象）
//  new绑定

/** 事件和事件流 */
// capture target bubbling
// DOM0 DOM2

// typeof instanceof

// new 手写new
function myNew(Func, ...args) {
  let obj = {}
  obj.__proto__ = Func.prototype
  let result = Func.call(obj, args)
  return result instanceof Object ? result : obj
}

// ajax fetch axios

//call apply bind 改变函数运行时的this指向

// 事件循环：同步任务 异步任务
// 微任务与宏任务

// 递归 一个函数在内部调用自身

function factorial(n, total) {
  if (n === 1) return total
  return factorial(n - 1, n * total)
}
console.log(factorial(5, 1));
// 使用尾递归优化求斐波那契数列

function factorial2 (n, start = 1, total = 1) {
  if(n <= 2){
      return total
  }
  return factorial2 (n -1, total, total + start)
}

console.log(factorial2(10, 1, 1));