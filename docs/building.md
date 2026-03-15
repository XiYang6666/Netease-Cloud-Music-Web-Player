# 构建和发布指南

本文档提供 Netease Cloud Music Web Player 项目的构建和发布流程说明。

## 构建应用

### 本地构建

#### 构建 Linux 版本

```bash
npm run package:linux
```

构建完成后，应用将生成在 `dist/linux-unpacked/` 目录下。

#### 构建输出结构

```
dist/linux-unpacked/
├── netease-cloud-music-web-player     # 可执行文件
├── app.asar                           # 应用主程序包
├── netease-cloud-music.svg            # 应用图标
└── netease-cloud-music-web-player.desktop  # 桌面文件
```

### 构建配置

构建配置位于 `electron-builder.yml` 文件中，主要配置包括：

- 目标平台：Linux x64
- 应用名称：Netease Cloud Music Web Player
- 输出目录：`dist/`
- ASAR 打包：启用

## 发布流程

### 版本管理

项目使用语义化版本号（Semantic Versioning）：

- 主版本号（MAJOR）：不兼容的 API 修改
- 次版本号（MINOR）：向下兼容的功能性新增
- 修订号（PATCH）：向下兼容的问题修正

### GitHub Release 发布

1. **创建版本标签**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. **自动触发构建** - 推送标签到 GitHub 会自动触发 `.github/workflows/package-asar.yml` 工作流

3. **工作流执行步骤**：
   - 安装依赖并构建应用
   - 生成 ASAR 包和应用文件
   - 创建压缩包（`netease-cloud-music-web-player-x.x.x.tar.gz`）
   - 生成 SHA256 校验文件
   - 上传到 GitHub Release

4. **手动发布**（如果需要）：
   - 访问 GitHub Releases 页面
   - 点击 "Draft a new release"
   - 选择标签，填写发布说明
   - 上传构建产物

### AUR 包发布

#### AUR 包信息

- **包名**：`netease-cloud-music-web-player`
- **AUR 地址**：https://aur.archlinux.org/packages/netease-cloud-music-web-player
- **维护者**：fengyifan

#### 自动发布

CI/CD 工作流会自动处理 AUR 包发布：

1. 更新 `PKGBUILD` 文件中的版本号和校验值
2. 生成 `.SRCINFO` 文件
3. 推送到 AUR 仓库

#### 手动发布步骤

1. **更新 PKGBUILD**
   - 修改 `pkgver` 为最新版本号
   - 更新 `sha256sums` 为最新构建产物的校验值

2. **生成 .SRCINFO**
   ```bash
   cd package/arch/aur
   makepkg --printsrcinfo > .SRCINFO
   ```

3. **推送到 AUR**
   ```bash
   git add PKGBUILD .SRCINFO
   git commit -m "Update to version x.x.x"
   git push aur main
   ```

#### 本地测试 AUR 包

```bash
# 克隆 AUR 仓库
git clone ssh://aur@aur.archlinux.org/netease-cloud-music-web-player.git
cd netease-cloud-music-web-player

# 构建并安装
makepkg -si
```

## 构建产物说明

### 主要文件

1. **可执行文件** (`netease-cloud-music-web-player`)
   - 应用主程序
   - 位于构建输出的根目录

2. **ASAR 包** (`app.asar`)
   - 包含所有应用代码和资源
   - Electron 的归档格式

3. **桌面文件** (`netease-cloud-music-web-player.desktop`)
   - Linux 桌面环境集成
   - 定义应用名称、图标、分类等

4. **应用图标** (`netease-cloud-music.svg`)
   - SVG 格式的应用图标
   - 用于桌面环境显示

### 压缩包内容

发布时生成的压缩包包含以下文件：

```
netease-cloud-music-web-player-x.x.x.tar.gz
├── netease-cloud-music-web-player
├── app.asar
├── netease-cloud-music.svg
├── netease-cloud-music-web-player.desktop
└── README.md（可选）
```

## 环境要求

### 构建环境

- Node.js 16+
- npm 或 pnpm
- Git
- 支持 Linux 环境（构建目标为 Linux x64）

### AUR 发布环境

- SSH 密钥配置（用于 AUR 仓库访问）
- `AUR_SSH_PRIVATE_KEY` 环境变量
- `AUR_USERNAME` 环境变量

## 常见问题

### 构建失败

1. **依赖安装失败**
   - 检查网络连接
   - 尝试使用 `npm install --legacy-peer-deps`

2. **electron-builder 错误**
   - 确认 electron-builder 版本
   - 检查 `electron-builder.yml` 配置格式

### AUR 发布失败

1. **权限错误**
   - 确保使用正确的 SSH 密钥
   - 检查 AUR 仓库访问权限

2. **校验值不匹配**
   - 确认 `sha256sums` 值与实际文件匹配
   - 重新生成校验值：`sha256sum 文件名`

## 相关文档

- [development.md](development.md) - 开发指南和技术架构
- [icon-principles.md](icon-principles.md) - 图标命名原则