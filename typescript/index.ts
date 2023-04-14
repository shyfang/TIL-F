// 1. typescript数据类型
let tupleArr:[number, string, boolean];
tupleArr = [12, '34', true]; // ok
// tupleArr = [12, '34'] // error



enum Color {Red, Green, Blue}
let c: Color = Color.Green;



interface Person {
  age: number;
  name: string;
}

type PersonKeys = keyof Person; // "age" | "name"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = {
  age: 22,
  name: "Tobias",
};

// name is a property of person
// --> no error
export const name = getProperty(person, "name");

// gender is not a property of person
// --> error
export const gender = getProperty(person, "gender");
