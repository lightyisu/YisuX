---
catalog:
  - jishu
date: '2025-11-04 08:00:00'
type: Post
slug: htmltip
title: H&C&J| Tips Collection
status: 已发布
urlname: 282e9dc9-c245-80da-83c6-f1711a1eb1f7
updated: '2025-11-21 22:31:00'
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


总结：


**防抖**就是不断清空定时器然后添加新的 使得操作不断延后 最后一次操作为准


**“你触发得太快了，等你停下来歇一会儿我再执行。”**


**节流**就是不断查看时间差（这次和上一次） 如果没超过就不操作 超过这个时间再操作并更新时间


**“我不管你触发多少次，我只在固定时间执行一次。”**


闭包是实现两个的天选之子，**解决状态的持久化（私有且独立的状态）和封装问题**。



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


## 🍉_**proto_**、prototype、constructor 的关系


prototype（核心）: 原型，可以放一些用于子类继承的方法和属性 | 图纸


_proto_:原型链，用以指向自己的父原型（指向prototype）| 标签指向图纸


constructor **:**指回创建这个原型对象的那个构造函数 （实例对象找构造函数用）


我觉得用三个层级来表示可以很清晰（ 父类 -> 子类 -> 实例 ）


```typescript
// === 层级1：父类 (父构造函数) ===
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function() {
  console.log(`${this.name} is eating.`);
};


// === 层级2：子类 (子构造函数) ===
function Dog(name, breed) {
  // 1. 调用父类构造函数，继承属性
  Animal.call(this, name);
  this.breed = breed;
}

// 2. 继承父类的方法 (这是关键！)这样指向原型链就可以继承上方法了
Dog.prototype = Object.create(Animal.prototype);

// 3. 修复因为上一步操作而丢失的 constructor 指向
Dog.prototype.constructor = Dog;

// 4. 给子类添加自己的方法
Dog.prototype.bark = function() {
  console.log(`${this.name} is barking.`);
};


// === 层级3：实例 ===
const myDog = new Dog('旺财', '柯基');
```



• **`Animal.prototype`**：这是父类的**原型对象**，是所有 **`Animal`** 实例共享的“设计图纸”。上面定义了 **`eat`** 方法。
• **`Animal.prototype.constructor`**：这张“图纸”上有一个 **`constructor`** 属性，它**指回**了它的设计者**`Animal`** 函数本身。


• **`Dog.prototype`**：这是子类的**原型对象。**
• **`Dog.prototype.__proto__`**：**`Dog.prototype`** 的原型 (**`__proto__`**) **指向了父类的原型** **`Animal.prototype`**。这就是**原型链**的精髓！
• **`myDog.__proto__`**：根据基本规则，实例的 **`__proto__`** 指向创建它的构造函数的 **`prototype`**。所以，**`myDog.__proto__`** 指向了 **`Dog.prototype`**。


## 🍉在类里，为什么将属性放在 this 上，方法放在 prototype 上


可以看到好像所有的属性都定义在this上，所有的共享方法都在链上这是为什么呢？


1.咋不把属性写到链上？


其实是个大聪明想法，极其容易重名，一改动全身。


**大部分要继承的属性都是私有的更好 私有属性必须放在 this 上。**


2.咋不把方法写到this上？


**非常占用内存 而且好像不好继承吧（理论上也可以用super or call）。**


3.class是语法糖 实际上咱们的方法还是和属性分开了写到链上的


**总结：所有属性在 this 上，所有共享方法在链上。**


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

## 🍉 script (async/defer)



| 特性                | `<script>` (无属性)           | `<script async>`    | `<script defer>`                |
| ----------------- | -------------------------- | ------------------- | ------------------------------- |
| **下载是否阻塞HTML解析？** | **是**                      | **否** (并行下载)        | **否** (并行下载)                    |
| **执行是否阻塞HTML解析？** | **是**                      | **是** (下载完后立即执行)    | **否** (在HTML解析完成后执行)            |
| **执行顺序**          | **按顺序** (文档顺序)             | **无序** (谁先下载完谁先执行)  | **按顺序** (文档顺序)                  |
| **何时执行？**         | 立即下载，立即执行                  | 下载完成后立即执行           | HTML解析完成后，`DOMContentLoaded` 之前 |
| **适用场景**          | 极少使用，除非脚本必须立即执行并影响后续HTML渲染 | **独立的第三方脚本**，如统计、广告 | **有依赖关系的应用主脚本**，如JS框架、应用逻辑      |


