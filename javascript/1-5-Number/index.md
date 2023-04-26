1. number
   常规数:(64位双精度浮点数) 常规整数不能安全地超过 (2^53-1) 或小于 -(2^53-1)
   BigInt:

? ？双精度浮点数 0.1 + 0.2 ！== 0.3
// 0.1 0.2 在二进制是无限循环小数，无法精确存储

2. 科学记数法
   let billion = 1e9; // 10 亿，字面意思：数字 1 后面跟 9 个 0
   let mcs = 1e-6; // 1 的左边有 6 个 0
    // util: 科学记数法转常规数字


3. 转换
   num.toString(base)

4. 舍入规则

Math.floor
Math.ceil
Math.round

<!-- toFixed(n) 得到的结果是一个字符串；如果小数部分比所需要的短，则在结尾添加零 -->

x.toFixed(n) // 这会向上或向下舍入到最接近的值，类似于 Math.round

5.  isFinite
    isNaN

6.  Object.is
    Object.is(NaN, NaN) // true
    Object.is(+0, -0)

7.  转换

    - 和 Number() // 如果一个值不完全是一个数字，就会失败；（忽略字符串开头或结尾的空格）
      parseInt // parseInt(str, radix) ，第二参数指定了数字系统的基数, 2 ≤ base ≤ 36
      parseFloat

8.  [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 的相关方法
