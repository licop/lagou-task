## 简答题

（请直接在本文件中作答）

#### 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

- Vue3.0 对响应式系统进行了升级
- 对模板编译进行了优化, 重写虚拟 dom，效果显著提升
- 对打包进行了优化
  - Vue.js 3.0 中移除了一些不常用的 Api，例如`inline-template`, `filter`
  - 更好的 Tree-shaking，Tree-shaking 依赖 ESModule，Vue3.0 的一些 api 支持 Tree-shaking，如果没有使用不会打包

#### 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x 使用的 Options Api 有什么区别？

**Options API**

- vue2 中如何组织代码的：我们会在一个 vue 文件中 data，methods，computed，watch 中定义属性和方法，共同处理页面逻辑
- 缺点： 一个功能往往需要在不同的 vue 配置项中定义属性和方法，比较分散，项目小还好，清晰明了，但是项目大了后，一个 methods 中可能包含很多个方法，往往分不清哪个方法对应着哪个功能
- 优点：新手入门会比较简单

**Composition API**

- 在 vue3 Composition API 中，代码是根据逻辑功能来组织的，一个功能的所有 api 会放在一起（高内聚，低耦合），这样做，即时项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有 API，而不像 vue2 Options API 中一个功能所用到的 API 都是分散的，需要改动，到处找 API 的过程是很费时间的
- 缺点：学习成本可能会增加，以前的思维方式也要转变
- 优点：Composition API 是根据逻辑相关性组织代码的，提高可读性和可维护性，基于函数组合的 API 更好的重用逻辑代码（在 vue2 Options API 中通过 Mixins 重用逻辑代码，容易发生命名冲突且关系不清）

#### 3、Proxy 相对于 Object.defineProperty 有哪些优点？

- Proxy 可以监视读写以外的操作，比如删除操作
- Proxy 可以很方便的监视数组操作
- Proxy 是以非入侵的方式监管的对象的读写，Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；

#### 4、Vue 3.0 在编译方面有哪些优化？

Vue.js 3.0 中标记和提升所有的**静态节点**，diff 的时候只需要对比动态节点内容，提升 diff 性能

- Fragments(升级 vetur 插件)
- 静态提升
- Patch flag 标记动态节点可能变化的地方
- 缓存事件处理函数

#### 5、Vue.js 3.0 响应式系统的实现原理？

Vue3.0 响应式原理步骤如下：

1. 使用 Proxy 允许我们拦截对象, 检测某个值发生变化
2. **跟踪更改它的函数**：我们在 Proxy 中的 getter 中执行此操作，称为 `effect`
3. **触发函数以便它可以更新最终值**：我们在 Proxy 中的 setter 中进行该操作，名为 `trigger`
