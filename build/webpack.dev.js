const webpack = require('webpack')
const merge  = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

 const devConfig = {
	mode: 'development',
	devtool:'cheap-module-eval-source-map',


	devServer:{
		contentBase: './dist', //表示服务器要起在哪一个文件夹下，因为打包生成的文件都会放到dist目录下，所以要借助webpackdevserver来帮助我们启动一个服务器，服务器的根路径就设置在当前根目录下的dist文件夹中
		open: true,
		port: '8099',
		hot:true,
		// hotOnly:true
		// proxy: {
		// 	'/api': 'http://localhost:3000'
		// }
	},
	//**`HtmlWebpackPlugin`**：**会在打包结束后自动生一个html文件，并把打包生成的js自动的引入到这个html文件中**
	//plugin可以在webpack运行到某个时刻的时候，帮你做一些事情
	plugins: [
		new webpack.HotModuleReplacementPlugin()  //配置了它hmr才能生效
	],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  }
}

module.exports = merge(commonConfig,devConfig)
