#!/usr/bin/env node

/**
 * HealthFlow 开发脚本
 * 启动本地开发服务器 (Cloudflare Pages)
 */

const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

// 颜色输出
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPrerequisites() {
    log('🔍 检查开发环境...', 'cyan');

    // 检查主页面文件
    if (!fs.existsSync('index.html')) {
        log('❌ 找不到 index.html 文件', 'red');
        process.exit(1);
    }

    // 检查 JavaScript 文件
    if (!fs.existsSync('js/app.js')) {
        log('❌ 找不到 js/app.js 文件', 'red');
        process.exit(1);
    }

    log('✅ 开发环境检查通过', 'green');
}

function startDevServer() {
    log('\n🚀 启动开发服务器...', 'magenta');
    log('💡 提示: 按 Ctrl+C 停止服务器', 'yellow');
    log('=' .repeat(50), 'cyan');

    const args = process.argv.slice(2);
    let port = 8080;

    // 处理命令行参数
    if (args.includes('--local')) {
        log('🏠 使用本地静态文件服务器', 'blue');
        startStaticServer(port);
        return;
    }

    if (args.includes('--preview')) {
        log('👀 使用预览模式', 'blue');
        startStaticServer(port);
        return;
    }

    if (args.includes('--port')) {
        const portIndex = args.indexOf('--port');
        if (portIndex !== -1 && args[portIndex + 1]) {
            port = parseInt(args[portIndex + 1]);
            log(`🔌 使用端口: ${port}`, 'blue');
        }
    }

    // 默认启动静态文件服务器
    startStaticServer(port);
}

function startStaticServer(port) {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url);
        let pathname = parsedUrl.pathname;

        // 默认路由到 index.html
        if (pathname === '/') {
            pathname = '/index.html';
        }

        // 健康检查端点
        if (pathname === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'healthy',
                service: 'HealthFlow',
                version: '1.0.0',
                platform: 'Local Development',
                timestamp: new Date().toISOString()
            }));
            return;
        }

        const filePath = path.join(process.cwd(), pathname);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                // 404 - 返回 index.html 作为 SPA 回退
                fs.readFile(path.join(process.cwd(), 'index.html'), (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Internal Server Error');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
                return;
            }

            // 设置正确的 Content-Type
            const ext = path.extname(filePath);
            let contentType = 'text/plain';

            switch (ext) {
                case '.html':
                    contentType = 'text/html';
                    break;
                case '.js':
                    contentType = 'application/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.svg':
                    contentType = 'image/svg+xml';
                    break;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });

    server.listen(port, () => {
        log(`\n✅ 服务器已启动`, 'green');
        log(`🌐 本地地址: http://localhost:${port}`, 'cyan');
        log(`📱 网络地址: http://127.0.0.1:${port}`, 'cyan');
        log('\n按 Ctrl+C 停止服务器', 'yellow');
    });

    // 处理进程信号
    process.on('SIGINT', () => {
        log('\n🛑 正在停止开发服务器...', 'yellow');
        server.close(() => {
            log('👋 开发服务器已停止', 'yellow');
            process.exit(0);
        });
    });

    process.on('SIGTERM', () => {
        log('\n🛑 正在停止开发服务器...', 'yellow');
        server.close(() => {
            log('👋 开发服务器已停止', 'yellow');
            process.exit(0);
        });
    });
}

function showUsage() {
    log('\n📖 使用方法:', 'yellow');
    log('  node scripts/dev.js [选项]', 'reset');
    log('\n选项:', 'yellow');
    log('  --local        使用本地静态文件服务器', 'reset');
    log('  --preview      使用预览模式', 'reset');
    log('  --port <port>  指定端口号 (默认: 8080)', 'reset');
    log('  --help         显示帮助信息', 'reset');
    log('\n示例:', 'yellow');
    log('  node scripts/dev.js                    # 启动开发服务器', 'reset');
    log('  node scripts/dev.js --local            # 本地模式', 'reset');
    log('  node scripts/dev.js --preview          # 预览模式', 'reset');
    log('  node scripts/dev.js --port 3000        # 指定端口', 'reset');
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--help') || args.includes('-h')) {
        showUsage();
        return;
    }
    
    log('🏥 HealthFlow 开发服务器 (Cloudflare Pages)', 'bright');
    log('=' .repeat(50), 'cyan');
    
    checkPrerequisites();
    startDevServer();
}

if (require.main === module) {
    main();
}
