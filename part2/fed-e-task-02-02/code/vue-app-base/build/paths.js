/**
 * 用于解析用到的webpack中用到的路径
 */

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appDist: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appMainJs: resolveApp('src/main.js'),
    appPackageJson: resolveApp('package.json')
};
