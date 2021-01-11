# 一、简答题

#### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

在我们的项目中会散落着各种各样的代码和资源文件，webpack 会根据配置找到文件作为打包入口，一般情况下都会是一个 javascript 文件，然后会找到代码中 import 和 require 之类的语句，解析推断出文件所依赖的资源模块，然后解析每个资源模块对应的依赖，最后形成整个项目所有用到文件之间的依赖树，webpack 会递归这个依赖树，然后找到每个节点所对应的资源文件，根据配置文件中的 rules 属性找到模块所对应的加载器，交给对应的加载器加载这个模块，最后会把加载到的结果放到 bundle.js 中，完成这个**打包**过程

#### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

**Loader**

`loader`是 webpack 的核心特性,`loader`负责资源文件从输入到输出的转换, 对于同一资源可以依次使用多个 `loader`。借助于 `loader` 就可以加载任何类型的资源 `webpack` 不能识别非 js 格式文件， 只能使用 `loader` 用于对模块的源代码进行转换。webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 `loader`。

`loader`就是一个函数的 javascript 模块，第一个参数为 webpack 配置里`rules`匹配的文件内容。webapck 的 `loader` 加载资源的过程有点类似于一个工作管道，可以在加载过程中依次使用多个 `loader`，要求管道工作过后的结果必须是一段 javascript 代码，否则打包的内容会报错。所以一个 `loader` 返回的结果要么要么是一段 javascript 代码，要么在找个一个其他的 `loader` 来处理这段结果。

**Plugin**

`plugin`可以在 webpack 运行到某个节点，帮我们实现前端打多工程化工作，`plugin`目的在于解决 loader 无法实现的其他事。

`plugin` 通过钩子机制实现，webpack 工作过程中很多环节，便于 webpack 的扩展几乎给每个环节都埋下了一个钩子(hooks)，我们给每个节点挂载不同的任务，就可以通过`plugin`扩展 webpack 的能力。一般情况下`plugin` 是一个带有 `apply` 方法的 `class` 类。

`plugin`的作用是在 webpack 的某个时刻执行某项功能，通过`compiler.hooks`来触发某个时刻。

# 二、编程题

#### 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

1. 在 code/vue-app-base 中安装、创建、编辑相关文件，进而完成作业。
2. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
3. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
4. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
5. 尽可能的使用上所有你了解到的功能和特性

**提示：(开始前必看)**

在视频录制后，webpack 版本以迅雷不及掩耳的速度升级到 5，相应 webpack-cli、webpack-dev-server 都有改变。

项目中使用服务器的配置应该是改为下面这样：

```json
// package.json 中部分代码
"scripts": {
	"serve": "webpack serve --config webpack.config.js"
}
```

vue 文件中 使用 style-loader 即可

其它问题, 可先到 https://www.npmjs.com/ 上搜索查看相应包的最新版本的配置示例, 可以解决大部分问题.

#### 作业要求

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 最终将录制的视频或说明文档和代码统一提交至作业仓库。
