# HealthFlow - 智能健康提醒应用

一个简约好用的健康提醒网页应用，帮助你在工作中保持健康的生活习惯。

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
直接访问部署的应用：[HealthFlow](https://your-app-url.workers.dev)

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
   访问 `http://localhost:8787`

## 📁 项目结构

```
health-reminder/
├── src/                    # 源代码
│   ├── worker.js          # Cloudflare Workers 脚本
│   └── index.html         # HTML 模板
├── docs/                  # 文档
├── scripts/               # 部署脚本
├── package.json           # 项目配置
└── wrangler.toml         # Workers 配置
```

详细说明请查看 [项目结构文档](docs/PROJECT-STRUCTURE.md)

## 🛠️ 部署

### 部署到 Cloudflare Workers

1. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler auth login
   ```

3. **部署应用**
   ```bash
   npm run deploy
   ```

详细部署指南请查看 [部署文档](docs/README-deployment.md)

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
- `npm run dev:local` - 本地模式开发
- `npm run deploy` - 部署到生产环境
- `npm run deploy:staging` - 部署到预发布环境
- `npm run logs` - 查看实时日志

### 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: Tailwind CSS
- **图标**: Font Awesome
- **部署**: Cloudflare Workers
- **工具**: Wrangler CLI

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
- [Cloudflare Workers](https://workers.cloudflare.com/) - 强大的边缘计算平台

---

**保持健康，高效工作！** 💪
