
// 默认值
// function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
//   console.log("x coordinate at", xPos); // (parameter) xPos: number
//   console.log("y coordinate at", yPos); // (parameter) yPos: number
//   // ...
// }

// 注意 不可在解构中直接定义类型,会被认为是创建一个Shape number变量
function paintShape({ shape: Shape, xPos: number, s }) { }



// 1. readOnly
interface SomeType {
  readonly prop: string;
}

// 2. 索引签名
interface StringArray {
  [index: number]: string;
}



interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}


// 数字索引的返回类型一定要是字符索引返回类型的子类型
// Error: indexing with a numeric string might get you a completely separate type of Animal!
// interface NotOkay {
//   [x: number]: Animal;
//   // 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
//   [x: string]: Dog;
// }

// 错误 类型不一致问题
// interface Okay {
//   [x: number]: Dog; // 数字索引类型的返回类型为 Animal 类型或其子类型
//   [x: string]: Animal; // 字符串索引类型的返回类型为 Animal 类型或其子类型
// }

// 修改如下：
interface Okay {
  [x: number]: Animal; // 数字索引类型的返回类型为 Animal 类型或其子类型
  [x: string]: Animal; // 字符串索引类型的返回类型为 Animal 类型或其子类型
}

// 或者

interface Okay1 {
  [x: number]: Dog; // 数字索引类型的返回类型为 Dog 类型或其子类型
  [x: string]: Dog; // 字符串索引类型的返回类型为 Dog 类型或其子类型
}


// 会强制要求所有的属性要匹配索引签名的返回类型
interface NumberDictionary {
  [index: string]: number | string,
  length: number,
  name: string
}

// --------------------------------------------

// 1. 接口继承 extends 得到更具体的类型
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
// 继承多个类型
interface ColorfulCircle extends Colorful, Circle { }


// 2. 交叉类型& Intersection Types 用于合并已经存在的对象类型
type ColorfulCircle1 = Colorful & Circle;

// #接口继承与交叉类型区别（Interfaces vs Intersections）


// // 交叉类型可以重写类型
// 2.1 使用继承的方式，如果重写类型会导致编译错误，但交叉类型不会：
// interface Colorful1 {
//   color: string;
// }
// interface ColorfulSub1 extends Colorful1 {
//   color: number 
// }

// 交叉类型 重写类型 string & number 交集 -》 never
// interface Colorful {
//   color: string;
// }
// type ColorfulSub = Colorful & {
//   color: number
// } 



// 泛型
type OneOrNull<Type> = Type | null
type OneOrMany<Type> = Type | Type[]
type OneOrManyOrNull<Type> = OneOrNull<OneOrMany<Type>>
type OneOrManyOrNull1<Type> = OneOrMany<Type> | null
type OneOrManyOrNullString = OneOrManyOrNull<string>
type OneOrManyOrNullString1 = OneOrMany<string> | null


// ---------------------------------------------------
// Array
// number[] string[] Array<string>
// Map<K, V> Set<T> Promise<T> // ???
interface Array1<Type> {
  /**
   * Gets or sets the length of the array.
   */
  length: number;

  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;

  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number;

  // ...
}
// ReadonlyArray
// ReadonlyArray<Type> 简写为 readonly Type[]


// 元祖类型
// Tuples元祖类型是另外一种Array类型 明确知道数组包含多少个元素 每个位置元素类型
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

function readButtonInput(...args: [string, number, ...number[]]){}
function readButtonInput1(name: string, version: number, ...input: number[]){}



// 如果我们给一个数组字面量 const 断言，也会被推断为 readonly 元组类型。
let point = [3, 4] as const;
// ——————————————————————————————————————————————

function getProperty1<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}


type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>

function f(): boolean {
  return false
}
type K1 = ReturnType<typeof f>

// typeof
// 对象
const person = { name: "kevin", age: "18" }
type Kevin = typeof person;

// func
function identity<Type>(arg: Type): Type {
  // function identity<Type>(arg: Type): Type {
  return arg
}
type res = typeof identity;

// enum
enum UserResponse {
  No = 0,
  Yes = 1,
}

type res1 =  typeof UserResponse
type EnumKeys = keyof typeof UserResponse;
const a: Record<EnumKeys, number> = {
  "No": 2,
  "Yes": 3
}
