---
catalog:
  - jishu
date: '2025-11-04 08:00:00'
type: Post
slug: htmltip
title: H&C&J| Tips Collection
status: 已发布
urlname: 282e9dc9-c245-80da-83c6-f1711a1eb1f7
updated: '2025-11-08 12:18:00'
---

# HCJ（前端基础三件套）


## 🍉 SVG的使用


Svg图片在矢量领域挺受欢迎的，但是我之前一直老是用img去加载而大部分Web其实都是原生载入Svg。也就是说审查元素的时候是原生有Svg嵌入的，但是我img src的话基本就是直接引入，无法控制内部的元素。


**1.作为 Vue 组件使用**


**创建一个 SVG 组件文件，例如** **`src/components/icons/MenuIcon.vue`**


```typescript
// src/components/icons/MenuIcon.vue
<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 12H21M3 6H21M3 18H21" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
// 定义 props，让组件更灵活
defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: 'currentColor',
  }
});
</script>
```


**use example**


```typescript
<template>
  <div>
    <!-- 使用组件，并传入 props -->
    <MenuIcon size="32" color="red" />
    <MenuIcon />
  </div>
</template>

<script setup>
import MenuIcon from '@/components/icons/MenuIcon.vue';
</script>
```


**2.插件模版式自动导入**


借助插件来自动完成这个过程。这里以 Vite 为例，使用 `vite-plugin-svg-icons`。



```typescript
<template>
  <div>
    <!-- 直接使用，name 是文件名 -->
    <SvgIcon name="menu" size="24" color="blue" />
    <SvgIcon name="user" />
  </div>
</template>

<script setup>
// 如果全局注册了 SvgIcon，这里就不需要导入了
import SvgIcon from '@/components/SvgIcon.vue';
</script>
```


## 🍉 盒子模型


盒模型

- **Content（内容）**
- **Padding（内边距）**
- **Border（边框）**
- **Margin（外边距）**

默认**标准盒模型（谷歌盒）**


**(box-sizing: content-box)**


意思默认情况下写死css的width就是content的宽度


从content基础上加padding , margin, 就像建房子时，墙壁往外建的效果一样。


**(box-sizing: border-box)（IE盒）**


width是整个盒子模型的宽度


设定了width就是整个元素的宽度，就像房子固定了往屋子里建的效果。


**总结：不同盒模型的width计算不一样**


## 🍉 盒模型下的边距margin重叠-BFC / IFC


两个div上下都有一定的margin 遇到的时候不会单纯的相加 比如上div margin 20px 下div margin 10px 他俩之间不会产生30px的margin而是合并为20px的margin


（当两个**垂直相邻**的**块级元素 (block-level element)** 的外边距相遇时，它们会合并（重叠）成一个外边距。合并后的外边距高度等于两个发生重叠的外边距中的**较大者**。）


**有些时候我们不希望他发生边距重叠，我们采用BFC和IFC来解决**


Block Fomatting Context 和Inline Formatting Context


想象成一个结界**或**独立的小世界，里面的元素如何布局，不会影响到外面的元素；反之，外面的布局也不会影响到里面。


触发条件：一个元素只要满足以下**任意一个条件**，就会创建新的 BFC：

- **根元素** **`<html>`**：本身就是一个 BFC。
- **`display: flow-root;`**：**现代首选！** 这是专门为了创建 BFC 而生的属性，没有任何副作用。
- **`float`**：值为 **`left`** 或 **`right`** 的浮动元素。
- **`position`**：值为 **`absolute`** 或 **`fixed`** 的定位元素。
- **`display`**：值为 **`inline-block`**, **`table-cell`**, **`table-caption`**, **`flex`**, **`grid`**, **`inline-flex`**, **`inline-grid`** 的元素。
- **`overflow`**：值不为 **`visible`** 的元素（如 **`hidden`**, **`auto`**, **`scroll`**）。

解决问题：


**1. 防止父元素高度塌陷（清除浮动）**


**2. 防止外边距重叠 (Margin Collapsing)**


**3. 防止文字环绕浮动元素（实现多栏布局）**


## 🍉  堆叠上下文下的z-index


一个元素会创建自己的叠放上下文，比如当它满足以下条件之一时：


| 条件                                                          | 示例                                |
| ----------------------------------------------------------- | --------------------------------- |
| position 为 `absolute`/`relative`/`fixed` 且 `z-index` 非 auto | `position: relative; z-index: 1;` |
| `position: sticky` 时                                        | `position: sticky;`               |
| 元素 `opacity < 1`                                            | `opacity: 0.8;`                   |
| 元素使用了 `transform`                                           | `transform: translateX(10px);`    |
| `filter`, `perspective`, `mix-blend-mode` 等                 | `filter: blur(5px);`              |
| `isolation: isolate`                                        | `isolation: isolate;`             |


