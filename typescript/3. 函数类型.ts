// 函数类型表达式--》函数类型表达式 Function Type Expressions
function greeter(fn: (a: string) => void) {
  fn("Hello")
}
// 使用类型别名 (a: string) => void
type GreetFunction = (a: string) => void
function greeter1(fn: GreetFunction) {
  fn("Hello")
}


// 调用签名 Call Signatures
// 函数除了可以被调用，也可以有属性值（如果我们想描述一个带有属性的函数，可以在一个对象类型中写一个调用签名）
type DescribaleFunction = {
  description: string;
  (someArg: number): boolean // 语法跟函数表达式不同，在参数列表(someArg: number)和boolean返回的类型之间用: 而不是=>
}
function doSomething(fn: DescribaleFunction) {
  console.log(fn.description + fn(6));
}



// 构造签名 Construct Signatures
// new操作符 调用
type SomeConstructor = {
  new(s: string): string
}
function fn(ctor: SomeConstructor) {
  return new ctor("Hello")
}


interface CallorConstruct {
  new(s: string): Date; // new Date() 调用 返回的是Date
  (n?: number): number // Date()调用 返回的是number
}


// 泛型函数Generic Functions
// 输出类型依赖函数的输入类型
// 两个输入的类型以某种形式相互关联
function firstElement(arr: any[]) { // any
  return arr[0]
}
// 在函数签名里声明一个类型参数type parameter
function firstElement1<Type>(arr: Type[]): Type | undefined {
  return arr[0]
}
// Type类型参数 在输入和输出两个地方使用，创建输入 和 输出 的关联
const s = firstElement1(["a", "b", "c"])
const n = firstElement1([1, 2, 3]);
const u = firstElement1([]);



// 推断 Inference
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
// TypeScript 既可以推断出 Input 的类型 （从传入的 string 数组），又可以根据函数表达式的返回值推断出 Output 的类型。



// 约束 Constraints
// 约束 a,b 都具有length属性, 使用extends语法来约束函数参数
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length > b.length) {
    return a
  } else {
    return b
  }
}
// longest([1, 2, 3], [1, 2])
// longest("aa", "bbb")
// longest(10, 100) Error



function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type | undefined {
  if (obj.length >= minimum) {
    return obj;
  }
  // else {
  // return { length: minimum }; // 
  // Type '{ length: number; }' is not assignable to type 'Type'.
  // '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
  // }
}


// 声明类型参数 Specifying Type Arguments
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2)
}



// _______________________________________________________________________________________________________________________________________________________________________________
// 如何写好一个泛型函数
// 1. 类型参数下移
function firstElementGood<Type>(arr: Type[]) {
  return arr[0]
}
function firstElementBad<Type extends any[]>(arr: Type) {
  return arr[0]
}
// /第一个函数可以推断出返回的类型是 number，但第二个函数推断的返回类型却是 any，
// 关于本节原文中的 push down 含义，在《重构》里，就有一个函数下移（Push Down Method）的优化方法，指如果超类中的某个函数只与一个或者少数几个子类有关，那么最好将其从超类中挪走，放到真正关心它的子类中去。即只在超类保留共用的行为。这种将超类中的函数本体复制到具体需要的子类的方法就可以称之为 "push down"，与本节中的去除 extend any[]，将其具体的推断交给 Type 自身就类似于 push down。
//  2. 使用更少的【类型参数】
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func)
}
function filter2<Type, Func extends (arg: Type) => boolean>(// Func 没有关联两个值的 参类型数
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}



// 3.类型参数应该出现两次 类型参数是用来关联多个值之间的类型。如果一个类型参数只在函数签名里出现了一次，那它就没有跟任何东西产生关联。
// type Func = () => void
// const f1: Func = () => {
//   return true;
// };
// // function f1() {
// //   return true
// // }
type Func = () => boolean;
const f1: Func = function () {
  return true;
};
function f2(): boolean {
  return true
}


// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// 错误写法
function myForEach(arr: any[], callback: (arr: any[], index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i)
  }
}
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));
// 冴羽注：最新的 TypeScript 版本中并不会报错
// myForEach([1, 2, 3], (a, i) => {
//   console.log(i.toFixed());
//   // Object is possibly 'undefined'.
// });


// ??当你写一个回调函数的类型时，不要写一个可选参数，除非你真的打算调用函数的时候不传入实参？
function myForEach1(arr: any[], callback: (arg: any, index: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

myForEach1([1, 2, 3], (a) => {
  console.log(a);
});
myForEach1([1, 2, 3], (a, i) => {
  console.log(i.toFixed());
});



// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// 函数重载 Function Overloads
// 函数在调用时 可以传入不同数量和类型的参数

// oveerload signaturess 重载签名
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
// 实现签名 (implementation signature) 
function makeDate(mOrTimestamp: number, d?: number, y?: number) {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d)
  } else {
    return new Date(mOrTimestamp)
  }
}

// 两个函数重载，一个接受一个参数，另外一个接受三个参数。前面两个函数签名被称为重载签名 (overload signatures)。兼容签名的实现，称之为实现签名（implementation signature）
// 在一个必须参数后，声明了两个可选参数，它依然不能被传入两个参数进行调用

// 实现签名对外界来说是不可见的，当写入一个重载寒暑的时候，你总要两个或者更多的签名在实现签名之上
// 实现签名必须和重载签名一致




// 写 函数重载 的一些建议 原则

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

len([0]); // OK
len("hello"); // OK

// len(Math.random() > 0.5 ? "hello" : [0]) //error
// 我们不能传入一个可能是字符串或者是数组的值,因为 ts只能一次用一个函数重载处理一次函数调用
// 修改后 可以传入两个类型中的任意一个
function lenPref(x: any[] | string) {
  return x.length;
}



//___________________________________________________________________________
// void 跟 undefined 不一样

// object 
// primitive (string number bigint boolean symbol null undefiined)
// unknown 可以表示任何值 
// never 一些函数
// Function 不常用
  // function doSomething1(f: () => void){
  //   f()
  // }

// parameters:形参 arguments：实参
// 可选参数 重载 能让函数接受不同数量的函数参数，剩余参数rest parameters定义一个可传入数量不受限制的函数参数的函数...
function multiply(n: number, ...m: number[]){
  return m.map(x => x*n)
}
// 剩余参数类型被隐式设置为any[] 可自定义Array<T> T[] 或者是 元祖类型

// rest arguments 剩余参数