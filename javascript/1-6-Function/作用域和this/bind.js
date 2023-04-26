// 函数绑定

// example1 this丢失
let user = {
  firstName: "John",
  sayHi() {
    console.log(`Hello, ${this.firstName}`);
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






