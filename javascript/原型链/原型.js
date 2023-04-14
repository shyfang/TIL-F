//【原型】 [[prototype]]:在 JavaScript 中，所有的对象都有一个隐藏的 [[Prototype]] 属性，它要么是另一个对象，要么就是 null。

let animal = {
  eats: true,
}
let rabbit = {
  jumps: true,
}
rabbit.__proto__ = animal //已过时 rabbit.[[prototype]] = animal 1. __proto__的值是对象或null 2.只能有一个[[prototype]]
// __proto__ 是 [[Prototype]] 的 getter/setter
// Object.getPrototypeOf
// Object.setPrototypeOf
// 从 rabbit 中读取一个它没有的属性，JavaScript 会自动从 animal 中获取
// 继承："animal 是 rabbit 的原型"，或者说 "rabbit 的原型是从 animal 继承而来的"

// 继承链：rabbit 从 animal 中继承，animal 从 Object.prototype 中继承（因为 animal 是对象字面量 {...}，所以这是默认的继承），然后再向上是 null


/**
 * this的值: 方法是共享的 但是对象状态不是 [在一个方法调用中，this 始终是点符号 . 前面的对象]
 */
let animal1 = {
  walk() {
    if (!this.isSleeping) {
      console.log(`I walk`)
    }
  },
  sleep() {
    this.isSleeping = true
  },
}

// let rabbit1 = {
//   name: 'White Rabbit',
//   __proto__: animal1,
// }

// // 修改 rabbit.isSleeping
// rabbit1.sleep()

// console.log(rabbit1.isSleeping) // true
// console.log(animal1.isSleeping) // undefined（原型中没有此属性）




/**
 * for...in hasOwnProperty
 */
let animal3 = {
  eats: true,
}

let rabbit3 = {
  jumps: true,
  __proto__: animal3,
}

// Object.keys 只返回自己的 key
console.log(Object.keys(rabbit3)) // jumps

// for..in 会遍历自己以及继承的键
for (let prop in rabbit3) {
  console.log(prop)
}

for (let prop in rabbit3) {
  let isOwn = rabbit3.hasOwnProperty(prop) // [true:自己的（非继承的）名为 key 的属性]:过滤掉继承的属性

  if (isOwn) {
    console.log(`Our: ${prop}`) // Our: jumps
  } else {
    console.log(`Inherited: ${prop}`) // Inherited: eats
  }
}

/** 
 * rabbit3.hasOwnProperty从哪里来
*/
// 答案：该方法是 Object.prototype.hasOwnProperty 提供的
// for...in遍历为什么没有hasOwnProperty属性？
// 因为它是不可枚举的,因此它和其余的Object.prototype属性未被列出。就像 Object.prototype 的其他属性，hasOwnProperty 有 enumerable:false 标志。并且 for..in 只会列出可枚举的属性。这就是为什么它和其余的 Object.prototype 属性都未被列出

// 几乎所有其他键/值获取方法，例如 Object.keys 和 Object.values 等，都会【忽略继承的属性】。
// 它们只会对对象自身进行操作。不考虑 继承自原型的属性。


// F.prototype
// F.prototype 属性:仅在 new F 被调用时使用，它为新对象(实例)的 [[Prototype]] 赋值。
// 通常情况下 F.prototype = { contructor: F} -> 图表述

function Rabbit() {}
Rabbit.prototype = {
  eats: true,
}

let rabbit1 = new Rabbit() // 引用了上面的prototype

Rabbit.prototype = {
  eats: false,
}

let rabbit2 = new Rabbit() // 引用了新定义的的prototype

delete Rabbit.prototype.eats // 删除新定义的prototype的eats

console.log(rabbit1.eats) // 从之前引用的prototype取值 true

console.log(rabbit2.eats) // 从新的prototype取值 undefined

// Object.prototype
let obj = {}

console.log(obj.__proto__ === Object.prototype) // true

console.log(obj.toString === obj.__proto__.toString) //true
console.log(obj.toString === Object.prototype.toString) //true

console.log(Object.prototype.__proto__ === null)

// 其他内建原型Arrary Date Function 都在prototype上挂载了方法
// 内建原型顶端是Object.prototy 一切都从对象继承而来
let arr = [1, 2, 3]

// 它继承自 Array.prototype？
// alert( arr.__proto__ === Array.prototype ); // true

// 接下来继承自 Object.prototype？
// alert( arr.__proto__.__proto__ === Object.prototype ); // true

// 原型链的顶端为 null。
// alert( arr.__proto__.__proto__.__proto__ ); // null

// toString

// !!!!
Function.prototype.defer = function(ms){
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
}


// Object.getPrototypeOf
// Object.setPrototypeOf

// Object.create(proto, [descriptors]) // 利用给定的 proto 作为 [[Prototype]] 和可选的属性描述来创建一个空对象。
// 创建一个以proto为原型的新对象
let objcreate = Object.create(null)

let obj1 = {
  eats: true,
}

let clone = Object.create(
  Object.getPrototypeOf(obj1),
  Object.getOwnPropertyDescriptors(obj1),
)

console.log('obj1', Object.getOwnPropertyDescriptors(obj1),);
console.log(clone)


// 原型简史
// 构造函数的prototype属性
// 2012 Object.create //使用给定原型创建对象，但没提供set/get
// 2015 Object.setPrototypeOf Object.getPrototypeOf 与__proto__
// 2022 对象字面量{...} 中使用 __proto__,不能用作 getter/setter obj.__proto__

// ？why？__proto__,不能用作 getter/setter obj.__proto__


