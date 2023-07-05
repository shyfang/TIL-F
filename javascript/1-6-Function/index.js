// 递归
import './1-6-1 递归/递归.md'
// ------------------------------------------------------------------------------------------------
// rest 和 spread
import './1-6-2 rest&spread.md'

// ------------------------------------------------------------------------------------------------
// 词法环境 -> 作用域
// Step1 变量：Lexical Environment；对外部词法环境的引用，与外部代码相关联【一个“变量”只是 环境记录 这个特殊的内部对象的一个属性】phrase:<uninitialized>
// Step2 函数声明：不同之处在于函数声明的初始化会被立即完成。【可以在声明自身之前调用一个以函数声明】say:function
// Step3 内部->外部的词法环境->全局词法环境
// let phrase = "hello"
// function say(name) {
//   console.log(`${phrase}, ${name}`); // lexical Environment of the call : [name]:John -> outer:[say]: function [phrase]: "Hello" -> null
//   // 当代码要访问一个变量时 —— 首先会搜索内部词法环境，然后搜索外部环境，然后搜索更外部的环境，以此类推，直到全局词法环境。
// }

// say("John")


// function makeCounter() {
//   let count = 0
//   return function(){ // 所有的函数在诞生时都会记住创建他们的词法环境[[Environment]],【所有函数都有名为[[Environment]]的隐藏属性】:[empty]->[count:0]-> [makeCunter][counter] -> null
//     return count++ // 在变量所在的词法环境中更新变量。
//   }
// }
// // 所有的函数在诞生时都会记住创建他们的词法环境
// const counter = makeCounter()
// console.log(counter());
// console.log(counter());


// 闭包 记住外部变量 访问外部变量
// JavaScript 中的函数会自动通过隐藏的 [[Environment]] 属性记住创建它们的位置


// 如果有一个嵌套的函数在函数结束后仍可达，则它将具有引用词法环境的 [[Environment]] 属性
// function f(){
//   let value = 2
//   return function(){// [[Environment]] [empty] -> [value] ->[f] [g]
//     console.log(value);
//   }
// }
// const g = f()
// console.log(g);
// // 理论上当函数可达时，它外部的所有变量也都将存在, 但是v8对不使用的变量做了优化

// let name1 = "John"
// function sayHi(){
//   console.log(`Hi, ${name1}`); //[empty]->name1 sayHi-> null
// }
// name1 = "Pete"

// sayHi()


// function makeWorker() {
//   let name = "Pete";

//   return function() {
//     console.log(name);
//   };
// }

// let name = "John";

// // 创建一个函数
// let work = makeWorker();

// // 调用它
// work(); // 会显示什么？


// function Counter() {
//   let count = 0;

//   this.up = function() { //[empty] ->count up down -> Counter counter -> null
//     return ++count;
//   };
//   this.down = function() { // [empty] ->count up down -> Counter counter -> null
//     return --count;
//   };
// }

// let counter = new Counter();

// console.log( counter.up() ); // ?
// console.log( counter.up() ); // ?
// console.log( counter.down() ); // ?

// let phrase = "Hello";

// if (true) {
//   let user = "John";

//   function sayHi() {
//     console.log(`${phrase}, ${user}`);
//   }
// }

// sayHi();

// action object
// function sum(a) {
//   let currentNum = a
//   function nextSum (b){
//     currentNum += b
//     return nextSum
//   }

//   nextSum.toString = function(){
//     return currentNum
//   }
//   return nextSum
// }

// console.log(sum(1)(2));
// 装饰decorate: 不适合对象方法
function cachingDecorator(func){
  let cache = new Map()

  return function(){
    let key = hash(arguments); // (*)
    console.log('cache', key);
    if(cache.has(key)){
      return cache.get(key)
    }
    
    let result = func.call(this, ...arguments) // function(x) 将 func(x) 的调用“包装”到缓存逻辑
    // let result = function.apply(this, arguments) 
    cache.set(key, result)
    return result
  }
}

function hash(args) {
  return [].join.call(args) // 方法借用（method borrowing）
  // return Array.from(args).join()
}



let worker = {
  someMethod() {
    return 1;
  },

  slow(x, y) {
    // 可怕的 CPU 过载任务
    // console.log("Called with " + x);
    return x * y * this.someMethod(); // (*)
  }
};

// console.log(worker.slow(2));
// let func = worker.slow
// console.log(func(2));
worker.slow = cachingDecorator(worker.slow)
worker.slow(3)
worker.slow(3)
worker.slow(2)
worker.slow(2)
worker.slow(3)


// 将所有参数连同上下文一起传递给另一个函数被称为【“呼叫转移（call forwarding）”】。
// func.call(context, arg1, arg2, ...) // 第一个参数作为 this,后面的作为参数
// func.apply(context, args);// 第一个参数作为 this, 餐素只接受类数组

let user = {
  firstName: "John",
  sayHi(){
    console.log(`Hi, ${this.firstName}`);
  }
}
// setTimeout(user.sayHi, 1000);
// setTimeout(() => {
//   user.sayHi()
// }, 1000);

// bind
// 1. let boundFunc = func.bind(context);
let sayHi = user.sayHi.bind(user)
// sayHi()
// setTimeout(sayHi, 1000); // Hello, John!


// 2.部分应用 let bound = func.bind(context, [arg1], [arg2], ...);
// 绑定this 绑定参数arguments
function mul(a,b){
  return a * b
}
// 绑定先有函数的一些参数来创建一个新的函数
let double = mul.bind(null, 2)
let triple = mul.bind(null, 3)
console.log(double);
console.log(double(3));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function partial(func, ...argsBound){
  return function (...args) {
    return func.call(this, ...argsBound, ...args)
  }
}
const obj = {
  x: 1,
  y: 2,
  sum: function(a, b) {
    return this.x + this.y + a + b;
  }
};

const sumBound = partial(obj.sum, 3);
console.log(sumBound.call(obj, 4)); // 输出 10

function sayHi() {
  console.log( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John"
});

console.log( bound.test ); 