# 云笺：功能全面的富文本编辑器

# 云笺 (Cloudpad) ✨

![Image](https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/online_import/5f290d4a1c3545eb9125c00b311278ca~tplv-noop.jpeg?rk3s=49177a0b&x-expires=1771656302&x-signature=YVmpyOmiFMCEja006mULn%2FDyxcw%3D&resource_key=0119ce16-7c76-47bc-ae79-76dd2066dff4&resource_key=0119ce16-7c76-47bc-ae79-76dd2066dff4)

![Image](https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/online_import/a9258a92ae214ca09801f9a99f6088fa~tplv-noop.jpeg?rk3s=49177a0b&x-expires=1771656302&x-signature=BNonQNcqVCZtOjRFajLIM9SBOS4%3D&resource_key=aa62e92b-9f3e-4e39-a19f-0fa7b625ef43&resource_key=aa62e92b-9f3e-4e39-a19f-0fa7b625ef43)

![Image](https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/online_import/aa7e9c6cb07d4f629764f26b7e6495c3~tplv-noop.jpeg?rk3s=49177a0b&x-expires=1771656302&x-signature=g0wAyNvri1s2QUsk6EXRdkpBEk8%3D&resource_key=eded0dcf-9b66-4baa-a640-17b35c33f959&resource_key=eded0dcf-9b66-4baa-a640-17b35c33f959)

![Image](https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/online_import/f360120d49d841bfb169d1681827e7c3~tplv-noop.jpeg?rk3s=49177a0b&x-expires=1771656302&x-signature=OtX7TxraUZWdW%2FEGEJJYGUqiu9k%3D&resource_key=45ee22af-79eb-4b08-84d8-30e80dc24f1b&resource_key=45ee22af-79eb-4b08-84d8-30e80dc24f1b)

轻量美观的开源富文本编辑与文本处理工具

