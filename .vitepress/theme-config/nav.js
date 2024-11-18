/**
 * @fileoverview 顶部导航栏配置
 * Detail: https://vitepress.dev/zh/reference/default-theme-nav
 */

export default [
  { text: '首页', link: '/' },
  /* {
     text: '网络与计算机',
    link: '/page/network/index',
    activeMatch: '/page/network/'
  },
  {
    text: '前端基础',
    link: '/page/hcj/index',
    activeMatch: '/page/hcj/'
  }, */
  {
    text: 'Typescript',
    activeMatch: '/page/typescript/',
    link: '/page/typescript/index'
  },
  {
    text: '框架与跨端',
    activeMatch: '/page/(vue|react)/',
    items: [{ text: 'Vue', link: '/page/vue/index' }]
  }
];
