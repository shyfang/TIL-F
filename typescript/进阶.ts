// 1. Partial
interface Todo {
  title: string;
  description: string;
}

// 用于构造一个Type下面的所有属性都设置为可选的类型，这个工具类型会返回代表给定的一个类型的子集的类型
type PartialTodo = Partial<Todo>


// 2. Required
interface Props {
  a?: number;
  b?: string;
}
// 用于构造一个Type下面的所有属性全都设置为必填的类型 与Partial相反
type RequiredProps = Required<Props>


// Readonly<Type>
type ReadOnlyTodo = Readonly<Todo>


// Record<Keys, Type>
interface CatInfo {
  age: number;
  breed: string;
}

// 用于构造一个对象类型，它所有的key(键)都是Keys类型，它所有的value(值)都是Type类型
type CatName = "miffy" | "boris" | "mordred";
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};


interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Pick<Type, Keys>
// 用于构造一个类型，它是从Type类型里面挑了一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型)
type TodoPreview = Pick<Todo, "title" | "completed">;
// Omit<Type, Keys>
// 用于构造一个类型，它是从Type类型里面过滤掉一些属性Keys
type TodoPreview1 = Omit<Todo, "description">;

// Exclude<UnionType, ExcludedMembers>
type ExcludeType1 = Exclude<'a' | "b" | (() => void), Function>
type ExcludeType2 = Exclude<'a' | "b", "a">


// Extract<Type, Union>
type Extract1 = Extract<string | number | (() => void), Function>;


// NonNullable<Type>
// 用于构造一个类型，这个类型从Type中排除了所有的null、undefined的类型。
type NonNullable1 = NonNullable<undefined | string | null>


// Parameters<Type>
// 用于根据所有Type中函数类型的参数构造一个元祖类型。
declare function f1(arg: { a: number; b: string }): void;
type TP0 = Parameters<typeof f1>;
type TP1 = Parameters<<T>(args:T)=>T>
