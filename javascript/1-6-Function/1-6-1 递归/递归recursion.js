// 函数会调用自身(自调用) ——> 递归
// 递归：1.有边界条件、递归前进阶段、递归返回阶段
// 边界条件不满足前进，边界条件满足 递归返回
function pow(x, n) {
  if(n === 1) {
    return x
  } else {
    return x * pow(x, n-1)
  }
}
console.log(pow(2, 3) );

function pow1(x, n) {
  let result = 1
  for (let i = 0; i < n; i++) {
    result *= x
  }
  return result
}
console.log("result", pow1(2, 3));
// demo1 1 + 2 + ... + n
// 公式
function sumTo(n) {
  return ((1 + n) * n) / 2
}
// 递归
function sumTo2(n) {
  if (n === 1) return 1
  if (n > 1) {
    return n + sumTo2(n - 1)
  }
}
// 尾递归:1.尾部调用的是函数自身
function sumTo3(n, total) {
  if (n === 1) return total
  if (n > 1) {
    console.log(n, total)
    return sumTo3(n - 1, n + total)
  }
}
function factorialSum(n, total=0){
  if(n===1) {
    return total
  } else {
    return factorialSum(n-1, n + total)
  }
}
console.log(factorialSum(3, 1));
console.log(sumTo3(5, 1))

// ----------------------------------------------------------------------------
// demo2 n!
// 递归
function factorial(n) {
  if (n === 1) return 1
  if (n > 1) {
    return n * factorial(n - 1)
  }
}
// 尾递归
function factorial1(n, total) {
  if (n === 1) return total // 边界 递归返回
  return factorial1(n - 1, n * total) // 递归前进
}

// ----------------------------------------------------------------------------
// demo3数组求和
function sumArr1(arr, total) {
  // 边界条件
  if (!arr.length) {
    return total
  }
  if (arr.length > 0) {
    return sumArr1(arr, total + arr.pop())
  }
}

// array.reduce():对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值
function sumArr(arr) {
  // reduce参数 reduce(callbackFn) // reduce(callbackFn, initialValue)
  const initialValue = 0
  return arr.reduce((sum, current) => sum + current, initialValue)
}

function sumSalaries(department){
  if(Array.isArray(department)) {
    return department.reduce((prev, current) => prev + current.salary, 0)
  } else {
    let sum = 0
    for (const value of Object.values(department)) {
      sum += sumSalaries(value)
    }
    return sum
  }
}

// 斐波那契数列 递归 和 尾递归
// 效率太慢
// function fib(n) {
//   if (n < 2) return 1
//   return fib(n - 2) + fib(n - 1)
// }

function fib1(n) {
  let a = 1
  let b = 1
  for (let i = 3; i <= n; i++) {
    let c = a + b
    a = b
    b = c
  }
  return b
}

function fib2(n, pre, total) {
  // 1, 1, 2, 3, 5
  if (n <= 2) return total
  return f(n - 1, total, pre + total)
}

// 数组扁平化
// 深浅拷贝
function printList(list){
  console.log(list.value);
  if(list.next) {
    printList(list.next)
  }  
}
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
// printList(list)
function printReverseList(list) {
  if (list.next) {
    printReverseList(list.next);
  }
  console.log(list.value);
}

// printReverseList(list);

function printListReverse(list) {
  console.log("list", list);
  if (list) {
    printListReverse(list.next);
    console.log("list---",list);
    console.log(list.value);
  }
}

printListReverse(list)