## 🍉 回调/promise/**generator**/async


回调地狱→promise：链式调用解决回调嵌套→async：更同步风的promise语法糖（本质generator+promise）


**Generator 本身是一个同步的、用于控制执行流程的工具。它之所以与异步编程紧密相连，是因为它的“暂停/恢复”特性为管理异步操作提供了一种革命性的新思路，催生了** **`async/await`** **这种终极解决方案。**


## 🍉 **包装对象**


**包装对象解释了为什么像** **`string`****、****`number`****、****`boolean`** **这样的基本数据类型，却能调用方法和访问属性？**


基本类型 **没有属性和方法**：这是基本定义，一个纯粹的值不应该有复杂的行为。


包装对象是 JavaScript 内置的一种特殊对象，它“包装”了基本类型的值，并提供了一系列有用的属性和方法来操作这个值。


主要有三种包装对象：

- **`String`** 对象：包装 **`string`** 基本类型。
- **`Number`** 对象：包装 **`number`** 基本类型。
- **`Boolean`** 对象：包装 **`boolean`** 基本类型。

理论上基本类型和对象是矛盾的 基本类型不能用new **强烈不推荐显式创建包装对象 因为这样做挺奇怪的**


JavaScript 引擎在幕后完成了一切。这个过程被称为 **“自动装箱”**。



引擎会**立即、临时地**创建一个 **`String`** 对象的实例，这个实例的内容与 **`str`** 的值相同。


```javascript
let str = "hello";
let upperStr = str.toUpperCase();
```


**`// 引擎内部悄悄执行：let tempObj = new String("hello");`**


引擎在这个**临时对象**上调用 **`toUpperCase()`** 方法


最后返回结果并销毁


总结：自动装箱，临时创建用完销毁


## 🍉 vue的ref和reactive


### **ref（响应式包装对象）**


vue的ref用的比较通用，因为把基本类型通过ref转化成了一个（响应式）包装对象（类似js里的自有内置的String,Number虽然他们也是基本类型但是也有方法和属性）。这样就能够具有响应式了。ref通过`.value` 可以**随意替换基本类型的值**还能够保持响应式。


这个也非常好理解毕竟整个包装对象上有很多属性和方法，只是替换了**`value属性`**当然不会对其造成影响。


### **reactive （Proxy）**


vue的reactive就只为引用类型而生，就是用于object类型。


因为**他不是包装对象，他是返回一个对象的响应式代理proxy**所以他也不具有value，替换整个对象那就是直接变成了其他东西和reactive直接无关了。


然后这又引出一个问题：


vue的底层响应式不是proxy为什么看起来只有reactive用了？


**`reactive`** **是直接使用 Proxy API 的暴露层，而** **`ref`** **是一个为了处理基本类型而设计的“包装器”，当它包装对象时，内部会调用** **`reactive`****。**


## 🍉 **`async`** **函数总是返回一个 Promise**


**任何一个函数，只要在它前面加上了** **`async`** **关键字，那么这个函数的返回值就自动被包装成一个 Promise 对象。**


```typescript
// 一个简单的 async 函数，它返回一个数字
async function getNumberAfterDelay(num) {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟1秒延迟
  return num;
}

const numbers = [10, 20, 30];

// 使用 map 和 async 函数
const promises = numbers.map(getNumberAfterDelay);

console.log(promises);
// 立即输出：
// [
//   Promise { <pending> },
//   Promise { <pending> },
//   Promise { <pending> }
// ]

// 等待所有 Promise 完成
setTimeout(() => {
  console.log(promises);
  // 1秒后输出：
  // [
  //   Promise { <fulfilled>: 10 },
  //   Promise { <fulfilled>: 20 },
  //   Promise { <fulfilled>: 30 }
  // ]
}, 1500);
```


## 🍉 大文件切片上传


问题：大文件一次性传输不太好 需要断点续传，秒传，不阻塞


要点：blob.slice/chunks[]/sparkMD5/webworker


流程：用input拿到文件，然后把文件在前端用blob的api去做二进制切分，切分后存入数组得到分片，对每个分片进行单独的上传，上传完之后后端进行合并返回最后的上传成功信息。进度（用切片上传进度）


