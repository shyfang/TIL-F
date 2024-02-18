- css

1. css 盒模型由哪几部分组成?
   content padding border margin

   标准盒模型：盒子总高度、总宽度计算？width + padding + border + margin
   IE 盒模型：盒子总宽度= width + margin

   引擎如何计算一个元素的总高度、总宽度？
   box-sizing: content-box|border-box|inherit;

   example: 盒子占据的宽度是多少？200px

   ```
   <style>
     .box {
       width: 200px;
       height: 100px;
       padding: 20px;
       box-sizing: border-box;
     }
   </style>
   <div class="box">
     盒子模型
   </div>
   ```

[x] 2. css 可继承属性?

3. 元素水平垂直居中的方法有哪些？
   如果元素不定宽高的？

4. 什么是响应式设计？从哪几方面考虑来实现响应式设计【实现方式】？

5. css 动画用的多吗？有哪些？

6. css 预编译语言？

#

- javascript ES6

1. JavaScript 数据类型有哪些？
   基本类型：Number String Boolean Undefined null symbol BigInt
   引用类型：Object Array Function 其他：Map Set Date Regexp

   实现一个判断数据类型的方法？

   typeof instanceof 的区别？
   instanceof 实现原理? 右边变量的 prototype 在左边变量的原型链上即可

   ```
      while (x.__proto__) {
         if (x.__proto__ === y.prototype) {
           return true;
         }
         x.__proto__ = x.__proto__.__proto__;
       }
       if (x.__proto__ === null) {
         return false;
       }

       function myInstanceof(left, right) {
         // 这里先用typeof来判断基础数据类型，如果是，直接返回false
         if(typeof left !== 'object' || left === null) return false;
         // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
         let proto = Object.getPrototypeOf(left);
         while(true) {
             if(proto === null) return false;
             if(proto === right.prototype) return true;//找到相同原型对象，返回true
             proto = Object.getPrototypeof(proto);
         }
       }
   ```

   存储上有什么区别？拷贝？
   拷贝类型为引用类型: 浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址
   var obj = {
   age: 18,
   nature: ['smart', 'good'],
   names: {
   name1: 'fx',
   name2: 'xka'
   },
   love: function () {
   console.log('fx is a great girl')
   }
   }
   var newObj = Object.assign({}, obj);

   浅拷贝：
   Object.assign Object.create
   Array.prototype.slice(), Array.prototype.concat()

2. 数组常用方法？

3. Javascript 数字精度丢失问题
   0.1 + 0.2 === 0.3
   如何实现精确+ - \* / 得到期望的结果

4. this 指向的理解？
   this 是函数运行时自动生成的一个内部对象，只能在函数内部使用，总指向调用它的对象
   this 的值为点符号 . 前的这个对象

5. 事件循环

6. promise

- react

- 网络
Websocket  http

- typescript

1. type 和 interface区别
2. TypeScript 中 ?.、??、!、!.、_、** 等符号的含义
?. 可选链 遇到 null 和 undefined 可以立即停止表达式的运行。
?? 空值合并运算符 当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。
! 非空断言运算符 x! 将从 x 值域中排除 null 和 undefined
!.  在变量名后添加，可以断言排除undefined和null类型
_ 数字分割符 分隔符不会改变数值字面量的值，使人更容易读懂数字 .e.g 1_101_324。
** 求幂