const promise = new Promise(function(reslove, reject){
  reslove(123)
  // reject(new Error("error"))
})
promise.then(result => {}, error => {}).catch().finally()



// 
function loadImgAsync (url){
  return new Promise(function(reslove, reject){
    const image = new Image()
    image.onload = function (){
      reslove(image)
    }
    image.onerror = function(){
      reject(new Error('could not load image at' + url))
    }

    image.src = url
  })
}