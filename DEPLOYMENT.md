# HealthFlow - Cloudflare Pages 部署指南

本文档详细说明如何将 HealthFlow 应用部署到 Cloudflare Pages。

## 🚀 快速部署

### 方法一：Git 集成部署（推荐）

1. **准备 Git 仓库**
   ```bash
   # 如果还没有初始化 Git
   git init
   git add .
   git commit -m "Initial commit for Cloudflare Pages"
   
   # 推送到远程仓库（GitHub/GitLab/Bitbucket）
   git remote add origin https://github.com/yourusername/health-reminder.git
   git push -u origin main
   ```

2. **在 Cloudflare Dashboard 中设置**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 点击左侧菜单的 "Pages"
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 授权并选择你的仓库
   - 配置构建设置：
     - **项目名称**: `health-reminder` 或你喜欢的名称
     - **生产分支**: `main`
     - **构建命令**: 留空（静态站点无需构建）
     - **构建输出目录**: `/`（根目录）
   - 点击 "Save and Deploy"

3. **等待部署完成**
   - 首次部署通常需要 1-2 分钟
   - 部署完成后会获得一个 `.pages.dev` 域名

### 方法二：直接上传

1. **准备文件**
   确保项目根目录包含以下文件：
   ```
   ├── index.html
   ├── js/app.js
   ├── _headers
   ├── _redirects
   └── health.json
   ```

2. **上传到 Cloudflare Pages**
   - 在 Cloudflare Dashboard 中选择 "Pages"
   - 点击 "Create a project"
   - 选择 "Upload assets"
   - 拖拽整个项目文件夹或选择所有文件
   - 点击 "Deploy site"

## ⚙️ 配置说明

### 安全头配置 (`_headers`)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; img-src 'self' data:; media-src 'self' https://assets.mixkit.co; connect-src 'self'
```

### 路由配置 (`_redirects`)
```
/app /index.html 200
/home /index.html 200
/health /health.json 200
/* /index.html 200
```

### 健康检查端点 (`health.json`)
提供应用状态信息，可用于监控和负载均衡。

## 🔧 自定义域名

1. **在 Cloudflare Pages 中**
   - 进入你的项目设置
   - 点击 "Custom domains"
   - 点击 "Set up a custom domain"
   - 输入你的域名（如 `healthflow.example.com`）

2. **DNS 配置**
   - 如果域名在 Cloudflare 管理：会自动配置
   - 如果域名在其他服务商：需要添加 CNAME 记录指向 `.pages.dev` 域名

## 🚀 性能优化

Cloudflare Pages 自动提供：
- **全球 CDN**: 内容分发到全球边缘节点
- **自动压缩**: Gzip/Brotli 压缩
- **HTTP/2**: 现代协议支持
- **SSL/TLS**: 自动 HTTPS 证书

## 📊 监控和分析

1. **访问统计**
   - 在项目 Dashboard 中查看访问量
   - 查看部署历史和状态

2. **错误监控**
   - 查看 Functions 日志（如果使用）
   - 监控 4xx/5xx 错误

## 🔄 持续部署

每次推送到主分支时，Cloudflare Pages 会自动：
1. 检测代码变更
2. 触发新的部署
3. 部署完成后更新线上版本
4. 保留部署历史，支持回滚

## 🛠️ 故障排除

### 常见问题

1. **部署失败**
   - 检查文件结构是否正确
   - 确保 `index.html` 在根目录
   - 检查文件权限

2. **页面无法访问**
   - 检查 `_redirects` 配置
   - 确保 DNS 解析正确

3. **静态资源加载失败**
   - 检查文件路径是否正确
   - 确保 `_headers` 配置允许资源加载

### 调试技巧

1. **查看部署日志**
   - 在项目 Dashboard 中查看构建日志
   - 检查错误信息

2. **测试本地环境**
   ```bash
   npm run dev:local
   ```

3. **检查网络请求**
   - 使用浏览器开发者工具
   - 检查控制台错误信息

## 📞 支持

如果遇到问题：
1. 查看 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
2. 检查 [Cloudflare 状态页面](https://www.cloudflarestatus.com/)
3. 联系 Cloudflare 支持团队

---

**祝你部署顺利！** 🎉
