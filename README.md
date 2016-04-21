# react-flow
轻量级react单向数据流

## npm安装方法
```shell
# webpack工程目录安装方法 在webpack工程目录下的配置文件webpack.config.js指定依赖就可以 "react-flow":"^1.0.3"

# 全局安装
npm install -g react-flow
```

## 简介
由于react根据数据流来渲染dom，所以出现了很多单向数据流的架构模式，比如大名鼎鼎的flux和redux等。
不知道为啥，我看了redux的文档，感觉管理数据很麻烦，特别是异步数据流。所以我就自己动手造轮子了，顺便说一句，有点看不懂现在的前端了。
react-flow主要解决两个问题：

1、超级简单的使用，没学习成本，一看就会
2、简单的异步数据流

现在就简单的说下原理：

首先一点，再牛逼的单向数据流都是围绕stroe来工作的。react组件的数据变化通过action来发送变化通知，combineFlow来连接action和store。
store就是负责数据的更新和通知组件渲染。

## API
```javascript
import {createActions,createStore,combineFlow} from 'react-flow' // 导入模块

// 对store提供三个方法 get set del

// 创建action
createActions({
	update:('传入的参数')=>({
		type:'动作类型',//必须要有的
		data:'可以带入其它数据'
	})
})

// 创建store
createStore({
	'update':()=>{}
})

// 创建中间件 这个主要是为了异步   如果不是异步 这个可以省略
combineFlow((data,store,cb)=>{
	// data action带入的数据 这里面可以写逻辑了  比如ajax  fetch
	// cb() 如果异步完毕就必须执行cb()
})
```

## 例子
flow目录有列子，用webpack编译，放到路由里面