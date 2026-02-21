#!/bin/bash

# 构建 APK 脚本
echo "开始构建 Cloudpad 安卓应用..."

# 检查是否在项目根目录
if [ ! -f "settings.gradle.kts" ]; then
    echo "错误：请在项目根目录执行此脚本"
    exit 1
fi

# 赋予执行权限
chmod +x ./gradlew

# 构建 APK
echo "正在编译 APK 文件..."
./gradlew assembleDebug

# 检查构建结果
if [ $? -eq 0 ]; then
    echo "构建成功！"
    # 查找 APK 文件
    APK_PATH=$(find ./app/build/outputs/apk/debug -name "*.apk" | head -1)
    if [ -f "$APK_PATH" ]; then
        echo "APK 文件路径：$APK_PATH"
        echo "可以使用如下命令下载 APK："
        echo "cp $APK_PATH ./cloudpad.apk"
    else
        echo "错误：未找到 APK 文件"
        exit 1
    fi
else
    echo "构建失败，请检查错误信息"
    exit 1
fi

echo "构建流程完成！"