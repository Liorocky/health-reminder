# HealthFlow - 智能健康提醒应用

一个简约好用的健康提醒网页应用，部署在 Cloudflare Pages 上，帮助你在工作中保持健康的生活习惯。

## ✨ 功能特性

- 🕐 **智能计时器** - 可自定义的工作计时器
- 💧 **喝水提醒** - 定时提醒补充水分
- 🏃 **运动提醒** - 提醒站立和活动身体
- 👀 **护眼提醒** - 定期休息眼部
- 🌙 **主题切换** - 支持明暗主题
- ⚙️ **个性化配置** - 可调整所有提醒间隔
- 📱 **响应式设计** - 完美适配各种设备

## 🚀 快速开始

### 在线使用
直接访问部署的应用：[HealthFlow](https://your-app-url.pages.dev)

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/health-reminder.git
   cd health-reminder
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **打开浏览器**
   访问 `http://localhost:8080`

## 📁 项目结构

```
health-reminder/
├── index.html             # 主页面
├── js/                    # JavaScript 文件
│   └── app.js            # 主应用逻辑
├── docs/                  # 文档
├── scripts/               # 开发脚本
├── _headers              # Cloudflare Pages 安全头配置
├── _redirects            # 路由重定向配置
├── health.json           # 健康检查端点
└── package.json          # 项目配置
```

详细说明请查看 [项目结构文档](docs/PROJECT-STRUCTURE.md)

## 🛠️ 部署

### 部署到 Cloudflare Pages

#### 方法一：通过 Git 集成（推荐）

1. **推送代码到 Git 仓库**
   ```bash
   git add .
   git commit -m "Deploy to Cloudflare Pages"
   git push origin main
   ```

2. **在 Cloudflare Dashboard 中**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 "Pages" 部分
   - 点击 "Create a project"
   - 连接你的 Git 仓库
   - 设置构建配置：
     - 构建命令：`echo "Static site, no build required"`
     - 构建输出目录：`/`（根目录）
   - 点击 "Save and Deploy"

#### 方法二：直接上传

1. **打包项目文件**
   ```bash
   # 确保包含所有必要文件
   # index.html, js/, _headers, _redirects, health.json
   ```

2. **在 Cloudflare Pages 中上传**
   - 选择 "Upload assets"
   - 拖拽项目文件夹或选择文件上传

### 环境变量配置

无需额外的环境变量配置，应用为纯静态站点。

## 📖 使用说明

1. **开始工作** - 点击"Start Working"按钮开始计时
2. **配置提醒** - 点击"Configure"按钮自定义提醒间隔
3. **查看进度** - 圆形进度条显示当前进度和下一个提醒时间
4. **响应提醒** - 收到提醒时点击"×"关闭通知

## 🎨 主题和个性化

- **主题切换**: 点击右上角的月亮/太阳图标
- **提醒配置**: 可以单独开启/关闭每种提醒
- **时间间隔**: 支持 10-240 分钟的灵活配置
- **本地存储**: 设置会自动保存到浏览器

## 🔧 开发

### 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run dev:local` - 本地静态文件服务器
- `npm run preview` - 预览模式
- `npm run build` - 构建项目（静态站点无需构建）

### 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: Tailwind CSS
- **图标**: Font Awesome
- **部署**: Cloudflare Pages
- **开发**: Node.js 静态服务器

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Tailwind CSS](https://tailwindcss.com/) - 优秀的 CSS 框架
- [Font Awesome](https://fontawesome.com/) - 丰富的图标库
- [Cloudflare Pages](https://pages.cloudflare.com/) - 快速的静态站点托管平台

---

**保持健康，高效工作！** 💪
