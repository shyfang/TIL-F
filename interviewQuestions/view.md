- css

1. css 盒模型由哪几部分组成?

   标准盒模型：盒子总高度、总宽度计算？
   IE 盒模型：盒子总宽度

   引擎如何计算一个元素的总高度、总宽度？

   example: 盒子占据的宽度是多少？

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

5. css 动画用的多吗？实现动画的方式？

6. css 预处理器？相比于 css in js (style components)有什么优点/缺点？

7. 怎么隐藏一个元素？css重绘和重排？

#

- javascript ES6

1. JavaScript 数据类型有哪些？

   实现一个判断数据类型的方法？

   typeof instanceof 的区别？一句话描述 instanceof 实现原理?

   存储上有什么区别？拷贝？对象/数组浅拷贝现象

   ```
    const obj1 = {
      name : 'init',
      arr : [1,[2,3],4],
    };
    const obj3=Object.assign(obj1) // 一个浅拷贝方法
    obj3.name = "update";
    obj3.arr[1] = [5,6,7] ; // 新旧对象还是共享同一块内存
   ```

2. 数组常用方法？
   map forEach 区别？
   reduce 常用吗？

3. Javascript 数字精度丢失问题
   0.1 + 0.2 !== 0.3
   如何实现精确+ - \* / 得到期望的结果

4. this 的理解; 改变 this 指向的方法；
call 和 apply 的区别是什么，哪个性能更好一些？


5. 
谈谈你对事件循环的理解
setTimeout、Promise、Async/Await的区别
js异步编程有哪些实现方式？

浏览器的事件循环 与 node的事件循环有什么区别

【x】6. 怎么使用 js 动态生成海报？

- 网络
1. websocket
2. ajax、axios、fetch有什么区别？

- react

1. react use hooks 常用的 hooks

useState
const [todos, setTodos] = useState(createInitialTodos());
const [todos, setTodos] = useState(createInitialTodos);

useEffect 的依赖项里类数组根据什么来判断有没有值变化

【x】2. 实现一个 useInterval 函数/useCountDown 函数

3. React 项目时为什么要在列表组件中写 key?
   react diff 原理？

4. react 高效渲染

5. react自己封装的组件

6. AST语法树

7. React 原理延伸至优化策略


#
- 前端性能优化：
？按需加载的优化，降低初次加载的代码下载大小

#
- web3.js 

#
- typescript

1. type 和 interface区别
2. TypeScript 中 ?.、??、!、!.、_、** 等符号的含义
3. 简述工具类型 Exclude、Omit、Merge、Intersection、Overwrite的作用。

```
   type Pick<T, K extends keyof T> = {
   [P in K]: T[P];
   };
   type Exclude<T, U> = T extends U ? never : T;
   type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```




<!-- array map -->