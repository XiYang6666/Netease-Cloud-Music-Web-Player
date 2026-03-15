# Netease Cloud Music Web Player

⚠️ **法律声明**: 本项目为开源学习项目，非网易云音乐官方产品，与网易公司无任何关联。使用本项目请遵守网易云音乐服务条款。

网易云音乐网页版桌面客户端，将网页播放器封装为原生 Linux 桌面应用。

## 功能特性

- 原生桌面体验 - 无需浏览器即可使用网易云音乐
- 系统托盘支持 - 后台运行时可通过托盘图标控制
- 窗口状态记忆 - 自动保存窗口大小和位置
- 外部链接处理 - 应用内链接通过系统浏览器打开
- 统一日志管理 - 分级日志记录与错误追踪
- 静默启动支持 - 支持 `--minimize` 参数启动时最小化到托盘

## 安装方式

### 从 GitHub Release 安装

1. 访问 [Releases 页面](https://github.com/feng-yifan/Netease-Cloud-Music-Web-Player/releases)
2. 下载最新版本的压缩包（例如 `netease-cloud-music-web-player-x.x.x.tar.gz`）
3. 解压文件：
   ```bash
   tar -xzf netease-cloud-music-web-player-x.x.x.tar.gz
   ```
4. 运行应用：
   ```bash
   ./netease-cloud-music-web-player
   ```

### 从 Arch User Repository (AUR) 安装

对于 Arch Linux 及其衍生发行版用户，可以通过 AUR 安装：

**使用 AUR 助手（推荐）：**
```bash
# 使用 yay
yay -S netease-cloud-music-web-player

# 或使用 paru
paru -S netease-cloud-music-web-player
```

**手动构建安装：**
```bash
git clone https://aur.archlinux.org/netease-cloud-music-web-player.git
cd netease-cloud-music-web-player
makepkg -si
```

**AUR 包地址：** https://aur.archlinux.org/packages/netease-cloud-music-web-player

## 使用说明

### 启动应用

安装后，您可以通过以下方式启动应用：

1. **命令行启动**：
   ```bash
   netease-cloud-music-web-player
   ```

2. **静默启动**（启动时最小化到托盘）：
   ```bash
   netease-cloud-music-web-player --minimize
   ```

3. **桌面环境启动**：
   - 在应用菜单中搜索 "Netease Cloud Music"
   - 点击图标启动应用

### 系统托盘功能

应用启动后会在系统托盘显示图标：

- **左键单击** - 显示/隐藏主窗口
- **右键单击** - 显示菜单（包含退出选项）

### 应用功能

1. **音乐播放** - 登录网易云音乐账号后即可播放音乐
2. **窗口控制** - 窗口大小和位置会自动保存，下次启动时恢复
3. **外部链接** - 应用内点击的链接会通过系统默认浏览器打开

### 获取帮助

如果遇到其他问题：

1. **查看文档**：阅读 [开发者文档](./docs/development.md) 了解更多技术细节
2. **报告问题**：在 [GitHub Issues](https://github.com/feng-yifan/Netease-Cloud-Music-Web-Player/issues) 报告问题
3. **检查日志**：应用日志可能包含错误信息

## 开发者文档

技术文档和开发指南已迁移到 `docs/` 目录：

- [开发指南](./docs/development.md) - 技术架构和开发指南
- [构建指南](./docs/building.md) - 构建和发布流程
- [图标原则](./docs/icon-principles.md) - 图标命名原则

## 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

MIT 许可证允许自由使用、修改和分发代码，包括商业用途。详见 [LICENSE](LICENSE) 文件。

**按"现状"提供**，作者不承担任何责任。
