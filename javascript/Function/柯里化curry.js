// 函数进阶
// 函数高阶
// 柯里化：f(a, b, c) --> f(a)(b)(c) 【不会调用函数，只对函数进行转换】
// partially applied function / partial :轻松地生成部分应用函数

function sum(a, b) {
  return a + b 
}
// sum(a)(b)
function curry(func){
  return function(a){
    return function(b){
      return func(a, b)
    }
  }
}


// 高级柯里化实现
function perCurry(func) {
  return function curried(...args){
    if(args.length >= func.length){
      return func.apply(this, args)
    } else {
      return function (...args2){
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

const currySum = perCurry(sum)
console.log(currySum(2)(3));
