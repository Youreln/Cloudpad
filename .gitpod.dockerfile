FROM gitpod/workspace-full

USER gitpod

# 安装 JDK 17
RUN sudo apt-get update && sudo apt-get install -y openjdk-17-jdk && sudo update-alternatives --set java /usr/lib/jvm/java-17-openjdk-amd64/bin/java

# 安装 Android SDK 命令行工具
RUN mkdir -p ~/android-sdk/cmdline-tools/latest
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip -O ~/android-sdk/cmdline-tools.zip
RUN unzip -q ~/android-sdk/cmdline-tools.zip -d ~/android-sdk/cmdline-tools
RUN mv ~/android-sdk/cmdline-tools/cmdline-tools/* ~/android-sdk/cmdline-tools/latest/
RUN rm ~/android-sdk/cmdline-tools.zip

# 设置环境变量
ENV ANDROID_HOME=/home/gitpod/android-sdk
ENV ANDROID_SDK_ROOT=/home/gitpod/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

# 安装必要的 SDK 组件
RUN yes | sdkmanager "platforms;android-34" "platform-tools" "build-tools;34.0.0"

# 安装 Gradle
RUN wget -q https://services.gradle.org/distributions/gradle-8.4-bin.zip -O ~/gradle.zip
RUN unzip -q ~/gradle.zip -d ~/
RUN rm ~/gradle.zip
ENV PATH=$PATH:/home/gitpod/gradle-8.4/bin

# 清理缓存
RUN sudo apt-get clean && rm -rf /var/lib/apt/lists/*

# 验证安装
RUN java -version && gradle -version && sdkmanager --list | grep "Installed packages"