function once(fn) {
  const cacheMap = new Map()

  return function(...args) {
    const cacheKey = JSON.stringify(args);
    console.log("cacheKey", cacheKey);
    if (cacheMap.has(cacheKey)) {
      return cacheMap.get(cacheKey);
    }
    const res = fn.apply(this, args);
    cacheMap.set(cacheKey, res);
    return res;
  };
}

function fn(a, b, c){
  return a+b+c
}

const cacheFn = once(fn)
const res = cacheFn(3, 3, 3)
console.log("res--", res);