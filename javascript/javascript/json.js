// JSON
// JSON.stringify(obj) // json字符串[序列化]
// JSON编码的对象 与 对象字面量的区别：1. 字符串使用双引号 2.对象属性名也是双引号


// JSON.stringify(value[, replacer, space]) //ToJSON
// 支持的数据类型：Object Array Primitives:string, number, boolean, null
// 以下属性被过滤: 1.函数属性（方法 2.Symbol 类型的键和值3.存储 undefined 的属性。

// let user = {
//   sayHi() { // 被忽略
//     alert("Hello");
//   },
//   [Symbol("id")]: 123, // 被忽略
//   something: undefined // 被忽略
// };
// JSON.stringify(user)  // {}


// JSON.parse(str, [reviver])