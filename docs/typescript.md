---
catalog: []
date: '2025-07-27 00:00:00'
type: ''
slug: ''
title: typescript
status: ''
urlname: 23ce9dc9-c245-80d3-b76a-fb29346179a7
updated: '2025-07-27 00:07:00'
---

（1）`type`能够表示非对象类型，而`interface`只能表示对象类型（包括数组、函数等）。

（2）`interface`可以继承其他类型，`type`不支持继承。

（3）同名`interface`会自动合并，同名`type`则会报错。也就是说，TypeScript 不允许使用`type`多次定义同一个类型。

（4）`interface`不能包含属性映射（mapping），`type`可以，详见《映射》一章。

（5）`this`关键字只能用于`interface`。

（6）type 可以扩展原始数据类型，interface 不行。


（7）`interface`无法表达某些复杂类型（比如交叉类型和联合类型），但是`type`可以。



