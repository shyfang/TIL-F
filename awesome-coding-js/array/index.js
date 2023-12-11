// [3, 6, 2, 4, 1]
function search(arr, target, start, end) {
  let mid = Math.floor((start + end) / 2)
  let targetIndex = -1
  if (arr[mid] === target) {
    targetIndex = mid
    return targetIndex
  }
  if (start >= end) {
    return targetIndex
  }
  if (arr[mid] < target) {
    return search(arr, target, mid + 1, end)
  } else {
    return search(arr, target, start, mid - 1)
  }
}