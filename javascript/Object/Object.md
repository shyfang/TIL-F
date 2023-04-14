# 遍历

- 遍历
  for...in

- 空对象判断 isEmpty

# 拷贝

- 浅拷贝与合并: Object.assign {...spread} // 属性值均为原始类型
  变量存储的不是“对象的值”，而是一个对值的“引用”（内存地址）。因此，拷贝此类变量或将其作为函数参数传递时，所拷贝的是引用，而不是对象本身。
- 深拷贝 原理
- user.name 与 Object.defineProperty

# 对象方法，this

如果 obj.f() 被调用了，则 this 在 f 函数调用期间是 obj

# new

- new User(...)做的事情

1. 一个新的空对象被创建并分配给 this。
2. 函数体执行。通常它会修改 this，为其添加新的属性。
3. 返回 this 的值。

```
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
```

- more
  new.target: 调用构造函数是否使用了 new
  return(通常构造器没有 return 语句)
  如果 return 返回的是一个对象，则返回这个对象，而不是 this。
  如果 return 返回的是一个原始类型，则忽略。
  funciton

# ?. ?.() ?.[]

obj?.prop —— 如果 obj 存在则返回 obj.prop，否则返回 undefined。
obj?.[prop] —— 如果 obj 存在则返回 obj[prop]，否则返回 undefined。
obj.method?.() —— 如果 obj.method 存在则调用 obj.method()，否则返回 undefined。

- Symbol ???

可以用作对象属性键的两种原始类型:字符串类型、symbol 类型

1. symbol 属性不参与 for..in 循环；Object.keys(user) 也会忽略它们
2. Object.assign 会同时复制字符串和 symbol 属性

使用场景

1. “隐藏” 对象属性。
2. ?? Symbol.\*: Symbol.iterator 来进行 迭代 操作，使用 Symbol.toPrimitive 来设置 对象原始值的转换 等等


# 属性标志

- getOwnPropertyDescriptor 
- defineProperty


- Object.keys Object.values Object.entries Object.fromEntries

