// typeof 用于获取一个变量 或 属性 的类型


// 用于判断基本类型 typeof
// 搭配其他类型 ReturnType<T>

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
/// type K = boolean

function f() {
  return { x: 1, y: 2 }
}
const N = typeof f

// type ReturnFErr = ReturnType<f> //  // values 和 types 不同
type ReturnF = ReturnType<typeof f>

// 使用限制： typeof 只能对标识符（比如变量名）和属性使用
// let shouldContinue: typeof msgbox("Are you sure you want to continue?"); // 本意是获取返回值的类型
// let shouldContinue: ReturnType<typeof msgbox>


// 1. 对象使用typeof
const person = { name: "kevin", age: "18" }
type Kevin = typeof person;

// type Kevin = {
// 		name: string;
// 		age: string;
// }


// 2. 函数使用typeof
function identity<T>(args: T): T {
  return args
}
type IdentityType = typeof identity
//type IdentityType = <T>(args: T) => T



// 3. 对enum使用typeof
// enum
enum UserResponse {
  No = 0,
  Yes = 1
}
type EnumTypeResult = typeof UserResponse
// result的结果类似于下边
// {
//	"No": number,
//  "YES": number
// }
// 不过对一个 enum 类型只使用 typeof 一般没什么用，通常还会搭配 keyof 操作符用于获取属性名的联合字符串：
type EnumResult = keyof EnumTypeResult
