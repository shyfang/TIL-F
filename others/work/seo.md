- 渲染
SSR: Server-side rendering
CSR: Client-side rendering
Rehydration:
Prerendering:

- 性能指标
TTFB
FCP
INP
TBT：网页加载期间被阻塞的时间


- 服务器端渲染 the full HTML for a page on the server in response to navigation-generating pages on the server 
快速FCP 避免像客户端发送大量JS
减少TBT:
higher TTFB：在服务器上生成网页需要时间 


- 静态渲染： happens at build-time，无需在服务器上动态生成网页的HTML。可以部署到多个CDN

fast FCP
lower TBT and INP
fast TTFB

缺点：
必须为每个可能的网址生成单独的 HTML 文件

- 预渲染
- 客户端渲染
使用 JavaScript 直接在浏览器中呈现网页。所有的逻辑、数据获取、路由等都在客户端处理
bundle.js -> render app

![Alt text](image.png)

Rehydration


- next.js
既提供静态、又提供服务器渲染




---------
- 加载、互动和视觉稳定性
（指标包括加载体验、交互性和页面内容的视觉稳定性）
LCP-Largest Contentful Paint
FID-First Input Delay ;TBT
CLS-cumulative layout shift


加载体验
TTFB
FCP
都有助于诊断LCP问题

交互体验
TBT
TTI
对于FID至关重要


- LCP
用于衡量标准报告视口内可见的最大内容元素的渲染时间。
LCP考虑哪些元素：img\imgae\video\url背景元素\..块级元素

改善：
阻塞的js、css、






