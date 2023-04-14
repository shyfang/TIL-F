# 1. typescript 数据类型

<!-- number -->
<!-- string -->
<!-- boolean -->
<!-- array -->
<!-- tuple -->

tuple: 表示一个已知元素数量和类型的数组

<!-- enum -->

enum: 使用枚举类型可以为一组数值赋予友好的名字

<!-- any null undefined -->

null undefined 是所有类型的子类型

<!-- void -->

void: 用于标识方法返回值的类型，表示该方法没有返回值。

<!-- object -->

<!-- never -->

never 是其他类型 （包括 null 和 undefined）的子类型，可以赋值给任何类型，代表从不会出现的值;
never 类型一般用来指定那些总是会抛出异常、无限循环

# enum

```
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```

# interface

# 高级用法
keyof 
extends keyof 
in keyof
