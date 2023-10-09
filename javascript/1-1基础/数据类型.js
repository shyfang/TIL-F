// 7种原始类型：string，number，bigint，boolean，symbol，null 和 undefined。
// 对象包装器 String、Number、Boolean、Symbol 和 BigInt
// null/undefined 没有任何方法

// 调用不带 new（关键字）的 String/Number/Boolean 函数是可以的且有效的。它们将一个值转换为相应的类型：转成字符串、数字或布尔值（原始类型）。
// ------------------------------------------------------------------------------------------

// 数字类型 检测
// isNaN (参数转为数字,在判断是否是NaN)
// isFinite (参数转为数字，如果是常规数字，不是NaN, Infinity, -Infinity、非数字，则返回true)

// Object.is
Object.is(NaN, NaN) === true
Object.is(-0, +0) === false
// 在所有其他情况下，Object.is(a, b) 与 a === b 相同。

// 转换为数字 + 或者 Number是严格的转换
// parseInt parseFloat
// parseInt(str, radix) 
parseInt('0xff', 16) 

// num.toString(base) //将数字转换为在给定的 base 数字系统中的字符串。
