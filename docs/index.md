---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: '有理想'
  text: ''
  tagline: '等风来不如追风去，生活中有太多的期待，你不必准备好再出发。'
  image:
    src: /assets/imgs/avatar.jpg
    alt: VitePress
  actions:
    - theme: brand
      text: 阅读文章
      link: /markdown-examples
    - theme: alt
      text: 关于我
      link: /api-examples

features:
  - title: 技术笔记
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: 生活分享
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: 持续更新
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
