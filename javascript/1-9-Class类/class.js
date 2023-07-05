// -----------------------------------------------class-------------------------------------------------------------------
class MyClasss{
  constructor(){}
  // methods1()
  // methods2()
  // methods3()
}


// new MyClass()来创建具有所有方法的新对象 
// new会自动调用constructor()方法，可在contructor初始化对象

class User{
  constructor(name){
    this.name = name
  }
  sayHi(){
    console.log(this.name)
  }
}
// -----------------------------------------------new-------------------------------------------------------------------
let user = new User("john") // 一个新对象被创建 // constructor使用给定的参数name运行，并将其赋值给this.name
user.sayHi()

// 什么是class
console.log(typeof User); // function
// 1. 创建名为User的函数, 该函数成为类声明的【结果】。该函数的代码来自于 constructor 方法
// 2. 存储类的方法 User.prototype中的sayHi

console.log(User === User.prototype.contructor);// User是contructor方法
console.log(User.prototype.sayHi); // 方法在User.prototype
console.log(Object.getOwnPropertyNames(User.prototype));  // constructor, sayHi

function User1(name) {
  this.name = name
}

User1.prototype.sayHi = function(){
  console.log(this.name);
}

let user1 = new User1("John")
user1.sayHi()

for (const key in User) {
  console.log(key);
  if (Object.hasOwnProperty.call(user1, key)) {
    const element = user1[key];
    console.log("1", element);
  }
}


// 构造函数 和 class类的区别
// 1通过 class 创建的函数具有特殊的内部属性标记 [[IsClassConstructor]]: true，与普通函数不同，必须使用new来调用它
// 2！！！？类方法不可枚举 类定义将prototype中的所有方法的enumerable标志为false

// 用纯函数重写 class User
// // 1. 创建构造器函数
// function User(name) {
//   this.name = name;
// }
// // 函数的原型（prototype）默认具有 "constructor" 属性，
// // 所以，我们不需要创建它
// // 2. 将方法添加到原型
// User.prototype.sayHi = function() {
//   alert(this.name);
// };
// // 用法：
// let user1 = new User("John");
// user.sayHi();

// “类字段”是一种允许添加任何属性的语法
class UserN {
  name = "John"
}


// 使用类字段制作绑定方法
// 如果一个对象方法被传递到某处，或者在另一个上下文被调用，则this将不再是对其对象的引用？？
class Button {
  constructor(value) {
    this.value = value;
  }

  // click = () => {
  //   console.log(this.value);
  // }
  click() {
    // console.log(this.value);
  }
}

let button = new Button("hello===");
setTimeout(button.click, 1000);


class Button1 {
  constructor(value) {
    this.value = value;
  }

  click = () => {
    // console.log(this.value);
  }
}

let button1 = new Button("hello===");
setTimeout(button1.click, 1000);
// click (){
//   console.log(this.value);
// }
// setTimeout(() => button.click(), 1000);


// -----------------------------------------------类继承-------------------------------------------------------------------
class Animal {
  constructor(name){
    this.speed = 0
    this.name = name
  }

  run(speed) {
    this.speed  = speed
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }

  stop(){
    this.speed = 0
    console.log(`${this.name} stands still`);
  }
}

class Rabbit extends Animal {
  hide(){
    console.log(`${this.name} hides!`);
  }
}
console.log("Rabbit.prototype.[[prototype]] === Animal.prototype",Rabbit.prototype.__proto__ === Animal.prototype);


// -----------------------------------------------super-------------------------------------------------------------------
// super.method(...)调用父类的方法
// super(...) 调用父类的contructor 只能在我们的contructor中调用

// class Rabbit extends Animal {
  // constructor(...args){
    // 继承类的 constructor 必须调用 super(...) 一定在使用this之前调用
    // super(...args)
    // this.speed = 0
  // }
// }


// demo
// 继承类的构造函数与其他函数区别：派生构造器具有特殊的内部属性 [[ConstructorKind]]:"derived"。该标签会影响它的 new 行为：
// 当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this。 new F()
// 但是当继承的 constructor 执行时，它不会执行此操作。它期望父类的 constructor 来完成这项工作。
// 因此，派生的 constructor 必须调用 super 才能执行其父类（base）的 constructor，否则 this 指向的那个对象将不会被创建。并且我们会收到一个报错。


// 重写类字段
class Rabbit1 extends Animal {
  constructor(...args){
    // 继承类的 constructor 必须调用 super(...)
    // super(...args)
    // this.speed = 0
  }
}
// 如果没有constructor 会默认生成一个constructor(...args) { super(...args) }
// 继承类的 constructor 必须调用 super(...)，并且 (!) 一定要在使用 this 之前调用。该标签会影响它的 new 行为：
// 当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this。
// 但是当继承的 constructor 执行时，它不会执行此操作。它期望父类的 constructor 来完成这项工作。
// 因此，派生的 constructor 必须调用 super 才能执行其父类（base）的 constructor，否则 this 指向的那个对象将不会被创建。并且我们会收到一个报错。



// 内部接口和外部接口
// 1 受保护字段：通常以_作为前缀（不应该从外部访问此类型的属性和方法）
// 2 私有字段：私有属性和方法应该以 # 开头。


// 当父类构造器在派生的类中被调用,他会是使用被重写的方法
// 但 字段类，父类构造器总是使用父类的字段。？why

// 答：字段初始化顺序不同
// 对于基类（还未继承任何东西的那种），在构造函数调用前初始化。
// 对于派生类，在 super() 后立刻初始化。

class Animal2 {
  name = "animal"
  constructor(){
    console.log("this.name", this.name);
    this.showName()
  }

  // showName () {
  //   console.log("showName----Animal", "animal");
  // }
}
class Rabbit2 extends Animal2 {
  name = "rabbit"
  // showName () {
  //   console.log("showName----Rabbit", "rabbit");
  // }
}

// new Animal2()
// new Rabbit2()
console.log(new Animal2());
console.log(new Rabbit2());


// -----------------------------------------------[[HomeObject]]-------------------------------------------------------------------
// 当一个函数被定义为类或者对象方法时，它的 [[HomeObject]] 属性就成为了该对象。
// super使用它来解析（resolve）父原型及其方法。