如果某个父元素创建了一个独立 stacking context，则其内部元素的 z-index 再高，也**无法越过**这个父上下文之外的元素。


**总结：z-index不是全局的有时候会被父元素的z-index束缚 导致实际上的提升z-index不起效果**


## 🍉  布局与Flex


一直以来基本上flex都是查 总结一下感觉稍微好点


把容器和item的属性分开看一下：


容器属性：

- flex-direction （设置方向 行列）
- flex-wrap （设置折行）
- flex-flow  （`flex-direction`属性和`flex-wrap`属性的简写）
- **justify-content** （主轴上的对齐方式）
- **align-items** （交叉轴上如何对齐）
- align-content （多根轴线的对齐方式）

项目属性：

- `order` （顺序）
- `flex-grow` （放大默认不放大）
- `flex-shrink` （缩小默认缩小）
- `flex-basis` （固定宽度）
- `flex` （简写）
- `align-self` （指定对齐覆盖`align-items`）

## 🍉  function.apply( )的方法


1.改变this的指向


**传统函数（****`function`** **声明的函数）的** **`this`** **指向是在函数被调用时才决定的，而不是在函数被定义时决定的。** 当一个函数被“独立”调用时（即没有作为对象的方法调用，没有用 **`new`**，也没有用 **`bind/call/apply`**），在非严格模式下，它的 **`this`** 默认指向全局对象 **`window`**。


**箭头函数**不遵循“调用时决定 **`this`**”的规则。


一般来说先有一个通用的函数用this填入的变量，再用apply就可以导入指定的this了。大概是这样的一个用法。


语法：


```javascript
func.apply(thisArg, [argsArray])
```


```javascript
const person = {
fullName: function(city, country) {
console.log(`${this.firstName} ${this.lastName} lives in ${city}, ${country}.`);
}
};

const person1 = {
firstName: "John",
lastName: "Doe"
};

// person1 借用 person 的 fullName 方法
// this 指向 person1，参数 'New York' 和 'USA' 从数组中取出
person.fullName.apply(person1, ['New York', 'USA']);
// 输出: John Doe lives in New York, USA.

```


2.以数组形式传本来不能数组传的参 但是现在用ES6展开了


比如


```javascript
Math.max(5, 6, 2, 3, 7)
=> this way is not to be allowed:Math.max([5,6,2,3,7])
=> use this way: Math.max.apply(null,[5,6...])
```


**`apply`** **vs** **`call`** **vs** **`bind`**


| 特性         | `call()`                                    | `apply()`                                      | `bind()`                                    |
| ---------- | ------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| **参数传递方式** | **逐个列举** `func.call(this, arg1, arg2, ...)` | **数组形式** `func.apply(this, [arg1, arg2, ...])` | **逐个列举** `func.bind(this, arg1, arg2, ...)` |
| **函数执行时机** | **立即执行**                                    | **立即执行**                                       | **不立即执行**，返回一个**新的、绑定了 this 的函数**           |
| **返回值**    | 函数的执行结果                                     | 函数的执行结果                                        | 一个新的函数                                      |


## 🍉  防抖


很久都记不起防抖节流了。


一般来说需要一个闭包存储一个共享变量。


原理是不断重置更新settimeout函数 只有最后一次操作经过设置time后才算执行


别人写的：


```javascript
// 防抖函数
function debounce(fn, wait) {
  let timer;
  return function () {
    let _this = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, wait);
  };
}
// 使用
window.onresize = debounce(function () {
  console.log("resize");
}, 500);

```


其实比较难懂得是为什么塞进去this和args


让glm帮我举了两个例子比较明晰了


args:


```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" id="search-input" />
    <script>
      // 这是我们最终要执行的函数，它需要一个 query 参数
      function searchApi(query) {
        console.log(`正在搜索: ${query}...`);
        // 模拟向服务器发送请求
      }
      function badDebounce(fn, wait) {
        let timer;
        return function () {
          // 注意：这里没有 let args = arguments;
          if (timer) clearTimeout(timer);
          timer = setTimeout(function () {
            fn(); // 直接调用 fn，没有传递任何参数！
          }, wait);
        };
      }

      const badDebouncedSearch = badDebounce(searchApi, 500);

      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("keyup", function (e) {
        // 我们把输入框的值传给了 badDebouncedSearch
        badDebouncedSearch(e.target.value);
      });
    </script>
  </body>
</html>

```


args的缺失结果获取不到控件传参


this防止fn里有this


## 🍉 原型链和继承


