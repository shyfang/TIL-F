# ... rest 和 spread

- rest: 从参数列表中获取数组，[rest 参数必须放到参数列表的末尾]

``` javascript
function f(...args) {}
function f(arg1, arg2, ...args) {

} // 剩余参数被放倒参数列表的末尾 args = [...]
```

- arguments变量 类数组
``` javascript
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // 它是可遍历的
  // for(let arg of arguments) {console.log(arg)};

  // ！！！！箭头函数没有自身this 也没有特殊的argument对象
}
```

---
- spread:把数组展开为列表

``` javascript
let arr = [3, 5, 1]
Math.max(3, 5, 1)
Math.max(...arr) //spread 语法把数组转换为参数列表


// 转为数组
// Hello -》[H,e,l,l,o]
let str = "Hello"
const res1 = [...str]
const res3 = Array.from(str)
const res2 = str.split("")
```

- 总结

  若 ... 出现在函数参数列表的最后，那么它就是 rest 参数，它会把参数列表中剩余的参数收集到一个数组中。
  若 ... 出现在函数调用或类似的表达式中，那它就是 spread 语法，它会把一个数组展开为列表。

---