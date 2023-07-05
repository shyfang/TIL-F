// 函数绑定

// example1 this丢失
let user = {
  firstName: "John",
  sayHi() {
    // console.log(`Hello, ${this.firstName}`);
  }
}
// this 丢失
const funcSayHi = user.sayHi
funcSayHi()
// this 丢失 丢失了user上下文
setTimeout(user.sayHi, 1000);


// 解决方案1: 包装器
setTimeout(function () {
  user.sayHi()
}, 1000);

// 解决方案1 
setTimeout(() => {
  user.sayHi()
}, 1000); // 
// 存在问题 如果user被修改user = { sayHi() { alert("Another user in setTimeout!") } }; // // Another user in setTimeout!



// 解决方案2: bind
// 基础语法：let boundFunc = func.bind(context); // this = context
let bindSayHi = user.sayHi.bind(user); // (*)
setTimeout(bindSayHi, 1000);
// 即使 user 的值在不到 1 秒内发生了改变 sayHi还是使用预先绑定的值 该值是对旧的user对象的引用

// Partial functions
// let bound = func.bind(context, [arg1], [arg2], ...);



// 自定义bind
Function.prototype.myBind = function(ctx, ...args1) {
  const fn = this;
  const boundFn = function(...args2) {
    return fn.call(
      this instanceof boundFn ? this : ctx, // new.target
      ...args1,
      ...args2
    );
  };
  boundFn.prototype = Object.create(fn.prototype);
  // Object.defineProperty(boundFn.prototype, 'constructor', {
  //   value: boundFn,
  //   writable: true,
  //   configurable: true,
  //   enumerable: false
  // });
  // Object.defineProperty(fn, 'length', {
  //   value: Math.max(fn.length - args1.length, 0),
  //   writable: false,
  //   configurable: true,
  //   enumerable: false
  // });
  // Object.defineProperty(boundFn, Symbol.hasInstance, {
  //   value: function(instance) {
  //     return instance instanceof fn ||
  //       (fn[Symbol.hasInstance] && fn[Symbol.hasInstance](instance));
  //   }
  // });
  return boundFn;
};

// demo1 constructor
function Foo() {}
const Bar = Foo.myBind();
const bar = new Bar();
// console.log('bar.constructor === Bar',bar.constructor === Foo); // true
// console.log('bar.constructor === Bar',bar.constructor === Bar); // true

// demo2 length
function add(a, b) {
  return a + b;
}
const add5 = add.myBind(null, 5);
// console.log(add5.length); // 0

// demo3
class Foo3 {}
const Bar3 = Foo.myBind();
// console.log(new Foo3() instanceof Bar); // false
// console.log(new Bar3() instanceof Foo); // true


// softbind
Function.prototype.softBind = function(ctx) {
  const fn = this;
  const curried = [].slice.call(arguments, 1);
  const bound = function(...args) {
    console.log("this-----", this);
    console.log("ctx-------", ctx);
    return fn.apply(
      !this || this === (globalThis) ? ctx : this,
      curried.concat(args)
    );
  };
  bound.prototype = Object.create(fn.prototype);
  return bound;
};


Function.prototype.myBindNew = function(ctx, ...args1) {
  const fn = this;
  const boundFn = function(...args2) {
    // console.log("this-----", this);
    // console.log("ctx-------", ctx);
    return fn.call(
      this instanceof boundFn ? this : ctx, // new.target
      ...args1,
      ...args2
    );
  };
  boundFn.prototype = Object.create(fn.prototype);
  return boundFn
}

function  add1 (b){
  return this.a + b
}
const obj = {
  a: 0
}
const obj1 = {
  a: 1
}
const obj2 = {
  a: 2
}
const obj3 = {
  a: 3
}
let bindAdd1 = add1.myBindNew(obj) // 
// bindAdd1 = bindAdd1.myBindNew(obj1)
// bindAdd1 = bindAdd1.myBindNew(obj2)
// bindAdd1 = bindAdd1.myBindNew(obj3)

// console.log(bindAdd1(3));
// let bindAdd3 = bindAdd1.myBindNew(obj3)
// console.log(bindAdd3(6));


let bindAdd2 =  add1.softBind(obj)
bindAdd2 =  bindAdd2.softBind(obj1) // 把this设定为ctx
// console.log('bindAdd2', bindAdd2);
// console.log(bindAdd2(3));
const obj00 = {
  a: 3,
  b: 4,
  c: null,
  d: undefined,
  get e() {},
  f: true,
  dd: "aa"
};

console.log(JSON.stringify(obj00));
console.log(JSON.parse("false"));
