// 条件类型搭配泛型

// SomeType extends OtherType ? TrueType : FalseType;

// 1 条件类型约束
interface Email {
  message: string;
}
 
interface Dog {
  bark(): void;
}
 
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
type EmailMessageContents = MessageOf<Email>;           
// type EmailMessageContents = string
 
type DogMessageContents = MessageOf<Dog>;          
// type DogMessageContents = never

interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
// type Example1 = number

type Example2 = RegExp extends Animal ? number : string;
// type Example2 = string


// 搭配泛型一起使用
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}


// 2. infer 在条件类型判断里 infer指定类型帮助别名
type MyFunc = (x: string, y: number) => [string, number]
type MyFunc1 = (x: string) => [string]
type MyFunc2 = (x: number) => [number]

type GenericMyFunc<T> = T extends (...args: any[]) => infer R ? R : never
type fun1 = GenericMyFunc<MyFunc>

// 应用：条件类型获取一个函数的返回类型
type GetReturnType<T> = T extends (...args)=> infer Return ? Return : never
type Num = GetReturnType<() => number>
type Str = GetReturnType<(x:string) => string>

type GetParmeterType<T> = T extends (...args: infer P) => any ? P : never;
type StrP = GetParmeterType<(x:string) => string>

// 分发条件类型 distributive
type ToArray<Type> = Type extends any ? Type[] : never; // 用于将任意类型转为数组类型
type StrArrOrNumArr = ToArray<string | number>; // ToArray传入一个联合类型，相当于遍历联合类型， 相当于ToArray<string> | ToArray<number>; // string[] 
// string[] | number[] 

type ToArray1<Type> = [Type] extends [any] ? Type[] : never;
type StrArrOrNumArr1 = ToArray1<string | number>

