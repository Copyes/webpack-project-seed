### 背景

闲得蛋疼，然后自己搭建一个基于纯 webpack 的项目。

### 注意

本项目的 git commit 描述为下 : commmit message 必须带动词前缀以表示该次提交主要
操作是什么操作，操作后面跟上具体信息即可。

提供的操作动词有：

```js
[update] [optimize] [add] [build] [delete] [edit]
eg: [add] new files added and
```

### 工具

因为该项目构建统一所以增加一个脚本用于自动生成页面模版

```js
npm run newpage your-page-name
```

如果你想创建的是已经存在的文件夹下面的页面

```js
npm run newpage exist/your-page-name
```

### 正文

> 1、起手式

装各种基础包：webpack 等基础包

> 2、第二步

开发环境的搭建：

* [x] 1 、 server.js 代码编写
* [x] 2、webpack.dev.config.js 配置编写
* [x] 3、支持多页面的开发
* [x] 4、如果没有对应页面的文件夹下面没有模版 (index.html), 启用
      unit/layout/index.html
* [x] 5、支持 vue
* [x] 6、支持 postcss
* [x] 7、支持热更新 html,js,less
* [x] 8、配置拆分 base,dev,prod
* [x] 9、支持 ES6，目前可以使用 class 特性
* [x] 10、支持 ejs 模版
* [x] 11、支持 ESlint
* [x] 12、支持 zepto 有点问题，待优化
* [x] 13、支持 rem 布局
* [x] 14、支持 vconsole，移动端调试
* [x] 15、初始化样式
* [x] 16、大文件优化提醒
* [x] 17、支持 xtemplate
* [x] 18、支持组件化开发
* [x] 19、支持单文件编译开发
* [x] 20、支持命令生成模版文件

> 3、第三步

生产环境的搭建：

* [x] 1 、支持 tree shaking
* [x] 2、支持抽取公共 js，大概 4 个文件共用的时候
* [x] 3、支持压缩 less，js 代码
* [x] 4、支持增量更新，利用好浏览器缓存
* [x] 5、打包前先删除以前的资源
* [x] 6、postcss 支持添加 prefix
* [x] 7、抽离 css 到单独文件包括 vue 中的 css
* [ ] 8、支持 gzip 不支持了
* [x] 9、根据模块打包前的代码内容生成 hash
* [x] 10、增加环境配置相关文件 config
* [x] 11、支持 zepto
* [x] 12、支持 rem 布局
* [x] 13、支持初始化样式
* [x] 14、如果没有对应页面的文件夹下面没有模版 (index.html), 启用
      unit/layout/index.html
* [x] 15、支持 xtemplate
* [x] 16、支持组件化开发
* [x] 17、支持预编译 ( 抽离静态库，增加 hash)
* [x] 18、支持 ESlint
* [x] 19、支持 git hook 提交代码之前跑 eslint
* [x] 19、支持 css 去重
* [x] 20、打包进度提示
* [x] 21、优化 chunkid, 采用 chunk name 代替 id 做到 hash 不变 ( 项目下有个插件
      ，是用 hash 代替 name)
* [x] 22、稳定 module id，采用 hash 的当时代替 id

### 最后

感谢自己～嘿嘿
