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

不是响应式的，Vue 使用`Object.defineProperty` 把传入的 data 遍历 property 全部转为 `getter/setter`, 以此实现响应式，这一过程在**初始化**实例的时候就执行好了，后来添加的属性不会进行数据拦截来监听属性的的变化。

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

Diff 算法对比两个 VNode 的子节点，用来查找两个节点树节点的差异，由于 Dom 操作中很少会跨级别操作节点，因此只需遍历**同级别**的子节点一次比较。

在进行同级别节点比较的时候，首先会对新老节点数组的开始和结尾节点设置标记索引，遍历的过程中移动索引。然后对开始和结束节点比较，循环遍历新旧 VNode 节点的子元素:

- 如果旧开始节点/新开始节点相同，对比和更新节点，移动新旧开始索引到右移
- 如果旧结束节点/新结束节点相同，对比和更新节点，移动新旧结束索引到左移
- 如果旧开始节点/新结束节点相同，对比和更新节点， 把 旧开始节点 对应的 DOM 元素，移动到右边
- 如果旧结束节点/新开始节点相同, 对比和更新节点，把 oldEndVnode 对应的 DOM 元素，移动到左边
- 如果新旧 vnode 节点的开始和结束都各不相等，遍历新节点，使用新节点的 key 值在老节点数组中找相同的节点
  - 如果没找到相同的 key 值，说明是新的节点，创建新节点对应的 dom 元素插入到 dom 树中
  - 如果找到了相同的 key 值，判断新节点和找到的老节点的 sel 选择器是否相同
    - 如果不相同，说明节点被修改了，重新创建对应的 DOM 元素，插入到 DOM 树中
    - 如果相同，把 旧节点 对应的 DOM 元素，移动到左边

循环遍历结束之后:

- 如果老节点的数组先遍历完(oldStartIdx > oldEndIdx)，说明新节点有剩余，把剩余节点批量插入到右边
- 如果新节点的数组先遍历完(newStartIdx > newEndIdx)，说明老节点有剩余，把剩余节点批量删除

> 以上所谓的**节点相同**指的是 VNode 的 key 值和选择器都相同

## 二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

参考 code/my-vue-router 目录下代码，[vue-router 实现代码](https://github.com/licop/What_is_FE/blob/master/examples/vue-router/06-my-vue-router/src/vuerouter/index.js)

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

参考 code/Vue 目录下代码，[Vue 实现代码](https://github.com/licop/lagou-task/tree/master/part3/fed-e-task-03-01/code/Vue)

添加 `methods` 选项功能实现，使其内部函数调用 this 绑定到 Vue 实例，可获取实例的属性和方法。

`v-on`实现调用`methods`里方法的功能，并且支持传递参数

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
