#!/usr/bin/env node

/**
 * HealthFlow 开发脚本
 * 启动本地开发服务器
 */

const { spawn } = require('child_process');
const fs = require('fs');

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
    
    // 检查配置文件
    if (!fs.existsSync('wrangler.toml')) {
        log('❌ 找不到 wrangler.toml 配置文件', 'red');
        process.exit(1);
    }
    
    // 检查源文件
    if (!fs.existsSync('src/worker.js')) {
        log('❌ 找不到 src/worker.js 文件', 'red');
        process.exit(1);
    }
    
    log('✅ 开发环境检查通过', 'green');
}

function startDevServer() {
    log('\n🚀 启动开发服务器...', 'magenta');
    log('💡 提示: 按 Ctrl+C 停止服务器', 'yellow');
    log('=' .repeat(50), 'cyan');
    
    const args = process.argv.slice(2);
    const wranglerArgs = ['dev'];
    
    // 处理命令行参数
    if (args.includes('--local')) {
        wranglerArgs.push('--local');
        log('🏠 使用本地模式', 'blue');
    }
    
    if (args.includes('--port')) {
        const portIndex = args.indexOf('--port');
        if (portIndex !== -1 && args[portIndex + 1]) {
            wranglerArgs.push('--port', args[portIndex + 1]);
            log(`🔌 使用端口: ${args[portIndex + 1]}`, 'blue');
        }
    }
    
    // 启动 wrangler dev
    const devProcess = spawn('wrangler', wranglerArgs, {
        stdio: 'inherit',
        shell: true
    });
    
    devProcess.on('error', (error) => {
        log(`❌ 启动失败: ${error.message}`, 'red');
        log('💡 请确保已安装 wrangler: npm install -g wrangler', 'yellow');
        process.exit(1);
    });
    
    devProcess.on('close', (code) => {
        if (code !== 0) {
            log(`\n❌ 开发服务器异常退出 (代码: ${code})`, 'red');
        } else {
            log('\n👋 开发服务器已停止', 'yellow');
        }
    });
    
    // 处理进程信号
    process.on('SIGINT', () => {
        log('\n🛑 正在停止开发服务器...', 'yellow');
        devProcess.kill('SIGINT');
    });
    
    process.on('SIGTERM', () => {
        log('\n🛑 正在停止开发服务器...', 'yellow');
        devProcess.kill('SIGTERM');
    });
}

function showUsage() {
    log('\n📖 使用方法:', 'yellow');
    log('  node scripts/dev.js [选项]', 'reset');
    log('\n选项:', 'yellow');
    log('  --local        使用本地模式（不连接 Cloudflare）', 'reset');
    log('  --port <port>  指定端口号', 'reset');
    log('  --help         显示帮助信息', 'reset');
    log('\n示例:', 'yellow');
    log('  node scripts/dev.js                    # 启动开发服务器', 'reset');
    log('  node scripts/dev.js --local            # 本地模式', 'reset');
    log('  node scripts/dev.js --port 3000        # 指定端口', 'reset');
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--help') || args.includes('-h')) {
        showUsage();
        return;
    }
    
    log('🏥 HealthFlow 开发服务器', 'bright');
    log('=' .repeat(50), 'cyan');
    
    checkPrerequisites();
    startDevServer();
}

if (require.main === module) {
    main();
}
