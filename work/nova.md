- 项目1 NovaDax交易所  核心交易功能开发
  项目介绍：NovaDax是一家全球化虚拟货币交易所，为用户提供虚拟币行情、交易、理财、数字银行卡交易等功能。
  响应式设计系统的开发与实现：利用媒体查询和栅格系统等技术进行封装，使团队能更快速地开发响应式页面，确保用户在PC、H5、App，都能获得最佳的浏览体验
  开发核心交易功能：实现TradingView k线图、深度图、虚拟币买卖、交易记录等功能,【基于WebSocket（sokcet.io）实现客户端和服务器之间的双向数据通信，保持数据的实时高效更新】
  项目从CSR到SSR的迁移：通过next.js技术框架，将项目从客户端(CSR)渲染迁移到服务端(SSR)渲染，提高首屏渲染速度和SEO效果，核心性能指标评分提升约50%
  解决SSR环境下日志和监控问题：集成错误监控与追踪工具Sentry，以便实时监测和解决线上错误和异常情况，从而提高程序的稳定性和可靠性
  使用React Native等技术开发APP交易功能
  开发技术栈: Next.js、Express、React、Sass、Sentry等技术

  1. 响应式开发[[wiki](https://wiki.abakus.cn/pages/viewpage.action?pageId=38008685)]
    - 页面构成：columns gutters margins
    - 实现思路：思路 -》实现 -》使用
      （1）思路
      响应式：断点设计 决定 栅格数量 12 、8 、4
      columns宽度采用百分比布局
      断点区间内 columns数量、gutters配置固定 columns伸缩
      最大宽度1200px 其余margin
      gutters由columns的padding构成 左右均分
      （2）实现
      $breakpoints: (
        xs: 360px,
        sm: 600px,
        md: 840px,
        lg: 1024px
      );
      grid-container: 
      row:
      col-xx：
      col-offset-xx：

      断点：栅格 + grid-container row设置
      默认 xs 4 gutter-width: 16 -》 generate-columns(xs, 4, 16);
      >= 600 sm generate-columns(sm, 8, 16);
      >= 840 md generate-columns(md, 12, 24);
      >= 1248


      mixin方法：mq responsive
      @mixin mq($name, $large: null, $medium: null, $small: null, $xsmall: null){} 
      @mixin responsive($size) {}

    - 组件库中的具体开发
    GridContainer Row col

    - 其他响应式解决方案
    应用到的相关技术：媒体查询、弹性布局flex、相对单位: % rem em

    总结：根据响应式页面构成，通过媒体查询、flex布局等实现栅格系统
  2. CSR -> SSR next.js 性能优化[性能](https://www.notion.so/a588f1fdb5e64bc285d77359c9f1f27e)]
  快速响应的网站提供更好的用户体验。用户期待内容快速加载和交互流畅的 Web 体验
  浏览器相关 渲染 缓存
  性能指标？
  优化方法？
  优化实践？
  性能监控



  3. sentry监控




  其他公共模块：数据处理(big.js)、公共hook（a-hook好用的use hook库）、组件库（组件开发思路）、redux状态管理、主题色替换、fetch请求封装、app-h5通信
  国际化处理方案 i18n