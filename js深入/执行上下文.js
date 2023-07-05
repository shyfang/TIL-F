//执行上下文 Execution Context:变量对象Variable object(VO)、作用域链（Scope chain）、this

// 当执行一个函数的时候，就会创建一个执行上下文，并压入执行上下文栈
// 执行完毕 从栈中探弹出



// 可执行代码executable code
// 全局代码 函数代码 eval代码

// 执行上下文栈 ECS
// ECStack = [];
// ECStack = [
//   globalContext
// ];

// 当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈
function fun3() {
  console.log('fun3')
}

function fun2() {
  fun3();
}

function fun1() {
  fun2();
}

fun1();


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();



// 执行上下文-3个重要属性
// 变量对象Variable object(VO)、作用域链（Scope chain）、this

// -----------------------------------------------VO：变量对象 \ AO-------------------------------------------------------------------

// VO：变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。
// 全局上下文:全局上下文中的变量对象就是全局对象
// 函数上下文：Activation object (AO)-只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);

// 执行过程: 分析-进入执行上下文， 执行-代码执行

// 1. 全局上下文的变量对象初始化是全局对象

// 2. 函数上下文的变量对象初始化只包括 Arguments 对象
// AO = {
//   arguments: {
//       length: 0
//   }
// }

// 3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
// AO = {
//   arguments: {
//       0: 1,
//       length: 1
//   },
//   a: 1,
//   b: undefined,
//   c: reference to function c(){},
//   d: undefined
// }

// 4. 在代码执行阶段，会再次修改变量对象的属性值
// AO = {
//   arguments: {
//       0: 1,
//       length: 1
//   },
//   a: 1,
//   b: 3,
//   c: reference to function c(){},
//   d: reference to FunctionExpression "d"
// }



// -----------------------------------------------作用域链 Scope Chain-------------------------------------------------------------------
// 当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。
// 这样由【多个执行上下文的变量对象】构成的【链表】就叫做【作用域链】。

// 函数创建 和 函数激活 作用域链如何创建和变化
// 函数创建
// 函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链
function foo() {
  function bar() {
      
  }
}
// 函数创建时，各自的[[scope]]为：
// foo.[[scope]] = [
// globalContext.VO
// ];
// bar.[[scope]] = [
//   fooContext.AO,
//   globalContext.VO
// ];

// 函数激活
// 当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。
// Scope = [AO].concat([[scope]])


// ---------
// 举例说明：
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
// 执行过程
// 1. 创建checkscope.[[scope]] = [GlobalContext.VO]
// 2. ECStack = [checkscopeContext, globalContext]
// 3.准备工作 复制函数[[scope]]属性创建作用域链
// checkscopeContext = {
//  Scope: checkscope.[[scope]] 
// }

// 4. AO:用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明
// checkscopeContext ={
//   AO: {
//     arguments: {
//       length: 0
//     },
//     scope2: undefined
//   },
//   Scope: checkscope.[[scope]]
// }

// 5.第三步：将活动对象压入 checkscope 作用域链顶端
// checkscopeContext ={
//   AO: {
//     arguments: {
//       length: 0
//     },
//     scope2: undefined
//   },
//   Scope: [AO, checkscope.[[scope]]]
// }

// 6.准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值
// checkscopeContext ={
//   AO: {
//     arguments: {
//       length: 0
//     },
//     scope2: "local scope"
//   },
//   Scope: [AO, checkscope.[[scope]]]
// }

// 7.查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
// ECStack = [
//   globalContext
// ];



// -----------------------------------------------作用域链 Scope Chain-------------------------------------------------------------------
// I don't care
// Reference

// consists of three components: base value\referenced name\strict reference
// base value: base value 就是属性所在的对象或者就是 EnvironmentRecord
// referenced name: 属性的名称


// GetBase:返回 reference 的 base value。
// IsPropertyReference:如果 base value 是一个对象，就返回true。
// GetValue:调用 GetValue，返回的将是具体的值，而不再是一个 Reference


// 如何确定this值
// Function函数调用,如何确定this的取值
// 计算 MemberExpression 的结果赋值给 ref
// 2.判断 ref 是不是一个 Reference 类型
// 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
// .2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)
// 2.3 如果 ref 不是 Reference，那么 this 的值为 undefined

// MemberExpression:所以简单理解 MemberExpression 其实就是()左边的部分。
// 


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();




var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();


// 闭包

