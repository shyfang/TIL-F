// SomeType extends OtherType ? TrueType : FalseType;
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


// infer
type MyFunc = (x: string, y: number) => [string, number]
type MyFunc1 = (x: string) => [string]
type MyFunc2 = (x: number) => [number]

type GenericMyFunc<T> = T extends (...args: any[]) => infer R ? R : never
type fun1 = GenericMyFunc<MyFunc>


// 分发条件类型 distributive
type ToArray<Type> = Type extends any ? Type[] : never; // 用于将任意类型转为数组类型
type StrArrOrNumArr = ToArray<string>; // 相当于ToArray<string> | ToArray<number>; // string[] 


type ToArray1<Type> = Type extends any[] ? Type[number] : never; // 泛型类型中添加额外的类型约 来限制数组元素类型必须是 Type 数组中的元素类型。