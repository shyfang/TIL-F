// 原型链继承
// 原型链继承：使用Child.prototype = new Parent()来实现继承，子类的原型继承自父类的实例。但这种方式存在引用类型的问题，即所有子类实例共享一个父类实例中的属性和方法。
function Parent(){
  this.name = "Kevin"
}
Parent.prototype.getName = function (){
  console.log(this.name);
}

function Child(){

}

Child.prototype = new Parent()
const child1 = new Child()
child1.getName()
// 缺点，1. 引用类型，属性被共享； 2.不能传参

// 2. 构造函数继承
// 构造函数继承：使用Parent.call(this)来实现继承，子类的实例属性和方法继承自父类的实例属性和方法。但这种方式无法继承父类原型上的属性和方法。
function Parent2(name){
  this.names = ["Kevin", "Daisy"]
  this.name = name
}
function Child2(name){
  Parent2.call(this, name)
}
const child2 = new Child2()
child2.names.push("Nnn")
console.log(child2.names);

const child2_1 = new Child2()


// 3. 组合继承
// 组合继承：结合原型链继承和构造函数继承，既能继承父类原型上的属性和方法，又能继承父类实例上的属性和方法。但这种方式存在父类构造函数被调用两次的问题，导致子类实例中存在重复的属性和方法。
function Animal(name) {
  this.name = name
}
Animal.prototype.getName = function(){
  console.log(this.name);
}
function Dog(name, age){
  Animal.call(this, name)
  this.age = age
}

Dog.prototype = new Animal()
Dog.prototype.constructor = Dog

Dog.prototype.bark = function () {
  console.log( 'name:' + this.name +',year:' + this.age);
}

const dog1 = new Dog("Buddy", 2)

dog1.bark()

// 4. 原型式继承
function createObj(o) {
  function F(){}
  F.prototype = o
  return  new F()
}

// 5. 寄生式继承(缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。)
function createObj5(o){
  const clone = Object.create(o)
  clone.sayName = function (){
    console.log(this.name);
  }
  return clone
}

// !!! 寄生组合式继承
// 寄生组合式继承：结合组合继承和寄生式继承，通过一个inherits()函数来封装创建子类原型的过程，从而实现继承。这种方式避免了组合继承中父类构造函数被调用两次的问题，同时也避免了寄生式继承中无法做到函数复用的问题。
function inherits(Child, Parent) {
  function F() {}
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
}

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

inherits(Child, Parent);

var child6 = new Child('kevin', '18');
child6.colors.push('black');

var child6_1 = new Child('daisy', '20');

console.log(child6.name); // 输出 "kevin"
console.log(child6.age); // 输出 "18"
console.log(child6.colors); // 输出 ["red", "blue", "green", "black"]
console.log(child6_1.name); // 输出 "daisy"
console.log(child6_1.age); // 输出 "20"
console.log(child6_1.colors); // 输出 ["red", "blue", "green"]




// 寄生组合式继承
function Person(name) {
  this.name =  name
  this.color = ['red', 'blue']
}
Person.prototype.sayName = function () { console.log(this.name) }
function Child(name, age) {
  Person.call(this, name) // 继承属性
  this.age = age
}

Child.prototype = Object.create(Person.prototype) // 原型式继承
Child.prototype.constructor = Child // 指定构造函数

/**
 * Object.create 源码
 * @param o
 */
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}