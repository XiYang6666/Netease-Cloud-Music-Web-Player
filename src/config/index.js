const path = require('path');
const fs = require('fs');
const { app } = require('electron');

const config = require('./default');
const logger = require('../utils/logger');

const userConfigPath = path.join(app.getPath('userData'), 'config.json');

/**
 * 合并配置 (不支持Array)
 * @param {object} target
 * @param {object} source
 * @returns {object}
 */
function merge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = merge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * 获取配置
 * @returns {object}
 */
function getConfig() {
  if (!fs.existsSync(userConfigPath)) return config;
  try {
    let configFileContent = fs.readFileSync(userConfigPath);
    let configFileObject = JSON.parse(configFileContent);
    return merge(config, configFileObject);
  } catch (error) {
    logger.warn(`无法读取配置文件: ${error.message}`);
    return config;
  }
}

module.exports = getConfig();
