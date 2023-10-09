// 使用 索引访问类型（indexed access type） 查找另外一个类型上的特定属性
// 索引名是一个类型！！！

// type Person = { age: number; name: string; alive: boolean };
// type PersonAge = Person["age"];

// type I1 = Person["age" | "name"];  
// // type I1 = string | number

// type I2 = Person[keyof Person];
// // type I2 = string | number | boolean

// type AliveOrName = "alive" | "name";
// type I3 = Person[AliveOrName];  
// // type I3 = string | boolean


const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number];
type Age = typeof MyArray[number]["age"]
type Age2 = Person["age"]

type key = "age";
type Age3 = Person[key];


// 假设有这样一个业务场景，一个页面要用在不同的 APP 里，比如淘宝、天猫、支付宝，根据所在 APP 的不同，调用的底层 API 会不同，
// 数组
const APP = ['TaoBao', 'Tmall', 'Alipay'] as const; // 注意const 将数组变为readonly的元组类型
type typeOfAPP = typeof APP; //typeof 获取APP的类型
// type typeOfAPP = readonly ["TaoBao", "Tmall", "Alipay"]
type app1 = typeof APP[number] // 直接通过索引类型 获取 字符串联合类型
// type app = "TaoBao" | "Tmall" | "Alipay"
function getPhoto(app: app1) {
  // ...
}