---
catalog:
  - jishu
date: '2025-12-26 08:00:00'
type: Post
slug: codefe
title: coding | 前端实践记录
status: 已发布
urlname: 2d3e9dc9-c245-809e-b020-c3445cb33a76
updated: '2026-02-26 13:42:00'
---
1. CSS原生变量在主题定制方面很常用 用法是`--name` 定义 `var(--name)`使用
2. `scoped`的本质是为元素加上了`data-v-xxxx` 这样的属性 元素身上有这个不需要深度选择器没有则需要。深度选择器**告诉 Vue 编译器，这条规则不要加** **`data-v-xxxx`** **属性选择器，让它“穿透”进去，影响到子组件**
3. ts定义类型可以提取出来放在一个文件 `d.ts`并且vue组件也可以用`d.ts`去单独定义 这样在传`props`给组件也能获得代码提示 称之为组件类型
4. 用嵌套路由做公共`layout` ，需要多级`router-view`
5. `type pickPerson = Pick<Person,'age'>` 从原类型对象中选取需要的，`Pick`换成`Omit`就是排除掉参数后的新类型对象，`&`用于再合并。一种ts类型复用的方法
6. `user.a?.b` 可选链意味着a存在再去找b 如果不存在直接上一层停止
7. 最近写vue项目的时候，解构一直是习惯丢响应式，没想到已经支持响应式解构了`（vue3.5+）`，给要是老点的AI都识别不出这个新特性。from:[https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props)
8. 在 3.4 及更低版本，响应式 Props 解构不会被默认启用。另一种选择是使用 `withDefaults` 编译器宏
9. vue3里用组合式API比较乱，比起响应式不容易看出区块。最佳实践是抽离函数以Use开头，称之为自定义Hooks
10. margin-top会导致父容器也连带被margin下来，这是边距塌陷的一种。子元素的 margin-top 会和父元素发生“塌陷合并”。解决方法加父元素`overflow`等等
11. 为什么有时候text align居中不起作用 margin auto却可以，由元素决定，text align 控制行内内容的对齐 margin: 0 auto 控块级
12. 给按钮贴材质：经常遇到材质和背景色的顺序问题，可以用CSS 的多重背景（Multiple Backgrounds）来实现比较好的效果。

```javascript
.ef-btn {
  background: transparent; // 确保按钮本身透明
  overflow: hidden;        // 防止伪元素溢出

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    // 关键：第一个 url 是材质（上层），第二个是变量颜色（下层）
    background: 
      url('@/assets/icons/home/button-texture.png'), 
      var(--btn-ef); 
    background-size: cover;
    background-position: center;
    z-index: -1; // 只需 -1 即可
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 0.8; // 还可以方便做悬停效果
  }
}
```

