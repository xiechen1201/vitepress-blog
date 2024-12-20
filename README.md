# vitepress-blog

本仓库是基于 [Vitepress](https://vitepress.dev/zh/) 搭建的个人学习笔记网站，用于记录学习过程中的笔记和心得，不适用商业。

## Git 提交规范

```
- feat: 新功能（feature）

- fix: 修复 bug

- docs: 文档修改

- style: 代码格式调整（如空格、格式化、缺失的分号等），不影响代码逻辑

- refactor: 代码重构，不包含新功能或 bug 修复

- perf: 性能优化

- test: 添加测试或修改现有测试

- chore: 构建过程或辅助工具的变动，不影响代码逻辑（如构建配置修改）

- ci: CI 配置相关的修改

- build: 构建系统或外部依赖的修改（如升级 npm 包）

- revert: 回滚某个之前的 commit

- merge: 合并分支的提交
```

## 项目结构

```
- .github #配置文件
- .vitepress #配置文件
- src #源文件目录
    - assets #全局静态资源
    - page
        - typescript
        - vue
        - web-developer-base
    - public #静态资源，不会被 vitepress 处理
    - index.html
- .gitignore
- package.json
```
