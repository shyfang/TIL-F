# 1.js 数据类型
- 1.1 JavaScript 数据类型有哪些？
   基本类型：Number String Boolean Undefined null symbol BigInt
   引用类型：Object Array Function 其他：Map Set Date Regexp
    
  - 1.1.1 ES6 Symbol\BigInt如何使用？
    Symbol 代表独一无二的值，最大的用法是用来定义对象的唯一属性名。(@TODO:举例待补充)
    BigInt 可以表示任意大小的整数（xxxn）

  - 1.1.2 值类型数据 和 引用类型数据区别？
    值类型数据存储在栈中，占据空间小、大小固定
    引用类型数据存储在堆中，占据空间大、大小不固定
    属性基本类型，拷贝基本基本类型的值；引用类型，拷贝的是内存地址；

- 1.2 数据判断
  - 1.2.1 实现一个判断数据类型的方法？
    typeof: 判断基础类型

    instanceof：instanceof实现原理? 右边变量的 prototype 在左边变量的原型链上即可
    ```javascript
      while (x.__proto__) {
         if (x.__proto__ === y.prototype) {
           return true;
         }
         x.__proto__ = x.__proto__.__proto__;
       }
       if (x.__proto__ === null) {
         return false;
       }

       function myInstanceof(left, right) {
         // 这里先用typeof来判断基础数据类型，如果是，直接返回false
         if(typeof left !== 'object' || left === null) return false;
         // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
         let proto = Object.getPrototypeOf(left);
         while(true) {
             if(proto === null) return false;
             if(proto === right.prototype) return true;//找到相同原型对象，返回true
             proto = Object.getPrototypeof(proto);
         }
       }
    ```

    Object.prototype.toString.call(obj).slice(8, -1)
    ```javascript
    /**判断数据类型*/
    export function judgeDataType(item) {
      if(typeof item !== object) {
        return typeof item
      }
      return Object.prototype.toString.call(item).slice(8, -1);
    }
    ```


  - 1.2.2 判断是否是数组？
    ```javascript
      Array.isArray(arr); // true
      arr.__proto__ === Array.prototype; // true
      arr instanceof Array; // true
      Object.prototype.toString.call(arr); // "[object Array]"
    ```

  - 1.2.3 判断数据是否为空？
    ```javascript
      /**判断数据是否为空*/
      export function judgeData(item) {
        switch (judgeDataType(item)) {
          case "String":
            return Boolean(item.trim());
          case "Array":
            return item.length !== 0;
          case "Object":
            return JSON.stringify(item) !== "{}";
          case "Set":
          case "Map":
            return item.size !== 0;
          default:
            return Boolean(item);
        }
      }

      // 空对象判断
      function isEmpty(obj) {
        for (const key in object) {
          return false
        }
        return true
        // const keys = Object.keys(obj)
        // return keys.length === 0 ? true : false
      }
    ``` 

- 1.3 深浅拷贝
[深浅拷贝](https://github.com/sisterAn/JavaScript-Algorithms/issues/55#event-3378899841)
  - 1.3.1 浅拷贝
    浅拷贝，指的是创建新的数据，这个数据有着原始数据【属性值】的一份精确拷贝
    浅拷贝：只拷贝一层，属性是基本类型，拷贝基本基本类型的值，属性是引用类型，拷贝的是内存地址
    
    对象、数组的浅拷贝
    Object.assign() Object.create {...spread} 
    Array.prototype.slice(), Array.prototype.concat()
  ```javascript
    // Object.assign(dest, [src1, src2, src3...])
    let user = { name: "John" };
    let permissions1 = { canView: true };
    let permissions2 = { canEdit: true };

    // 将 permissions1 和 permissions2 中的所有属性都拷贝到 user 中
    Object.assign(user, permissions1, permissions2);
  ```

  ```javascript
    // 拷贝类型为引用类型: 浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址
    var obj = {
      age: 18,
      nature: ['smart', 'good'],
      names: {
        name1: 'fx',
        name2: 'xka'
      },
      love: function () {
        console.log('fx is a great girl')
      }
    }
    var newObj = Object.assign({}, obj);
    ```

  - 1.3.2 深拷贝 原理
  
  ```javascript
  // 深度拷贝deepClone
  function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== 'object') return obj
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj)
    let cloneObj = new obj.constructor()
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, cloneObj)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 实现一个递归拷贝
        cloneObj[key] = deepClone(obj[key], hash)
      }
    }
    return cloneObj
  }

  // 广度优先 深度优先的 拷贝函数?
  ```
  - 1.3.3 user.name 与 Object.defineProperty

- 1.4 浮点数运算
  0.1 + 0.2 !== 0.3？解决办法？



