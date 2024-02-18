//** this */
// function makeUser() {
//   return {
//     firstName: 'John',
//     ref: this,
//   }
// }

// let user = makeUser()
// console.log(user.ref.firstName)

// function makeUser1() {
//   return {
//     name: 'John',
//     ref() {
//       return this
//     },
//   }
// }

// let user1 = makeUser1()
// console.log(user1.ref().name)

// let user = {
//   firstName: 'John',
//   sayHi() {
//     console.log(`Hello, ${this.firstName}!`)
//   },
// }
// setTimeout(user.sayHi, 1000)

// let animal1 = {
//   walk() {
//     if (!this.isSleeping) {
//       console.log(`I walk`)
//     }
//   },
//   sleep() {
//     this.isSleeping = true
//   },
// }

// let rabbit1 = {
//   name: 'White Rabbit',
//   __proto__: animal1,
// }

// // 修改 rabbit.isSleeping
// rabbit1.sleep()

// console.log(rabbit1.isSleeping) // true
// console.log(animal1.isSleeping) // undefined（原型中没有此属性）

// 2. 事件循环
// demo1
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
new Promise((resolve) => {
  console.log('new Promise')
  resolve()
}).then(() => {
  console.log('then')
})
console.log(3)

// demo2
async function fn1() {
  console.log(1)
  await fn2()
  console.log(2) // 阻塞
}

async function fn2() {
  console.log('fn2')
}

fn1()
console.log(3)

// demo3
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('settimeout')
})

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})

console.log('script end')















// script start , async1 start, async2, promise1, script end, async1 end, promise2, settimeout
