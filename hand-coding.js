// 快速排序
// 分组：选择一个【目标值】，比目标值小的放【左边】，比目标值大的放【右边】
// 递归：目标值的位置已排好，将左右两侧再进行快排。 
function quickSort(arr) {
  // target
  // left 
  // right
  if (arr.length < 2) {
    return arr
  }
  const target = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < target) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // const sortLeft = quickSort(left)
  // const sortRight = quickSort(right)
  // const res = sortLeft.concat(target).concat(sortRight)
  return quickSort(left).concat(target).concat(quickSort(right))
}

const quickRes = quickSort([3, 6, 2, 4, 1])
console.log(quickRes);

// 归并排序：分治法 
// 先使每个子序列有序，再使子序列段间有序
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  const leftSort = mergeSort(left)
  const rightSort = mergeSort(right)
  return merge(leftSort, rightSort)
}

// 如何合并两个有序数组？
function merge(left, right) {
  let tmp = []
  let leftIndex = 0
  let rightIndex = 0
  // 都未遍历完
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      tmp.push(left[leftIndex])
      leftIndex++
    } else {
      tmp.push(right[rightIndex])
      rightIndex++
    }
  }

  // left未遍历完
  if (leftIndex < left.length) {
    tmp = tmp.concat(left.slice(leftIndex))
  }

  // right未遍历完
  if (rightIndex < right.length) {
    tmp = tmp.concat(right.slice(rightIndex))
  }

  return tmp
}

const mergeRes = mergeSort([3, 6, 2, 4, 1])
console.log(mergeRes);


// 选择排序
function selectSort(arr) {
  // minIndex
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      // 交互
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }

  return arr
}


const selectRes = selectSort([3, 6, 2, 4, 1])
console.log("selectRes", selectRes);


// 插入排序
// i待排序 循环遍历
// [0, i-1]已排序 交换直至移动到合适位置插入
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

console.log("insertSort", insertSort([3, 6, 2, 4, 1]));

// 冒泡排序
// 最大的冒泡到最后
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // 交换 
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
console.log("bubbleSort", bubbleSort([3, 6, 2, 4, 1]));



// 