```typescript
 <input type="file" id="file_upload" />
 <button id="upload_btn">upload now</button>  
  
  const file_upload = document.querySelector("#file_upload");
    let chunksList = [];
    const chunkSize = 2 * 1024 * 1024;

    let createChunks = (file) => {
      let curSize = 0;
      while (curSize < file.size) {
        //slice 越界也不会报错，它只返回剩余的数据部分
        chunksList.push(file.slice(curSize, curSize + chunkSize));
        curSize += chunkSize;
      }
    };

    document
      .querySelector("#upload_btn")
      .addEventListener("click", async () => {
        const file = file_upload.files[0];
        const file_name = file.name;
        createChunks(file);
        //封装成一个对象包装一下
        const uploadList = chunksList.map((item, index) => {
          return {
            blob_file: item,
            chunk_index: index,
            chunk_name: `${file_name}-${index}`,
            fileName: file_name,
          };
        });
        //包装我的请求
        const requestList = uploadList.map(
          ({ blob_file, chunk_index, chunk_name, fileName }) => {
            const formdata = new FormData();
            formdata.append("blob_file", blob_file);
            formdata.append("chunk_index", chunk_index);
            formdata.append("chunk_name", chunk_name);
            formdata.append("file_name", fileName);
            return axios({
              method: "POST",
              url: "https://localhost:3000/chunk_upload",
              data: formdata,
            });
          }
        );
        await Promise.all(requestList);
      });
```


## 🍉  js的内存泄漏


JS 的内存管理机制。JavaScript 具有自动垃圾回收（GC）机制，GC 会定期（或在特定时机）扫描内存，找出那些“不再被使用”的变量，然后释放它们占用的内存。判断“不再被使用”的标准通常是“可达性”——即从根对象（如 **`window`**、**`global`**）出发，能否访问到这个对象（从根对象，沿着引用链，能否找到它，只要有引用就不销毁）。如果访问不到，GC 就会回收它。


本应被回收的内存，因为某种原因被无意中持有了引用，导致它一直“可达”，无法被 GC 释放。只要有一点联系就不会被垃圾回收机制所回收，例如闭包。


**1. 意外的全局变量**


在非严格模式下，如果一个变量在声明时没有使用 **`var`**、**`let`** 或 **`const`**，它会被自动挂载到全局对象（浏览器中的 **`window`**）上。全局对象的生命周期与页面一致，只要页面不关闭，它上面的变量就永远不会被回收。


```javascript
function createLeak() {
  // "leakyData" 没有被声明，它会成为 window.leakyData
  leakyData = new Array(1000000).fill('*'); 
}

createLeak(); // leakyData 现在是一个全局变量，无法被回收
console.log(window.createLeak) //现在createLeak被挂到了window上


let cl2=function createLeak2() {
  // "leakyData" 没有被声明，它会成为 window.leakyData
  leakyData = new Array(1000000).fill('*'); 
}
console.log(window.cl2) //undefined 现在挂不上了 会自动被回收


x=1;
=>1
window.x
=>1
```


**不用变量声明就会内存泄漏 自动挂window上（window只要不关闭就不销毁）**


**2.未清理的定时器或回调**


**`setInterval`** 或 **`setTimeout`** 的回调函数，如果被无限期地执行且没有被清理，那么它引用的所有外部变量都将无法被释放


```javascript
let largeObject = { data: new Array(1000000) };

setInterval(() => {
  // 这个回调函数引用了外部的 largeObject
  // 只要定时器在运行，largeObject 就不会被回收
  console.log(largeObject.data.length); 
}, 1000);

// 即使后续不再需要 largeObject，它也无法被回收
largeObject = null; // 无效！定时器回调仍持有引用
```


在不需要定时器时，务必使用 **`clearInterval()`** 或 **`clearTimeout()`** 来清除它


**3.闭包**


一个内部函数可以访问其外部函数的变量。如果这个内部函数被长期引用（例如，作为事件回调），那么即使外部函数已经执行完毕，其作用域链上的变量也不会被销毁。


解决方法：使用完后将其设为 **`null`**


**4.DOM 引用和 JS 对象相互引用**


DOM 被删除了，但 JS 中仍有引用 → 不能回收。


或者 JS 对象被 DOM 属性绑定着 → 不能回收。


```javascript
let detachedElement = document.getElementById('my-element');

// 从 DOM 中移除了这个元素
detachedElement.remove(); 

// 但是，JS 变量 detachedElement 仍然持有对它的引用
// 这个 DOM 元素及其关联的所有资源都无法被 GC 回收
console.log(detachedElement); // 依然可以访问到
```


