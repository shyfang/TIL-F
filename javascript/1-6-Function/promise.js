// 异步编程、基于回调、error-first-callback、回调地狱

// 1. 异步回调demo: 脚本加载 图片加载
function loadScript(src, callback) {
  let script = document.createElement('script')
  script.src = src

  // Error 优先回调（error-first callback)
  // error-first callback:约定第一个参数为error保留；第二个及以后参数用于成功的结果
  script.onload = () => callback(null, script)
  script.onerror = () => callback(new Error(`Script load error for ${src}`))

  document.head.append(script)

  document.head.append(script)
}

function loadImg() {
  let img = document.createElement('img')
  img.src = 'https://js.cx/clipart/train.gif'

  img.onload = function () {
    console.log(`Image loaded, size ${img.width}x${img.height}`)
  }

  img.onerror = function () {
    console.log('Error occurred while loading image')
  }
}

// 2.Promise
// 返回promise对象
let promise = new Promise(
  // executor 被自动且立即调用; executor接受两个参数
  function (resolve, reject) {
    // 花费时间去做事情
    // 然后给出结果result 调用resolve or reject， 改变promise对象的状态
  },
)
// 消费者：then catch;
// Promise 对象充当的是 executor（“生产者代码”或“歌手”）和消费函数（“粉丝”）之间的连接
// the call of .then always returns a promise
promise.then(
  function (result){},
  function (error) {} 
)

let promise1 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve 运行 .then 中的第一个函数
promise1.then(
  result => console.log(result), // 1 秒后显示 "done!"
  error => console.log(error) // 不运行
);



// catch
// .catch(f) 调用是 .then(null, f) 的完全的模拟，它只是一个简写形式。catch(f2) 区别于.then(f1, f2)
// 隐藏的try...catch... 能够处理同步错误


// 清理：finally
// finally 的功能是设置一个处理程序在前面的操作完成后，执行清理/终结
// finally 处理程序没有得到前一个处理程序的结果（它没有参数）。而这个结果被传递给了下一个合适的处理程序。
// 如果 finally 处理程序返回了一些内容，那么这些内容会被忽略。
// 当 finally 抛出 error 时，执行将转到最近的 error 的处理程序。
promise.finally(() => {})



//
const dataURLToImage = dataURL =>
  new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = dataURL
  })

  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.src = src;
  
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));
  
      document.head.append(script);
    });
  }

  let promise3 = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise3.then(
  script => console.log(`${script.src} is loaded!`),
  error => console.log(`Error: ${error.message}`)
);

promise3.then(script => console.log('Another handler...'));



// 3. Promise API
// Promise.all
// Promise.all :如果任意的 promise reject，则 Promise.all 整个将会 reject。当我们需要 所有 结果都成功时，它对这种“全有或全无”
// Promise.allSettled: Promise.allSettled 等待所有的 promise 都被 settle，无论结果如何
// Promise.any :只等待第一个 settled 的 promise 并获取其结果（或 error）。
// Promise.race :Promise.any 只等待第一个 fulfilled 的 promise



function loadScript(src, callback) {
  let script = document.createElement('script')
  script.src = src

  // Error 优先回调（error-first callback)
  // error-first callback:约定第一个参数为error保留；第二个及以后参数用于成功的结果
  script.onload = () => callback(null, script)
  script.onerror = () => callback(new Error(`Script load error for ${src}`))

  document.head.append(script)
}

// Promisification: 将一个接受回调的函数转换为一个返回Promise的函数
let loadScriptPromise =  function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script)=>{
      if(err) {
        reject(err)
      } else {
        resolve(script)
      }
    })
  })
}




function promisify(f) {
  return function(...args){
    return new Promise((resolve, reject) => {
      
    })
  }
}