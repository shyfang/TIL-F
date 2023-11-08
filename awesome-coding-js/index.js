// 1. compose 注意从右到左的顺序 reduceRight
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
// const a = compose(fn1, fn2, fn3, fn4);

function compose(...fn) {
  return function (x) {
    return fn.reduceRight((result, current) => {
      return current(result)
    }, x)
  }
}

const afunc = compose(fn1, fn2, fn3, fn4)
// console.log( afunc(1));


// 2. 题目描述:setInterval 用来实现循环定时调用 可能会存在一定的问题 能用 setTimeout 解决吗
// 每次调用tick都执行一次回调任务
// 通过设置新的tick定时,形成一个循环
function mysetInterval(callback, delay) {
  function tick() {
    callback()

    setTimeout(() => {
      tick()
    }, delay);
  }

  tick()
}

// 用setInterval实现setTimeout
function mySetTimeout(callback, delay) {
  const id = setInterval(() => {
    clearInterval(id)
    callback()
  }, delay);
}

// console.log("start");
mySetTimeout(() => {
  // console.log("delayed execution");
}, 1000)
// console.log("end");
// 浏览器性能
// window.requestAnimationFrame


// 防抖 和 节流实现



// 3. 发布订阅模式
// 了解设计模式
class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback]
    } else {
      this.events[type].push(callback)
    }
  }

  off(type, callback) {
    if (!this.events[type]) return
    this.events[type] = this.events[type].filter(item => item !== callback)
  }

  once(type, callBack) {
    function fn() {
      callBack();
      this.off(type, fn);
    }
    this.on(type, fn);
  }

  emit(type, ...rest) {
    if (!this.events[type]) return
    this.events[type].forEach(fn => {
      fn.apply(this, rest) // ？？
    });
  }
}

const eventItem = new EventEmitter()
const handle = (...rest) => {
  console.log("click", ...rest);
}
const handle1 = (...rest) => {
  console.log("dbClick", ...rest);
}
eventItem.on("click", handle)
eventItem.once("dbClick", handle1)
eventItem.emit("click", 1, 2, 3)
eventItem.emit("dbClick")
eventItem.emit("dbClick")
// class 基本语法
// 将 class 视为一种定义[constructor构造器]及其[原型方法.prototype.method]的语法糖

// class new 继承
// 8. 手写new
function myNew(constructor, ...args) {
  let obj = Object.create(constructor.prototype) // 新创建对象的原型
  // 调用构造函数，并将其上下文设置为新创建的对象
  const instance = constructor.apply(obj, args);

  // 如果构造函数返回了一个对象，则返回该对象；否则返回新创建的对象
  return (typeof instance === 'object' && instance !== null) ? instance : obj;
}

// this call apply bind
// 
function myCall(context, ...args) {

}

// 实现一个方法使多维数组变成一维数组
// 递归思想 、 迭代思想
// const multiArr = [1, 2, [1, [2, 3, [4, 5, [6]]]]]
// 递归 通过函数的自我调用解决问题
const multiArr = [1, 2, [1, [2, 3, [4, 5, [6]]]], [9, [6, 3]]]
function flatten(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (Array.isArray(element)) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(element)
    }
  }
  return res
}

function flatten1(arr) {
  if (!arr.length) return
  return arr.reduce(
    (pre, cur) =>
      Array.isArray(cur) ? [...pre, ...flatten1(cur)] : [...pre, cur],
    []
  )
}
// console.log(flatten1(multiArr));

// 迭代 通过循环解决问题
// function flatten3(arr){

// }

function flatter3(arr) {
  if (!arr.length) return;
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
    console.log(arr);
  }
  return arr;
}
// console.log(flatter3([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
// console.log([].concat(...[1, 2, [2]]))
// console.log([1, 2, 3]);



// 19. lazyMan
// 链式调用
// 延时执行
// 实现原理是 放到tasks 进行任务调度 
// 任务执行： 用this.next() 取第一个task执行
// 首次执行 放到调用栈清空之后执行


class _LazyMan {
  constructor(name) {
    this.tasks = []

    const task = () => {
      console.log(`Hi, this is ${name}`);
      this.next()
    }

    this.tasks.push(task)

    setTimeout(() => {
      console.log("start ---");
      this.next()  // 放到调用栈清空之后执行
    }, 0);
  }

  next() {
    const task = this.tasks.shift()
    task && task()
  }

  sleep(time) {
    this._sleepWrapper(time, false)
    return this
  }

  sleepFirst(time) {
    this._sleepWrapper(time, true)
    return this
  }

  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next()
      }, time * 1000);
    }
    if (first) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }

  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`);
      this.next();
    }

    this.tasks.push(task);
    return this;
  }
}

function lazyMan(name) {
  const res = new _LazyMan(name)
  return res
}

// lazyMan("Hank").eat("breakfirst").sleep(3).eat("dinner")


// 22. LRU（Least Recently Used)
// LRU（Least Recently Used）算法是一种缓存淘汰策略，用于解决缓存空间有限时的数据替换问题。
// LRU 算法的原则是淘汰最近最少使用的数据。
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.secretKey = new Map()
  }

  get(key) {
    if (this.secretKey.has(key)) {
      const tempValue = this.secretKey.get(key)
      this.secretKey.delete(key)
      this.secretKey.set(key, tempValue)
      return tempValue
    } else {
      return -1
    }
  }

  put(key, value) {
    if (this.secretKey.has(key)) {// 有key 获取 删除 然后set
      this.secretKey.delete(key)
      this.secretKey.set(key, value)
    } else if (
      this.secretKey.size < this.capacity // < capacity
    ) {
      this.secretKey.set(key, value)
    } else {
      // 大于capacity 删除map第一个元素 然后添加
      const firstKey = this.secretKey.keys().next().value
      this.secretKey.delete(firstKey)
      this.secretKey.set(key, value)
    }
  }
}

// Promise相关
// 手写promise
// let promise = new Promise(function(resolve, reject) {
  // executor（生产者代码，“歌手”）
// });
class _Promise{
  constructor(fn){
    this.status ="pending" // fullfilled rejected
    this.value = ""
    

  }

  then(){

  }
}

// js深入系列

// react原理