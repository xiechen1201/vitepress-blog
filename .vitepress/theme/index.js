/**
 * @fileoverview 拓展默认主题
 * @description https://vitepress.dev/zh/guide/extending-default-theme
 */

import DefaultTheme from 'vitepress/theme';
import './custom.css';

import XTextLight from './components/XTextLight.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('XTextLight', XTextLight);
  }
};
