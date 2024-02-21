// function sum(a, b) {
//   return a + b
// }

// function perCurry(func) {
//   return function curried(...args) {
//     // 如果curried参数个数 === sum 入参个数，则执行sum
//     if (args.length >= func.length) {
//       // ?为什么用this
//       return func.apply(this, args)
//     } else {
//       return function (...args2) {
//         return curried.apply(this, args.concat(args2))
//       }
//     }
//   }
// }

// const currySum = perCurry(sum)
// console.log(currySum(2)(3));


// setTimeout(function () {
//   console.log("1");
// }, 0);
// async function async1() {
//   console.log("2");
//   const data = await async2();
//   console.log("3");
//   return data;
// }
// async function async2() {
//   return new Promise((resolve) => {
//     console.log("4");
//     resolve("async2的结果");
//   }).then((data) => {
//     console.log("5");
//     return data;
//   });
// }
// async1().then((data) => {
//   console.log("6");
//   console.log(data);
// });
// new Promise(function (resolve) {
//   console.log("7");
//   //   resolve()
// }).then(function () {
//   console.log("8");
// });


function Parent () {
  this.names = ['kevin', 'daisy'];
}

function Child () {

}

Child.prototype = new Parent();

var parent1 = new Parent()
var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]

console.log(parent1.names);