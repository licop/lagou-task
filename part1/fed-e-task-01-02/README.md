# Part1-2 作业

( 请在当前文件直接作答 )

## 简答题

### 1. 请说出下列最终执行结果，并解释为什么?

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();
```

输出 10， 我们在 for 循环的头部定义了变量 i，通常是因为只想的 for 循环内部的上下文中使用 i,而忽略了 i 会被绑定在外部作用域（函数或全局）中的事实。因为 i 是全局作用域中的, 所以打印的都是循环后累加的 10。

使用 `let` 可以解决这个问题输出 6，让事件处理函数中获取正确索引。 `let` 不仅将 i 绑定到了 for 循环的块中，事实上它将其**重新绑定**到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值，内部也是可以**闭包**机制实现的。

### 2. 请说书此案列最终执行结果，并解释为什么?

```javascript
var tmp = 123;
if (true) {
  console.log(tmp);
  let tmp;
}
```

抛出 ReferenceError 错误（引用错误，即在作用域中没有找到该变量），因为变量声明 let tmp 声明会在块作用域上升，到 console.log(tmp)前面但是`let` 则修复了变量声明提升现象, 在没有声明之前就引用变量`都会报`ReferenceError`

### 3. 结合 ES6 语法，用最简单的方式找出数组中的最小值

```javascript
var arr = [12, 34, 32, 89, 4];
```

arr.sort((a, b) => a - b)[0]

### 4. 请详细说明 var、let、const 三种声明变量的方式之间的具体差别

- ES2016 新增了 let 命令，在此之前一致使用 var
- let 在块级作用域声明，外部引用不了，var 在全局都可以
- let 没有变量提升与暂时性死区
- let 变量不能重复声明， var 可以重复声明
- `const`用来声明一个只读的恒量/产量，任何修改值的操作都会引起错误，其他使用方式和 let 一致。

**最佳实践： 不用 var，主用 const，配合 let**

### 5. 请说出下列代码最终输出结果，并解释为什么？

```javascript
var a = 10;
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a);
    });
  },
};
obj.fn();
```

输出 20， setTimeout 不使用箭头函数，则输出 10，这题考察的箭头函数的 this 指向，箭头函数不会创建自己的， **它只会从自己的作用域链的上一层继承 this**，这里的上层作用域是 this 是 obj 对象

### 6. 简述 Symbol 类型的用途

Symbol 最主要的作用就是为对象添加独一无二的属性名，防止新方法的名字就有可能与现有方法产生冲突

### 7. 说说什么是浅拷贝，什么是深拷贝？

浅拷贝: 对于字符串类型，浅拷贝是对值的复制，对于对象来说，浅拷贝是对对象地址的复制, 也就是拷贝的结果是两个对象指向同一个地址

深拷贝: 深拷贝开辟一个新的栈，两个对象对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

### 8. 请简述 TypeScript 与 JavaScript 之间的关系？

TypeScript 作为 JavaScript 语言的超集，它为 JavaScript 添加了可选择的类型标注，大大增强了代码的可读性和可维护性。同时，它提供最新和不断发展的 JavaScript 特性，能让我们建立更健壮的组件。

### 9. 请谈谈你所认为的 typescript 优缺点

**优点**

- 可以在编写代码的时候就发现潜在的错误
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、代码重构等
- 类型系统实际上是最好的文档,代码语义跟清晰易懂
- 使用第三方库的时候，可以跳转查看到 API 的参数，返回值，属性等等

**缺点**

- 有些老型的库没有提供.d.ts 声明文件，或者类型定义的不友好 any 使用过多,
  例如 express 的 res 和 req 定义的类型都是 any
- 新概念过多不利于理解
- 开发小项目会定义声明文件会增加成本

### 10. 描述引用计数的工作原理和优缺点

**优点**

- 发现垃圾立即回收
- 最大限度减少程序暂停

**缺点**

- 无法回收循环引用的对象
- 时间开销大

### 11. 描述标记整理算法的工作流程

标记整理算法是标记清除的增强，工作流程： 遍历所有对象找标记活动对象 =》 执行整理，移动对象位置 =》 遍历所有对象清除没有标记的对象

### 12.描述 V8 中新生代存储区垃圾回收的流程

**新生代**指的是存活时间较短的对象

回收过程采用复制算法和标记整理，新生代内存区分为两个等大小的空间 From（使用空间）和 To（空闲空间）

活动对象存储在 From 空间，当垃圾回收时使用标记整理后将活动对象拷贝至 To，然后 From 和 To 交换空间完成释放

新生代区域垃圾回收使用空间换时间。

拷贝的过程中可能存在**晋升**，**晋升**就是将新生代对象移动至老年代.

### 13. 描述增量标记算法在何时使用及工作原理

在老生代垃圾回收使用，用于效率的优化

原本需要一次性遍历堆内存的操作改为增量标记的方式，先标记堆内存中的一部分对象，然后暂停，将执行权重新交给 JS 主线程，待主线程任务执行完毕后再从原来暂停标记的地方继续标记，直到标记完整个堆内存。这个理念其实有点像**React**框架中的**Fiber**架构，只有在浏览器的空闲时间才会去遍历**Fiber** Tree 执行对应的任务，否则延迟执行，尽可能少地影响主线程的任务，避免应用卡顿，提升应用性能。