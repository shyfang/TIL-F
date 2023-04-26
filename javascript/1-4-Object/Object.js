/** for...in... */
function isEmpty(object) {
  /** method 1 */
  for (const key in object) {
    return false
  }
  return true

  /** method 2 */
  // if (JSON.stringify(object) === '{}') {
  //   return true
  // }
  // return false

  /** method 3 */
  // const keys = Object.keys(object)
  // if (!keys.length) {
  //   return true
  // }
  // return false
}

console.log(isEmpty({}))

function sumSalary(object) {
  let sum = 0
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key]
      sum += +element
    }
  }
  return sum
}

// 转换对象
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};
const objEntries = Object.entries(prices) // 从 obj 获取由键/值对组成的数组
// console.log(objEntries);
const fromEntr = Object.entries(prices).map(entry => {
  // console.log(entry);
  return [entry[0], entry[1] * 2]
})
// console.log(fromEntr);
const newObj = Object.fromEntries(fromEntr)
// console.log(newObj);


let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

function sumSalaries (salaries){
  const arr = Object.values(salaries)
  const sum  = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  return sum
}
sumSalaries(salaries)



let user = new Map();
user.set("name", "John");
user.set("age", "30");
console.log(user);

// Map 是以 [key, value] 对的形式进行迭代的，非常便于解构
for (let [key, value] of user) {
  console.log(`${key}:${value}`); // name:John, then age:30
}
// 解构  ={}
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200