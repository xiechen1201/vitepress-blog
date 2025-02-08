/**
 * @fileoverview 顶部导航栏配置
 * Detail: https://vitepress.dev/zh/reference/default-theme-nav
 */

export default [
    {
        text: "首页",
        activeMatch: "/page/home/",
        link: "/page/home/index"
    },
    {
        text: "工程化",
        activeMatch: "/page/engineering/",
        link: "/page/engineering/index"
    },
    {
        text: "Typescript",
        activeMatch: "/page/typescript/",
        link: "/page/typescript/index"
    },
    {
        text: "框架与跨端",
        activeMatch: "/page/(vue|react)/",
        items: [{ text: "Vue", link: "/page/vue/index" }]
    }
];
