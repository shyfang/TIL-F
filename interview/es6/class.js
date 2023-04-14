// 传统写法
function Point(x, y){
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function(){
  return '(' + this.x + ', ' + this.y + ')'; 
}
// class 定义类

// ES6
class Point1{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  toString(){
    return '(' + this.x + ', ' + this.y + ')'; 
  }
}

console.log(typeof Point1);
Point1 === Point.prototype.constructor

// 1. 类的数据类型 本身是函数，类本身指向构造函数
// 2. 类的所有方法 都定义在类的prototype属性上边
// 3. 在类的实例上边调用方法，实际上调用的是原型的方法

// 一次向类添加多个方法
Object.assign(Point.prototype, {
  // toString(){},
  // toValue(){}
});


// 一个类必须有一个constructor方法 
class Foo{
  constructor(){
    // 默认返回实例对象即this
    // return Object.create(null) // 实例对象被指向另外一个对象
  }
}

const foo1 = new Foo()
console.log(foo1 instanceof Foo);

// class 
// 所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性 
    
class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
// console.log(foo);



// 静态方法 通过new不会被子类继承 可以通过extends被继承
// 方法前 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用
// 静态方法包含this this指向类 而不是实例

class Foo{
  static bar(){
    this.baz() //this指的是Foo类 而不是Foo的实例 等同于调用Foo.baz
  }
  static baz(){
    console.log('Foo 类的方法');
  }
  baz(){
    console.log('类的原型上的方法');
  }
}



class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod()


// 静态属性class.propName，定义在类本省 而不是实例对象上



// this


// super
// super() 代表调用父类的构造函数
