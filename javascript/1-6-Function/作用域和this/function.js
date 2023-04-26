// 闭包 闭包是指使用一个特殊的属性 [[Environment]] 来记录函数自身的创建时的环境的函数：它具体指向了函数创建时的词法环境。
// 但是如果我们使用 new Function 创建一个函数，那么该函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。

// 编写任意参数函数
// 普通函数自身的this 有特殊的arguments;箭头函数没有自身的this，没有arguments
function demo() {
  console.log(arguments)
}

let arr = [1, 2, 3]
let arrobj = [...arr] // // Object.assign([], arr)
console.log(arr === arrobj)

let obj = {
  a: 1,
  b: 2,
}
let newObj = { ...obj } // Object.assign({}, obj)


// 变量
// 函数：函数声明会立即变为即用型函数 可以在函数声明前调用
// 内部和外部的词法环境
// 返回函数
function makeCounter() {
  let count = 0

  return function () {
    return count++
  }
}

let counter = makeCounter()

// 函数在其被创建的位置通过外部词法环境引用获取
// g.[[Environment]]
function makeWorker() {
  let name = 'Pete'

  return function () {
    console.log(name)
  }
}

let name = 'John'

// 创建一个函数
let work = makeWorker()
// 调用它
work() // Pete

// 闭包
let x = 1

// function func() {
//   // 从代码块的开始到 let 暂时无法使用
//   console.log(x) // ReferenceError: Cannot access 'x' before initialization
//   let x = 2
// }
// func()
// 柯里化

let arrf = [1, 3, 5, 7, 9]
arrf.filter(function (item) {
  if (item >= 3 && item <= 6) {
    return true
  }
  return false
})

function inBetween(from, to) {
  return function (item) {
    return item >= from && item <= to
  }
}

function inArray(arr) {
  return function (item) {
    return arr.includes(item)
  }
}

let users = [
  { name: 'John', age: 20, surname: 'Johnson' },
  { name: 'Pete', age: 18, surname: 'Peterson' },
  { name: 'Ann', age: 19, surname: 'Hathaway' },
]

// users.name
users.sort((a, b) => (a.name - b.name > 0 ? 1 : -1))
users.sort((a, b) => (a.age - b.age > 0 ? 1 : -1))

function byFiled(key) {
  return function (a, b) {
    return a[key] - b[key] > 0 ? 1 : -1
  }
}
users.sort(byFiled('name'))
users.sort(byFiled('age'))

// IIFE 立即调用函数
// var

// 函数对象： name length（入参数的个数，rest不参与计数）

function makeCounter() {
  let count = 0
  function counter() {
    return count++
  }
  counter.set = (value) => (count = value)
  counter.decrease = () => count--

  return counter
}

// sum(a)(b)(c)(d)

// 零延时setTimeout(func, 0)
// 零延时setTimeout(func)
// args.join
function hash() {
  return [].join.call(arguments)
}
//
// console.log(hash(1, 3))
console.log([1, 3].join())

let user = {
  firstName: 'John',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`)
  },
  // sayHi: () => {
  //   console.log(`Hello, ${this.firstName}!`)
  // }
}

setTimeout(user.sayHi.bind(user), 1000) // Hello, undefined!

// partial 不想一遍遍传入重复相同的参数
function partial(func, ...argsBound) {
  return function (...args) {
    // (*)
    return func.call(this, ...argsBound, ...args)
  }
}

// 变量作用域，闭包
// 词法环境
