## Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化

### 简答题

#### 1、请简述 Vue 首次渲染的过程。

初始化与首次渲染逻辑图：

![](./img/Vue初始化与首次渲染.png)

#### 2、请简述 Vue 响应式原理。

大体上可分为**初始化**和**更新**两个步骤。

**初始化视图**

在 Dom 挂载视图首次渲染之前，实例初始化的时候`initState()`方法将 data 选项中的数据绑定到 vue 实例上，然后通过`Observer`转化成响应式数据。然后执行`vm.$mount()`；新建一个渲染`Watcher`，执行依次执行`updateComponent` --> `_update` --> `__patch__`方法渲染视图；在此过程中访问属性触发属性的`getter`方法，调用`dep.addSub`收集`Watcher`依赖。

**更新视图**

选项 data 中的属性发生变化，触发属性的`setter`方法，发送通知`dep.notify()`，该属性所有依赖`Watcher`实例`update`执行，渲染`watcher`直接执行`queueWatcher`,把当前`watcher`放进一个队列; 调用`nextTick`刷新队列，异步更新视图，然后依次执行`updateComponent` --> `_update` --> `__patch__`,视图**更新**

![](./img/Vue数据响应式原理.png)

#### 3、请简述虚拟 DOM 中 Key 的作用和好处。

#### 4、请简述 Vue 中模板编译的过程。
