// Map带键的数据项的集合 
//**（区别于Object： Map允许任何类型的key 键不会被转字符串）
// ** 对象，NaN都可以被用作键(因为Map使用sameValueZero算法作比较)
let map = new Map();

map.set('1', 'str1');   // 字符串键
map.set(1, 'num1');     // 数字键
map.set(true, 'bool1'); // 布尔值键
let john = { name: "John" };
map.set(john, 123);

// 创建: new Map() // { '1' => 'str1', 1 => 'num1', true => 'bool1' }
// 方法：map.set map.get map.has map.delete(key) map.clear() map.size
// 迭代 键:map.keys() 值:map.values() [key,value]:map.entries()
console.log(map.keys()); // 遍历并返回一个包含所有键的可迭代对象
console.log(map.values()); // 遍历并返回一个包含所有值的可迭代对象
console.log(map.entries()); // 遍历并返回一个包含所有实体 [key, value] 的可迭代对象，for..of 在默认情况下使用的就是这个。
// 转换 array object to map, map to object

// Object.entries:从对象创建Map
let arrToMap = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
])

let obj = Object.entries({
  name: 'John',
  age: 30,
})// 转换成上述Map创建需要的格式[ ["name","John"], ["age", 30] ]
console.log(obj);
let objToMap = new Map(obj)

// Map To Object:   Object.fromEntries需要的参数格式 [key,value]--map.entries返回值【key,value】可迭代的键值对
// let map1ToObj = Object.fromEntries([
//   ['banana', 1],
//   ['orange', 2],
//   ['meat', 4]
// ]); // map1ToObj返回 { banana: 1, orange: 2, meat: 4 }

// let mapdemo = new Map();
// mapdemo.set('banana', 1);
// mapdemo.set('orange', 2);
// mapdemo.set('meat', 4);
// let map2ToObj = Object.fromEntries(mapdemo.entries()); // map.entries()
// let map3ToObj = Object.fromEntries(mapdemo); // 省掉 .entries() 结果一样

/**------------------------------------------------------------------------------------------ */
// Set 值的集合没有键【每个值只出现一次】
// .add .delete .has .clear .size
// new Set()
// 方法：new

let set = new Set()

function aclean(arr) {
  let map = new Map()
  for (let word of arr) {
    // 将单词 split 成字母，对字母进行排序，之后再 join 回来
    let sorted = word.toLowerCase().split('').sort().join('') // (*)
    map.set(sorted, word)
  }

  return Array.from(map.values())
}
let arr = ['nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares']

console.log(aclean(arr))

// let set1 = new Set(["oranges", "apples", "bananas"]);

// for (let value of set1) {
//   console.log(value);
// }

// 与 forEach 相同：
// set1.forEach((value, valueAgain, set) => {
//   console.log('set----', value, valueAgain);
// });

// WeakMap WeakSet
// 1. WeakMap 的键必须是对象，不能是原始值
let johnObj = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(johnObj, "...");

johnObj = null; // 覆盖引用 johnObj 被从内存中删除了！

// WeakMap使用场景

