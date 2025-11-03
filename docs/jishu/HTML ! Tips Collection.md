---
catalog:
  - jishu
date: '2025-10-04 08:00:00'
type: Post
slug: htmltip
title: HTML | Tips Collection
status: 已发布
urlname: 282e9dc9-c245-80da-83c6-f1711a1eb1f7
updated: '2025-11-03 20:15:00'
---

# Tips For HTML.


### 🍉SVG的使用


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


### 🍉盒子模型


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


### 🍉盒模型下的边距margin重叠-BFC / IFC


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

