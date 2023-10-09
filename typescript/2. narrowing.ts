// 类型推导为更精确类型的过程，成为收窄 narrowing

function padLef(padding: string | number, input: string): string {
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(" ") + input;
  }
  return padding + input
}


function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {// truthiness narrowing 真值收窄
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}


function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // 等值收窄 equality narrowing
  }
}


// in 操作符收窄
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
    // (parameter) animal: Fish
  }

  return animal.fly();
  // (parameter) animal: Bird
}



// instanceof 收窄 narrowing
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

// assignments 赋值

// let x = Math.random() < 0.5 ? 10 : 'Hello World';


// 控制流分析 control flow analysis
// if while 

function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
  }
  return padding + input;
}


// 基于可达性的代码分析reachability

// 类型判断式
// type predicates
// pet is Fish就是我们的类型判断式
// 一个类型判断式采用 parameterName is Type的形式，但 parameterName 必须是当前函数的参数名。
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}



// 可辨别联合
interface ShapeBad {
  kind: "circle" | "square",
  radius?: number;
  sideLength?: number;
}

function getArea0(shape: ShapeBad) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2; // !非空断言
  }
}


interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
}


// never类型
// 穷尽检查 exhaustiveness checking
// 任何类型不能赋值给never
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape1 = Circle | Square | Triangle;

function getArea1(shape: Shape1) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
    // const _exhaustiveCheck1: never = shape;
    // Type 'Triangle' is not assignable to type 'never'.
    // return _exhaustiveCheck1;
  }
}