**5.被遗忘的事件监听器**


在单页应用（SPA）中，这个问题尤为突出。当页面切换或组件销毁时，如果忘记移除绑定在 DOM 元素或 **`window`**/**`document`** 上的事件监听器，这些监听器的回调函数及其闭包引用的变量都无法被释放。


毕竟组件化了以后挂在window是真的挂上去了而销毁组件只是window下的一小部分。


**6.忘记清理大型数据结构（Map / Set / WeakMap 不当使用）**


因为这些大型数据结构通常引用永远存在 永远可达。


WeakMap / WeakSet 的键是弱引用，不会阻止垃圾回收。


**（使用** **`Map`** **- 强引用）**


```javascript
const userInfo = new Map();
let user1 = { name: '张三' };
userInfo.set(user1, 'VIP用户');

// ... 后来，user1 不再需要了
user1 = null;

// 问题：{ name: '张三' } 对象无法被回收，因为 userInfo 还强引用着它！
// 这就是内存泄漏。
```


**（使用** **`WeakMap`** **- 弱引用）**


```javascript
const userInfo = new WeakMap();
let user1 = { name: '李四' };
userInfo.set(user1, 'VIP用户');

// ... 后来，user1 不再需要了
user1 = null;

// 结果：{ name: '李四' } 对象可以被正常回收！
// WeakMap 中关于 user1 的条目也会随之自动消失。
// 没有内存泄漏！
```


| 泄漏类型           | 核心原因                            | 关键解决方案                              |
| -------------- | ------------------------------- | ----------------------------------- |
| **意外的全局变量**    | 变量未声明，被挂到 `window` 上            | 使用 `'use strict'` 和 `let`/`const`   |
| **被遗忘的定时器**    | `setInterval`/`setTimeout` 未被清除 | 及时调用 `clearInterval`/`clearTimeout` |
| **闭包**         | 长期存在的内部函数引用了外部变量                | 理解闭包生命周期，手动解除引用                     |
| **分离的 DOM 节点** | DOM 已移除，但 JS 变量仍持有引用            | 移除 DOM 后，将 JS 引用设为 `null`           |
| **被遗忘的事件监听器**  | 组件销毁时未移除监听器                     | 在组件销毁生命周期中移除监听器                     |
| **不当的缓存**      | `Map`/`Set` 强引用了缓存对象            | 对于对象**键**，优先使用 `WeakMap`/`WeakSet`  |


## 🍉 弱引用 and 强引用


**强引用**


```javascript
let book = { title: 'JavaScript高级程序设计' }; // 你把书借出来了
// ... 你一直持有 book 这个引用
// 只要 book 变量还存在且不为 null，这本书就不会被回收
```


**弱引用 (ES6)**


弱引用是一种不“拥有”对象的引用。它不会阻止垃圾回收器回收对象。这是ES6的新特性，ES5之前不存在这个特性。

- **WeakMap / WeakSet** 是 ES6 新增的内置数据结构
- 它们内部持有 **弱引用（weak reference）**
- 允许做缓存或附加元数据，而不用担心泄漏

```javascript
let book = { title: '你不知道的JavaScript' };
const bookMetadata = new WeakMap(); // 这是一个特殊的目录系统

// 你把这本书的信息登记到了目录系统里，但这不是“借出”
bookMetadata.set(book, { category: 'Front-end', popular: true });

// 现在，你把书还了，不再持有它
book = null; // 所有的强引用都消失了

// 此时，GC 会发生什么？
// GC 发现没有任何强引用指向那本书了，于是把它回收了。
// 同时，WeakMap 里的那个条目也会自动消失！
// 因为 WeakMap 的机制就是：“如果键（那本书）没了，我这条记录也没用了”。
```


总结：其实就是对象键回收的问题


## 🍉 判断数据类型的方式有哪些


**1.****`typeof`** **- 最基础但最“坑”的方法 判断基本类型很方便**


```javascript
typeof "hello";        // "string"
typeof 123;            // "number"
typeof true;           // "boolean"
typeof undefined;      // "undefined"
typeof Symbol();       // "symbol"
typeof 123n;           // "bigint"
typeof function() {};  // "function"

// --- 以下是 typeof 的“坑” ---
typeof null;           // "object"  (这是一个历史遗留的 bug)
typeof [];             // "object"
typeof {};             // "object"
typeof new Date();     // "object"
typeof /regex/;        // "object"
```

- **最大的问题**：**`typeof null`** 返回 **`"object"`**，这是 JS 早期设计的一个错误。
- 无法区分具体的对象类型，比如数组、日期、正则表达式等，它们都返回 **`"object"`**

**2.****`instanceof`** **- 检查原型链**


```javascript
[] instanceof Array;        // true
[] instanceof Object;       // true (Array.prototype.__proto__ === Object.prototype)
new Date() instanceof Date; // true
new Date() instanceof Object; // true

function Person() {}
let p = new Person();
p instanceof Person;        // true
p instanceof Object;        // true

123 instanceof Number;      // false (基本类型不是对象实例)
"hello" instanceof String;  // false
```


专属于对象引用类型的判断方法


**不能用于判断基本类型（因为JS里的看起来像基本类型的引用对象是包装对象）**


**3.****`Object.prototype.toString.call()`** **- 最准确、最通用的“终极”方法**


看起来是我们的大Object上的原型方法toString


这是目前判断数据类型最可靠、最精准的方法。所有内置对象都重写了 **`toString`** 方法，但 **`Object.prototype`** 上的原始 **`toString`** 方法会返回一个由 **`[object Type]`** 格式组成的字符串，其中 **`Type`** 就是对象的类型。


**为什么用** **`.call()`****？**


因为很多对象自身有 **`toString`** 方法，会覆盖 **`Object`** 上的。我们想借用 **`Object`** 上的 **`toString`** 方法，并让它在 **`variable`** 这个对象上执行。


```javascript
Object.prototype.toString.call("hello");        // "[object String]"
Object.prototype.toString.call(123);            // "[object Number]"
Object.prototype.toString.call(true);           // "[object Boolean]"
Object.prototype.toString.call(undefined);      // "[object Undefined]"
Object.prototype.toString.call(null);           // "[object Null]"  <-- 唯一能准确判断 null 的方法！
Object.prototype.toString.call(Symbol());       // "[object Symbol]"
Object.prototype.toString.call(123n);           // "[object BigInt]"
Object.prototype.toString.call(function() {});  // "[object Function]"

Object.prototype.toString.call([]);             // "[object Array]"
Object.prototype.toString.call({});             // "[object Object]"
Object.prototype.toString.call(new Date());     // "[object Date]"
Object.prototype.toString.call(/regex/);        // "[object RegExp]"
```


4.**`Array.isArray()`** **- 数组的专属方法**


| 方法                                     | 优点          | 缺点                           | 推荐场景                                                           |
| -------------------------------------- | ----------- | ---------------------------- | -------------------------------------------------------------- |
| **`typeof`**                           | 简单、快速       | `null` 误判为 `object`，无法区分对象类型 | 判断基本类型（`string`, `number`, `boolean`, `undefined`, `function`） |
| **`instanceof`**                       | 可区分对象类型     | 无法判断基本类型，有跨域问题               | 判断自定义类实例，在同一全局域内判断内置对象                                         |
| **`Object.prototype.toString.call()`** | **最准确、最通用** | 写法繁琐                         | **构建通用类型判断工具函数**                                               |
| **`Array.isArray()`**                  | **判断数组最可靠** | 只能判断数组                       | **任何需要判断数组的场景**                                                |


## 🍉 Number.isNaN 和 isNaN 的区别


`Number.isNaN` 只判断是否为真正的 NaN；(推荐）


`isNaN` 会先做类型转换，判断“转换后是否为 NaN”;（有坑）


## 🍉 js获取属性（对象方法）


| 方式           | 示例                               | 说明        |
| ------------ | -------------------------------- | --------- |
| 点访问          | `obj.name`                       | 最常用       |
| 方括号          | `obj["name"]`                    | 动态属性名     |
| 获取 key       | `Object.keys()`                  | 可枚举属性     |
| 获取 value     | `Object.values()`                | 可枚举值      |
| 获取 entries   | `Object.entries()`               | key-value |
| 获取所有属性名      | `Object.getOwnPropertyNames()`   | 包含不可枚举    |
| 获取 Symbol 属性 | `Object.getOwnPropertySymbols()` | 符号属性      |
| 解构           | `const {a} = obj`                | 语法糖       |
| 可选链          | `obj?.a?.b`                      | 防报错       |
| Reflect      | `Reflect.get(obj, key)`          | 更规范的 API  |
| Proxy 拦截     | `new Proxy(obj,{get(){}})`       | 底层机制      |


## 🍉 为什么需要reflect和proxy

- **Proxy（代理）**：让你可以**拦截并自定义**对象的基本操作（如属性查找、赋值、枚举、函数调用等）。
- **Reflect（反射）**：提供了一套**统一的、函数式的默认操作**，与 Proxy 的拦截方法一一对应。

**为什么需要 Proxy？—— 为了“拦截”与“控制”**


Proxy 可以拦截多达 13 种操作，几乎涵盖了对象的所有行为


**为什么需要 Reflect？—— 为了“统一”与“规范”**


Reflect 将所有对象操作都变成了函数形式，与 Proxy 的拦截器一一对应。


总结：这两个搭配使用，Proxy本来就是小幅度的改动式的拦截，配合Reflect默认行为搭配出一套拦截的逻辑。**`Proxy`** **赋予了“拦截”和“重定义”对象行为的权力，而** **`Reflect`** **提供了一个干净、统一的工具来执行那些被你拦截的“默认行为”。 JavaScript 元编程领域里相辅相成的两大利器。**


## 🍉 js 是面向对象语言吗


不是我觉着算不上，有面向对象逻辑的基于原型链的语言。ES6的class只是语法糖。


完全支持 OOP 的三大特性


| OOP特性             | JS 是否支持 | 示例        |
| ----------------- | ------- | --------- |
| 封装（Encapsulation） | ✔       | 对象、闭包     |
| 继承（Inheritance）   | ✔       | 原型链       |
| 多态（Polymorphism）  | ✔       | 方法重写、鸭子类型 |


JavaScript 不是传统类式的面向对象语言，而是基于原型（prototype）的面向对象语言。


## 🍉  面向对象特性


**封装“隐藏细节，提供接口”：**


封装，顾名思义，就是**将数据和操作数据的方法捆绑在一起，形成一个独立的“对象”，并对外部隐藏对象的内部实现细节**。


它就像一个黑盒子：

- **内部**：包含了对象的状态（属性/数据）和行为（方法/函数）。
- **外部**：只能通过盒子提供的特定接口（公共方法）来与它交互，而不能直接伸手进去乱动。

**继承  “代码复用，建立层次”**


继承允许我们创建一个新类（**子类/派生类**），这个新类可以**获取**另一个已存在的类（**父类/基类**）的所有属性和方法。这是一种 "is-a"（是一个）的关系。

- **代码复用**：避免编写重复的代码，是 DRY (Don't Repeat Yourself) 原则的体现。
- **逻辑清晰**：建立了一个从一般到特殊的类层次结构，符合人类的认知习惯。
- **为多态奠定基础**：没有继承，多态就无从谈起。

**多态  “同一接口，多种状态，不同实现”**


在面向对象中，它指的是**同一个行为（方法调用），作用于不同的对象，会产生不同的执行结果**。

- **灵活性**：允许我们将不同类型的对象视为同一类型来处理，大大降低了代码的耦合度。
- **可扩展性**：当需要增加一种新的动物（比如 **`Pig`**）时，我们只需要创建一个新的 **`Pig`** 类并实现“叫”的方法，而不需要修改调用“叫”这个动作的代码。这完美符合“开闭原则”。

**抽象**


核心思想：只关注对象必要的本质特征和行为，而忽略与当前目标无关的、非本质的细节。先不去实现具体的细节，是一种更高层更通用共享的实现。


[鸭子类型](https://zhida.zhihu.com/search?content_id=118496224&content_type=Article&match_order=1&q=%E9%B8%AD%E5%AD%90%E7%B1%BB%E5%9E%8B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NjM5MDgxNTQsInEiOiLpuK3lrZDnsbvlnosiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxMTg0OTYyMjQsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.toRoeGMvbvXDlPVJx_rsZUMm_n9hrGt43krirP-KP9k&zhida_source=entity)


**抽象 vs. 封装：抽象是目标，封装是实现手段**


**封装是实现抽象的一种具体技术**。通过访问修饰符（**`public`**, **`private`**），我们把抽象出的“接口”和隐藏的“实现细节”分离开。


**抽象 vs. 继承：继承建立了抽象的层次结构**


继承本身就是一种抽象。我们通过提取多个子类的共同特征，来创建一个更抽象的父类。


**抽象 vs. 多态：多态是抽象的体现和结果**


正是因为我们可以将 **`Dog`**、**`Cat`** 等具体对象**抽象**地看作 **`Animal`** 类型，我们才能使用多态。

