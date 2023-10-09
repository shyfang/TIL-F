// 总结
// keyof + 【 对象类型 】
// 1. 【对象类型】使用，得到字符串 或 数字字面量的联合
type Point = { x: number; y: number };
type P = keyof Point; // type P = 'x' | 'y'

const NumericObject = {
  [1]: "冴羽一号",
  [2]: "冴羽二号",
  [3]: "冴羽三号"
};

type result = keyof typeof NumericObject // type result = 1 | 2 | 3


// 类型有一个string或number的索引签名，keyof会直接返回类型
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number // 因为js中对象属性会被强制转为字符串
// ----------------------------------------------------------------------------------------


// 2 keyof 【Symbol类型】
const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol();

const symbolToNumberMap = {
  [sym1]: 1,
  [sym2]: 2,
  [sym3]: 3,
};

type KS = keyof typeof symbolToNumberMap; // typeof sym1 | typeof sym2 | typeof sym3

// ----------------------------------------------------------------------------------------
// 3. keyof +【类/接口】
class User {
  name: string
}
type UserResult = keyof User

class Person1 {
  [1]: string = "name"
}
type PersonResult = keyof Person

interface UserInterface {
  name: string
}
type UserInterfaceResult = keyof UserInterface




function useKey<T, K extends keyof T>(o: T, k: K) {
  // var name: string = k;  // XX 对象属性名 string number symbol
  var name: string | number | symbol = k
  // Type 'string | number | symbol' is not assignable to type 'string'.
}



// 我们希望获取一个对象给定属性名的值，为此，我们需要确保我们不会获取 obj 上不存在的属性。所以我们在两个类型之间建立一个约束：
function getProperty<O, K extends keyof O>(o: O, k: K) {
  return o[k]
}