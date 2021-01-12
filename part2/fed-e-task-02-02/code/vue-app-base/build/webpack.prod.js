const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
	mode: 'production',
	// 在第一个错误出现时抛出失败结果，而不是容忍它，会导致打包退出
	bail: true,
	devtool: 'node',

	optimization: {
		// 是否压缩， 线上环境压缩
		minimize: true,

		minimizer: [
			// 压缩 js
			new TerserPlugin(),
			// 优化压缩 css
			new OptimizeCSSAssetsPlugin()
		],
		// 用于 code-splitting 代码拆分
		splitChunks: {
			chunks: 'all'		
		}
	}
}

module.exports = merge(commonConfig, prodConfig);
