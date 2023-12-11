// 冒泡排序  O(n^2)
// https://www.conardli.top/docs/algorithm/%E6%8E%92%E5%BA%8F/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F.html
// [3, 6, 2, 4, 1]
// [1, 2, 3, 4, 5] 优化 complete当一次循环没有发生冒泡，说明已经排序完成，停止循环
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) { // 依次遍历
    let complete = true
    console.log("i------", i);
    for (let j = 0; j < arr.length - 1 - i; j++) {
      console.log(arr[j], arr[j + 1]);
      if (arr[j] > arr[j + 1]) { // 比较相邻两数
        const tmp = arr[j]
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        complete = false
      }
    }
    if (complete) { // 当一次循环没有发生冒泡，说明已经排序完成，停止循环
      break;
    }
  }
  return arr
}

const data = [3, 6, 2, 4, 6, 1]
// const arr = [1, 2, 3, 4, 5]
// console.log(bubbleSort(data));


// --------------------------------------------------------------------------------------------
// 每次循环选取一个最小的数字放到前面的有序序列中。
// [3, 6, 2, 4, 1] 
// [1, i-1] 有序 [i, n]无序
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) { // 注意边界条件
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
      console.log(minIndex);
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}

// console.log(selectionSort(data));


// 插入排序
// 构建有序序列 遍历有序序列并在相应位置插入
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

// console.log(insertSort(data));

// 与基准比较 分为left\right两个数组 递归left/right两个数组
function quickSort(arr) {
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
  return quickSort(left).concat([target], quickSort(right))
}
// console.log(quickSort(data));


// 归并排序

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }

  // 分割：将数组从中点进行分割，分为左、右两个数组
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  // 递归分割
  const sortedLeft = mergeSort(left)
  const sortedRight = mergeSort(right)

  // 归并：左右两个数组已经有序
  return merge(sortedLeft, sortedRight)
}

function merge(leftArr, rightArr) {
  let tmp = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    if (leftArr[leftIndex] < rightArr[rightIndex]) {
      tmp.push(leftArr[leftIndex])
      leftIndex++
    } else {
      tmp.push(rightArr[rightIndex])
      rightIndex++
    }
  }

  // 左侧 空
  while (leftIndex < leftArr.length) {
    tmp.push(leftArr[leftIndex])
    leftIndex++
  }
  // 右侧 空
  while (rightIndex < rightArr.length) {
    tmp.push(rightArr[rightIndex])
    rightIndex++
  }
  return tmp
}

// console.log(mergeSort(data));


// 堆排序


// 全排列
// 题目描述:有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

// Array.prototype.sort() sort(compareFn)
// 如果没有提供 compareFn，所有非 undefined 的数组元素都会被转换为字符串，并按照 UTF-16 码元顺序比较字符串进行排序。
// 如果提供了 compareFn，所有非 undefined 的数组元素都会按照比较函数的返回值进行排序（所有的 undefined 元素都会被排序到数组的末尾，并且不调用 compareFn）
// compareFn(a, b) 返回值 > 0 （a在b后[b,a]）<0(a在b前[a, b]) ===0 (保持相对位置不变)

// 稀疏数组
// console.log(["a", "c", , "b"].sort()); // ['a', 'b', 'c', empty]
// console.log([, undefined, "a", "b"].sort()); // ["a", "b", undefined, empty]

const months = ['March', 'Jan', 'Feb', 'Dec'];
// console.log(months.sort());

const array1 = [1, 30, 4, 21, 100000];
// console.log(array1.sort()); // 不对 

// 定义排序顺序的函数。返回值应该是一个数字，其正负性表示两个元素的相对顺序。
// arr.sort(compareFn)
function compareFn(a, b) {
  return a - b // 升序
}

function compareFn(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a 一定等于 b
  return 0;
}

// 题目描述:有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']
function versionCompare(a, b) {
  const aArr = a.split('.')
  const bArr = b.split('.')
  for (let i = 0; i < Math.max(aArr.length, bArr.length); i++) {
    const s1 = parseInt(aArr[i]) || 0
    const s2 = parseInt(bArr[i]) || 0
    if (s1 !== s2) {
      return s2 - s1
    }
  }
  return 0
}
const versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];

versions.sort(versionCompare);

console.log(versions);
