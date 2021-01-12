const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {appDist, appMainJs, appHtml} = require('./paths')

module.exports = {
	entry: {
		main: appMainJs
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, { 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'eslint-loader',
			enforce: 'pre'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader'
		}, {
			test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
			use: {
				loader: 'url-loader',
				options: {
					limit: 10240,
                    name: 'static/[name].[hash:8].[ext]',
				}
			} 
		}, {
			test: /\.(eot|ttf|svg|ico)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: 'static/[name].[hash:8].[ext]',
				} 
			}
		}, {
			test: /\.less$/,
			use: [
				MiniCssExtractPlugin.loader, 
				'css-loader',
				'less-loader',
				'postcss-loader'
			],
			sideEffects: true
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			],
			sideEffects: true
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Licop Vue Webpack',
			meta: {
				viewport: 'width=device-width'
			},
			template: appHtml
		}), 
		new CleanWebpackPlugin(['dist']),
		new VueLoaderPlugin(),
		// 将css文件提取出来
		new MiniCssExtractPlugin(),
		// 将public的文件拷贝到dist
		new CopyWebpackPlugin([
			'public'
		]),
		// 定义变量
		new webpack.DefinePlugin({
			// 值要求的是一个代码片段
			BASE_URL: '"./"'

		})
	],
	output: {
		filename: '[name].[hash:8].js',
		path: appDist
	}
}
