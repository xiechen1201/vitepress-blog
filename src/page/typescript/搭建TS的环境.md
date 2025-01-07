要使用 TS 语言肯定要进行安装：

```bash
$ npm install typescript -D
```

安装完成后我们只需要执行 tsc 命令即可完成编译：

```bash
$ npx tsc ./src/index.ts
```



默认情况下，TS 会有一些默认的配置：

+ 默认当前的执行环境为 DOM 浏览器；
+ 如果 TS 文件中没有出现`import`、`export`模块化语句，则认为当前文件使用过 script src 全局执行的；
+ 编译的代码结果是 ES7 的语法；



如果我们想要更改以上的默认行为就需要创建一个配置文件，当然你也可以通过 CLI 参数的形式来覆盖默认的行为，但是这样会非常的麻烦：

```bash
# 使用 tsc 初始化一个配置文件
$ npx tsc --init

Created a new tsconfig.json with:                                                                         
                                                                                                       TS 
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true


You can learn more at https://aka.ms/tsconfig
```

这个时候你的根目录下就会多出一个 tsconfig.json 的配置文件。



使用配置文件后，使用 tsc 命令编译 TS 文件的时候就不再需要跟具体的文件名了，否则就会忽略配置文件：

```bash
$ npx tsc
```



我们可以配置为一个 npm 的命令，然后进行文件监听进行持续编译：

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "tsc --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^5.3.2"
  }
}
```



TS 配置文件常用的配置：

```json
{
  // 配置编译选项
  "compilerOptions": {
    // 配置编译后结果使用的 ES 的版本
    "target": "ES2016",
    
    // 配置编译结果使用的模块化标准
    "module": "CommonJS",
    
    // 表示 TS 可以使用哪些库，使用哪些全局的环境
    "lib": [
      "ES2017",
      "DOM"
    ],
    
    // 配置编译结果的保存目录
    "outDir": "./dist",
    
    // 确保每个文件都是个单独的模块
    "moduleDetection": "force",
    
    // 开启严格的 null 空类型检查
    "strictNullChecks": true,
    
    // 编译结果删除 TS 中的注释
    "removeComments": true,
    
    // 启用ES模块化交互非ES模块导出
    "esModuleInterop": true,
    
    // TS发生错误停止编译
    "noEmitOnError": true,
    
    // 使用node的模块解析策略
    "moduleResolution": "Node"
  },
  
  // 编译文件夹下面的代码
  "include": [
    "./src"
  ],
  
  // 编译指定目录下的 ts 文件
  files: ["./src/index.ts"] // 只编译指定的文件
}
```

