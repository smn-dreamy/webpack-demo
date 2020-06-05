const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack')
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
            },
            {
              loader: "imports-loader?this=>window"
            }
          ]


  				// loader: "babel-loader",
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
            MiniCssExtractPlugin.loader,
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
            MiniCssExtractPlugin.loader,
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
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash',
        _join: ['lodash','join'],
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
      // splitChunks: {
      //     chunks: "all",  //在做代码分割的时候，只对异步的代码生效，如果想同步异步都分割，可以配置成“all”
      //     minSize: 0,
      //     minChunks: 1,
      //     maxAsyncRequests: 5,
      //     maxInitialRequests: 3,
      //     automaticNameDelimiter: '~',
      //     name: true,
      //     cacheGroups: {
      //         vendors: {
      //             test: /[\\/]node_modules[\\/]/,
      //             priority: -10,
      //             filename: 'vendors.js'
      //         },
      //         default: {
      //             // minChunks: 2,
      //             priority: -20,
      //             reuseExistingChunk: true,
      //             filename: 'common.js'
      //         }
      //     }
      // }
    },
    performance: false,
    output: {
  		// publicPath: '/',
  		// filename: '[name].js',
      // chunkFilename: '[name].chunk.js',
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
