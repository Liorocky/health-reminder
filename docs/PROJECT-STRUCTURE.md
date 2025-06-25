# HealthFlow 项目结构说明

本文档详细说明 HealthFlow 项目的文件组织结构和各部分的作用。

## 项目目录结构

```
health-reminder/
├── 📁 src/                     # 源代码目录
│   ├── 📄 worker.js           # Cloudflare Workers 主脚本
│   └── 📄 index.html          # 原始 HTML 模板文件
├── 📁 docs/                   # 文档目录
│   ├── 📄 README-deployment.md # 部署指南
│   └── 📄 PROJECT-STRUCTURE.md # 项目结构说明（本文件）
├── 📁 scripts/                # 脚本目录
│   ├── 📄 deploy.js           # 自动化部署脚本
│   └── 📄 dev.js              # 开发服务器脚本
├── 📄 package.json            # Node.js 项目配置
├── 📄 wrangler.toml          # Cloudflare Workers 配置
├── 📄 README.md              # 项目主说明文档
└── 📄 .gitignore             # Git 忽略文件配置
```

## 文件详细说明

### 📁 src/ - 源代码目录

#### 📄 src/worker.js
- **作用**: Cloudflare Workers 的主要执行脚本
- **内容**: 
  - 嵌入的完整 HTML 应用代码
  - HTTP 请求处理逻辑
  - 路由配置
  - 安全头设置
- **特点**: 
  - 单文件包含完整应用
  - 无需外部依赖
  - 优化的响应头配置

#### 📄 src/index.html
- **作用**: 原始 HTML 模板文件
- **用途**: 
  - 开发时的参考模板
  - 代码维护和更新
  - 本地测试
- **注意**: 实际部署时使用的是 worker.js 中嵌入的版本

### 📁 docs/ - 文档目录

#### 📄 docs/README-deployment.md
- **作用**: 详细的部署指南
- **内容**:
  - 环境配置说明
  - 部署步骤详解
  - 故障排除指南
  - 最佳实践建议

#### 📄 docs/PROJECT-STRUCTURE.md
- **作用**: 项目结构说明文档（本文件）
- **内容**: 各文件和目录的详细说明

### 📁 scripts/ - 脚本目录

#### 📄 scripts/deploy.js
- **作用**: 自动化部署脚本
- **功能**:
  - 环境检查
  - 多环境部署支持
  - 错误处理和日志
  - 部署状态反馈
- **使用**: `node scripts/deploy.js [--staging|--production]`

#### 📄 scripts/dev.js
- **作用**: 开发服务器启动脚本
- **功能**:
  - 开发环境检查
  - 本地服务器启动
  - 参数处理
  - 进程管理
- **使用**: `node scripts/dev.js [--local] [--port 3000]`

### 📄 根目录配置文件

#### 📄 package.json
- **作用**: Node.js 项目配置文件
- **内容**:
  - 项目元信息
  - 依赖管理
  - 脚本命令
  - 项目配置

#### 📄 wrangler.toml
- **作用**: Cloudflare Workers 配置文件
- **内容**:
  - Workers 应用配置
  - 环境设置
  - 路由规则
  - 资源限制

#### 📄 README.md
- **作用**: 项目主说明文档
- **内容**: 项目介绍和基本使用说明

#### 📄 .gitignore
- **作用**: Git 版本控制忽略文件配置
- **内容**: 
  - Node.js 相关忽略项
  - Cloudflare Workers 相关忽略项
  - 开发工具配置忽略项

## 开发工作流

### 1. 本地开发
```bash
# 启动开发服务器
npm run dev

# 或使用本地模式
npm run dev:local
```

### 2. 代码修改
- 修改 `src/index.html` 进行界面调整
- 修改 `src/worker.js` 进行逻辑调整
- 保持两个文件的同步

### 3. 测试部署
```bash
# 部署到预发布环境
npm run deploy:staging
```

### 4. 生产部署
```bash
# 部署到生产环境
npm run deploy:production
```

## 文件同步说明

由于 Cloudflare Workers 的特性，实际运行的是 `src/worker.js` 中嵌入的 HTML 代码。因此：

1. **开发时**: 可以修改 `src/index.html` 进行快速测试
2. **部署前**: 需要将 `src/index.html` 的更改同步到 `src/worker.js`
3. **建议**: 使用版本控制确保两个文件保持一致

## 扩展建议

### 添加构建流程
如果项目变得复杂，可以考虑添加：
- 自动化的 HTML 到 Worker 脚本转换
- CSS/JS 压缩和优化
- 代码分割和模块化

### 添加测试
```
├── 📁 tests/
│   ├── 📄 worker.test.js      # Workers 脚本测试
│   └── 📄 integration.test.js # 集成测试
```

### 添加 CI/CD
```
├── 📁 .github/
│   └── 📁 workflows/
│       ├── 📄 deploy.yml      # 自动部署
│       └── 📄 test.yml        # 自动测试
```

## 最佳实践

1. **保持简洁**: Workers 有执行时间限制，保持代码精简
2. **缓存策略**: 合理设置 HTTP 缓存头
3. **错误处理**: 完善的错误处理和日志记录
4. **安全考虑**: 设置适当的安全头
5. **性能优化**: 最小化 HTML/CSS/JS 体积

## 维护建议

1. **定期更新**: 保持依赖项的更新
2. **监控性能**: 关注 Workers 的执行时间和内存使用
3. **备份配置**: 保存重要的配置和环境变量
4. **文档更新**: 及时更新文档以反映代码变更
