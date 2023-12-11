function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

const res = bubbleSort([3, 6, 2, 4, 1])
console.log(res);

// 优化
// 当一次循环没有发生冒泡，说明已经排序完成，停止循环
function bubbleSort1(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let complete = true
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        complete = false
      }
    }
    if (complete === true) return arr
  }
  return arr
}


// -------------------------------------------
function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}

const selectorRes = selectSort([3, 6, 2, 4, 1])
console.log(selectorRes);



function insertSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let target = i
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[target]) {
        [arr[j], arr[target]] = [arr[target], arr[j]]
        target = j
      } else {
        break
      }
    }
  }
  return arr

}

const insertRes = insertSort([3, 6, 2, 4, 1])
console.log(insertRes);
