import fs from "node:fs";
import path from "node:path";

/**
 * @description 读取目录并返回结构化数据
 * @param {String} dirPath
 * @param {String} basePath
 * @returns {Array}
 *
 * 返回示例：
 * [
 *   {
 *      text: '文件名',
 *      link: '文件路径'
 *   },
 *   {
 *      text: '目录名',
 *      items: [
 *      {
 *        text: '文件名',
 *        link: '文件路径'
 *      }
 *      ]
 *   }
 * ]
 */
function readDirectoryToStructuredData(dirPath, basePath = "") {
    const files = fs.readdirSync(dirPath);
    const items = [];

    files.forEach((file) => {
        // path 拼接
        const fullPath = path.join(dirPath, file);
        // 获取文件和目录的信息
        const stats = fs.statSync(fullPath);

        // 如果是目录
        if (stats.isDirectory() && !file.includes("imgs")) {
            // 目录：递归读取，并返回 items
            const subDirResult = readDirectoryToStructuredData(
                fullPath,
                path.join(basePath, file)
            );
            items.push({
                text: file.slice(2),
                collapsed: true,
                items: subDirResult
            });
        } else if (stats.isFile()) {
            // 文件：返回单个文件对象
            const fileName = path.parse(file).name;
            let relativePath = path.join(dirPath.split("/src")[1], file);

            items.push({
                text: fileName.slice(2),
                link: relativePath
            });
        }
    });

    return items;
}

/**
 * @description 读取目录内的 tree.json 文件并返回 sidebar 数据
 * @param {String} dirPath 目录
 * @returns 
 */
function generateSidebar(dirPath) {
    let jsonPath = path.join(dirPath, "tree.json");
    let jsonContent = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    function getArr(menuArr, parentPath = "") {
        const items = [];

        menuArr.forEach((el) => {
            if (el.items) {
                const result = getArr(el.items, el.text);
                items.push({
                    text: el.text,
                    collapsed: true,
                    items: result
                });
            } else {
                items.push({
                    text: el.text,
                    link: path.resolve(
                        dirPath.split("/src")[1],
                        parentPath,
                        el.text + ".md"
                    )
                });
            }
        });

        return items;
    }

    return getArr(jsonContent);
}

export { readDirectoryToStructuredData, generateSidebar };
