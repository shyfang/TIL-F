// class
class MyClasss{
  constructor(){}
  // methods1()
  // methods2()
  // methods3()
}


// new MyClass()来创建具有所有方法的新对象 new会自动调用constructor()方法，可在contructor初始化对象
class User{
  constructor(name){
    this.name = name
  }
  sayHi(){
    console.log(this.name)
  }
}

let user = new User("john") // 一个新对象被创建 // constructor使用给定的参数name运行，并将其赋值给this.name
user.sayHi()


// 什么是class
console.log(typeof User);
// 1. 创建名为User的函数, 该函数的代码来自于 constructor 方法
// 2. 存储类的方法 User.prototype中的sayHi

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


class Button {
  constructor(value) {
    this.value = value;
  }

  click = () => {
    console.log(this.value);
  } // setTimeout(button.click, 1000);
  // click (){
  //   console.log(this.value);
  // }
}

let button = new Button("hello");
// click (){
//   console.log(this.value);
// }
setTimeout(() => button.click(), 1000); // undefined




/**------------------类继承------------------ */
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
// super

// class Rabbit extends Animal {
  // constructor(...args){
    // 继承类的 constructor 必须调用 super(...) 一定在使用this之前调用
    // super(...args)
    // this.speed = 0
  // }
// }

// 继承类的构造函数与其他函数区别：派生构造器具有特殊的内部属性 [[ConstructorKind]]:"derived"。该标签会影响它的 new 行为：

// 当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this。
// 但是当继承的 constructor 执行时，它不会执行此操作。它期望父类的 constructor 来完成这项工作。
// 因此，派生的 constructor 必须调用 super 才能执行其父类（base）的 constructor，否则 this 指向的那个对象将不会被创建。并且我们会收到一个报错。


// 重写类字段

