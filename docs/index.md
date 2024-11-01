---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: '有理想'
  text: ' '
  tagline: '一个博客网站'
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
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<!-- <div id='box' >
  <img id='content' src="/assets/imgs/avatar.jpg" class="image-src tilt-content" />
</div>

<script setup>
import { useTemplateRef, onMounted } from 'vue'

onMounted(()=>{
  let box = document.getElementById('box')
  let img = document.getElementById('content')
 
 box.addEventListener('mousemove', (e) => {
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;

    // 获取鼠标在元素内的相对位置
    const x = e.offsetX;
    const y = e.offsetY;

    // 根据鼠标位置计算旋转角度
    const rotateX = ((boxHeight / 2 - y) / boxHeight) * 50; // 沿 X 轴倾斜
    const rotateY = ((x - boxWidth / 2) / boxWidth) * 50;   // 沿 Y 轴倾斜

    // 设置 3D 旋转效果
    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
})
</script> -->

<style>
.image-src{
  margin: 0 auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
}
</style>
