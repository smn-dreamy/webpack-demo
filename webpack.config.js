const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js',
		sub: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					//这种配置的语法叫placeholder(占位符)
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 2048
				}
			}
		},{
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,
						// modules: true
					}
				},
				'sass-loader',
				{
					loader: 'postcss-loader',
					// options: {
					// 	plugins:()=>[
					// 		require('autoprefixer')({
          //         browsers: ['last 2 version', '>1%', 'ios 7']
          //   	})
					// 	]
					// }
				}
			]
		},{
			test: /\.(eot|ttf|svg|woff)$/,
			use: {
				loader: 'file-loader'
			}
		}]
	},
	//**`HtmlWebpackPlugin`**：**会在打包结束后自动生一个html文件，并把打包生成的js自动的引入到这个html文件中**
	//plugin可以在webpack运行到某个时刻的时候，帮你做一些事情
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPattern: ['dist']
		})
	],
	output: {
		publicPath: 'http://cdn.com.cn',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}
