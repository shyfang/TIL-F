// 字段（Fields）
// 一个字段声明会创建一个公共（public）可写入（writeable）的属性：
class GoodGreeter {
  name: string;
  constructor() {
    this.name = '123'
  }
}

class ReadOnlyGreeter {
  readonly name: string;
  email: string;
  constructor(name: string) {
  }
  setName() {
    // this.name =  name
  }
}



// constructor 类的构造函数跟函数非常类似，你可以使用带类型注解的参数、默认值、重载等。
class Point {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}
class Point1 {
  x: number;
  y: number;
  // overloads
  constructor(x: number, y: number)
  constructor(s: string)
  constructor(xs: any, y?: any) {

  }
}
// 不能有类型参数
// 不能有返回值类型


// super 调用this之前super()
class Base {
  k = 4;
}
class SuperBase extends Base {
  constructor() {
    super()
  }
}


// methods
class PointM {
  x: number;
  y: number;
  scale(n: number): void {
    this.x *= n
    this.y *= n
  }
}

let x: number = 0;

class C {
  x: string = "hello";

  m() {
    // This is trying to modify 'x' from line 1, not the class property
    // x = "world";
    // this.x = "world"
    // Type 'string' is not assignable to type 'number'.
  }
}




// getter setter
class CLength {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}


// 索引签名
class MyClass {
  [s: string]: boolean | ((s: string) => boolean)
  constructor(){

  }
  check(s: string): boolean{
    return this[s] as boolean
  }
}


interface Pingable {
  ping(): void;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
 
// class Ball implements Pingable {
  // Class 'Ball' incorrectly implements interface 'Pingable'.
  // Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
  // pong() {
  //   console.log("pong!");
  // }
// }
