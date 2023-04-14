// pending fulfilled rejected
// resolve reject

// Promise构造函数 （接受一个函数作为参数）
const promise = new Promise(function (resolve, reject) {
  // resolve
  // reject
})



// 实例方法
promise
  .then((result) => {})
  .catch((error) => {})
  .finally(() => {})



// 构造函数方法
const p1 = new Promise(function (resolve, reject) {
  resolve('hello')
})
const p2 = new Promise(function (resolve, reject) {
  // throw new Error('报错了')
})
// .catch((error) => {
//   console.log(error)
// })
Promise.all([p1, p2])
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

// 请求超时问题 Promise.race()
// Promise.race([requestImg(), timeOut()])
//exg: 请求某个图片资源
function requestImg() {
  var p = new Promise(function (resolve, reject) {
    var img = new Image()
    img.onload = function () {
      resolve(img)
    }
    //img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"; 正确的
    img.src = 'https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg1'
  })
  return p
}

//延时函数，用于给请求计时
function timeout() {
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('图片请求超时')
    }, 5000)
  })
  return p
}

Promise.race([requestImg(), timeout()])
  .then(function (results) {
    console.log(results)
  })
  .catch(function (reason) {
    console.log(reason)
  })
