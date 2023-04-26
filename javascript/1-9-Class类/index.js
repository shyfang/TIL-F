// class
class MyClasss{
  constructor(){}
  // methods1()
  // methods2()
  // methods3()
}


// new MyClass()来创建具有所有方法的新对象 new会自动调用constructor()方法，可在constructor初始化对象
class User{
  constructor(name){
    this.name = name
  }
  sayHi(){
    console.log(this.name)
  }
}

let user = new User("john")
user.sayHi()


// 什么是class
console.log(typeof User);
// 1. 创建名为User的函数
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
// 1 通过 class 创建的函数具有特殊的内部属性标记 [[IsClassConstructor]]: true，与普通函数不同，必须使用new来调用它
// 2 类方法不可枚举 类定义将prototype中的所有方法的enumerable标志为false


/**------------------类继承------------------ */
// super
class Rabbit extends Animal {
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