📌 在线体验：[https://youreln.github.io/Cloudpad](https://youreln.github.io/Cloudpad)

📁 项目地址：[https://github.com/Youreln/Cloudpad](https://github.com/Youreln/Cloudpad)

## 📋 项目简介

云笺是一款面向普通用户与开发者的纯前端在线工具箱，集富文本编辑、文本清洗、格式转换、一键导出于一体。无需登录、无需后端、本地运行，界面简洁优雅，功能实用全面，支持暗黑模式与响应式布局，可在手机、电脑、平板上流畅使用。

适合日常写作、文案排版、文本清洗、内容整理、快速编辑等场景，项目完全开源，可自由使用、修改、分发。

## ✨ 功能特点

### 🎨 富文本编辑

- **基础格式**：加粗、斜体、下划线、删除线

- **标题层级**：H1、H2、H3 标题快速切换

- **列表功能**：有序列表、无序列表，适配各类排版

- **对齐方式**：左对齐、居中对齐、右对齐

- **颜色设置**：文字颜色、背景颜色自定义选择

- **格式清除**：一键清除所有文本格式，快速还原

### 🧹 文本清洗

- **去空行**：一键合并连续空行，精简文本结构

- **去空格**：去除首尾空格及文本中间多余空格

- **全角半角**：一键互换全角/半角字符，适配不同场景

- **标点互换**：中英文标点符号相互批量转换

- **大小写转换**：支持全大写、全小写、首字母大写

- **繁简转换**：简体中文与繁体中文双向快速转换

- **查找替换**：精准查找文本内容，支持全局替换功能

### 💾 导出与操作

- **复制富文本**：保留文本原有格式，一键复制到剪贴板

- **复制纯文本**：去除所有格式，仅复制文本原始内容

- **导出 TXT**：一键将编辑内容导出为 .txt 文本文件

- **清空内容**：快速清空编辑区，带二次确认防止误操作

### 🎯 体验增强

- **自动保存**：基于 localStorage 每 3 秒自动保存，内容不丢失

- **主题切换**：暗黑模式与浅色模式无缝切换，保存用户偏好

- **响应式设计**：完美适配手机、平板、电脑，无适配断层

- **拖拽调整**：编辑区高度可自由拖拽，适配不同编辑需求

- **操作提示**：底部轻提示实时反馈操作结果，交互更友好

- **实时统计**：字数、字符数、行数实时统计，方便排版把控

- **一键回顶**：快速返回页面顶部，提升操作效率

## 🛠️ 技术栈

- **前端核心**：HTML5 + CSS3 + JavaScript (ES6+)

- **图标资源**：Font Awesome (CDN 引入，无需本地安装)

- **数据存储**：localStorage 本地存储，无后端依赖

- **开发特性**：纯原生开发，无任何前端框架，轻量无冗余

- **部署方式**：静态文件部署，支持所有静态托管服务

## 📱 响应式设计

|设备类型|屏幕尺寸|布局优化策略|
|---|---|---|
|手机端|< 768px|工具栏折叠为下拉菜单，编辑区占满屏幕宽度|
|平板端|768px - 1024px|工具栏两行排列，编辑区宽度 90% 居中显示|
|电脑端|> 1024px|工具栏完整展开，编辑区居中并限制最大宽度|
## 📸 功能截图

### 浅色模式

![Image](https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/online_import/5ddd6556074f430281c1a24c663f7445~tplv-noop.jpeg?rk3s=49177a0b&x-expires=1771656302&x-signature=Y4CmUv8Pc6VNlX6kCDEXLLO%2FPA0%3D&resource_key=9c6fd170-987d-4198-9933-658c1d6d3a0a&resource_key=9c6fd170-987d-4198-9933-658c1d6d3a0a)

### 暗黑模式

![Image](https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/online_import/c251a3533833484e8bea726bb90831ba~tplv-noop.jpeg?rk3s=49177a0b&x-expires=1771656302&x-signature=yEaB2JBMM3k8p4%2F75K3NiPjXr2I%3D&resource_key=2caf4f29-2a83-483e-9212-0f239a7a7162&resource_key=2caf4f29-2a83-483e-9212-0f239a7a7162)

### 文本清洗功能

![Image](https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/online_import/4d9f7dece9984c7eae36f5f7ecd6839b~tplv-noop.jpeg?rk3s=49177a0b&x-expires=1771656302&x-signature=sY88WPQGat5A89vtdo8hahFM838%3D&resource_key=fcd3f5ec-2b34-4b25-9880-8ec9931e3a94&resource_key=fcd3f5ec-2b34-4b25-9880-8ec9931e3a94)

### 手机端适配

![Image](https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/online_import/71b9df872e0040f29ec0b637fa46556a~tplv-noop.jpeg?rk3s=49177a0b&x-expires=1771656302&x-signature=mtfBrXfhghKHeBQ8lYca%2FLTz9FQ%3D&resource_key=58eebc62-8246-49ea-86b8-bacb8bd1758b&resource_key=58eebc62-8246-49ea-86b8-bacb8bd1758b)

## 🚀 部署教程

### 方法一：直接本地打开（最简方式）

1. 克隆或下载本项目到本地：

    ```Bash
    
    git clone https://github.com/Youreln/Cloudpad.git
    ```

2. 进入项目根目录，直接在浏览器中打开 `index.html` 文件即可使用所有功能。

### 方法二：本地服务器运行（推荐，避免跨域/存储问题）

1. 克隆项目并进入目录：

    ```Bash
    
    git clone https://github.com/Youreln/Cloudpad.git
    cd Cloudpad
    ```

2. 启动本地服务器（任选其一）：

    - Python 3.x 启动：

        ```Bash
        
        python -m http.server 8000
        ```

    - Node.js 启动（需先安装 http-server：`npm i -g http-server`）：

        ```Bash
        
        npx http-server -p 8000
        ```

    - PHP 启动：

        ```Bash
        
        php -S localhost:8000
        ```

3. 浏览器中打开 `http://localhost:8000`，即可正常使用。

### 方法三：部署到 GitHub Pages（免费线上部署）

1. Fork 本仓库到你的 GitHub 账号；

2. 进入 Fork 后的仓库，点击顶部「Settings」；

3. 下拉找到「Pages」选项，在「Source」中选择「main」分支，点击「Save」；

4. 等待 1-5 分钟生效，访问地址为 `https://你的GitHub用户名.github.io/Cloudpad`。

### 方法四：部署到其他静态托管服务

无需额外配置，导入 GitHub 仓库即可一键部署：

- Vercel：[https://vercel.com/](https://vercel.com/)

- Netlify：[https://www.netlify.com/](https://www.netlify.com/)

- Cloudflare Pages：[https://pages.cloudflare.com/](https://pages.cloudflare.com/)

## 📖 使用指南

### 基础编辑

1. 在编辑区直接输入或粘贴文本，支持粘贴带格式的外部内容；

2. 使用顶部工具栏的功能按钮，对文本进行格式设置、列表创建等操作；

3. 拖拽编辑区底部边框，可自由调整编辑区高度，适配编辑需求。

### 文本清洗

1. 将需要处理的文本粘贴到编辑区；

2. 点击工具栏中「文本清洗」分类下的对应功能按钮；

3. 文本处理完成后，可直接复制或导出结果。

### 导出与保存

1. 复制：根据需求选择「复制富文本」或「复制纯文本」，一键复制到剪贴板；

2. 导出：点击「导出 TXT」按钮，浏览器将自动下载文本文件；

3. 自动保存：编辑内容将实时自动保存，刷新页面、重新打开浏览器均可恢复。

### 主题切换

1. 点击顶部导航栏的主题切换按钮；

2. 可在浅色模式与暗黑模式间无缝切换；

3. 主题偏好将自动保存到本地，下次打开自动生效。

## 🤝 贡献指南

### 贡献流程

1. **Fork 本仓库**：点击仓库右上角「Fork」，将仓库复制到个人 GitHub 账号；

2. **创建分支**：克隆 Fork 后的仓库到本地，创建功能/修复分支，命名规范如下：

    ```Bash
    
    # 新增功能
    git checkout -b feature/AmazingFeature
    # 修复 BUG
    git checkout -b fix/BugDescription
    ```

3. **提交修改**：完成开发后，提交修改并遵循清晰的提交信息规范：

    ```Bash
    
    git add .
    git commit -m "feat: 新增XX功能"  # 新增功能
    # 或
    git commit -m "fix: 修复XX问题"  # 修复BUG
    ```

4. **推送到分支**：将本地修改推送到个人 GitHub 仓库的对应分支：

    ```Bash
    
    git push origin feature/AmazingFeature
    ```

5. **打开 Pull Request**：在个人仓库页面点击「Pull request」，提交到本仓库的 main 分支，等待审核合并。

### 开发规范

- **代码风格**：保持代码风格统一，使用 4 空格缩进，避免制表符；

- **命名规范**：变量、函数使用语义化驼峰命名，避免无意义命名；

- **注释规范**：核心逻辑、复杂函数添加必要注释，说明功能、参数及返回值；

- **兼容性**：确保开发的功能兼容主流浏览器（Chrome/Firefox/Safari/Edge）；

- **测试要求**：修改完成后，在多设备（手机/平板/电脑）测试功能完整性和响应式适配。

### 开发文件说明

|文件名称|主要作用|
|---|---|
|index.html|页面结构、工具栏、DOM 元素定义|
|style.css|全局样式、响应式布局、暗黑模式|
|script.js|核心功能逻辑、交互、数据处理|
## ❓ 常见问题

### Q1：编辑的内容会丢失吗？

不会。项目基于 localStorage 实现每 3 秒自动保存，页面刷新、重新打开浏览器均可恢复内容；仅清除浏览器缓存时，保存的内容会被删除。

### Q2：文本内容会上传到服务器吗？

不会。所有功能均在前端本地运行，文本内容仅存储在你的浏览器本地，不会上传到任何服务器，保障隐私安全。

### Q3：部署 GitHub Pages 后访问不到？

1. 需等待 1-5 分钟让页面生效；

2. 检查仓库「Settings-Pages」中「Source」是否选择「main」分支；

3. 确认访问地址格式为：`https://你的GitHub用户名.github.io/Cloudpad`。

### Q4：部分浏览器功能无法使用？

建议使用 Chrome、Edge、Safari、Firefox 等现代浏览器的最新版本；老旧浏览器（如 IE）不支持部分 HTML5/CSS3/ES6+ 特性，会导致功能异常。

### Q5：如何修改工具的配色和 LOGO？

1. 配色修改：编辑 `style.css` 文件，找到颜色相关配置项，自定义修改即可；

2. LOGO 修改：编辑 `index.html` 文件，替换顶部导航栏的 LOGO 相关代码/图片即可。

## 📄 许可证

本项目采用 **MIT 许可证**，可自由使用、修改、分发本项目，无需授权，但请保留原作者版权信息。

详见项目根目录 [LICENSE](LICENSE) 文件。

## 📞 联系方式

- **项目仓库**：[https://github.com/Youreln/Cloudpad](https://github.com/Youreln/Cloudpad)

- **问题反馈**：[GitHub Issues](https://github.com/Youreln/Cloudpad/issues)（建议附截图/复现步骤）

- **开发者**：[Youreln](https://github.com/Youreln)

## 🙏 致谢

- **Font Awesome**：提供免费开源的精美图标库，提升工具交互体验；

- **开源社区**：提供宝贵的技术文档、解决方案和开发灵感；

- **所有使用者和贡献者**：感谢每一位提交 PR、反馈问题的开发者和用户。

---

**云笺 - 让文本编辑更简单** ✨

如果您喜欢本项目，欢迎 Star ⭐ 支持！

© 2026 Youreln | Cloudpad 云笺
> （注：文档部分内容可能由 AI 生成）