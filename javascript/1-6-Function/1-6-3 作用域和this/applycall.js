function cachingDecorator(func){
  let cache = new Map()
  return function(x){
    if(cache.has(x)) {
      return cache.get(x)
    } else {
      const result = func(x)
      cache.set(x, result)
      return result
    }
  }
}

function slow(x, y) {
  console.log(`called slow with `, x, y);
  return x + y
}
// const cacheSlow = cachingDecorator(slow)
// console.log(cacheSlow(3));
// console.log(cacheSlow(3));
// console.log(cacheSlow(3));

// 待优化
// 1. 多个参数
function cachingDecoratorWithArgs(func){
  let cache = new Map()
  return function(){
    const key = hash(arguments)
    if(cache.has(key)) {
      return cache.get(key)
    } else {
      const result = func(...arguments) 
      cache.set(key, result)
      return result
    }
  }
}

function hash(args) {
  return [].join.call(args) // 方法借用（method borrowing）。[].join 中获取（借用）join 方法

  // arr.join(glue) 原生arr.join内部算法
  // 让 glue 成为第一个参数，如果没有参数，则使用逗号 ","。
  // 让 result 为空字符串。
  // 将 this[0] 附加到 result。
  // 附加 glue 和 this[1]。
  // 附加 glue 和 this[2]。
  // ……以此类推，直到 this.length 项目被粘在一起。
  // 返回 result。
}

function hash1(...args) {//将参数列表转化为数组
  return args.join()
}

// const cacheSlowWithArgs = cachingDecoratorWithArgs(slow)
// console.log(cacheSlowWithArgs( 2, 3 ));
// console.log(cacheSlowWithArgs( 2, 3 ));
// console.log(cacheSlowWithArgs( 2, 3 ));


// 2. 调用对象的方法, 设定上下文
let worker = {
  someMethod(){
    return 1
  },
  slow(x, y) {
    console.log(`called with slow`, x, y);
    return x + y + this.someMethod()
  }
}
// const func1 = worker.slow
// func1(2, 3) // 上下文缺失 丢失this

function cachingDecoratorWithContext (func){
  let cache = new Map()
  return function(){
    console.log('arguments', arguments, this);
    const key = hash(arguments)
      if(cache.has(key)) {
        return cache.get(key)
      } else {
        // const result = func(...arguments) // 这里需要修改 传递上下文
        // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        // func.call(context, arg1, arg2, ...) // 第一个参数作为 this,后面的作为参数
        // func.apply(context, args);// 第一个参数作为 this, 参数只接受类数组
        // const result = func.call(this, ...arguments)  // 函数调用 spread语法把数组转换为参数列表;
        // 若 ... 出现在函数参数列表的最后，那么它就是 rest 参数，它会把参数列表中剩余的参数收集到一个数组中。// 若 ... 出现在函数调用或类似的表达式中，那它就是 spread 语法，它会把一个数组展开为列表。
        const result = func.apply(this, arguments) 
        cache.set(key, result)
        return result
      }
  }
}

// 对于即可迭代又是类数组的对象，例如一个真正的数组，我们使用 call 或 apply 均可，但是 apply 可能会更快，因为大多数 JavaScript 引擎在内部对其进行了优化。
worker.slow = cachingDecoratorWithContext(worker.slow)
// worker.slow = function(){
//   const key = hash(arguments)
//     if(cache.has(key)) {
//       return cache.get(key)
//     } else {
//       const result = func(...arguments)
//       cache.set(key, result)
//       return result
//     }
//   }
console.log(worker.slow(3, 6));
console.log(worker.slow(3, 6));
console.log(worker.slow(3, 6));


// 总结：
// func.call(context, arg1, arg2…) —— 用给定的上下文和参数调用 func。
// func.apply(context, args) —— 调用 func 将 context 作为 this 和类数组的 args 传递给参数列表。

// 方法借用（method borrowing） 的例子，就是我们从一个对象中获取一个方法，并在另一个对象的上下文中“调用”它。采用数组方法并将它们应用于参数 arguments 是很常见的。
// 另一种方法是使用 Rest 参数对象，该对象是一个真正的数组。
Function.prototype.myCall = function(context, ...args) {
  // 如果没有传递上下文，则使用全局对象
  context = context || window;

  // 将当前函数作为对象的一个属性
  context.fn = this;

  // 调用该属性，并传递参数
  const result = context.fn(...args);

  // 删除该属性
  delete context.fn;

  // 返回结果
  return result;
};

Function.prototype.myApply = function(context, args) {
  // 如果没有传递上下文，则使用全局对象
  context = context || window;

  // 将当前函数作为对象的一个属性
  context.fn = this;

  // 调用该属性，并传递参数
  const result = context.fn(...args);

  // 删除该属性
  delete context.fn;

  // 返回结果
  return result;
};


function ObjectFactory(Constructor){
  let obj = new Object()
  const args = Array.prototype.slice.call(arguments, 1)
  obj.__proto__ = Constructor.prototype
  const res = Constructor.apply(obj, args)
  return typeof res === "object" ? res : obj
}

// arrayLike 类数组
var array = ['name', 'age', 'sex'];

var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
// 1. 读写
// 2. 长度 .length
// 3. 遍历 for(let i=0, i++, i<arr.length){}
// 4. 调用数组方法？!!!不可以直接调用 call间接调用
Array.prototype.slice.call(arrayLike, 0)
Array.prototype.join.call(arrayLike , "&")
Array.prototype.map.call(arrayLike, function(item){
  return item
})
// 5. 类数组转数组
Array.prototype.slice.call(arrayLike)
Array.prototype.splice.call(arrayLike, 0)
Array.from(arrayLike)
Array.prototype.concat.apply([], arrayLike)

// Arguments
// 1. 对象的length属性-实参长度
// 2. callee 
// 3. 传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享


// 传递参数 bar.apply(this, arguments)
// 
function func(...args){
  // 将参数转为数组
}
