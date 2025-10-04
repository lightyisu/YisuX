---
catalog:
  - jishu
date: '2025-10-04 08:00:00'
type: Post
slug: htmltip
title: HTML | Tips Collection
status: 已发布
urlname: 282e9dc9-c245-80da-83c6-f1711a1eb1f7
updated: '2025-10-04 12:02:00'
---

# Tips For HTML.


### SVG的使用


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

