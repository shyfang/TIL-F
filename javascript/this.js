let user = {
  firstName: "John",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
// 等同于 
const f = user.sayHi
setTimeout(f, 1000); //Hello, undefined!
// setTimeout方法：
// 它为函数调用设定了 this=window（对于 Node.js，this 则会变为计时器（timer）对象，但在这儿并不重要）。所以对于 this.firstName，它其实试图获取的是 window.firstName，这个变量并不存在。在其他类似的情况下，通常 this 会变为 undefined。
// setTimeout调用user.sayHi时。this不是button，而是setTimeout函数本身
// setTimeout 函数会将 button.click 作为一个回调函数来调用，而在这个回调函数中，this 将会指向全局对象（浏览器中是 window 对象）或 undefined（在严格模式下）

// 解决方法1
setTimeout(() => {
  user.sayHi()
}, 1000);
// 解决方法2
setTimeout(user.sayHi.bind(user), 1000);

// 解决方法3XXXXXXX不生效
// let user1 = {
//   firstName: "Smith",
//   sayHi: () => {
//     console.log(`Hello, ${this.firstName}!`);
//   }
// }
// setTimeout(user1.sayHi, 1000); // Hello, undefined!

class User{
  constructor(name) {
    this.firstName =  name
    // this.sayHi = () => {
    //   console.log(`Hello ` + this.firstName);
    // } // 解决方法1
  }
  sayHi(){
    console.log(`Hello ` + this.firstName);
  }
}
const userLily =  new User("Lily")
setTimeout(() => {
  userLily.sayHi()
}, 1000);

setTimeout(userLily.sayHi, 1000);
class User1{
  constructor(name) {
    this.firstName =  name
  }
  sayHi = () => {
    console.log(`Hello ` + this.firstName);
  }//解决方法2
}
const userJson =  new User1("Json")
setTimeout(userJson.sayHi, 1000);

// ------------------------------------------------------------------------------------------------------------------------------------------------
