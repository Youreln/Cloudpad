#!/usr/bin/env python3
"""
Cloudpad 安卓应用构建脚本
在Gitpod环境中一键构建APK文件
"""

import os
import subprocess
import time
import sys

class BuildProcess:
    def __init__(self):
        self.project_root = os.path.dirname(os.path.abspath(__file__))
        self.gradle_file = os.path.join(self.project_root, "gradlew")
        self.apk_output_dir = os.path.join(self.project_root, "app", "build", "outputs", "apk", "debug")
    
    def check_environment(self):
        """检查构建环境"""
        print("🔍 检查构建环境...")
        
        # 检查Java是否安装
        try:
            result = subprocess.run(["java", "-version"], capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Java 已安装")
            else:
                print("❌ Java 未安装")
                return False
        except FileNotFoundError:
            print("❌ Java 未安装")
            return False
        
        # 检查Gradle是否存在
        if os.path.exists(self.gradle_file):
            print("✅ Gradle 包装器已就绪")
        else:
            print("❌ Gradle 包装器不存在")
            return False
        
        # 检查项目结构
        if os.path.exists(os.path.join(self.project_root, "settings.gradle.kts")):
            print("✅ 项目结构完整")
        else:
            print("❌ 项目结构不完整")
            return False
        
        print("✅ 环境检查完成，所有依赖已就绪")
        return True
    
    def build_apk(self):
        """构建APK文件"""
        print("\n🚀 开始构建APK文件...")
        print("这可能需要5-10分钟，请耐心等待...")
        
        # 赋予gradlew执行权限
        if not os.access(self.gradle_file, os.X_OK):
            print("🔧 赋予gradlew执行权限...")
            subprocess.run(["chmod", "+x", self.gradle_file], check=True)
        
        # 执行构建命令
        try:
            process = subprocess.Popen(
                [self.gradle_file, "assembleDebug"],
                cwd=self.project_root,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True
            )
            
            # 实时输出构建日志
            for line in iter(process.stdout.readline, ''):
                print(line.strip())
                sys.stdout.flush()
            
            process.wait()
            
            if process.returncode == 0:
                print("\n🎉 APK构建成功！")
                return True
            else:
                print("\n❌ APK构建失败")
                return False
        except Exception as e:
            print(f"\n❌ 构建过程出错: {e}")
            return False
    
    def find_apk(self):
        """查找构建生成的APK文件"""
        print("\n🔍 查找APK文件...")
        
        if not os.path.exists(self.apk_output_dir):
            print("❌ APK输出目录不存在")
            return None
        
        apk_files = [f for f in os.listdir(self.apk_output_dir) if f.endswith('.apk')]
        if apk_files:
            apk_path = os.path.join(self.apk_output_dir, apk_files[0])
            print(f"✅ 找到APK文件: {apk_path}")
            return apk_path
        else:
            print("❌ 未找到APK文件")
            return None
    
    def create_download_copy(self, apk_path):
        """创建便于下载的APK副本"""
        if not apk_path:
            return False
        
        print("\n📋 准备下载文件...")
        
        try:
            dest_path = os.path.join(self.project_root, "cloudpad.apk")
            subprocess.run(["cp", apk_path, dest_path], check=True)
            print(f"✅ 已创建下载副本: {dest_path}")
            print("\n📥 下载说明:")
            print("1. 在Gitpod文件浏览器中找到 cloudpad.apk 文件")
            print("2. 右键点击文件，选择 'Download' 选项")
            print("3. 下载完成后即可安装到安卓设备")
            return True
        except Exception as e:
            print(f"❌ 创建下载副本失败: {e}")
            return False
    
    def run(self):
        """运行完整构建流程"""
        print("=" * 60)
        print("☁️  Cloudpad 安卓应用构建工具")
        print("=" * 60)
        
        # 步骤1: 检查环境
        if not self.check_environment():
            print("\n❌ 环境检查失败，无法继续构建")
            return False
        
        # 步骤2: 构建APK
        if not self.build_apk():
            print("\n❌ APK构建失败")
            return False
        
        # 步骤3: 查找APK
        apk_path = self.find_apk()
        if not apk_path:
            print("\n❌ 未找到APK文件")
            return False
        
        # 步骤4: 创建下载副本
        if not self.create_download_copy(apk_path):
            print("\n⚠️  创建下载副本失败，但APK文件已生成")
            print(f"您可以直接从以下路径获取APK: {apk_path}")
            return True
        
        print("\n" + "=" * 60)
        print("🎉 构建流程完成！")
        print("您现在可以下载 cloudpad.apk 文件并安装到安卓设备上使用。")
        print("=" * 60)
        return True

if __name__ == "__main__":
    builder = BuildProcess()
    success = builder.run()
    sys.exit(0 if success else 1)