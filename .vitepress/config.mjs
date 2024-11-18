/***
 * @fileoverview 配置文件
 * @description https://vitepress.dev/zh/reference/site-config
 */

import { defineConfig } from 'vitepress';
import nav from './theme-config/nav';
import sidebar from './theme-config/sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-blog',

  srcDir: 'src',

  title: '有理想',

  description: '',

  // Markdown 配置
  // 详见：https://vitepress.dev/zh/reference/site-config#markdown
  // MarkdownOption：https://github.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts#L50
  markdown: {
    // 代码块主题
    theme: 'night-owl',

    // 代码块行号
    lineNumbers: true,

    // 高亮块文字
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },

  // 默认主题配置
  themeConfig: {
    nav,

    sidebar,

    // 要显示标题大纲的层级
    outline: 'deep',

    // 社交外链
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiechen1201' },
      {
        icon: {
          svg: `<svg t="1730428630952" class="icon" viewBox="0 0 1121 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4305" xmlns:xlink="http://www.w3.org/1999/xlink" width="218.9453125" height="200"><path d="M1118.415339 145.958083l-91.292562-4.976133s-34.528264-123.607802-192.99438-134.698314c-158.466116-11.086281-262.152463-4.12562-262.152463-4.125619s117.54843 76.355702 70.440198 212.606942c-35.002182 73.48681-90.378579 133.530446-149.419372 202.536198L102.586182 871.931769c363.426909-5.437355 577.688331-8.158149 642.788496-8.158149 182.563967 0 336.853686-161.546579 330.540429-341.288199-4.341421-123.531636-42.885289-151.441983-56.133818-205.544727-13.244298-54.102744 13.269686-140.381091 98.63405-170.982611z" fill="#31CC79" p-id="4306"></path><path d="M491.401521 418.769455C300.311273 638.976 0 989.336331 0 989.336331c540.265785 144.688661 789.186645-206.471405 828.166347-328.03967 52.257851-162.993719-21.580165-242.527207-63.369521-268.465719-141.692826-87.945521-246.822083-4.684165-273.395305 25.938513z" fill="#93E65C" p-id="4307"></path><path d="M499.390413 410.006215c35.907702-34.739835 135.713851-98.99795 266.595438-17.763438 41.950149 26.040066 116.084364 105.890909 63.619174 269.540496-15.220364 47.463669-62.315901 129.789884-146.097719 204.144132-86.671868 0.592397-280.808727 3.143934-582.410579 7.654612l373.214149-434.603372c8.145455-9.520661 16.218975-18.863603 24.174017-28.092298z" fill="#60DB69" opacity=".86" p-id="4308"></path></svg>`
        },
        link: 'https://www.yuque.com/xiechen'
      }
    ],

    // 搜索
    search: {
      provider: 'local'
    }
  }
});