原型链是 JavaScript 中用于实现继承和属性查找的一种机制。每个对象都有一个原型对象（prototype）。通过原型对象可以实现属性和方法的继承。


JavaScript 引擎会沿着原型链向上查找，直到找到相应的属性或方法或者到达原型链的顶端（Object.prototype）为止。


没有ES6之前的继承：


有3步：


 01 继承属性 ，Animal.call(this, name)


02 通过连接原型链完成继承 ，Dog.prototype = Object.create(Animal.prototype)


03 再加上 constructor， Dog.prototype.constructor = Dog


```typescript
function Animal(name) {
  this.name = name;
}
 
Animal.prototype.hello = () => {
  console.log("hello");
};
 
function Dog(name, say) {
  // 01 继承属性
  Animal.call(this, name);
  this.say = say;
}
 
// 02 通过连接原型链完成继承
Dog.prototype = Object.create(Animal.prototype);
 
// 03 再加上 constructor
Dog.prototype.constructor = Dog;
// Reflect.defineProperty(Dog.prototype, "constructor", {
//  value: Dog,
//  enumerable: false, // 不可枚举
//  writable: true
// })
```


有ES6就非常简单了：


```typescript
class Animal {
  constructor(name) {
    this.name = name;
  }
 
  hello() {
    console.log("hello");
  }
}
 
class Dog extends Animal {
  constructor(name, say) {
    super(name);
    this.say = say;
  }
}
```


## 🍉  **new 的时候发生了什么**

1. 创建了一个新对象 { }
2. 链接到原型 const instance = Object.create(fn.prototype);
3. 绑定this指向 fn.apply(instance, args);

  4.   返回这个对象 { }


## 🍉 事件循环


事件循环无非宏任务和微任务但是我一直也挺混乱的 问了GLM给了我一个例子我觉得很不错


主要是所有的代码都是两类：一类宏一类微任务 **同步代码会先执行完**

- **宏任务**：包括 **`script`** (整体代码)、**`setTimeout`**、**`setInterval`**、I/O 操作、UI 渲染等。每次执行一个宏任务后，会检查微任务队列。
- **微任务**：包括 **`Promise.then()`**、**`Promise.catch()`**、**`Promise.finally()`**、**`process.nextTick`** (Node.js) 等。在一个宏任务执行完毕后，会立即清空所有微任务。

example:


```typescript
setTimeout(() => console.log(0));
new Promise((resolve) => {
  console.log(1);
  resolve(2);
  console.log(3);
}).then((o) => console.log(o));
 
new Promise((resolve) => {
  console.log(4);
  resolve(5);
})
  .then((o) => console.log(o))
  .then(() => console.log(6));
```


重点是**整体代码也属于宏任务，在一个宏任务执行完毕后，会立即清空所有微任务。**


**第一阶段：执行主脚本（这是一个宏任务）**

- 宏任务队列: **`[setTimeout(callback 0)]`**
- 微任务队列: **`[]`**

**new Promise((resolve) => { ... })**

- 宏任务队列: **`[setTimeout(callback 0)]`**
- 微任务队列: **`[then(callback 2)]`**

**new Promise((resolve) => { ... })**

- 宏任务队列: **`[setTimeout(callback 0)]`**
- 微任务队列: **`[then(callback 2), then(callback 5)]`** (注意入队顺序)

**第二阶段：主脚本执行完毕，清空微任务队列**


取出第一个微任务：**`then(callback 2)`**


取出第二个微任务：**`then(callback 5)`**


触发链式调用的下一个 **`.then()`** **放入** **`then(callback 6)`**


微任务队列不为空，继续执行 取出微任务：**`then(callback 6)`**


**第三阶段：微任务队列已清空，执行下一个宏任务**


取出宏任务：**`setTimeout(callback 0)`**


总结：**一宏完清所有（这个宏产生的）微 再下一个宏** 


在事件循环中 settimeout和整个代码都是同级别的宏


## 🍉 V8垃圾回收


其实这个我也不想深入研究就让GLM帮我总结一下用于面试：


“Node.js 的垃圾回收（GC）是 V8 引擎自动管理内存的机制。它的核心策略是**分代回收**，把内存分为**新生代**和**老生代**。新生代存放生命周期短的对象，用**复制算法**快速回收；老生代存放存活久的对象，用**标记-清除**算法慢速但彻底地回收。这样设计能兼顾效率和内存利用率。”

1. **自动管理**：你不用管，V8 帮你做。
2. **核心策略**：**分代回收**。
3. **两个区域**：**新生代**（新对象）和**老生代**（老对象）。
4. **两种算法**：新生代用**复制**（快），老生代用**标记-清除**（慢）。
5. **目的**：兼顾**效率**和**性能**。
