// -----------------------------------------------静态属性和静态方法-------------------------------------------------------------------
// static 静态方法被用于实现属于整个类的功能。它与具体的类实例无关。
// !!!静态方法不适用于单个对象 静态方法可以在类上调用，而不是在单个对象上。
class MyClass {
  static property = '...';

  static method() {
    // ...
  }
}
class Article {
  constructor(title, date) {
    this.title = title
    this.date = date
  }
  static compare(articleA, articleB ){
    return articleA.date - articleB.date
  }

  static createTodays() {
    // 记住 this = Article
    return new this("Today's digest", new Date());
  }
}

// 静态属性和方法是可被继承的。
// Rabbit 函数原型继承自 Animal 函数。
// Rabbit.prototype 原型继承自 Animal.prototype


// “extends” 语法会设置两个原型：
// 在构造函数的 "prototype" 之间设置原型（为了获取实例方法）。
// 在构造函数之间会设置原型（为了获取静态方法）

class Animal{
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

console.log("Animal", Object.getOwnPropertyNames(Animal),  Animal.length, Object.getOwnPropertyNames(Animal.prototype));
console.log(Rabbit.__proto__ === Animal);
console.log(Rabbit.prototype.__proto__ === Animal.prototype);

// Rabbit 函数原型继承自 Animal 函数。
// Rabbit.prototype 原型继承自 Animal.prototype。


// 静态方法等同于直接给类本身赋值
// MyClass.property = ...
// MyClass.method = ...


// -----------------------------------------------受保护的属性和方法-------------------------------------------------------------------
// 受保护的属性通常以下划线 _ 作为前缀
// 受保护的字段 是自然可被继承的
class coffeeMachine {
  _waterAmount = 0
  
  constructor(power){
    this._power = power
  }
  // getter setter
  // get power() {
  //   return this._power
  // }
  getPower(){
    return this._power
  }
}


// -----------------------------------------------私有的属性和方法-------------------------------------------------------------------
// #私有的 私有属性和方法应该以 # 开头。它们只在类的内部可被访问
class CoffeeMachine1 {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine1();

machine.waterAmount = 100;
// console.log(machine.#waterAmount); // Err


// -----------------------------------------------扩展内建类-------------------------------------------------------------------
class PowerArray extends Array {
  isEmpty(){
    return this.length === 0
  }

  static get [Symbol.species]() {
    return Array
  }
}

let arr = new PowerArray(1,2,3)
let filterArray = arr.filter(item => item > 2)
console.log(filterArray);
console.log(arr.constructor === PowerArray);
// console.log(arr.__proto__ === PowerArray.prototype);