[call/apply原理](https://github.com/sisterAn/JavaScript-Algorithms/issues/78)
[bind](https://github.com/sisterAn/JavaScript-Algorithms/issues/81)

- this 函数运行时所在的环境
```
  在默认情况下，函数的 this 值指向全局对象（在浏览器中是 window 对象）
  在对象的方法中，this 值通常指向调用该方法的对象。
  如果在函数中使用了 new 关键字，则 this 值指向新创建的对象。
  此外，如果在函数中使用了 call、apply 或 bind 方法，则 this 值将被显式地绑定到指定的对象上。
```

- 6.1 call
  - 6.1.1 call原理
  ```JavaScript
    func.call(context, arg1, arg2, ...)
    // 用给定的上下文和参数 调用 func
    // 第一个参数作为 this,后面的作为参数
    // call 主要实现了以下两个功能：call 改变了 this 的指向,bottle 执行了 sayWord 函数(1)改变了 this 的指向，指向到 obj (2)fn 函数执行了。

    // demo
    function sayWord() {
      var talk = [this.name, 'say', this.word].join(' ');
      console.log(talk);
    }

    var bottle = {
      name: 'bottle', 
      word: 'hello'
    };

    // 使用 call 将 bottle 传递为 sayWord 的 this
    sayWord.call(bottle); 
    // bottle say hello
  ```

  - 6.1.2 模拟实现call
    模拟实现 call 有三步：
      将函数设置为对象的属性
      执行函数
      删除对象的这个属性
  ```JavaScript
    Function.prototype.myCall = function(context, ...args) {
      // 如果没有传递上下文，则使用全局对象
      context = context || window;

      // 将当前函数作为对象的一个属性
      context.fn = this;

      // 调用该属性，并传递参数
      const result = context.fn(...args);

      // 删除该属性
      delete context.fn;

      // 返回结果
      return result;
    };
  ```

  - 6.1.2 应用
    方法借用（method borrowing） 的例子，就是我们从一个对象中获取一个方法，并在另一个对象的上下文中“调用”它。采用数组方法并将它们应用于参数 arguments 是很常见的。
    Array.prototype.slice.call()
      ```JavaScript
        var arrayLike = {
            0: 'name',
            1: 'age',
            2: 'sex',
            length: 3
        }
        // 1. 读写
        // 2. 长度 .length
        // 3. 遍历 for(let i=0, i++, i<arr.length){}
        // 4. 调用数组方法？!!!不可以直接调用 call间接调用
        Array.prototype.slice.call(arrayLike, 0)
        Array.prototype.join.call(arrayLike , "&")
        Array.prototype.map.call(arrayLike, function(item){
          return item
        })

        // 5. 类数组转数组
        Array.prototype.slice.call(arrayLike)
        Array.prototype.splice.call(arrayLike, 0)
        Array.from(arrayLike)
        Array.prototype.concat.apply([], arrayLike)

        // ？使用 Rest 参数对象，该对象是一个真正的数组。
      ```


- 6.2 apply
  - 6.2.1 定义
    ```JavaScript
      func.apply(context, args);
      // apply() 方法调用一个具有给定 this 值的函数，以及作为一个数组（或[类似数组对象）提供的参数。
      // 第一个参数作为 this, 参数只接受类数组
      // 调用 func 将context作为this 和 类数组的args 传递给参数列表。
    ```

  - 6.2.2 应用

  - 6.2.2 自定义实现apply
    ```JavaScript
      Function.prototype.myApply = function(context, args) {
          // 如果没有传递上下文，则使用全局对象
          context = context || window;

          // 将当前函数作为对象的一个属性
          context.fn = this;

          // 调用该属性，并传递参数
          const result = context.fn(...args);

          // 删除该属性
          delete context.fn;

          // 返回结果
          return result;
        };
    ```


- 6.3 bind
  - 6.3.1 定义
    ```JavaScript
      let boundFunc = func.bind(context);
      

      //部分应用 
      let bound = func.bind(context, [arg1], [arg2], ...);
    ```


  - 6.3.2 应用
    ```javascript
    // 部分绑定

    ```
    通过上述代码可以看出 bind 有如下特性：
    1、指定 this
    2、传入参数
    3、返回一个函数
    4、柯里化

  - 6.3.3 自定义实现bind
    ```javascript
      Function.prototype.myBind = function (context) {
        // 判断调用对象是否为函数
        if (typeof this !== "function") {
          throw new Error("Type error");
        }
        // 获取参数
        // const args = Array.prototype.slice.call(arguments, 1)
        const args = [...arguments].slice(1),
        const fn = this;
        return function Fn() {
          return fn.apply(
            // 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
            this instanceof Fn ? this : context,
            // 当前的这个 arguments 是指 Fn 的参数
            args.concat(...arguments)
          );
        };
      };
    ```

    ```javascript
      let value = 2;
      let foo = {
          value: 1
      };
      function bar(name, age) {
          this.habit = 'shopping';
          console.log(this.value);
          console.log(name);
          console.log(age);
      }
      bar.prototype.friend = 'kevin';

      let bindFoo = bar.bind(foo, 'Jack');
      let obj = new bindFoo(20); // bind绑定的this foo无效
      // undefined
      // Jack
      // 20

      obj.habit;
      // shopping

      obj.friend;
      // kevin
    ```



- 6.4 防抖、节流、柯里化等手写函数 使用this绑定
  - 6.4.1 柯里化
  柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。
  柯里化：f(a, b, c) --> f(a)(b)(c) 【不会调用函数，只对函数进行转换】
  ```JavaScript
  // 柯里化
  // sum(1,2,3).valueOf()    // 6
  // sum(2,3)(2).valueOf()  // 7
  // sum(1)(2)(3)(4).valueOf() // 10
  // sum(2)(4, 1)(2).valueOf() // 9

  function sum() {
    let allArgs = [...arguments]
    function fn() {
      allArgs = [...args, ...arguments]
      return fn
    }
    fn.valueOf = function () {
      if(!allArgs.length) return
      return allArgs.reduce((sum, cur) => sum + cur, 0)
    }
    return fn
  }


  function sum1(a, b) {
    return a + b
  }

  function curry(func) {
    return function (a) {
      return function (b) {
        return func(a, b)
      }
    }
  }
  // const currySum = curry(sum1)
  // currySum(1)(2)

  // 高级柯里化实现
  function perCurry(func) {
    return function curried(...args){
      if(args.length >= func.length){
        return func.apply(this, args)
      } else {
        return function (...args2){
          return curried.apply(this, args.concat(args2))
        }
      }
    }
  }

  const currySum = perCurry(sum)
  console.log(currySum(2)(3));
  ```

