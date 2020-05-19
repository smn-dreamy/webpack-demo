const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
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
						modules: true
					}
				},
				'sass-loader',
				{
					loader: 'postcss-loader',
					options: {
						plugins:()=>[
							require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7']
            	})
						]
					}
				}
			]
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
