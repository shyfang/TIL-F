/** 防抖 节流 ：定义、实现思路重点、使用场景、this绑定 arguments */
// 定义：防抖函数用于限制函数的执行频率，在连续的调用【停止一段时间后】才【执行函数】。
// 思路：防止抖动，单位时间内事件触发会被【重置】（timer），避免事件被误触发多次
// 重点：重在清零 clearTimeout,【频繁触发时，计时器重新计时】比如等电梯，只要有一个人进来，就需要再等一会儿
// 使用场景：窗口调整事件\ 输入框实时搜索\ 按钮点击事件
function debounce(fn, time) {
  let timer = null;

  // 频繁触发时，计时器重新计时
  return function debounceHandler() {
    let args = arguments;
    if (timer != null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null;
    }, time)
  }
}

/**
 * 节流的重点 节流函数用于限制函数的执行频率，在指定的时间间隔内只执行【一次】函数。
 * @param {*} fn 
 * @param {*} time 
 * @returns 
 */
// 定义：节流函数用于限制函数的执行频率，在指定的时间间隔内只执行【一次】函数。
// 使用场景: 页面滚动事件、鼠标移动事件
function throttle(fn, time = 300) {
  let timer = null;

  // 这里不用箭头函数的原因是为了能够使用调用这个函数的对象的this上下文
  return function throttleHandler(...args) {
    if (timer === null) {
      // 这里不用 fn(...args)的原因还是为了保证this，因为 fn(...args) 会被编译成 fn.apply(undefined, args);
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
  };
}


// instanceof 
// 左侧 在 右侧 原型链上
let arr = [1]
console.log(arr instanceof Array);
function myInstanceof(target, origin) {
  if (typeof target !== "object" || target === null) {
    return false
  }

  // target.__proto__ 。。。是否有origin
  let proto = Object.getPrototypeOf(target); // 相当于 proto = target.__proto__;
  while (proto) {
    if (proto === origin.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}


// 数组扁平化
const toFlatArr = [1, 2, 3, [4, 5, [6]]]
function deepFlat(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? deepFlat(cur) : cur)
  }, [])
}
function deepFlatDepth(arr, depth = 1) {
  if (depth > 0) {
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? deepFlatDepth(cur, depth - 1) : cur)
    }, [])
  }
  return arr.slice() // 返回原数组的浅拷贝

}
console.log(deepFlatDepth(toFlatArr, 1));



// compose
function compose(...fn) {
  if (!fn.length) return (v) => v;
  if (fn.length === 1) return fn[0];
  return fn.reduce(
    (pre, cur) =>
      (...args) => pre(cur(...args))
  );
}


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
const a = compose(fn1, fn2, fn3, fn4);

console.log(a(1));
// 排序
