// 工具类型 辅助 常见的类型转换

// Partial<Type> 
// 构造一个Type下面的所有属性都设置为可选?的类型，
interface Todo {
  title: string;
  description: string;
}
type PartialTodo = Partial<Todo>


type MyPartial<T> = {
  [Property in keyof T]?: T[Property]
}
type MyPartialResult = MyPartial<Todo>

// ---------------------------------------------
// Required 构造一个Type下面的所有属性全都设置为必填的类型,与Partial相反
interface Props {
  a?: number;
  b?: string;
}

type RequiredProps = Required<Props>

type MyRequired<T> = {
  [Property in keyof T]-?: T[Property]
}
type MyRequiredResult = MyRequired<Props>


// ---------------------------------------------
// Readonly<Type>
// 构造一个Type下面的所有属性全都设置为只读的类型
interface TodoReadonly {
  title: string;
}
type TodoResult = Readonly<TodoReadonly>

type MyReadonly<T> = {
  readonly [Property in keyof T]: T[Property]
}
type MyTodoResult = MyReadonly<TodoReadonly>


// ---------------------------------------------
// Record<Keys, Type>
// 用于构造一个对象类型，它所有的key(键)都是Keys类型，它所有的value(值)都是Type类型。这个工具类型可以被用于映射一个类型的属性到另一个类型。
interface CatInfo {
  age: number;
  breed: string;
}
type CatName = "miffy" | "boris" | "mordred";// 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

type MyRecord<Keys extends keyof any, Type> = {
  [Key in Keys]: Type
}


// ---------------------------------------------
// Pick<Type, Keys>
// 用于构造一个类型，它是从Type类型里面挑了一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型)

interface PickTodo {
  title: string;
  description: string;
  completed: boolean;
}

type PickResult = Pick<PickTodo, "title" | "description">

type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key]
}
type MyPickResult = MyPick<PickTodo, "title" | "description">



// ---------------------------------------------
// Omit<Type, Keys>
// 用于构造一个类型，它是从Type类型里面过滤了一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型)

interface OmitTodo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type OmitResult = Omit<OmitTodo, "title">

type MyOmit<T, K extends keyof T> = {
  // [Key in keyof T]: Key extends K ? never : T[Key] 
  [Key in keyof T as Exclude<Key, K>]: T[Key]
}
type MyOmitResult = MyOmit<OmitTodo, "title">


// ---------------------------------------------
// Exclude<UnionType, ExcludedMembers>
// 用于构造一个类型，它是从UnionType联合类型里面排除了所有可以赋给ExcludedMembers的类型。
type T0 = Exclude<"a" | "b" | "c", "a">;
type T2 = Exclude<string | number | (() => void), Function>;

type MyExclude<T, U> = T extends U ? never : T
type T3 = MyExclude<string | number | (() => void), Function>;


// ---------------------------------------------
// Extract<Type, Union>
// 用于构造一个类型，它是从Type类型里面提取了所有可以赋给Union的类型。

// extends 关键字用于检查一个类型是否可以分配给另一个类型。
// A extends Condition ? A : never // 它是一个条件类型（conditional type），用于检查 A 中的每个类型是否可以分配给Condition。
// 如果类型 A 可以分配给类型 Condition，也就是说 A 是 Condition 的子类型或相同类型，条件表达式 A extends Condition ? A : never 返回的类型将是 A。这意味着我们保留了原始类型 A。
// 如果类型 A 不可分配给类型 Condition，这意味着 A 不满足 Condition 的要求，条件表达式 A extends Condition ? A : never 返回的类型将是 never。never 是 TypeScript 中的底类型，表示不可达到的类型。使用 never 表示我们没有任何值，即没有满足条件的类型。
// 因此，通过使用条件类型的语法 A extends Condition ? A : never，我们可以根据类型 A 是否可分配给类型 Condition 来选择返回的类型是 A 还是 never。这样就可以根据条件提取或过滤出满足特定条件的类型成员。
type ExtractT0 = Extract<"a" | "b" | "c", "a" | "f">;
type ExtractT1 = Extract<string | number | (() => void), Function>;

type MyAExtract<T, E> = T extends E ? T : never
type MyExtractT0 = MyAExtract<"a" | "b" | "c", "a" | "f">;
type MyExtractT1 = MyAExtract<string | number | (() => void), Function>;


// NonNullable<Type>
type NonNullableT0 = NonNullable<string | number | undefined>;

// type MyNonNull<Type> = Exclude<Type, undefined | null>
type MyNonNull<Type> = Type extends undefined | null ? never : Type

type NonNullableT1 = MyNonNull<string | number | undefined>;

// ---------------------------------------------
// Parameters<Type>
// 用于根据所有Type中函数类型的参数构造一个元祖类型。？？[name: string, id: string, age: number]
declare function f1(arg: { a: number; b: string }): void;
type F1Parameter = Parameters<typeof f1>

type MyParameter<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
type F1MyParameter = MyParameter<typeof f1>


// ---------------------------------------------
// ConstructorParameters<Type>
// 用于根据Type构造函数类型来构造一个元祖或数组类型，它产生一个带着所有参数类型的元组（或者返回never如果Type不是一个函数）。
class PersonCons {
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  name: string;
  age: number;
}

type Params = ConstructorParameters<typeof PersonCons>;
// Params 的类型是 [string, number]

type MyConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never
type Params1 = MyConstructorParameters<typeof PersonCons>;


// ---------------------------------------------
// ReturnType<Type>
// 用于构造一个含有Type函数的返回值的类型。

type RetuntypeT0 = ReturnType<() => string>;

type MyreturnType<T extends (...args: any[])=> any> = T extends (...args: any[]) => infer R ? R : never
type MyRetuntypeT0 = MyreturnType<() => string>;


// ---------------------------------------------
// InstanceType<Type>
// 用于构造一个由所有Type的构造函数的实例类型组成的类型。