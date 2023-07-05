// instanceof 操作符用于检查一个对象是否属于某个特定的 class。同时，它还考虑了继承。
// 它可以被用来构建一个【 多态性（polymorphic）】 的函数，该函数根据参数的类型对参数进行不同的处理。
// instanceof 
// obj instanceof Class
// obj.__proto__ = Class.prototype //。。。

// Symbol.hasInstance设置自定义逻辑



// obj instanceof Class 执行过程
// 1. 如果这儿有静态方法 Symbol.hasInstance，那就直接调用这个方法：

// 2. 大多数 class 没有 Symbol.hasInstance。在这种情况下，标准的逻辑是：使用 obj instanceOf Class 检查 Class.prototype 是否等于 obj 的原型链中的原型之一
// obj.__proto__ === Class.prototype
// obj.__proto__.__proto__ = Class.prototype 
// ...// 如果任意一个的答案为 true，则返回 true
// 否则，如果我们已经检查到了原型链的尾端，则返回 false 

// objA.isPrototypeOf(objB)
// obj instanceof Class 可以改为 Class.prototype.isPrototypeof(obj)




// -----------------------------------------------Object.prototype.toString-------------------------------------------------------------------
// toString