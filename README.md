### 背景

闲得蛋疼，然后自己搭建一个基于纯webpack的项目。

### 正文

>1、起手式

装各种基础包：webpack等基础包，
构建基础文件目录：
```js
	webpack-project-seed
	---assets	 			// 静态文件	
	---build     			// webpack相关配置文件
	---config				// 相关配置文件
	---dist		 			// 编译后的文件目录
	---src       			// 源文件
		---pages			// 页面
		---components       //组件
		---units     		// 存放基本模版，libs库等公共相关
			---layout
			---libs
			---commons
	.eslintrc
	.gitignore    
	packet.json  			// 依赖包文件
	server.js   			// node服务启动
```

>2、第二步

开发环境的搭建：
			
-	[x] 1、server.js代码编写
-	[x] 2、webpack.dev.config.js配置编写
-	[x] 3、支持多页面的开发
-	[x] 4、如果没有对应页面的文件夹下面没有模版(index.html),启用unit/layout/index.html
-	[x] 5、支持vue
-	[x] 6、支持postcss
-	[x] 7、支持热更新html,js,less
-	[x] 8、配置拆分base,dev,prod
-	[x] 9、支持ES6，目前可以使用class特性
-	[x] 10、支持ejs模版
-	[x] 11、支持ESlint
-	[x] 12、支持zepto有点问题，待优化
-	[x] 13、支持rem布局
-	[x] 14、支持vconsole，移动端调试
-	[x] 15、初始化样式
-	[x] 16、大文件优化提醒
-	[x] 17、支持xtemplate
-	[x] 18、支持组件化开发
-	[x] 19、支持单文件编译开发

 
>3、第三步

生产环境的搭建：

-	[x] 1、支持tree shaking
-	[x] 2、支持抽取公共js，大概4个文件共用的时候
-	[x] 3、支持压缩less，js代码
-	[x] 4、支持增量更新，利用好浏览器缓存
-	[x] 5、打包前先删除以前的资源
-	[x] 6、postcss支持
-	[x] 7、抽离css到单独文件包括vue中的css
-	[ ] 8、支持gzip
-	[x] 9、根据模块打包前的代码内容生成hash
-	[x] 10、增加环境配置相关文件config
-	[x] 11、支持zepto
-	[x] 12、支持rem布局
-	[x] 13、支持初始化样式
-	[x] 14、如果没有对应页面的文件夹下面没有模版(index.html),启用unit/layout/index.html
-	[x] 15、支持xtemplate
-	[x] 16、支持组件化开发
-	[x] 17、支持预编译
-	[x] 18、支持ESlint


### 最后

感谢自己～嘿嘿
