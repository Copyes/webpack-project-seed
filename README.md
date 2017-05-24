### 背景

闲得蛋疼，然后自己搭建一个基于纯webpack的项目。

### 正文

>1、起手式

装各种基础包：webpack等基础包，
构建基础文件目录：
```js
	webpack-project-seed
	---build     // webpack相关配置文件
	---dist		 // 编译后的文件目录
	---src       // 源文件
		---pages		// 页面
		---components  //组件
	---unit      // 存放基本模版，libs库等公共相关
		---layout
		---libs
	.eslintrc
	.gitignore    
	packet.json  // 依赖包文件
	server.js   // node服务启动
```

>2、第二步

开发环境的搭建：
			
-	[x] 1、server.js代码编写
-	[x] 2、webpack.dev.config.js配置编写
-	[x] 3、entry.js获取多页面的文件路径信息编写
-	[x] 4、如果没有对应页面的文件夹下面没有模版(index.html),启用unit/layout/webpack_layout.html
-	[x] 5、支持vue
-	[x] 6、支持postcss
-	[x] 7、支持热更新html,js,less
-	[x] 8、配置拆分base,dev,prod
-	[ ] 9、支持ES6，目前可以使用class特性

>3、第三步

生产环境的搭建：

-	[ ] 1、tree shaking
-	[ ] 2、抽取公共js，大概4个文件共用的时候
-	[ ] 3、压缩less，js代码
-	[ ] 4、增量更新，利用好浏览器缓存
-	[ ] 5、

>3、第三步

生产环境代码打包

todo:

### 最后
