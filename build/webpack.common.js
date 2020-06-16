const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const commonConfig = {
  entry: {
    // lodash: './src/lodash.js',
		main: './src/index.js',
		// sub: './src/index.js'
	},
  	module: {
  		rules: [
  			{
  				test: /\.js$/,
  				exclude: /node_modules/,

          use: [
            {
              loader: "babel-loader"
            }
          ]
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
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              }
            },
            'sass-loader',
            {
              loader: 'postcss-loader',
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
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
    plugins: [
  		new HtmlWebpackPlugin({
  			template: 'src/index.html'
  		}),
  		new CleanWebpackPlugin({
  			cleanAfterEveryBuildPattern: ['dist']
  		}),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].chunk.css'
      })
  	],
    optimization: {
      runtimeChunk: {
        name: 'runtime'
      },
      usedExports: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            // filename: 'vendors.js'
          }
        }
      },
      minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    performance: false,
    output: {
  		path: path.resolve(__dirname, '../dist')
  	},
}

module.exports = (env) => {
	if(env && env.production) {
		return merge(commonConfig, prodConfig);
	}else {
		return merge(commonConfig, devConfig);
	}
}
