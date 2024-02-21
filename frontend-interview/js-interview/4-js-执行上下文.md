# 4 执行上下文
JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行【一段代码】的时候，会进行一个“准备工作”
  变量提升、函数提升

- 4.1 执行上下文
  可执行代码（全局代码、函数代码、eval代码）
  执行上下文到对包含什么？
  执行上下文 Execution Context:变量对象Variable object(VO)、作用域链（Scope chain）、this

- 4.2 执行上下文栈 （Execution context stack-ECStack）
  // 当执行一个函数的时候，就会创建一个执行上下文，并压入执行上下文栈
  // 执行完毕 从栈中探弹出
  
  ```
    // ECStack = []
    
    // Step1:JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文-globalContext
    ECStack = [
      globalContext
    ];

    // Step2: 当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出

    // fun1()
    ECStack.push(<fun1> functionContext);

    // fun1中竟然调用了fun2，还要创建fun2的执行上下文
    ECStack.push(<fun2> functionContext);

    // fun2还调用了fun3！
    ECStack.push(<fun3> functionContext);

    // fun3执行完毕
    ECStack.pop();

    // fun2执行完毕
    ECStack.pop();

    // fun1执行完毕
    ECStack.pop();

    // javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
  ```







- 4.3 执行上下文-3个重要属性
变量对象Variable object(VO)、作用域链（Scope chain）、this
[执行上下文](../js深入/执行上下文.js)
  - 4.3.1 VO：变量对象 \ AO

  - 4.3.2 作用域链（Scope chain）

  - 4.3.3 this  
    ```javascript
      var scope = "global scope";
      function checkscope(){
          var scope = "local scope";
          function f(){
              return scope;
          }
          return f();
      }
      checkscope();
    ```
    具体分析执行过程：
      1.执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈
        ECStack = [globalContext]

      2.全局上下文初始化
        globalContext = {
          VO: [global],
          Scope: [globalContext.VO],
          this: globalContext.VO
        }

      2.初始化的同时，checkscope 函数被创建，保存作用域链到函数的内部属性[[scope]]
          checkscope.[[scope]] = [
            globalContext.VO
          ];

      3.执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈
          ECStack = [
            checkscopeContext,
            globalContext
          ];

      4.checkscope 函数执行上下文初始化：
      复制函数 [[scope]] 属性创建作用域链，
      用 arguments 创建活动对象，
      初始化活动对象，即加入形参、函数声明、变量声明，
      将活动对象压入 checkscope 作用域链顶端。
      同时 f 函数被创建，保存作用域链到 f 函数的内部属性[[scope]] 
        checkscopeContext = {
          AO: {
            arguments: {
              length: 0
            },
            scope: undefined,
            f: function
          }
          Scope: [AO, globalContext.VO]
        }

        f.[[scope]] = [checkscopeContext.AO, globalContext.VO]


      5.执行 f 函数，创建 f 函数执行上下文，f 函数执行上下文被压入执行上下文栈
        ECStack = [
            fContext,
            checkscopeContext,
            globalContext
        ];

      6.f 函数执行上下文初始化, 以下跟第 4 步相同：
      复制函数 [[scope]] 属性创建作用域链
      用 arguments 创建活动对象
      初始化活动对象，即加入形参、函数声明、变量声明
      将活动对象压入 f 作用域链顶端
      fContext = {
        AO: {
          arguments: {
            length: 0
          },
        }
        Scope: [AO, checkscopeContext.AO, globalContext.VO]
      }

      7.f 函数执行，沿着作用域链查找 scope 值，返回 scope 值


      8.f 函数执行完毕，f 函数上下文从执行上下文栈中弹出
        ECStack = [
            checkscopeContext,
            globalContext
        ];

      9.checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
        ECStack = [
          globalContext
        ];


    ```JavaScript
      var b = 10;
      (function b(){
      b = 20;
      console.log(b);
      })();
    ```

    ```javascript
      var nAdd;
      var t = function() {
          var n = 99;
          nAdd = function() {
            n++;
          }
          var t2 = function() {
            console.log(n)
          }
          return t2;
      };

      var a1 = t();
      var a2 = t();

      nAdd();

      a1(); //99
      a2(); //100
    ```

- 4.4 this
  [阮一峰this](https://www.ruanyifeng.com/blog/2018/06/javascript-this.html)
  this指的是函数运行时所在的环境
  ```javascript
    var id = 'GLOBAL'; 

    var obj = {
      id: 'OBJ', 
      a: function(){ console.log(this.id); },
      b: () => { console.log(this.id); }
    };

    var obj2 = {
      Id: 'obj2',
      obj: obj
    }

    obj2.obj.a();

    var d = obj2.obj.a

    obj.b();

    d();
  ```
  ![this指向](image-1.png)