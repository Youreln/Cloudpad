# Cloudpad 项目

包含离线原生安卓应用和在线网页版本，提供完整的文本编辑和处理功能。

## 📱 安卓应用
- Kotlin + Jetpack Compose 实现
- MVVM + Hilt 架构
- Room 本地数据库
- 完全离线功能

## 🌐 网页版本
- 纯前端实现（HTML5 + CSS3 + JavaScript）
- 富文本编辑功能
- 文本清洗工具
- 响应式设计，支持多设备
- 可直接部署到 GitHub Pages

## 🚀 快速开始

### 🌐 网页版本使用

1. **直接访问**
   - 在浏览器中打开根目录的 `index.html` 文件即可使用
   - 无需安装任何依赖，完全本地运行

2. **本地服务器运行**（推荐，避免跨域问题）
   ```bash
   # 使用 Python 启动
   python -m http.server 8000
   
   # 或使用 Node.js
   npx http-server -p 8000
   
   # 或使用 PHP
   php -S localhost:8000
   ```
   然后在浏览器中访问 `http://localhost:8000`

3. **部署到 GitHub Pages**
   - 推送到 GitHub 仓库
   - 在仓库设置中启用 GitHub Pages
   - 选择 `main` 分支作为源
   - 访问地址：`https://你的GitHub用户名.github.io/仓库名`

### 📱 安卓应用构建

##### 方法一：使用 Gitpod 云构建（推荐）

1. **打开 Gitpod 工作空间**
   - 点击以下链接打开项目：
   - [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/yourusername/cloudpad)

2. **等待环境初始化**
   - Gitpod 会自动安装所有依赖
   - 包括 JDK 17、Android SDK、Gradle 等

3. **使用可视化构建界面**
   - 在 Gitpod 文件浏览器中找到 `build-interface.html`
   - 右键点击文件，选择 "Open with Live Server"
   - 或直接在浏览器中打开该文件

4. **一键构建 APK**
   - 在打开的构建界面中，点击 "一键构建APK" 按钮
   - 按照界面提示执行构建命令
   - 等待构建完成（约5-10分钟）

5. **下载 APK 文件**
   - 构建完成后，在 Gitpod 终端中会看到 APK 文件路径
   - 执行提示的命令创建下载副本
   - 在文件浏览器中找到 `cloudpad.apk` 文件
   - 右键点击文件，选择 "Download" 下载到本地

### 方法二：本地构建

1. **安装依赖**
   - JDK 17
   - Android Studio
   - Android SDK (API level 34)

2. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/cloudpad.git
   cd cloudpad
   ```

3. **构建 APK**
   ```bash
   # 使用 Python 脚本
   python3 build-apk.py
   
   # 或使用 Bash 脚本
   chmod +x build-apk.sh
   ./build-apk.sh
   ```

4. **获取 APK**
   - 构建完成后，APK 文件会生成在 `app/build/outputs/apk/debug/` 目录

## 📱 应用功能

### 核心功能
- ✅ 离线优先设计，无网络依赖
- ✅ 富文本编辑（粗体、斜体、下划线等）
- ✅ 文本清洗工具（去除空行、多余空格等）
- ✅ 多文档管理
- ✅ 自动保存功能
- ✅ 深色/浅色主题支持

### 技术特点
- **架构**: MVVM + Hilt 依赖注入
- **存储**: Room 本地数据库
- **UI**: Jetpack Compose (Material 3)
- **语言**: Kotlin
- **构建**: Gradle Kotlin DSL

## 🔧 构建工具

### 可视化构建界面
- **文件**: `build-interface.html`
- **功能**: 提供友好的网页界面，引导用户完成构建过程
- **特点**: 实时状态更新、进度显示、详细的步骤说明

### 构建脚本
- **Python 脚本**: `build-apk.py`
  - 完整的构建流程
  - 环境检查
  - 实时构建日志
  - 自动创建下载副本

- **Bash 脚本**: `build-apk.sh`
  - 简化的构建命令
  - 快速执行构建

## 📁 项目结构

```
cloudpad/
├── app/                 # 安卓应用代码
│   ├── src/main/java/com/youreln/cloudpad/  # 主要代码
│   └── build.gradle.kts                     # 应用级构建配置
├── web/                 # 网页相关文件
├── build-interface.html # 可视化构建界面
├── build-apk.py         # Python 构建脚本
├── build-apk.sh         # Bash 构建脚本
├── .gitpod.yml          # Gitpod 配置
├── .gitpod.dockerfile   # Gitpod Docker 配置
└── README.md            # 项目说明
```

## 🎨 界面预览

### 编辑器界面
- 简洁现代的 Material 3 设计
- 响应式布局，支持不同屏幕尺寸
- 深色/浅色主题自动切换

### 构建界面
- 直观的状态显示
- 详细的构建步骤
- 实时的进度更新
- 清晰的下载说明

## 🔒 安全说明

- 完全离线运行，无需网络连接
- 所有数据存储在本地设备
- 无第三方依赖，确保应用安全

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件

## 📞 支持

如果您遇到任何问题，请在 GitHub 上提交 Issue，我们会尽快回复您。

---

**享受使用 Cloudpad！** 🎉