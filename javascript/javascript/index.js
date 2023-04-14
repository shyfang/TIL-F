/** array操作方法 https://vue3js.cn/interview/JavaScript/array_api.html */
// 增删改查 增：push unshift splice concat 删: pop shift splice slice 改：splice 查：find indexOf includes
// 排序 sort reverse
// 转换 join
// 迭代 some every forEach map filter


/** string操作方法 */
//  replace match search


/** 正则 */ 
// test exec


/** 类型转换: 显示转换 和 隐式转换 */
// parseInt(string, radix) // 返回指定基础的十进制整数 radix介于2-36之间
console.log(['1', '2', '3'].map(parseInt))
// ['1', '2', '3'].map((item, index) => parseInt(item, index))


// 在比较null的情况的时候，我们一般使用相等操作符==
const obj = {};
if(obj.x == null){
  console.log("1");  //执行
}
// 等同于下边的写法
if(obj.x === null || obj.x === undefined) {
  // ...
}
// !!!除了在比较对象属性为null或者undefined的情况下，我们可以使用相等操作符（==），其他情况建议一律使用全等操作符（===）


/** 深拷贝和浅拷贝 */
// 浅拷贝，指的是创建新的数据，这个数据有着原始数据【属性值】的一份精确拷贝
// 属性基本类型，拷贝基本基本类型的值，引用类型，拷贝的是内存地址
// 浅拷贝：拷贝一层
Object.assign({})
Array.prototype.slice()
Array.prototype.concat()




