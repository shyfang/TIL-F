
// module 脚本总算是defer
// defer:
  // 下载外部模块脚本 <script type="module" src="..."> 不会阻塞 HTML 的处理，它们会与其他资源并行加载。
  // 模块脚本会等到 HTML 文档完全准备就绪（即使它们很小并且比 HTML 加载速度更快），然后才会运行。
  // 保持脚本的【相对顺序】：在文档中排在前面的脚本先执行。
// async
  // async 特性与 defer 有些类似。它也能够让脚本不阻塞页面。但是，在行为上二者有着重要的区别。

  // async 特性意味着脚本是完全独立的：

  // 浏览器不会因 async 脚本而阻塞（与 defer 类似）。
  // 其他脚本不会等待 async 脚本加载完成，同样，async 脚本也不会等待其他脚本。
  // DOMContentLoaded 和异步脚本不会彼此等待：
  // DOMContentLoaded 可能会发生在异步脚本之前（如果异步脚本在页面完成后才加载完成）
  // DOMContentLoaded 也可能发生在异步脚本之后（如果异步脚本很短，或者是从 HTTP 缓存中加载的）

// 动态脚本 默认情况下，动态脚本的行为是“异步”的。
// 它们不会等待任何东西，也没有什么东西会等它们。
// 先加载完成的脚本先执行（“加载优先”顺序）



// 1. 声明前导出export import
export let months = [];
export const MODULES_STANDARD = 2023;
export class User{
  constructor(name){
    this.name = name
  }
}
export function SayHi(){}

// class 和 function 导出, 末尾不需要加分号

// 2. 导出和声明分开
function SayHi1(){}
function SayHi2(){}
export { SayHi1, SayHi2 }

// import *
// import {a, b, c} from './test.js'
// import * as api from './module.js'

// import as
// import { sayHi as hi } from './module.js'



// export as
// export { sayHi as hi } from './module.js'

// export default
// export class User{}
// import User from ''

// 命名导出 和 默认导出区别
// export class User{} // 命名导出
// import {User} from '' // 

// export default class User{} // 默认导出
// import User from ''


// function sayHi(user) {
//   alert(`Hello, ${user}!`);
// }

// // 就像我们在函数之前添加了 "export default" 一样
// export {sayHi as default};

// import {default as User, sayHi} from './user.js';
// import * as user from ''
// let User = user.default




// 为了避免这种情况并使代码保持一致，可以遵从这条规则，即导入的变量应与文件名相对应，例如：

// import User from './user.js';
// import LoginForm from './loginForm.js';
// import func from '/path/to/func.js';



// 重新导出 re-export
// export { default as User} from './module'

// 重新导出默认导出.//
// export {x [as y], ...} from "module"
// export * from './module' // 重新导出命名的导出。不会重新导出默认的导出
// export { default } from './module.js' // 重新导出默认的导出




// 总结

// 在声明一个 class/function/… 之前：
// export [default] class/function/variable ...
// 独立的导出：
// export {x [as y], ...}.
// 重新导出：
// export {x [as y], ...} from "module"
// export * from "module"（不会重新导出默认的导出）。
// export {default [as y]} from "module"（重新导出默认的导出）。

// 导入命名的导出：
// import {x [as y], ...} from "module"
// 导入默认的导出：
// import x from "module"
// import {default as x} from "module"
// 导入所有：
// import * as obj from "module"
// 导入模块（其代码，并运行），但不要将其任何导出赋值给变量：
// import "module"



// 动态导入
