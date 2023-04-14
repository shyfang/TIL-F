// 1. algorithm 输出 2 到 n 的素数
function primeNumber(n) {
  const result = []
  nextPrime: for (let i = 2; i <= n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime
    }
    result.push(i)
  }
  return result
}

// console.log(primeNumber(10))

/** 优化leetcode 算法
 * @param {number} maxNumber
 * @return {number[]}
 */
function sieveOfEratosthenes(maxNumber) {
  const isPrime = new Array(maxNumber + 1).fill(true)
  isPrime[0] = false
  isPrime[1] = false

  const primes = []

  for (let number = 2; number <= maxNumber; number += 1) {
    if (isPrime[number] === true) {
      primes.push(number)

      /*
       * Optimisation.
       * Start marking multiples of `p` from `p * p`, and not from `2 * p`.
       * The reason why this works is because, at that point, smaller multiples
       * of `p` will have already been marked `false`.
       *
       * Warning: When working with really big numbers, the following line may cause overflow
       * In that case, it can be changed to:
       * let nextNumber = 2 * number;
       */
      let nextNumber = number * number

      while (nextNumber <= maxNumber) {
        isPrime[nextNumber] = false
        nextNumber += number
      }
    }
  }

  return primes
}

console.log(sieveOfEratosthenes(11))

/**
 * @param {number} n
 * @return {number}
 */
function countPrimes(n) {
  let count = 0
  let primes = []
  let signs = new Uint8Array(n + 1) // [0, 0....0]
  for (let i = 2; i < n; i++) {
    if (!signs[i]) {
      count++
      primes.push(i)

      for (let j = i * i; j <= n; j += i) {
        signs[j] = true
      }
    }
  }
  return [primes, count]
}

// console.log(countPrimes(12))

//  2.
