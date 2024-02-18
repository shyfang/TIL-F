// this
let user = {
  firstName: 'John',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`)
  },
}
setTimeout(user.sayHi, 1000)

// 事件循环
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

//
// reg
/**
 *
 * @param {string} url  "?a=1&b=2&c=3"
 * @returns {object}  {a:1, b:2, c:3}
 */
function parseUrl(url) {
  //
}

const testparseUrl = parseUrl('?a=1&b=2&c=3')
console.log(testparseUrl)

/**
 * 千分位符号
 * @param {*} num
 * @param {*} symbol . , -
 */
function numFormat(num) {
  var res = num.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ','
    })
  })
  return res
}

function trimFormat(str) {}

// const add = (x, y) => x + y
const add = (x) => (y) => x + y
// function curryHandle(){
//   return add()
// }

var a = { n: 1 }
var b = a
a.x = a = { n: 2 } // 赋值从右到左，但是.的优先级高
console.log(a, a.x, b, b.x)
