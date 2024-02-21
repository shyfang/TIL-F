# 5.闭包
- 5.1 闭包定义
  ```
    在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。可以在一个内层函数中访问到其外层函数的作用域。
    闭包是指那些能够访问自由变量的函数。 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。 闭包 = 函数 + 函数能够访问的自由变量。
  ```
  // 闭包 闭包是指使用一个特殊的属性 [[Environment]] 来记录函数自身的创建时的环境的函数：它具体指向了函数创建时的词法环境。
  // 但是如果我们使用 new Function 创建一个函数，那么该函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。


- 5.2 闭包应用
  - 5.2.1 函数作为参数传递
    ```JavaScript
      function print(fn) {
        const a = 200;
        fn();
      }

      const a = 100;
      function fn() {
        console.log(a);
      }

      print(fn); // 100
    ```

  - 函数作为返回值被返回
    ```JavaScript
      function create() {
        const a = 100;

        return function () {
          console.log(a);
        };
      }

      const fn = create();
      const a = 200;
      fn(); // 100
      // 闭包：自由变量的查找，是在函数定义的地方，向上级作用域查找。不是在执行的地方
    ```

  - 应用实例：比如缓存工具，隐藏数据，只提供 API 。
    ```javascript
      function createCache() {
          const data = {}; // 闭包中被隐藏的数据，不被外界访问
          return {
            set: function (key, val) {
              data[key] = val;
            },
            get: function (key) {
              return data[key];
            },
          };
        }

        const c = createCache();
        c.set("a", 100);
        console.log(c.get("a")); // 100
    ```

