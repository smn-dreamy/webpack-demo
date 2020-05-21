const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	// mode: 'production',
	// devtool:'cheap-module-source-map',
	mode: 'development',
	devtool:'cheap-module-eval-source-map',

	entry: {
		main: './src/index.js',
		// sub: './src/index.js'
	},
	devServer:{
		contentBase: './dist', //表示服务器要起在哪一个文件夹下，因为打包生成的文件都会放到dist目录下，所以要借助webpackdevserver来帮助我们启动一个服务器，服务器的根路径就设置在当前根目录下的dist文件夹中
		open: true,
		port: '8099',
		hot:true,
		hotOnly:true
		// proxy: {
		// 	'/api': 'http://localhost:3000'
		// }
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				// options: {
				// 	// "presets": [["@babel/preset-env",{
				// 	// 	"targets": {
		    //   //     "chrome": "67",//意思是Chrome浏览器版本大于67的时候，对es6的支持已经很好了，就不用了再去翻译成es5了
		    //   //   },
				// 	// 	useBuiltIns:'usage',  //当我做@babel/polyfill填充的时候，去往页面上加一些低版本浏览器不存在的一些特性的时候，不用把所有代码都加进来，根据你业务代码用到什么就加什么
				// 	// 	corejs : 3
				// 	// }]]
				//
				// 	"plugins": [["@babel/plugin-transform-runtime",{//@babel/plugin-transform-runtime会以闭包的形式去注入，间接的帮助组件去引入注入的内容，不存在全局污染的概念，在写类库的时候，不去污染全局环境是一个更好的方案
		    //     "corejs": 2,
		    //     "helpers": true,
		    //     "regenerator": true,
		    //     "useESModules": false,
				// 	}]]
				// }
			},
			{
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
			},
			{
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
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							// modules: true
						}
					},
					{
						loader: 'postcss-loader',
					}
				]
			},
			{
				test: /\.(eot|ttf|svg|woff)$/,
				use: {
					loader: 'file-loader'
				}
			}
		]
	},
	//**`HtmlWebpackPlugin`**：**会在打包结束后自动生一个html文件，并把打包生成的js自动的引入到这个html文件中**
	//plugin可以在webpack运行到某个时刻的时候，帮你做一些事情
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPattern: ['dist']
		}),
		new webpack.HotModuleReplacementPlugin()  //配置了它hmr才能生效
	],
	optimization: {
		usedExports: true
	},
	output: {
		// publicPath: '/',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}
