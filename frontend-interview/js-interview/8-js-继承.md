- new
  创建一个空的简单JavaScript对象（即{}）；
  链接该对象（即设置该对象的构造函数）到另一个对象 ；
  将步骤1新创建的对象作为this的上下文 ；
  如果该函数没有返回对象，则返回this。


  ```javascript
    function myNew(constructor, ...args) {
      let obj = Object.create(constructor.prototype) // 新创建对象的原型
      // obj.__proto__ = constructor.prototype // 有性能问题，所以用Object.create替换
      
      // 调用构造函数，并将其上下文设置为新创建的对象
      const instance = constructor.apply(obj, args);

      // 如果构造函数返回了一个对象，则返回该对象；否则返回新创建的对象
      return (typeof instance === 'object' && instance !== null) ? instance : obj;
    }
  ```