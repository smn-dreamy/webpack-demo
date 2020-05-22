
// import './index.scss';
// import createAvatar from './createAvatar.js'
// createAvatar()
//
// import './index.scss'
// var root = document.getElementById('root')
// root.innerHTML = '<div class="iconfont iconauto iconbussiness-man">abc</div>'

// console.log(`hello world~~~~~~~~~~~~~dww`)

// import './style.css'
//
// var btn =document.createElement("button")
// btn.innerHTML = "新增"
// document.body.appendChild(btn)
//
// btn.onclick=function(){
//   var div = document.createElement('div')
//   div.innerHTML = 'item'
//   document.body.appendChild(div)
// }

//
// import counter from './counter.js'
// import number from './number.js'
// counter()
// number()
//
// if(module.hot){ //如果当前项目开启了hmr的功能，支持hot-module-reload
//   //module.hot.accept会接收第一个参数（它所依赖的文件的名字），可以理解为当第一个参数里面内容发生变化，就会执行回调函数
//   module.hot.accept('./number',()=>{
//     document.body.removeChild(document.getElementById('number'))
//     number()
//   })
// }

// import "@babel/polyfill";

// const arr=[
//   new Promise(()=>{}),
//   new Promise(()=>{})
// ]
//
// arr.map(item=>{
//   console.log(item)
// })



//
// import React,{Component} from 'react'
// import ReactDom from 'react-dom';
//
// class App extends Component{
//     render(){
//       return <div>hello world</div>
//     }
// }
//
// ReactDom.render(<App/>,document.getElementById('root'))


// import {add} from './math.js'
//
// add(1,6)

// import _ from 'lodash'; //通常我们会给lodash取名叫下划线
//
// console.log(_.join(['a','b','c'],'***'))


// function getComponent(){
//   return import(/*webpackChunkName:"lodash"*/'lodash').then(({default: _ })=>{
//     var element = document.createElement('div')
//     element.innerHTML = _.join(['dell','huahua'],'-')
//     return element
//   })
// }
//
// getComponent().then(element=>{
//   document.body.appendChild(element)
// })

//
// import test from './test.js'
// console.log(test.name)



// import _ from 'lodash'; //通常我们会给lodash取名叫下划线
//
// var element = document.createElement('div')
// element.innerHTML = _.join(['dell','huahua'],'-')
// document.body.appendChild(element)



// function getComponent(){
//   return import(/*webpackChunkName:"lodash"*/'lodash').then(({default: _ })=>{
//     var element = document.createElement('div')
//     element.innerHTML = _.join(['dell','huahua'],'-')
//     return element
//   })
// }

// async function getComponent(){
//   const {default: _ } = await import(/*webpackChunkName:"lodash"*/'lodash')
//   const element = document.createElement('div')
//   element.innerHTML = _.join(['dell','huahua'],'-')
//   return element
// }
//
// document.addEventListener('click',()=>{
//   getComponent().then(element=>{
//     document.body.appendChild(element)
//   })
// })


document.addEventListener('click',()=>{
  import(/*webpackPrefetch:true*/'./click.js').then(({default: _})=>{
    _()
  })
})















//
