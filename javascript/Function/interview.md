1. this
<!-- - this -->
```
 this 函数运行时所在的环境
```
<!-- this指向 -->
```
在默认情况下，函数的 this 值指向全局对象（在浏览器中是 window 对象）
在对象的方法中，this 值通常指向调用该方法的对象。
如果在函数中使用了 new 关键字，则 this 值指向新创建的对象。
此外，如果在函数中使用了 call、apply 或 bind 方法，则 this 值将被显式地绑定到指定的对象上。
```

2. call apply bind
<!-- call apply bind -->
```
  func.call(context, arg1, arg2, ...) // 第一个参数作为 this,后面的作为参数
  func.apply(context, args);// 第一个参数作为 this, 参数只接受类数组
```

<!-- bind -->
```
  1. let boundFunc = func.bind(context);
  2.部分应用 let bound = func.bind(context, [arg1], [arg2], ...);
```

```javascript
function partial(func, ...argsBound){
  return function (...args) {
    return func.call(this, ...argsBound, ...args)
  }
}
```

3. 写一个节流/防抖 this绑定
<!-- 写一个节流/防抖 并解释this绑定 相关 -->
```javascript
Function.prototype.defer = function(ms){
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
}
```
