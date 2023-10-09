// call 
// foo
const foo = {
  value: 1
}
function bar() {
  console.log(this.value);
}
bar.call(foo)

// const foo1 = {
//   value: 1,
//   bar: function(){
//     console.log(this.value);
//   }
// }
Function.prototype.call2 = function(context) {
  // 调用bar的函数 用this获取 context新增函数fn
  context.fn = this
  // 执行fn
  context.fn()
  // 删除fn
  delete context.fn
}

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}
// bar.call(foo, "Kevin", 20)
Function.prototype.call3 = function(context, ...args) {
  // 调用bar的函数 用this获取 context新增函数fn
  context.fn = this
  // 执行fn
  context.fn(...args)
  // 删除fn
  delete context.fn
}
bar.call3(foo, "Kevin", 20)


// bar.call(null)
Function.prototype.myCall = function (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
      args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args +')');

  delete context.fn
  return result;
}




// ---------------------------------------------------
// bar.apply(foo, ["Kevin", 20])
Function.prototype.myApply = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
      result = context.fn();
  }
  else {
      var args = [];
      for (var i = 0, len = arr.length; i < len; i++) {
          args.push('arr[' + i + ']');
      }
      result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}


// ---------------------------------------------------
// bind : bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数.
// bar.bind(foo, "Kevin", 20)
// var bindFoo = bar.bind(foo, 'daisy');
// bindFoo('18');
Function.prototype.bind2 = function (context) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1)
  return function () {
      const bindArgs = Array.prototype.slice.call(arguments)
      return self.apply(context, args.concat(bindArgs));
      // return 考虑到绑定函数可能是有返回值的
  }
}

Function.prototype.bind3 = function (context) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1)
  const fNOP = function(){}
  const fBound = function () {
      const bindArgs = Array.prototype.slice.call(arguments)
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
      // return 考虑到绑定函数可能是有返回值的
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

// 难点：一个bind函数 可以用new操作符创建对象
var value = 2;

function bar(name, age) {
    this.habit = 'shopping';
    console.log("this.value", this.value);
    console.log("name", name);
    console.log("age", age);
}
bar.prototype.friend = 'kevin';
var bindFoo = bar.bind3(foo, 'daisy');
var obj = new bindFoo('18');
console.log("bar_obj", obj);



// ?new操作符
function myNew1(){
  let obj = new Object()
  const Constructor =  [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  const res = Constructor.apply(obj, arguments)
  return typeof res === "object" ? res : obj
}

function Otaku (name, age) {
  this.strength = 60;
  this.age = age;

  return {
    name: name,
    habit: 'Games'
  }
}
const objnew = myNew1(Otaku, "Kevin", 18)
console.log("obj___", objnew);


// -----------------------------------------
// arguments
function fooFunc(name, age, sex) {
  console.log(arguments.callee);
}
fooFunc('name', 'age', 'sex')

// 应用callee解决闭包问题
