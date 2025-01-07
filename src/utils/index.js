const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../page/typescript/函数与泛型");

readDirectory(directoryPath);


/**
 * @description 读取目录
 * @param {String} directoryPath 
 */
function readDirectory(directoryPath) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        const result = files.map((file) => ({ text: file }));
        console.log(result);
    });
}
