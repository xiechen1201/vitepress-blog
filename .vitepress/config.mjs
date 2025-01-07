/***
 * @fileoverview 配置文件
 * @description https://vitepress.dev/zh/reference/site-config
 */

import { defineConfig } from "vitepress";
import themeConfig from "./theme-config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "有理想",

    description: "",

    base: "/vitepress-blog",
    
    srcDir: "src",

    // Markdown 配置
    // 详见：https://vitepress.dev/zh/reference/site-config#markdown
    // MarkdownOption：https://github.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts#L50
    markdown: {
        // 代码块主题
        theme: "night-owl",

        // 代码块行号
        lineNumbers: true,

        // 高亮块文字
        container: {
            tipLabel: "提示",
            warningLabel: "注意",
            dangerLabel: "危险",
            infoLabel: "信息",
            detailsLabel: "详细信息"
        }
    },

    // 默认主题配置
    themeConfig
});
