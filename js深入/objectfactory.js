// 1. 工厂模式
function createPerson(name){
  const obj = new Object()
  obj.name = name
  obj.getName = function(){
    console.log(this.name);
    return this.name
  }
  return obj
}
// 缺点：对象无法识别，因为所有的实例都指向一个原型

// 2. 构造函数
function Person(name){
  this.name = name
  // this.getName = function(){
  //   console.log(this.name);
  //   return this.name
  // }
  this.getName = getName
}
// 缺点：每次创建实例时，构造函数都要被创建一次
// 优化
function getName(){
  console.log(this.name);
  return this.name
}

// 3. 原型方法
  function Person3(){}
  Person3.prototype.name = "Kevin"
  Person3.prototype.getName = function(){
    console.log(this.name);
  }
// 缺点1. 所有的属性和方法都共享 2. 不能初始化参数

// 3.1 原型模式优化
function Person3_1(){

}
Person3_1.prototype = {
  constuctor: Person3_1,
  name: "Kevin",
  getName: function(){
    console.log(this.name);
  }
}

// 4. 组合模式
// 构造函数 + 原型
function Person4(name){
  this.name = name
}

Person4.prototype = {
  constuctor: Person4,
  getName: function(){
    console.log(this.name);
  }
}
// 优点：该共享的共享，该私有的私有，使用最广泛的方式
// 缺点：有的人就是希望全部都写在一起，即更好的封装性

function Persion4_1(name) {
  this.name = name
  if(typeof this.getName != "function") {
    Persion4_1.prototype.getName = function(){
      console.log(this.name);
    }
  }
}
// ?为什么不能用字面量法直接覆盖原型？
// ！！！ 
function Persion4_1_1(name) {
  this.name = name
  if(typeof this.getName !== "function") {
    Persion4_1_1.prototype = {
      constuctor: Persion4_1_1,
      getName: function(){
        console.log(this.name);
      }
    }
    // 优化 
    return new Persion4_1_1(name)
  }
}

const person411 = new Persion4_1_1("Kevin")
const person412 = new Persion4_1_1("Kevin_1")

person411.getName()
person412.getName()

// 5.1 寄生构造函数模式
function Person5(name) {
  const o = new Object()
  o.name =  name
  o.getName = function getName(){
    console.log(this.name);
  }
}

// 与工厂模式相同 但是使用了new 实例化
const person5 = new Person5("Kevin") 
// !!!
console.log(person5 instanceof Person);
console.log(person5 instanceof Object);


// 5.2 稳妥构造函数模式
function Person5_2(name){
  const o = new Object()
  o.getName = function getName(){
    console.log(name); // 不用this 没有公共属性
  }
  return o
}
const person5_2 = Person5_2("Kevin")
person5_2.getName()
person5_2.name = "Daisy"
person5_2.getName()