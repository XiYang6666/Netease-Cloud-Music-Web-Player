# 图标命名

本软件使用 `netease-cloud-music` 作为图标名称

官方网易云音乐客户端使用 `netease-cloud-music` 作为图标名称，因此大多数 Linux 图标主题（如 Papirus、Numix、Adwaita）均提供 `netease-cloud-music` 图标

采用此名称可以兼容大多数主题，提供更好的一致性体验

## 技术实现

- `.desktop` 文件：`Icon=netease-cloud-music`
- 图标文件安装路径：`/usr/share/icons/hicolor/scalable/apps/netease-cloud-music.svg`

基于 FreeDesktop 规范：

- 操作系统会优先使用图标主题提供的 `netease-cloud-music` 图标
- 否则使用应用自带的图标

## 潜在问题

### 问题1：图标冲突

同时安装官方包和本包后，操作系统如何选择展示图标是一件用户无法预测的事情

### 问题2：违背 AUR 包命名惯例

AUR 包通常使用 `$pkgname` 作为图标文件名

## 相关文件

- `build/netease-cloud-music-web-player.desktop` - 桌面启动器配置
- `package/arch/aur/PKGBUILD` - AUR 包构建脚本
- `build/netease-cloud-music.svg` - 图标源文件
