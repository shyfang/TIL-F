// 创建一个未处理的 Promise
const promise = new Promise((resolve, reject) => {
  reject(new Error('Something went wrong'));
}).catch(err => {
  console.log(err);
});
setTimeout(() => promise.catch(err => console.log('caught')), 1000);


// // 监听 unhandledrejection 事件
// process.on('unhandledRejection', (err, promise) => {
//   console.log('Unhandled Rejection:', err.message);
// });

// 运行 Promise，但没有 catch 或 reject 处理
promise.then(() => {
  console.log('Promise resolved');
});