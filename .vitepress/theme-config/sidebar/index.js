/**
 * @fileoverview 侧边栏配置
 */
import path from "node:path";
import { generateSidebar } from "../../../src/utils/index";
import network from "./network";
import vue from "./vue";

function getSidebar(directoryName) {
    const directoryPath = path.join(
        __dirname,
        "../../../src/page/",
        directoryName
    );
    console.log(generateSidebar)
    return generateSidebar(directoryPath);
}

export default {
    "/page/home/": getSidebar('home'),
    "/page/engineering/": getSidebar("engineering"),
    "/page/typescript/": getSidebar("typescript"),
    "/page/vue/": vue,
    "/page/network/": network
};
