// 原始数据类型: Null Undefined String Number BigInt Boolean Symbol
// Object


// ----------------------------------------------------
// 原始值转布尔值
// Boolean
// 6种值转为false: null undefined "" +0 -0 NaN  
// Boolean() // false


// ----------------------------------------------------
// 原始值转数字
// Number parseInt parseFloat
// 如果 Number 函数不传参数，返回 +0，如果有参数，调用 ToNumber(value)。
// Undefined	NaN
// Null	+0
// Boolean	如果参数是 true，返回 1。参数为 false，返回 +0
// Number	返回与之相等的值
// String	这段比较复杂，如果通过 Number 转换函数传入一个字符串，它会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 NaN
// console.log(Number()) // +0

// console.log(Number(undefined)) // NaN
// console.log(Number(null)) // +0

// console.log(Number(false)) // +0
// console.log(Number(true)) // 1

// console.log(Number("123")) // 123
// console.log(Number("-123")) // -123
// console.log(Number("1.2")) // 1.2
// console.log(Number("000123")) // 123
// console.log(Number("-000123")) // -123

// console.log(Number("0x11")) // 17

// console.log(Number("")) // 0
// console.log(Number(" ")) // 0

// console.log(Number("123 123")) // NaN
// console.log(Number("foo")) // NaN
// console.log(Number("100a")) // NaN


// console.log(parseInt("3 abc")) // 3
// console.log(parseFloat("3.14 abc")) // 3.14
// console.log(parseInt("-12.34")) // -12
// console.log(parseInt("0xFF")) // 255
// console.log(parseFloat(".1")) // 0.1
// console.log(parseInt("0.1")) // 0


// ----------------------------------------------------
// 原始值转字符串
// String()

// console.log(String()) // 空字符串

// console.log(String(undefined)) // undefined
// console.log(String(null)) // null

// console.log(String(false)) // false
// console.log(String(true)) // true

// console.log(String(0)) // 0
// console.log(String(-0)) // 0
// console.log(String(NaN)) // NaN
// console.log(String(Infinity)) // Infinity
// console.log(String(-Infinity)) // -Infinity
// console.log(String(1)) // 1


// ----------------------------------------------------
// 原始值转对象
// 原始值通过调用 String()、Number() 或者 Boolean() 构造函数，转换为它们各自的包装对象


 // ----------------------------------------------------
// 难点：
// 对象转为原始值 toString()
Object.prototype.toString({a: 1})
console.log([1,2,3].toString()); //1,2,3

// 对象转为原始值 valueOf()返回对象本身,Date除外
const date = new Date()
console.log(date.valueOf());


// 对象转字符串 和 数字
// Object	-> String
// 1. primValue = ToPrimitive(input, String)
// 2. 返回ToString(primValue).


// Object	-> Number
// 1. primValue = ToPrimitive(input, Number)
// 2. 返回ToNumber(primValue).

// ToPrimitive(obj[, PreferredType])
// ToPrimitive(obj, Number)
// 如果 obj 为 基本类型，直接返回
// 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
// 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
// 否则，JavaScript 抛出一个类型错误异常。

// ToPrimitive(obj, String)
// 如果 obj为 基本类型，直接返回
// 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
// 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
// 否则，JavaScript 抛出一个类型错误异常。

 // ----------------------------------------------------
// JSON.stringify()
console.log(JSON.stringify(null), typeof(JSON.stringify(null))) // null
console.log(JSON.stringify(undefined), typeof JSON.stringify(undefined)) // undefined，注意这个undefined不是字符串的undefined
console.log(JSON.stringify(true),  typeof JSON.stringify(true)) // true
console.log(JSON.stringify(42),  typeof JSON.stringify(42)) // 42
console.log(JSON.stringify("42"),  typeof JSON.stringify("42")) // "42"


// 隐式转化
// ----------------------------------------------------
// +
const novadax = {
  isApp: true,
  version: "1.1.9"
}

console.log(novadax.version >= "1.2.0");
console.log(!novadax.version >= "1.2.0");
if (!novadax.isApp || !(novadax.version >= "1.2.0")) {
  console.log("here____");
}