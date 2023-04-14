// this 函数运行时所在的环境

// 1. 内存的数据结构
// let obj = { foo: 5 } 
// JavaScript 引擎会先在内存里面，生成一个对象{ foo: 5 } -> 把这个对象的内存地址赋值给变量obj

// obj是一个地址 如果读取obj.foo -》 引擎先从obj拿到内存地址 -》从该地址读出原始的对象 -》 返回它的foo属性

// 原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象 {foo: {[[value]]: 5, [[writable]]: true, [[enumerable]]: true, [[configurable]]: true}
// {foo: {[[value]]: 5, [[writable]]: true, [[enumerable]]: true, [[configurable]]: true)} //foo属性的值保存在属性描述对象的value属性里面


// 2. 函数
// let obj ={ foo: function () {}}
// { foo: {[[value]]: 函数的地址}} // 由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行
const f = function(){
  
}
const obj = {
  f: f
}
//  f()
// obj.f()


// 3. 环境变量
// 由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）--》 this
// this的设计目的 在函数体内部，指代函数当前的运行环境
