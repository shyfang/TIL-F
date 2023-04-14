// slice str.slice(start[, end]) 从 start 到（但不包括）end 的部分
let str = 'stringify'
console.log(str.slice(0, 1)) // 's'，从 0 到 1，但不包括 1，所以只有在 0 处的字符

console.log(str.slice(2)) // 从第二个位置直到结束

console.log(str.slice(-4, -1)) // 'gif'

// substring: 返回字符串从 start 到（但不包括）end 的部分
// 区别于slice: 允许 start 大于 end;不支持负参数
console.log(str.substring(2, 6)) // "ring"
console.log(str.substring(6, 2)) // "ring"

console.log(str.slice(2, 6)) // "ring"（一样）
console.log(str.slice(6, 2)) // ""（空字符串）

// str.substr(start [, length])
console.log(str.substr(2, 4)) // 'ring'，从位置 2 开始，获取 4 个字符
console.log(str.substr(-4, 2)) // 'gi'，-从结尾算起，第 4 位获取 2 个字符

// 正则～～～
