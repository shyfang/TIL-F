// 良好的 一致的API 可复用
function identity(arg: number): number {
  return arg
}
function identity1<Type>(args: Type): Type {
  return args
}

// let output = identity1<string>("myString")
let output = identity1("myString"); // let output: string


function identity2<Type extends { length: number }>(args: Type): Type {
  console.log(args.length);
  return args
}

identity2("!21")

function identityArr<Type>(args: Type[]): Type[] {
  // function identityArr<Type>(args: Array<Type>): Array<Type> {
  console.log(args.length);
  return args
}

// ——————————————————————————————————————————————————————————————
// 
const myIdentity: <Type>(arg: Type) => Type = identity1
const myIdentity1: <Input>(arg: Input) => Input = identity1
// 对象类型的调用签名
const myIdentity2: { <Type>(arg: Type): Type } = identity1

interface GenericMyIdentityFn {
  <Type>(arg: Type): Type
}
const myIdentity3: GenericMyIdentityFn = identity1

interface GenericMyIdentity<Type> {
  (arg: Type): Type
}
const myIdentity4: GenericMyIdentity<number> = identity1


// ————————————————————————————————————————————————————————————————————
// 泛型类
class GenericNumber<Type> {
  zeroNum: Type;
  add: (a: Type, b: Type) => Type
}
let myGenericNumber = new GenericNumber<number>();
let stringNumeric = new GenericNumber<string>();


// 泛型约束
interface Lengthwise {
  length: number;
}

function identityWithLength<Type extends Lengthwise>(args: Type): Type {
  console.log(args.length);
  return args
}

// 在泛型约束中使用类型参数
// Using Type Params in Generic Constraints
// 在两个类型间建立一个约束
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}

// 在泛型中使用类型
// 工厂模式创建实例
// 根据构造函数 推断出类的类型
function createObj<Type>(c: { new(): Type }): Type {
  return new c()
}


// keyof
// 会返回该对象属性名组成的一个字符串
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;  // type A = number
const obj = {
  0: "A",
  1: "B"
}

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number
// M 是 string | number，这是因为 JavaScript 对象的属性名会被强制转为一个字符串，所以 obj[0] 和 obj["0"] 是一样的

// 数字字面量联合？
const NumericObject = {
  [1]: "冴羽一号",
  [2]: "冴羽二号",
  [3]: "冴羽三号"
};
// typeof NumbericObject 的结果为：
// {
//   1: string;
//   2: string;
//   3: string;
// }
type result = keyof typeof NumericObject

// ——————————————————————————————————————————————-

