1. 模块化

- 模块与“常规”脚本 有什么不同？
  use strict
  模块级作用域（每个 <script type="module"> 都存在独立的顶级作用域。对于模块，我们使用导入/导出而不是依赖全局变量）
  模块代码仅在第一次导入时被解析
  在一个模块中，“this” 是 undefined

  模块脚本是延迟的(defer, async https://zh.javascript.info/script-async-defer)

不同模块：https://juejin.cn/post/7051236803344334862
https://github.com/zhangshichun/rollup-demos/tree/master/js-modules
https://www.cnblogs.com/chenwenhao/p/12153332.html


2. ts 如何配置 tsconfig.js

3. package.json 配置 packgage-lock.json

4. rollup 配置 rollup.config.js

5. prettier eslint 等 commitzen

6. 如何实现单元测试 jest

7. typedoc 文档

8. npm 发包

9. 本地快速调试

10. 可以启动本地服务打开项目，并监听（watch）项目的变化，实时更新网页

用内部 gitlab 管理代码（没有的话，公网 github 或 gitee 也可以）
需要内部 npm 域（没有的话，公网 npm 也可以）

作用：让小组其他成员可以方便下载（npm install -g xx），其次，可以很方便的管理版本

配置 package.json
配置入口文件 main.js
发布到内部 npm 域
开发脚本过程中的测试？
https://developer.aliyun.com/article/916758

# rollup

https://www.pengfeixc.com/blogs/javascript/rollup-with-typescript
通过 rollup 可以打包项目
支持 typescript 语法
可以启动本地服务打开项目，并监听（watch）项目的变化，实时更新网页


https://www.51cto.com/article/721480.html