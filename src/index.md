---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: '有理想'
  text: ''
  tagline: '等风来不如追风去，生活中有太多的期待，你不必准备好再出发。'
  image:
    src: /avatar.jpg
    alt: VitePress
  actions:
    - theme: brand
      text: 阅读文章
      link: /page/home
    - theme: alt
      text: 关于我
      link: /page/about-me
    - theme: alt
      text: ↗️ 问题讨论
      link: https://github.com/xiechen1201/vitepress-blog/issues

features:
  - title: 技术笔记
    icon: 📒
    details: 从基础到深入，剖析各种编程技术与工具，涵盖实用代码片段、最佳实践及高效开发技巧，分享阅读也方便自己。
  - title: 生活分享
    icon: 🏃
    details: 分享个人生活中的有趣见闻、旅行体验和实用生活小技巧，记录自己别样精彩的日常。
  - title: 持续更新
    icon: 💪
    details: 定期发布最新内容，保持活跃，不断积累实用的技术与生活干货。
---

<style>
@keyframes blue-glow {
  0% {
    box-shadow: 0 0 10px rgba(40, 69, 168, 0.2), 0 0 20px rgba(40, 69, 168, 0.1);
  }
  100% {
    box-shadow: 0 0 20px rgba(40, 69, 168, 0.8), 0 0 40px rgba(40, 69, 168, 0.6);
  }
}

.image-src{
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4);
  animation: blue-glow 1.5s infinite alternate;
}
</style>
