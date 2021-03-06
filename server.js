const express  =  require('express')
const webpack  =  require('webpack')
const webpackDevMiddleware  =  require('webpack-dev-middleware')
const config  =  require('./webpack.config.js')
const complier  =  webpack(config) //用webpack结合配置文件随时都可以进行代码的编译

const app = express() //起一个node服务

app.use(webpackDevMiddleware(complier,{
  // publicPath: config.output.publicPath
}))

app.listen(3000,()=>{
  console.log('server is running')
})
