// Mapped Types 映射语法{}
// 索引签名
//  1. - 删除 + 添加 ？可选属性 -？ +？
//  2. as 实现键名重新映射
//  3. 利用条件返回never 过滤掉一些属性

// type OnlyBoolAndHorse = {
//   [key: string]: boolean | Horse
// }

// 映射类型，就是使用了 PropertyKeys 联合类型的泛型，其中 PropertyKeys 多是通过 keyof 创建，然后循环遍历键名创建一个类型：
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};


// 删除属性中的只读属性
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
// type UnlockedAccount = {
//    id: string;
//    name: string;
// }


// 删除属性中的可选属性
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type UserM = Concrete<MaybeUser>;


// 通过as实现键名重新映射
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: Type[Property]
}
interface PersonR {
  name: string;
  age: number;
  location: string;
}
// type LazyPerson = Getters<Person1>;


type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
}
// Type 是一个泛型参数，代表输入类型。
// 使用 {} 语法定义了映射类型。
// 使用 keyof 运算符迭代 Type 的每个属性
// Exclude<Property, "kind"> 是一个条件类型，用于从迭代中排除名为 "kind" 的属性。


interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;

type RemoveKindField1<Type> = {
  [Property in keyof Type as Exclude<Property, "age">]: Type[Property]
}
type RMQ = RemoveKindField1<PersonR>


type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>
// type Config = {
//    square: (event: SquareEvent) => void;
//    circle: (event: CircleEvent) => void;
// }
