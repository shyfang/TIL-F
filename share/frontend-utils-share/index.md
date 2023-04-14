- 背景及目标
  lodash/dayjs/numberal 等各种工具库
  没有找到一个能很好满足全部需求的开源工具库
  项目之间复用难

- 目标：

1. 实现一个 Javascript 工具函数库
2. 支持 Typescript
3. 团队协作 commit message 格式约束
4. Prettier 代码格式化，ESlint 校验
5. ? 发包前自动升级版本并构建

- 技术学习：

1. rollup 工程化项目
2. 配置 rollup 和 ts
3. 如何编写脚本，构建并发布自己的工具库到 npm 仓库
4. jest 单元测试 和 typedoc 文档生成

- 依赖库
  [rollup:https://www.rollupjs.com/] 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。
  typescript javascript 的超集，支持类型定义。
  typedoc 生成库文档 jsdoc
  jest 用于代码单元测试

# 步骤

1. 搭建项目文件结构，初始化 package.json

```
  mkdir frontend-utils
  cd frontend-utils
  npm init -y

  touch index.ts
```

2. 初始化 typescript 环境, 配置 TypeScript tsconfig.json

```
  npm install typescript --save-dev
  // yarn add typescript -D

  // 快速生成tsconfig.json
  tsc --init

  修改tsconfig.json配置?

  配合修改package.json文件 main module types files?


```

3. rollup 安装了 rollup，以及支持 TS、处理路径
   Rollup 配置文件每个[配置项](https://www.rollupjs.com/guide/big-list-of-options)的具体含义可以参考

   Rollup 可用[插件](https://github.com/rollup/plugins)列表可以参考

3.1 安装 rollup
[rollup](https://www.rollupjs.com/guide/tutorial#%E5%AE%89%E8%A3%85%E6%9C%AC%E5%9C%B0%E7%9A%84-rollup)

```
  npm install rollup --save-dev
```

// yarn -D add rollup

3.2 安装依赖

为了支持 typescript 语法，安装 @rollup/plugin-typescript、rollup-plugin-dts（方便生成 ts 声明文件） 和 typescript：

```
npm install @rollup/plugin-typescript rollup-plugin-dts typescript --save-dev

```

其中某个 package 需要依赖 tslib，所以安装 tslib:

```
$ npm install tslib --save-dev

```

3.3 配置 rollup.config.js

```
  // 可以同时生成支持 amd/cjs/iife的通用打包格式 和 ESModule 的文件
  在前面 tsconfig.json 配置下还会生成 index.d.ts 文件用于指明类型声明?

```

3.4 修改 package.json scripts

```
  "dev": "rollup -w -c",
  "build": "rollup -c" // rollup --config
```

```
  "main": "./dist/index.js",
   "module": "./dist/index.mjs",
   "types": "./dist/index.d.ts",
   "files": [
   "dist"
   ]
```

4. git 初始化

```
  git init

  // .gitignore
  touch .gitignore
```

5. jest 单元测试

```
npm install --save-dev jest ts-jest @types/jest

```

6. typedoc

7. 本地快速开发调试？

# TODO:

1. rollup 配置 ts 配置 package.json package-lock.json

registry = "http://npm-registry.abakus.cn/"