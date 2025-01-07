/**
 * @fileoverview 侧边栏配置
 */
import path from "node:path";
import { generateSidebar } from "../utils/index";

import network from "./network";
import vue from "./vue";

const typescriptPath = path.join(__dirname, "../../../src/page/typescript");

// Detail: https://vitepress.dev/zh/reference/default-theme-sidebar
export default {
    "/page/typescript/": generateSidebar(typescriptPath),
    "/page/vue/": vue,
    "/page/network/": network
};
