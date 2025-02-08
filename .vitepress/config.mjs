/***
 * @fileoverview 配置文件
 * @description https://vitepress.dev/zh/reference/site-config
 */

import path from "node:path"
import { defineConfig } from "vitepress";
import themeConfig from "./theme-config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "有理想",

    description: "",

    base: "/vitepress-blog",
    
    srcDir: "src",

     // 默认主题配置
     themeConfig,

    /**
     * Markdown 配置
     * Detail: https://vitepress.dev/zh/reference/site-config#markdown
     */
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

    /**
     * Vite 配置
     * Detail: https://vitepress.dev/zh/reference/site-config#vite
     */
    vite: {
        resolve: {
            // 别名
            alias: {
                "@": path.resolve(__dirname, "../src")
            }
        }
    },
});
