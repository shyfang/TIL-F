- [[Prototype]]

- this
  无论在哪里找到方法：在一个对象还是在原型中。在一个方法调用中，this 始终是点符号 . 前面的对象。

- F.prototype

F.prototype 属性仅在 new F 被调用时使用，它为新对象的 [[Prototype]] 赋值。
如果在创建之后，F.prototype 属性有了变化（F.prototype = <another object>），
那么通过 new F 创建的新对象也将随之拥有[新的对象]作为 [[Prototype]]，但[已经存在的对象将保持旧有的值]。

默认的 F.prototype

```
  function Rabbit() {}
  /* 默认的 prototype
    Rabbit.prototype = { constructor: Rabbit };
  */

```

- 获取/设置原型的方法
Object.getPrototypeOf
Object.setPrototypeOf(obj, proto) 

Object.create(proto, [descriptors]) —— 利用给定的 proto 作为 [[Prototype]] 和可选的属性描述来创建一个空对象。
Object.create(null) 或 {__proto__: null} 创建的无原型的对象

