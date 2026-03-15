# 开发指南

本文档提供 Netease Cloud Music Web Player 项目的技术架构和开发指南。

## 技术架构

### 核心模块

- **src/main.js** - 应用主进程入口，负责应用生命周期管理
- **src/modules/WindowManager.js** - 窗口管理器，处理 BrowserWindow 创建和状态持久化
- **src/modules/TrayManager.js** - 系统托盘管理器，处理托盘图标和菜单
- **src/utils/logger.js** - 日志工具，提供分级日志记录（error/warn/info/debug）
- **src/config/default.js** - 应用默认配置

### 关键设计模式

1. **模块化架构** - 每个功能模块独立封装，通过类实现，便于维护和扩展
2. **事件驱动** - 使用 Electron 的 ipcMain 处理进程间通信
3. **安全配置** - 禁用 Node 集成，启用上下文隔离，遵循 Electron 安全最佳实践
4. **状态持久化** - 窗口大小和位置自动保存到用户数据目录

### 技术栈

- Electron 38.7.1
- electron-builder 26.0.12
- 纯 JavaScript 实现（无前端框架依赖）

### 构建配置

- **electron-builder.yml** - Electron 构建配置文件，目标平台为 Linux x64
- **package/arch/aur/PKGBUILD** - Arch Linux AUR 包配置模板
- **.github/workflows/package-asar.yml** - 自动打包发布 GitHub Actions 工作流

### CI/CD 流程

推送版本标签（格式：`x.x.x`）时自动触发：

1. **构建应用** - 使用 electron-builder 构建应用并生成 ASAR 包
2. **创建资源包** - 生成包含应用文件的压缩包和校验文件
3. **发布到 GitHub** - 上传构建产物到 GitHub Release
4. **发布到 AUR** - 生成并发布 Arch User Repository 包

## 开发环境设置

### 依赖安装

```bash
pnpm install
```

### 开发模式启动

```bash
pnpm start
```

### 注意事项

1. **包管理器** - 项目使用 pnpm 工作区模式，但 npm 也完全兼容
2. **自动化测试** - 当前版本未配置自动化测试，主要依赖手动测试
3. **AUR 发布** - 发布到 AUR 需要配置以下环境变量：
   - `AUR_SSH_PRIVATE_KEY` - AUR 仓库的 SSH 私钥
   - `AUR_USERNAME` - AUR 用户名
4. **权限要求** - makepkg 命令需要通过 nobody 用户执行以避免权限问题

## 代码结构

```
src/
├── main.js                 # 主进程入口
├── modules/
│   ├── WindowManager.js   # 窗口管理
│   └── TrayManager.js     # 托盘管理
├── utils/
│   └── logger.js          # 日志工具
└── config/
    └── default.js         # 默认配置
```

## 日志系统

应用使用分级日志系统，可通过环境变量控制日志级别：

```javascript
const logger = require('./utils/logger');
logger.error('错误信息');
logger.warn('警告信息');
logger.info('普通信息');
logger.debug('调试信息');
```

默认日志级别为 `info`。

## 窗口配置

- 默认窗口尺寸：1200x800 像素
- 最小窗口尺寸：800x600 像素
- 窗口状态（位置、大小）自动保存到用户数据目录

## 安全策略

1. **上下文隔离** - 启用上下文隔离防止预加载脚本访问主进程 API
2. **Node 集成禁用** - 渲染进程中禁用 Node.js 集成
3. **外部链接处理** - 应用内点击的链接通过系统浏览器打开
4. **内容安全策略** - 限制资源加载来源

## 相关文档

- [building.md](building.md) - 构建和发布流程
- [icon-principles.md](icon-principles.md) - 图标命名原则
