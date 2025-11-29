---
catalog:
  - jishu
date: '2025-11-04 08:00:00'
type: Post
slug: htmltip
title: H&C&J| 前端基础问题集合
status: 已发布
urlname: 282e9dc9-c245-80da-83c6-f1711a1eb1f7
updated: '2025-11-29 12:40:00'
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


**GC 的基本原理：****可达性** **(这个联系到内存泄漏）**


在像 C/C++ 这样的语言中，开发者需要手动分配和释放内存（**`malloc`**/**`free`**）。这非常强大，但也极易出错，容易导致**内存泄漏**（忘记释放）或**悬空指针**（释放后继续使用）。


JavaScript 作为一门高级语言，为了提升开发效率和程序稳定性，引入了**自动内存管理**，其核心就是**垃圾回收机制**。


任何从“根”出发无法访问到的对象，都被认为是“不可达的”或“死”的，这些就是 GC 需要回收的目标。


**垃圾回收算法：**


1.引用计数（古早算法）


为每个对象维护一个“引用计数器”。当计数器变为 **`0`** 时，说明没有任何地方引用它，该对象就是垃圾，可以被回收。


2.标记-清除（现代算法）

1. **标记阶段**：GC 从“根”对象开始遍历，所有能访问到的对象都被打上一个“标记”，表示它们是“活”的。
2. **清除阶段**：GC 遍历整个堆内存，所有**没有被标记**的对象都被视为垃圾，并回收它们占用的内存。

3.标记-整理(现代算法plus)


4.**分代回收(终极算法，基于2、3）**


假说：熬过越多次垃圾回收过程的对象，就越难以消亡


在**新生代**使用高效的 **Scavenge（复制）算法**。


在**老生代（更不容易被回收的生代）**则根据情况使用 **标记-清除** 和 **标记-整理** 算法




## 🍉 script (async/defer)



| 特性                | `<script>` (无属性)           | `<script async>`    | `<script defer>`                |
| ----------------- | -------------------------- | ------------------- | ------------------------------- |
| **下载是否阻塞HTML解析？** | **是**                      | **否** (并行下载)        | **否** (并行下载)                    |
| **执行是否阻塞HTML解析？** | **是**                      | **是** (下载完后立即执行)    | **否** (在HTML解析完成后执行)            |
| **执行顺序**          | **按顺序** (文档顺序)             | **无序** (谁先下载完谁先执行)  | **按顺序** (文档顺序)                  |
| **何时执行？**         | 立即下载，立即执行                  | 下载完成后立即执行           | HTML解析完成后，`DOMContentLoaded` 之前 |
| **适用场景**          | 极少使用，除非脚本必须立即执行并影响后续HTML渲染 | **独立的第三方脚本**，如统计、广告 | **有依赖关系的应用主脚本**，如JS框架、应用逻辑      |


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/ed141b76-e4f4-4030-b3c9-9f8f9925cc4f/791ab558-7273-4e64-9ac3-85351bb7a02a/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RK5SSRGA%2F20251129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251129T044132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEbI0uoW36jTVnnMZkqob1GPodhu7QKgEzJmbwfO5LGaAiBM4O2i9uuzXZtPihV1DYEKNkLHim3xDMBMaQBAdwdtgCqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgXQbI9x8I%2BgdpGbSKtwD2Pdi0gQKyT68lfWe%2FTDDrG4Ke5Rp2XvxCtTFJ0rulzzvPoKCyI9b1lAfz%2F7xCGz3jEfjturpBhHoObt3iiLpszaTy08Gl5OtgCzh5bWB3x1IlXv226NzVayZYwhm0qtVkNNpA8GjK4a4RDVybb4TpVhGiaf3KxYHuIycmq4KnlYvy6Jfdzq8B7X5l%2FDPmrO1GLVPBXQq58wMtl6zGjFKH0wcDrnAvmSY1pZKzvv7bdGL%2F0lPG4zrbFr%2FMNVf5YFB3GDlCAzypsBXez4FivEzWGkgN8t9vE1gNMDeEW7Yu3FWhYEB3i9LAMzkwo0rOBrWw3WtMw3hHC7NKan1SZvWAIfmYwiwmktws%2FLOEBX%2B%2B3lofmVMna%2Bg0Hrv8ldm7iKDOBT5JFsSO3dAUG6DV%2By8WVCdtqB0PJLK2zci9jmPpHNA6ztdXLBDkSXVrku%2FHacKe56upIoxe4RX4jLI%2FD8BFjI%2F6u6BSbMJvb4rYXzo%2B5D0ulUXog2LfrjkPNDW2FWRQDmTIyqwA0V77ad6jk4RKaZS5x7evJmRFZwUw6Z%2F5vcDcklD0Bwg7O4RaxKS8IAbEGGNPwmN046jFBhsexXHi86kk7isaqNRB0t%2B0r%2FhqIedB61qUu0zFxGIaxAwzpepyQY6pgGOXY31vuV3m4cBprvVbQkIDuOIaFQH%2BvCz4nf2Bpf%2BVbN844ntLRTjsl6dHJU96MNgUmPOlrrSu2GJvdFKeW0e9M2nGlv9IjUPFl0jYC2MFzYeUxqQgTZR5nOKfEkgLSXWuz9jFTs49NlyS%2B8Gf3cO4g4odKYYxwVV0gO1PJjOG96TbyDKdAClJ95EKfawFKgWGWVTaw9XjzWkAgm6vuOniXU5HNSy&X-Amz-Signature=7480e076884628f7a4365bd37f652a4850fa6571cbbe04f4960f95d04c8db992&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


## 🍉 vuex/pinia内部如何实现的数据共享


三个关键步骤：


1.创建一个store的响应式容器保证共享


2.注入到Vue实例中，实例的所有组件可以访问


3.使用规范化的API**(**如 **`state`****,** **`getters`****,** **`actions`**)追踪行为


**Vuex 的内部实现** 


1.利用 Vue 的响应式 API 创建响应式的Store


2.使用**Vue.mixin**在所有组件的 **`beforeCreate`** 生命周期钩子中，将 **`$store`** 这个属性注入到每个组件实例中。这样，你在任何组件里都可以通过 **`this.$store`** 访问到同一个 Store 实例。
（这里使用的mixin 3已经不用了 简单回忆mixin就是复用逻辑用的 以便在不同组件复用一个相同的逻辑 3直接定义一个普通函数就可以）


3.Vuex 强制规定，修改 `state` 的唯一途径是提交 **`mutation`**。**`mutation`** 必须是同步函数。这确保了每一次状态变更都是一个可追踪的、原子化的操作，便于调试和时间旅行。


**`action`** 负责处理异步操作（如 API 请求），然后 **`commit`** 一个 **`mutation`** 来改变状态。它不直接修改状态。


**Pinia 的内部实现**


1.使用 Vue 3 暴露出的 **`reactive`** 函数，将你定义的 **`state`** 对象包装成一个响应式代理对象。
2.完全基于 **`provide`****/****`inject`**：**`app.use(createPinia())`** 会创建一个 Pinia 根实例，并通过 **`app.provide`** 将其提供给整个应用树。


3.直接修改无须异步中同步


其实我觉得改动最大的就是这个改数据必须固定操作并且异步中同步提交这块：


**为什么 Vuex 需要“异步中同步提交”**

1. 为了 Vue DevTools 的“时间旅行”调试 (vue3 更好的devtools)
2. Vue 2 响应式系统的限制 （vue3 proxy了解决了）

### vuex缺陷（重点是无proxy带来的缺陷+无ts）：

1. **Mutations 的强制性**：
为什么 Vuex 必须有 **`mutations`**？一个重要原因就是为了配合 Vue 2 的响应式系统。通过强制所有状态变更都必须经过 **`mutation`**，Vuex 可以在一个地方集中处理这些变更，并确保 Vue 的依赖收集和视图更新能正确触发。这是一种为了“绕过”**`Object.defineProperty`** 限制而设计的模式。你不能在组件里直接修改 **`store.state.xxx`**，因为 Vue 2 可能无法追踪到这个变更。由于 **`Proxy`** 可以直接追踪到任何属性的修改和添加，Pinia 不再需要一个专门的 **`mutation`** 机制来“通知” Vue 发生了变化。你可以在 **`actions`** 中直接修改 **`state`**。

## 🍉 vue组件的通信方式


| 通信方式                           | 适用场景         | Vue 版本 | 备注                                 |
| ------------------------------ | ------------ | ------ | ---------------------------------- |
| **`Props`**                    | 父 → 子        | All    | **最基础**，单向数据流。                     |
| **`$emit`**                    | 子 → 父        | All    | **最基础**，子组件通知父组件。                  |
| **`provide`****/****`inject`** | 跨级/隔代        | All    | 解决 "props drilling" 问题。            |
| **Pinia / Vuex**               | 任意组件         | All    | **最强大**，集中式状态管理，推荐用于中大型项目。         |
| **`$refs`** **/** **`ref`**    | 父 → 子 (直接访问) | All    | **谨慎使用**，用于命令式操作，会破坏封装。            |
| **事件总线**                       | 任意组件         | Vue 2  | Vue 3 中不推荐，建议用 Pinia 或 `mitt` 库替代。 |


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


## 🍉 用户通过修改文件后缀的方式上传，如何限制上传


第一层是基础检查：


在 **`<input type="file">`** 标签上添加 **`accept`** 属性

第二层JS验证：


检查每个文件的 **`file.type`**（MIME 类型）是否在允许的列表中

第三层高级点的JS验证：


读取文件的“魔数”（文件头部的特定字节序列 二进制流）


第四层：


让后端去看 最安全


## 🍉**JS 内存管理基础：栈与堆**


JS 的内存主要分为两部分：


### **栈**

- **作用**：存储**原始类型**的数据（**`string`**, **`number`**, **`boolean`**, **`null`**, **`undefined`**, **`symbol`**, **`bigint`**）和**对象的引用地址**。更重要的是，它管理着**函数的调用**（执行上下文）。
- **特点**：空间小，但读写速度快。它是一种“后进先出”（LIFO）的数据结构。

### **堆**

- **作用**：存储**引用类型**的数据，如对象、数组、函数等。这些数据大小不固定，所以放在堆里。
- **特点**：空间大，但读写速度相对较慢。内存分配是动态的。

## 🍉网络请求状态码


| 类别      | 核心含义  | 常见代表                              | 解决方案（开发者视角）                  |
| ------- | ----- | --------------------------------- | ---------------------------- |
| **2xx** | 成功    | `200`, `201`, `204`               | 正常处理响应数据                     |
| **3xx** | 重定向   | `301`, `302`, `304`               | 浏览器自动跳转，开发者需关注缓存策略           |
| **4xx** | 客户端错误 | `400`, `401`, `403`, `404`, `429` | **检查前端代码**：请求URL、参数、权限、Token |
| **5xx** | 服务器错误 | `500`, `502`, `503`, `504`        | **检查后端代码和服务器**：日志、配置、资源状态    |


一般来说是(1-5)xx


1:基本不用


2: **`200 OK`** (访问一个网页 API成功）**`201 Created`** **（**用于 **`POST`** 请求后服务器成功创建某东西**）****`204 No Content`** **（**用于 **`DELETE`** 请求 成功但没返回）。


3:**`301 Moved Permanently`** 告诉你Url变了 **`302 Found`** 请求的资源**临时**移动到了另一个 URL
**`304 Not Modified`** 请求的资源未修改直接本地缓存


4：**`400 Bad Request`** 请求本身有语法错误或无效参数，服务器无法理解。


**`401 Unauthorized`** 请求需要身份验证


**`403 Forbidden`** 客户端已经认证，但没有权限访问该资源


**`404 Not Found`** 服务器上找不到请求的资源 客户端Url不对


**`405 Method Not Allowed`** 请求方法不对


**`429 Too Many Requests`** 发送了太多请求


5:**`500 Internal Server Error`** 


**`502 Bad Gateway`** 网关比如nginx出错


**`503 Service Unavailable`** 过载维护


**`504 Gateway Timeout`**


## 🍉 浏览器缓存


浏览器缓存就是浏览器将已经请求过的资源（如 HTML、CSS、JavaScript、图片等）**临时存储在本地**的一套机制

**缓存的位置**

1. **Memory Cache (内存缓存)**
	- **特点**：速度最快，但容量小，且会随着页面的关闭（或标签页）而释放。它是“临时”的。
	- **存储内容**：通常存储当前页面中体积小、访问频繁的资源，比如 base64 图片、小脚本等。
2. **Disk Cache (硬盘缓存)**
	- **特点**：速度比内存慢，但容量大，存储时间长，即使关闭浏览器，下次打开也可能还在。它是“持久”的。
	- **存储内容**：体积较大、不常变动的资源，如 CSS、JavaScript 文件、大图片等。
3. **Service Worker Cache**
	- **特点**：这是 PWA（Progressive Web App）的核心。它是一个运行在浏览器背后的独立线程，允许我们**编程式地控制缓存**。我们可以自由决定哪些资源被缓存、如何匹配缓存、缓存何时更新等，提供了极大的灵活性。
4. **Push Cache (推送缓存)**
	- **特点**：HTTP/2 的新特性，生命周期更短，只在会话中存在，当会话结束就被释放。它是浏览器主动推送的资源缓存。

**缓存的核心机制：两大策略**


浏览器缓存决策过程主要依赖两大策略：**强缓存**和**协商缓存**。它们的区别在于是否需要向服务器发起请求来验证缓存的有效性。


**1. 强缓存**


**定义**：浏览器在请求资源时，先检查该资源的缓存是否还在“有效期”内。如果在，就直接使用缓存，**不与服务器发生任何通信**。


**`Cache-Control`**

- **`max-age=<seconds>`**：资源缓存的有效时长，单位是秒。这是相对时间，不受本地时间影响，是最常用的指令。
- **`public`**：表示响应可以被任何对象（包括代理服务器）缓存。
- **`private`**：表示响应只能被单个用户的客户端缓存，不允许代理服务器缓存。
- **`no-store`**：**禁止一切缓存**，每次都要从服务器重新获取。
- **`no-cache`**：**这个名字有迷惑性！** 它不是“不缓存”，而是“强制进行协商缓存”。即浏览器会缓存资源，但在使用前必须向服务器验证其有效性。

**2. 协商缓存**


当强缓存失效（即 **`max-age`** 过期）后，浏览器并不会直接丢弃缓存，而是会携带一个“验证标识”向服务器发起请求，询问服务器：“我这里的这个缓存还能用吗？


验证是否需要缓存的两种协商方式：


1.**`Last-Modified`** **/** **`If-Modified-Since`** **（基于时间）**
2.**`ETag`** **/** **`If-None-Match`****（基于文件生成指纹）**


```typescript
 A[浏览器请求资源] --> B{本地是否存在缓存?};
    B -- 否 --> C[直接向服务器请求];
    B -- 是 --> D{强缓存是否有效? (Cache-Control: max-age)};
    D -- 是 --> E[直接使用缓存<br>200 OK (from cache)];
    D -- 否 --> F[向服务器发送协商请求<br>携带 If-Modified-Since 或 If-None-Match];
    F --> G{服务器验证缓存是否有效?};
    G -- 有效 --> H[服务器返回 304 Not Modified<br>浏览器继续使用旧缓存];
    G -- 无效 --> I[服务器返回 200 OK 和新内容<br>浏览器更新缓存];
```


## 🍉 箭头函数的特点 （很多都没有这样一个的特性）


**1. 没有** **`this`** **绑定（词法** **`this`****）**


**2. 更简洁的语法**


**3. 不能用作构造函数** 
• 它没有 **`prototype`** 属性。


**4. 没有** **`arguments`** **对象**


箭头函数没有自己的 **`arguments`** 对象，没法传统的使用这个对象获取参数。


**5. 没有** **`super`** **和** **`new.target`**


## 🍉 **`BigInt`** **干嘛的**


Number太小无法表示任意大的数就有了Bigint , ES6制造了这样一个全新数据类型


创建 **`BigInt`** 非常简单，只需在整数字面量后面加上一个 **`n`**，或者使用 **`BigInt()`** 构造函数。


## 🍉 Vue DIFF算法


问题：操作DOM开销很大


解决方法：虚拟DOM


用 JavaScript 对象来描述真实 DOM 结构的轻量级“副本”。其实就是VNode我记得Vue2的文档有说过这事可以自己编写vnode。


当数据变化时，Vue 会生成一个新的虚拟 DOM 树。Diff 算法的任务就是**高效地比较新旧两棵 VNode 树，找出差异，然后只把这些差异应用到真实 DOM 上**，从而以最小的代价完成视图更新。


**Diff 算法的核心思想**


如果把两棵树进行完整的、逐层的比较，时间复杂度会达到 **`O(n^3)`**，这在真实应用中是不可接受的。因此，Vue 采用了**启发式算法**，将复杂度降到了 **`O(n)`**。

1. **只比较同一层级的节点**：Diff 不会跨层级比较。如果发现某一层级的节点不同，就直接认为其下的所有子节点都不同，会直接替换掉。
2. **开发者可以通过** **`key`** **来标识不同节点**：当在同一层级有多个相似的子节点时，**`key`** 可以帮助 Diff 算法识别哪个是旧的、哪个是新的，从而进行复用、移动或删除，而不是简单地销毁和重建。

Vue2:双端DIFF


因为大部分的DOM变化可能只是位置上的轻微移动，使用双端指针就可以不用一个个对比了。


## 🍉CSS Module和Vue里的scoped


**1. Vue** **`scoped`****：通过属性选择器实现“伪作用域”**


Vue 在编译模板时，会给组件模板内的每一个元素都添加一个独一无二的自定义属性，例如 **`data-v-f3f3eg9g`**。同时，Vue 的编译器会把你写的 CSS 选择器进行改造，在末尾加上这个属性选择器。



```css
/* CSS 部分 */
.title[data-v-f3f3eg9g] {
  color: red;
}
```


**2.CSS Modules：通过重命名类名实现“真作用域”**


**彻底改变类名**，从源头上保证了类名的唯一性，实现了真正的样式隔离。


## 🍉进程 vs 线程


| 对比项      | **进程（Process）**   | **线程（Thread）**   |
| -------- | ----------------- | ---------------- |
| **定义**   | 程序运行的最小单位         | CPU 调度的最小单位      |
| **资源**   | 拥有独立内存（代码段/堆/栈）   | 共享进程内存，只有独立栈和寄存器 |
| **开销**   | 创建/切换成本高          | 创建/切换成本低         |
| **安全性**  | 互不影响，更安全          | 共享内存，容易互相影响（需要锁） |
| **通信方式** | IPC（管道、消息队列、共享内存） | 共享内存即可，速度快       |
| **崩溃影响** | 一个进程挂了不影响其它进程     | 一个线程挂可能导致整个进程挂   |
| **适用场景** | 浏览器、数据库、独立服务      | 页面渲染、多任务并行计算     |


**进程是“独立房子”，线程是“房子里的房间”。**

- 每个房子拥有自己的电路、燃气、水（内存）。
- 房子（进程）之间互不影响。
- 房间（线程）共享同一个房子的资源。
- 线程之间更容易“抢水电”（竞争资源），需要“锁”。

### ❓1. 浏览器是多进程还是多线程？

- 是 **多进程 + 多线程**
- 每个标签页是独立进程
- 渲染器内部是多线程：JS 引擎线程、GUI 线程、定时器线程…

### ❓2. 为什么 JS 是单线程的？


因为 JS 要操作 DOM，如果多线程会造成并发修改的问题。


### ❓3. 为什么线程共享内存会出问题？


因为多个线程可能同时读写同一个变量 → 需要锁、原子操作。


plus:几个前端之外的计算机问题


**OSI 七层模型（从下到上）**


物数网传会表应 


**TCP/IP体系**


网络接口层  网络层 传输层 应用层


## 🍉 **Cookie 存在的主要问题**


**1. 安全风险**


**跨站脚本攻击（XSS）**


存在 XSS 漏洞，攻击者可以注入恶意脚本。这个脚本可以读取当前页面的所有 Cookie（特别是存储用户凭证的 Session Cookie），并将其发送到攻击者的服务器。一旦 Session Cookie 被窃取，攻击者就可以冒充用户，劫持用户会话。


比如B站动态的输入框可以键入脚本的话，然后别的用户看到这个动态执行这段键入的脚本就XSS攻击了。


**跨站请求伪造 (CSRF )**


解决方法：


**`Secure`** **属性** ： 只通过HTTPS传输


**`HttpOnly`** **属性：**全程交给服务器托管 JS访问不到cookie


**`SameSite`** **属性:**规定了 Cookie 在跨站请求时是否可以被发送


**隐私追踪(这个还挺常见像隐私浏览器就会防止这个）**


当你访问 A 网站时，页面中可能嵌入了来自广告商 B 的脚本或图片。你的浏览器会向 B 的服务器发送请求，B 的服务器就可以借此给你设置一个 Cookie。当你访问同样嵌入了 B 广告的 C 网站时，你的浏览器会把这个 Cookie 发送给 B 的服务器。这样，广告商 B 就可以跨不同网站追踪你的浏览行为，构建你的用户画像，用于精准广告投放。这引发了严重的隐私担忧。


**增加网络开销**


浏览器会在符合条件（同域名或者等等）自动携带上无需手动添加到请求头


**存储限制4kb**


解决方法：


1.**Web Storage (****`localStorage`** **和** **`sessionStorage`****)**


2.**IndexedDB**


## 🍉用Axios需要二次封装什么


**1. 统一的配置管理**


使用 **`axios.create()`** 创建一个 Axios 实例


```typescript
// src/utils/request.js
import axios from 'axios';

const service = axios.create({
  baseURL: 'https://api.example.com', // API 的基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
```




**2. 请求拦截器**


**统一添加认证信息**: 最常见的场景就是为每个请求自动带上 **`Token`** 


**处理请求参数**


**显示加载状态**


```typescript
// src/utils/request.js (接上文)
import { getToken } from './auth'; // 假设有一个获取 token 的工具函数

service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 携带 token
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);
```


**3. 响应拦截器**


**统一处理 HTTP 状态码**: 根据 HTTP 状态码（如 200, 401, 403, 500）进行统一判断。例如，遇到 401 (未授权) 时，可能意味着 Token 过期，此时可以跳转到登录页并清除本地 Token。


 **统一处理后端返回的数据结构**: 很多后端 API 会采用统一的数据格式，如 **`{ code: 0, data: {...}, message: 'success' }`**。在拦截器里，我们可以判断 **`code`**，如果成功，则只返回 **`response.data.data`**，这样业务代码中就不需要每次都解包了。如果失败，则统一处理错误提示。


**隐藏加载状态**: 在响应返回后，无论成功与否，都隐藏 Loading 动画。


```typescript
// src/utils/request.js (接上文)
import { ElMessage } from 'element-plus'; // 假设使用 Element Plus 的消息组件

service.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    const res = response.data;

    // 假设后端约定 code 为 0 表示成功
    if (res.code !== 0) {
      ElMessage.error(res.message || 'Error');
      // 可以根据特定 code 处理特定业务，如 401 跳转登录页
      if (res.code === 401) {
        // to re-login
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      // 只返回核心业务数据
      return res.data;
    }
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    console.error('Response Error:', error);
    ElMessage.error(error.message || 'Network Error');
    return Promise.reject(error);
  }
);
```


总结：


统一配置，通用逻辑和项目API集中。开发一处修改即可。


## 🍉 常见隐式转换等式


大部分围绕`==`这个东西 


先导：


`[] == ![]`  是 true


看起来用Boolean包裹一下[ ]是false ![] 是true 最后应该是false


```typescript
[] == ![] 
// 1. 计算 ![]
//    Boolean([]) -> true
//    !true -> false
//    表达式变为: [] == false

// 2. 比较 [] 和 false
//    规则: 如果一个操作数是布尔值，则将两个操作数都转为数字。
//    Number(false) -> 0
//    Number([]) -> Number([].toString()) -> Number("") -> 0
//    表达式变为: 0 == 0

// 3. 最终结果
//    0 == 0 -> true
```


## 🍉扩展运算符用法



✅ 1. **对象扩展（Object Spread）**


**① 浅拷贝对象**



```typescript
let a = { x: 1, y: 2 };
let b = { ...a };

console.log(b); // { x: 1, y: 2 }
console.log(b === a); // false
```


**② 覆盖字段**


```typescript
let a = { x: 1, y: 2 };
let b = { ...a, y: 999 };

console.log(b); // { x: 1, y: 999 }
```


**③ 合并多个对象**


```typescript
const a = { x: 1 };
const b = { y: 2 };
const c = { z: 3 };

const result = { ...a, ...b, ...c };
```


**④ 删除字段（搭配解构）**


```typescript
const { password, ...userInfo } = user;
```



✅ 2. **数组扩展（Array Spread）**


**① 浅拷贝数组**


```typescript
const a = [1, 2, 3];
const b = [...a];
```


**② 合并数组**


```typescript
const c = [...a, ...b];
```


**③ 在中间插入**


```typescript
const arr = [1, ...[3, 4], 5];
```



✅ 3. **函数参数展开**


**① 把数组展开成参数**



```typescript
function sum(a, b, c) {
  return a + b + c;
}

const arr = [1, 2, 3];
sum(...arr); // 6

```


**② 替代 apply**


```typescript
Math.max(...nums);
```



✅ 4. **剩余参数（Rest Parameters）**


```typescript
function fn(a, ...rest) {
  console.log(a);     // 第一个参数
  console.log(rest);  // 剩下的参数组成数组
}
```


| 用法     | 示例               | 意义         |
| ------ | ---------------- | ---------- |
| 对象拷贝   | `{ ...a }`       | 浅拷贝        |
| 对象合并   | `{ ...a, ...b }` | 合并并覆盖      |
| 数组拷贝   | `[ ...arr ]`     | 浅拷贝        |
| 数组合并   | `[ ...a, ...b ]` | 相当于 concat |
| 函数参数展开 | `fn(...args)`    | 相当于 apply  |
| 剩余参数   | `(...args)`      | 收集剩余参数     |


## 🍉 一些内置对象方法


### Array



✅ **A. 遍历类（最常考）**


| 方法        | 作用            | 是否返回新数组 | 是否可中断  |
| --------- | ------------- | ------- | ------ |
| `forEach` | 遍历但不返回        | ❌       | ❌      |
| `map`     | 遍历并返回新数组      | ✔       | ❌      |
| `filter`  | 筛选返回新数组       | ✔       | ❌      |
| `reduce`  | 累积（求和、扁平化、计数） | ✔（自定义）  | ❌      |
| `some`    | 有一个满足就 true   | 返回 bool | ✔（可中断） |
| `every`   | 全部满足才 true    | 返回 bool | ✔      |



✅ **B. 查找类**


| 方法          | 作用                  |
| ----------- | ------------------- |
| `find`      | 返回 _第一个_ 满足条件的元素    |
| `findIndex` | 返回满足条件的 _下标_        |
| `indexOf`   | 查基本类型的位置            |
| `includes`  | 是否存在（比 indexOf 更常用） |



✅ **C. 修改原数组的方法（副作用）**


| 方法        | 作用             |
| --------- | -------------- |
| `push`    | 末尾添加           |
| `pop`     | 末尾删除           |
| `shift`   | 开头删除           |
| `unshift` | 开头添加           |
| `splice`  | （万能增删改）**最常考** |
| `sort`    | 排序（常考比较函数写法）   |
| `reverse` | 反转数组           |



✅ **D. 不修改原数组的方法（生成新数组）**


| 方法       | 作用                   |
| -------- | -------------------- |
| `slice`  | 截取                   |
| `concat` | 合并                   |
| `join`   | 转字符串                 |
| `flat`   | 扁平化（如 `[1,[2,[3]]]`） |


### Object


| 方法                   | 说明            |
| -------------------- | ------------- |
| `Object.keys`        | 取 key 数组      |
| `Object.values`      | 取 value 数组    |
| `Object.entries`     | 转 map-like 数组 |
| `Object.fromEntries` | 逆操作           |
| `Object.assign`      | 拷贝/合并         |
| `Object.freeze`      | 冻结            |
| `Object.seal`        | 密封            |


### **Promise 静态方法**


### **1.** **`Promise.resolve(value)`**


返回一个以给定值 **`value`** 成功的 Promise 对象。

- 如果 **`value`** 是一个普通值，它返回一个立即成功的 Promise。
- 如果 **`value`** 是一个 Promise 对象，它直接返回这个 Promise。
- 如果 **`value`** 是一个 **`thenable`** 对象（即有 **`then`** 方法的对象），它会将这个对象“包装”成一个真正的 Promise。

```typescript
const p1 = Promise.resolve('成功');
const p2 = Promise.resolve(p1);

console.log(p1 === p2); // true, 如果传入的是 Promise，则直接返回

const thenable = {
  then: (resolve) => resolve('我是一个 thenable')
};
const p3 = Promise.resolve(thenable);
p3.then(console.log); // 输出: 我是一个 thenable
```


### **2.** **`Promise.reject(reason)`**


返回一个以给定原因 **`reason`** 失败的 Promise 对象。



```typescript
const p = Promise.reject(new Error('失败了'));
p.catch(error => console.error(error.message)); // 输出: 失败了
```


### 成功型promise


### **3.** **`Promise.all(iterable)`**

- **当所有 Promise 都成功时**，新的 Promise 才会成功。其成功结果是一个数组，包含了所有 Promise 的成功结果，顺序与传入的 Promise 顺序一致。
- **只要有任何一个 Promise 失败**，新的 Promise 就会立即失败，其失败原因是第一个失败的 Promise 的失败原因。

```typescript
const p1 = Promise.resolve(3);
const p2 = new Promise(resolve => setTimeout(() => resolve('foo'), 1000));
const p3 = Promise.resolve(42);

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // 1秒后输出: [3, 'foo', 42]
});

const p4 = Promise.reject('失败了');
Promise.all([p1, p4, p3]).catch(error => {
  console.error(error); // 立即输出: 失败了
});
```


### **6.** **`Promise.any(iterable)`**


接收一个 Promise 的可迭代对象，返回一个**新的 Promise**。

- 一旦**任何一个**传入的 Promise 成功，新的 Promise 就会立即成功，其结果是那个成功的 Promise 的结果。
- 如果**所有**传入的 Promise 都失败了，新的 Promise 才会失败，其失败原因是一个 **`AggregateError`** 对象，它包含了所有 Promise 的失败原因。

```typescript
const p1 = Promise.reject(new Error('失败 1'));
const p2 = Promise.reject(new Error('失败 2'));
const p3 = Promise.resolve('成功 3');

Promise.any([p1, p2, p3]).then(value => {
  console.log(value); // 输出: '成功 3'
});

Promise.any([p1, p2]).catch(error => {
  console.error(error); // 输出: AggregateError: All promises were rejected
  console.error(error.errors); // 输出: [Error: 失败 1, Error: 失败 2]
});
```


### 不管成不成功的


### **4.** **`Promise.race(iterable)`**


接收一个 Promise 的可迭代对象，返回一个**新的 Promise**。

- 这个新的 Promise 会在**任何一个**传入的 Promise 完成（成功或失败）时，立即采用其状态和结果。就像一场赛跑，谁先完成就听谁的。

### **5.** **`Promise.allSettled(iterable)`**


接收一个 Promise 的可迭代对象，返回一个**新的 Promise**。

- 这个新的 Promise 会等到**所有**传入的 Promise 都完成（无论成功还是失败）后才会成功。
- 其成功结果是一个数组，每个对象都对应一个传入的 Promise，并描述了其最终状态。
	- **`{ status: 'fulfilled', value: ... }`** 表示成功。
	- **`{ status: 'rejected', reason: ... }`** 表示失败。

这对于需要知道所有异步操作最终结果，而不关心是否有失败的场景非常有用。


## 🍉  数组splice/slice


| 特性       | `splice()`                    | `slice()`      |
| -------- | ----------------------------- | -------------- |
| **功能**   | 增删改数组元素                       | 提取数组片段         |
| **原数组**  | 直接修改                          | 不修改            |
| **返回值**  | 被删除的元素组成的新数组                  | 提取的元素组成的新数组    |
| **参数**   | `(start, deleteCount, items)` | `(start, end)` |
| **使用场景** | 动态修改数组内容                      | 安全获取子数组        |


## 🍉  **什么是尾调用**


尾调用就是在函数的**最后一步调用函数**


```javascript
function foo(x) {
  return bar(x); // foo 的最后一个动作是调用 bar，并直接返回 bar 的结果
}
```


**使用尾调用有什么好处？**


尾调用的最大好处在于**性能优化**，具体来说是实现了 **尾调用优化**。


前端貌似其实没有实现这个优化 也就是说理论优化吧。


## 🍉  水平垂直居中方法


1.**flexbox方法**


将父容器设置为 Flex 布局，然后利用 **`justify-content`** 和 **`align-items`** 属性分别控制主轴和交叉轴的对齐方式。

2.**Grid 方法**


将父容器设置为 Grid 布局，使用 **`place-items`** 属性一步到位实现居中。



3.**Position + Transform 方法**

1. 将父容器设为相对定位。
2. 将子元素设为绝对定位，并使用 **`top: 50%`** 和 **`left: 50%`** 使其左上角移动到父容器的中心。
3. 使用 **`transform: translate(-50%, -50%)`** 将子元素向左和向上回拉自身宽度和高度的 50%，从而实现中心对齐。

4.**Position + Margin 方法**


**核心思想：** 与 **`transform`** 方法类似，但使用负 **`margin`** 来代替 **`transform`** 进行偏移



5.**Table-cell 方法（特殊场景）**


将父容器模拟成表格单元格（**`display: table-cell`**），然后利用表格的 **`vertical-align: middle`** 属性来实现垂直居中，再配合 **`text-align: center`** 实现水平居中。


## 
🍉**浏览器渲染一帧都做了什么？**


**帧率** 就是每秒钟渲染的帧数，单位是 **fps (Frames Per Second)**。

- **60fps** 是目前业界公认的“流畅”标准。它意味着浏览器需要在 **1000ms / 60 ≈ 16.67ms** 内完成**所有**工作来生成一帧。
- 如果生成一帧的时间超过了 16.67ms，比如 33ms，那么帧率就会下降到 30fps，用户就会感觉到**卡顿（浏览器卡顿表现）**。
- 如果生成一帧的时间更长，比如 100ms，那么用户会明显感觉到页面**延迟、不响应**。

**核心目标：** 保证每一帧的渲染时间都控制在 **16.67ms** 以内，以达到流畅的 60fps 体验。


浏览器生成一帧，就像工厂里的一条流水线，主要有以下几个关键步骤。这个过程也被称为**关键渲染路径**。

1. **JavaScript:**
	- **触发器**：通常是 JavaScript 代码。比如通过 **`requestAnimationFrame`** 执行动画、用户交互（点击、滚动）、或者网络请求完成（如 AJAX）。
	- **作用**：修改 DOM 结构、修改 CSS 样式等，为后续步骤提供数据。
2. **Style (样式计算):**
	- **作用**：浏览器解析 CSS，结合 DOM，计算出每个节点最终的样式（CSSOM）。这个过程会确定每个元素最终应用了哪些 CSS 规则。
	- **成本**：通常比较快，但如果 CSS 选择器非常复杂（如通配符、深层嵌套），计算成本会增加。
3. **Layout (布局 / 重排):**
	- **作用**：根据计算出的样式，确定每个元素在屏幕上的精确位置和大小（几何信息）。浏览器会从根节点开始，递归计算所有元素的坐标。
	- **成本**：**非常昂贵！** 页面元素越多，布局越复杂，耗时就越长。**任何可能改变元素位置或大小的操作都会触发布局。**
4. **Paint (绘制 / 重绘):**
	- **作用**：布局完成后，浏览器知道了元素的位置和大小，接下来需要“填充”像素。比如绘制文本、颜色、边框、阴影等。这个过程通常在多个图层上完成。
	- **成本**：**同样昂贵！** 绘制的区域越大、越复杂（如阴影），耗时就越长。
5. **Composite (合成):**
	- **作用**：浏览器将所有绘制好的图层按照正确的顺序合并成最终的图像，然后显示在屏幕上。
	- **成本**：**相对最低！** 这个过程主要由 GPU（显卡）完成，速度非常快。**如果只触发合成，而不触发布局和绘制，性能开销是最小的。**

**卡顿：**


**1. 强制同步布局**


这是最严重、最常见的一种性能问题。


**定义**：JavaScript 强制浏览器在执行布局计算**之前**，就立刻去执行布局。


**正常流程**：JS -> Style -> Layout -> Paint -> Composite
**FSL 流程**：JS -> Layout -> JS -> Style -> Layout -> Paint -> Composite


**2. 布局抖动**


布局抖动是**强制同步布局的循环版本**。在循环中反复地“读-写”布局属性，会导致布局被反复触发。


**优化策略：如何保证流畅的 60fps？**


优化的核心思想是：**避免昂贵的 Layout 和 Paint，尽量只触发廉价的 Composite。**


**1. 使用** **`requestAnimationFrame`** **(rAF)**


永远不要用 **`setTimeout`** 或 **`setInterval`** 来做视觉动画。**`rAF`** 是浏览器专门为动画提供的 API，它会在每一帧开始时调用你的回调函数，保证你的动画逻辑与浏览器的刷新率同步，避免掉帧和卡顿。


```javascript
function animate() {
  // 在这里执行动画逻辑
  element.style.transform = 'translateX(' + x + 'px)';
  x += 1;

  // 请求下一帧继续执行
  requestAnimationFrame(animate); 
}

requestAnimationFrame(animate);
```


**2. 批量 DOM 读写**


解决“布局抖动”的关键。**先一次性读完所有需要的布局信息，再一次性写入所有样式更改。**


```javascript
function goodExample() {
  // 1. 先批量读取所有布局信息
  const tops = [];
  for (let i = 0; i < elements.length; i++) {
    tops.push(elements[i].offsetTop);
  }

  // 2. 再批量写入样式
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.top = (tops[i] + 10) + 'px';
  }
}
```


**3. 使用** **`transform`** **和** **`opacity`** **实现动画**


这是现代前端性能优化的**黄金法则**。

- **`transform`**（如 **`translate`**, **`scale`**, **`rotate`**）
- **`opacity`**

这两个属性有一个巨大的优势：**它们的改变只会触发 Composite（合成）阶段，而不会触发 Layout 和 Paint。**


浏览器会为这些元素创建一个独立的图层，交由 GPU 直接处理，这个过程极快。因此，用 **`transform: translateX()`** 来移动元素，远比修改 **`left`** 属性性能要好得多。


**4. 使用** **`will-change`** **或** **`transform: translateZ(0)`** **提示创建新图层**


如果你知道某个元素将要被频繁地独立动画（如一个弹窗、一个旋转的图标），你可以使用 CSS 属性提前告知浏览器，让它为这个元素创建一个新的图层，从而优化合成性能。


```javascript
.animated-element {
  will-change: transform, opacity;
  /* 或者旧版 hack */
  /* transform: translateZ(0); */
}
```


## 🍉 **事件委托**


 事件委托是一种利用事件冒泡机制，将事件监听器添加到父元素上，而不是其每个子元素上的技术


**1. 性能优化（减少内存占用）**


对于需要处理大量相似元素的页面，事件委托能极大地**减少内存消耗**和**提高页面初始化速度**。

**2. 动态元素支持（灵活性和可维护性）**


事件委托让你的代码对 DOM 的动态变化“免疫”，大大提高了代码的**灵活性和可维护性**。

**3. 代码简洁和集中管理**


所有子元素的事件处理逻辑都集中在父元素的那个监听函数中。这使得代码结构更清晰，更容易统一管理和修改。


**实现事件委托**


实现事件委托的关键在于两点：**利用事件冒泡** 和 **使用** **`event.target`**


**`event.target`**：指向**真正触发事件的那个元素**（比如被点击的那个 **`li`**）
**`event.currentTarget`**：指向**绑定了事件监听器的那个元素**（比如 **`ul`**）

