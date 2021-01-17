## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
  el: "#el",
  data: {
    o: "object",
    dog: {},
  },
  methods: {
    clickHandler() {
      // 该 name 属性是否是响应式的
      this.dog.name = "Trump";
    },
  },
});
```

答:

不是响应式的，Vue 使用`Object.defineProperty` 把传入的 data 遍历 property 全部转为 `getter/setter`, 以此实现响应式，这一过程在**初始化**实例的时候就执行好了，后来添加的时候不会进行数据拦截来监听属性的的变化。

```
// 正确更改
let vm = new Vue({
  el: '#app',
  data: {
    o: 'object',
    dog: {
      age: 6,
      name: ''
    }
  },
  methods: {
    clickHandler () {
    // 该 name 属性是否是响应式的
      this.dog.name = 'Trump'
    }
  }
})
```

### 2、请简述 Diff 算法的执行过程

## 二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

参考 code/my-vue-router 目录下代码，[vue-router 实现代码](https://github.com/licop/What_is_FE/blob/master/examples/vue-router/06-my-vue-router/src/vuerouter/index.js)

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

参考 code/Vue 目录下代码，[Vue 实现代码](https://github.com/licop/What_is_FE/blob/master/examples/vue-router/06-my-vue-router/src/vuerouter/index.js)

### 3、参考 Snabbdom 提供的电影列表的示例，利用 Snabbdom 实现类似的效果，如图：

<img src="images/Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449.png" alt="Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449" style="zoom:50%;" />

<b style="color:red">Snabbdom 版本升级过快, 新版本中 h、init 函数的引入方式如下：</b>

```js
import { h } from "snabbdom/build/package/h";
import { init } from "snabbdom/build/package/init";
// 下面内容请按需导入
import { classModule } from "snabbdom/build/package/modules/class";
import { propsModule } from "snabbdom/build/package/modules/props.js";
import { styleModule } from "snabbdom/build/package/modules/style.js";
import { eventListenersModule } from "snabbdom/build/package/modules/eventlisteners.js";
```
