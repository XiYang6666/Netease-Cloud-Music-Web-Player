const config = require('../config');
const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.level = config.logger.level;
    this.console = config.logger.console;
    this.file = config.logger.file;
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
    this.pid = process.pid;
    this.moduleName = 'App';
    this.fileStream = null;
    this.currentFileSize = 0;

    // 初始化文件日志
    if (this.file) {
      this.initializeFileLogging();
    }
  }

  shouldLog(level) {
    return this.levels[level] <= this.levels[this.level];
  }

  // 设置当前模块名称
  setModule(moduleName) {
    this.moduleName = moduleName;
  }

  // 初始化文件日志系统
  initializeFileLogging() {
    try {
      const logDir = config.logger.logDir;
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      const logFile = path.join(logDir, config.logger.fileName);
      this.fileStream = fs.createWriteStream(logFile, { flags: 'a' });
      this.currentFileSize = fs.existsSync(logFile) ? fs.statSync(logFile).size : 0;

      this.info(`文件日志已初始化，目录: ${logDir}`);
    } catch (error) {
      console.error(`初始化文件日志失败: ${error.message}`);
      this.file = false; // 降级到控制台日志
    }
  }

  // 检查并执行日志轮转
  rotateLogIfNeeded() {
    if (!this.fileStream || this.currentFileSize < config.logger.maxSize) {
      return;
    }

    try {
      this.fileStream.end();
      const logDir = config.logger.logDir;
      const logFile = path.join(logDir, config.logger.fileName);

      // 轮转现有日志文件
      for (let i = config.logger.maxFiles - 1; i > 0; i--) {
        const oldFile = path.join(logDir, `app.log.${i}`);
        const newFile = path.join(logDir, `app.log.${i + 1}`);
        if (fs.existsSync(oldFile)) {
          fs.renameSync(oldFile, newFile);
        }
      }

      // 将当前日志文件重命名为 app.log.1
      const rotatedFile = path.join(logDir, 'app.log.1');
      if (fs.existsSync(logFile)) {
        fs.renameSync(logFile, rotatedFile);
      }

      // 重新创建日志文件
      this.fileStream = fs.createWriteStream(logFile, { flags: 'a' });
      this.currentFileSize = 0;

      this.debug(`日志文件已轮转，保留 ${config.logger.maxFiles} 个历史文件`);
    } catch (error) {
      console.error(`日志轮转失败: ${error.message}`);
    }
  }

  // 写入日志到文件
  writeToFile(message) {
    if (!this.fileStream) return;

    try {
      this.rotateLogIfNeeded();
      const line = message + '\n';
      this.fileStream.write(line);
      this.currentFileSize += Buffer.byteLength(line, 'utf8');
    } catch (error) {
      console.error(`写入日志文件失败: ${error.message}`);
    }
  }

  formatMessage(level, message, ...args) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${this.pid}] [${this.moduleName}] [${level.toUpperCase()}]`;

    // 将所有参数格式化为字符串
    const formattedArgs = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    });

    return `${prefix} ${message}${formattedArgs.length > 0 ? ' ' + formattedArgs.join(' ') : ''}`;
  }

  error(message, ...args) {
    if (this.shouldLog('error')) {
      const formatted = this.formatMessage('error', message, ...args);
      if (this.console) {
        console.error(formatted);
      }
      if (this.file) {
        this.writeToFile(formatted);
      }
    }
  }

  warn(message, ...args) {
    if (this.shouldLog('warn')) {
      const formatted = this.formatMessage('warn', message, ...args);
      if (this.console) {
        console.warn(formatted);
      }
      if (this.file) {
        this.writeToFile(formatted);
      }
    }
  }

  info(message, ...args) {
    if (this.shouldLog('info')) {
      const formatted = this.formatMessage('info', message, ...args);
      if (this.console) {
        console.log(formatted);
      }
      if (this.file) {
        this.writeToFile(formatted);
      }
    }
  }

  debug(message, ...args) {
    if (this.shouldLog('debug')) {
      const formatted = this.formatMessage('debug', message, ...args);
      if (this.console) {
        console.debug(formatted);
      }
      if (this.file) {
        this.writeToFile(formatted);
      }
    }
  }

  // 关闭文件流
  close() {
    if (this.fileStream) {
      try {
        this.fileStream.end();
        this.info('日志文件流已关闭');
      } catch (error) {
        console.error(`关闭日志文件流失败: ${error.message}`);
      }
    }
  }
}

module.exports = new Logger();