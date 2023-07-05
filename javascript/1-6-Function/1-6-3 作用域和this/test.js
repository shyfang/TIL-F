// let boundFunc  = func.bind(context)
// func.bind(context) 的结果是一个特殊的类似于函数的“外来对象（exotic object）”
// 可以被调用
// 调用传递给 func 并设定 this=context

// ----boundFunc 调用就像绑定了 this 的 func



// bindAll

//partial functions
// let bound =  func.bind(context, [arg1], [arg2], ...)
// 允许将上下文绑定为this 还可绑定函数的部分参数


// 没有上下文情况下的partial？使用场景？？-->原生bind不支持 
function partial(func, ...argsBound) {
  return function(...args) {
    return func.call(this, ...argsBound, ...args)
  }
}

// 实现一个double triple

function mul (a, b) {
  return a * b
}

const double = partial(mul, 2)

// console.log(double(3));
// console.log(double(4));
// console.log(double(5));

const double1 = mul.bind(null, 2)
console.log(double1(3));
console.log(double1(4));
console.log(double1(5));


// 柯里化
