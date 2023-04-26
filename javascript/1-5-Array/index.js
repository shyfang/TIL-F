// 获取最后一个元素
let fruits = ['Apple', 'Orange', 'Plum']
console.log(fruits[fruits.length - 1]) // Plum

// 检查数组中是否包含元素 item，首选 arr.includes
// 方法 includes 可以正确的处理 NaN
let lengths = ["Bilbo", "Gandalf", "Nazgul"]
let result = lengths.map(item => item.length)

console.log(lengths, result);

// sort
lengths.sort( (a, b) => a - b );

// reduce: 根据数组计算单个值

/** array操作方法 https://vue3js.cn/interview/JavaScript/array_api.html */
//** javascript.info: https://zh.javascript.info/array-methods#find-he-findindexfindlastindex */
// 增删改查 增：push unshift splice concat 删: pop shift splice slice 改：splice 查：find indexOf includes
// 排序 sort reverse
// 转换 join split
// 迭代 some every forEach map filter for...of
// reduce @TODO:尾迭代
//备注：forEach reduce

// 检测 Array.isArray
// typeof
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null // 'object'
typeof [] // 'object'
typeof {} // 'object'
typeof console // 'object'
typeof console.log // 'function'
// typeof 不能正确识别引用类型 除function识别之外其余识别为objct

// 要判断一个变量是否存在
if (typeof a != 'undefined') {
} //不能使用if(a)因为如果a未声明会报错
// instanceof 实现原理
// 源码判断一个数据的数据类型

// for...of array string
let range = {
  from: 1,
  to: 5,

  // 1. for..of 调用首先会调用这个：
  [Symbol.iterator]() {
    this.current = this.from
    // ……它返回迭代器对象（iterator object）：
    // 2. 接下来，for..of 仅与下面的迭代器对象一起工作，要求它提供下一个值
    return this
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ }
    } else {
      return { done: true }
    }
  },
}

for (let num of range) {
  console.log(num) // 1, 然后是 2, 3, 4, 5
}

let arr = Array.from(range, function (num) {
  console.log(this == global)
  return num * num
})
console.log(arr)

//
function sumTo1(n) {
  let sum = 0
  for (let i = 1; i < n; i++) {
    sum += i
  }
  return sum
}

// let salaries = {
//   John: 100,
//   Pete: 300,
//   Mary: 250,
// }

// function sumSalaries() {
//   return Object.values(salaries).reduce((sum, item) => sum + item, 0)
// }