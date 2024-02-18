var groupAnagrams = function (strs) {
  const map = new Map()
  for (let i = 0; i < strs.length; i++) {
    const ele = strs[i]
    const eleKey = ele.split("").sort().join()

    if (map.has(eleKey)) {
      const list = map.get(eleKey)
      list.push(ele)
      map.set(eleKey, list)
    } else {
      map.set(eleKey, [ele])
    }
  }
  return Array.from(map.values())
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

const strs1 = [""]

const strs2 = ["a"]

const res = groupAnagrams(strs)
console.log("res", res);