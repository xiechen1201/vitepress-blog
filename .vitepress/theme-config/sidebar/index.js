/**
 * @fileoverview 侧边栏配置
 */
import path from "node:path";
import { generateSidebar } from "../utils/index";

import network from "./network";
import vue from "./vue";

function getSidebar(directoryName) {
    const directoryPath = path.join(
        __dirname,
        "../../../src/page/",
        directoryName
    );
    return generateSidebar(directoryPath);
}

// Detail: https://vitepress.dev/zh/reference/default-theme-sidebar
export default {
    "/page/engineering/": getSidebar('engineering'),
    "/page/typescript/": getSidebar('typescript'),
    "/page/vue/": vue,
    "/page/network/": network
};
