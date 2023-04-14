# es 模块

1. import

- 命名导入

```
  import { something } from './Module'
  import { something as somethingElse} from './Module'
```

- 命名空间导入

  ```
  import * as module from './module.js'

  ```

  源模块中的所有项作为一个对象导入，源模块中所有的命名导出将作为属性和方法暴露在这个对象:module.somthing;
  默认导出项 module.default

- 默认导入（导入源模块中的默认导出项）

```
import something from './module.js';
```

- empty import
  (这个对于 polyfill 很有用，或者导入的代码主要的目的是为了处理原型相关的。)

  ```
  import './module.js';
  ```

- 动态导入 dynamic import (使用 动态导入 API 导入模块。)

  ```
    import('./modules.js').then(({ default: DefaultExport, NamedExport })=> {
      // 用模块做一些处理
    })
  ```

2. 导出 export

```
const something = "value"
export { something }
export { something as somethingElse}
export const something1 = true
export default something

```


# rollup.config.js
各种格式的fomart bundle.js文件是如何运行的？

iife
面向 node.js 的 CommonJs
面向浏览器的 AMD 两套标准


