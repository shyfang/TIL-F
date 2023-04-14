[参考文档](https://pengfeixc.com/blogs/javascript/tsconfig)
[blog](https://pengfeixc.com/)
[config](https://juejin.cn/post/7011887191013982216)
- 非编译配置
  files 选项用于设置需要编译的文件
  include: 与 files 类似，但是可以使用模式匹配 src/\*.ts
  exclude: 与 include 相反，排除某些文件，也支持使用模式匹配，清理 js 文件

模式匹配
在用模式匹配时，可以不用显示添加.ts 后缀，默认情况下 typescript 会自动寻找.ts 文件和.d.ts 文件

```
src/**/*等价为src/**/*.ts和src/**/*.d.ts（如果allowJs为true，还包括src/**/*.js）。
```

- compilerOptions
  outDir:ts 编译后的 js 文件，与源文件都在同一个目录下。使用 outDir 选项可以指定编译后的文件所在的目录。清理之前编译生成的 js 文件。
