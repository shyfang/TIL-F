// 函数类型表达式--》函数类型表达式
function greeter(fn: (a: string) => void) {
  fn("Hello")
}
// (a: string) => void
type GreetFunction = (a: string) => void
function greeter1(fn: GreetFunction) {
  fn("Hello")
}


// 函数除了可以被调用，也可以有属性值（如果我们想描述一个带有属性的函数，可以在一个对象类型中写一个调用签名）
type DescribaleFunction = {
  description: string;
  (someArg: number): boolean // 语法更函数表达式不同，在参数列表呵呵返回的类型之间用: 而不是=>
}
function doSomething(fn: DescribaleFunction) {
  console.log(fn.description + fn(6));
}



// 构造签名
// new操作法带哦哦用
type SomeConstructor = {
  new(s: string): string
}
function fn(ctor: SomeConstructor) {
  return new ctor("Hello")
}


interface CallorConstruct {
  new(s: string): Date;
  (n?: number): number
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



// 推断 Inference
// function map<Input, OutPut>(arr:Input, )


// 约束 a,b 都具有length属性
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
//  2. 使用更少的类型参数


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