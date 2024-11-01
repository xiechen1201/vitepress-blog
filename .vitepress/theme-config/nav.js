/**
 * @fileoverview 导航栏配置
 */

// Detail: https://vitepress.dev/zh/reference/default-theme-nav
export default [
  { text: '首页', link: '/' },
  {
    text: '网络与计算机',
    link: '/page/network/index',
    activeMatch: '/page/network/'
  },
  {
    text: '前端基础',
    link: '/page/hcj/index',
    activeMatch: '/page/hcj/'
  },
  {
    text: '框架',
    link: '/page/framework/index',
    activeMatch: '/page/framework/'
  }
];
