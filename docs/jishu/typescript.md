---
catalog:
  - jishu
date: '2025-08-05 08:00:00'
type: Post
slug: ts
title: typescript
status: 已发布
urlname: 23ce9dc9-c245-80d3-b76a-fb29346179a7
updated: '2025-09-20 22:14:00'
---

# Tips For TS.


（1）`type`能够表示非对象类型，而`interface`只能表示对象类型（包括数组、函数等）。

（2）`interface`可以继承其他类型，`type`不支持继承。

（3）同名`interface`会自动合并，同名`type`则会报错。也就是说，TypeScript 不允许使用`type`多次定义同一个类型。

（4）`interface`不能包含属性映射（mapping），`type`可以，详见《映射》一章。

（5）`this`关键字只能用于`interface`。

（6）type 可以扩展原始数据类型，interface 不行。


（7）`interface`无法表达某些复杂类型（比如交叉类型和联合类型），但是`type`可以。


# List Of TS.


typings与xxx.d.ts文件


感觉xxx.d.ts这种文件不知道怎么自然而然的写出来 于是查了一下：


### 开发场景 1：遇到全局变量报错


引了一个第三方库 可能特别是<script>引入的 导致TS报错找不到库的变量


此时报错TS2304: Cannot find name 'mylib'.


方法：


写一个声明文件
在 `typings/mylib.d.ts` 里：


```typescript
declare const mylib: {
		hello(msg: string): void
}
```


### 开发场景 2：公共类型需要到处用


方法：抽出来就不用复写了



抽出来放在 `typings/global.d.ts` ：


```typescript
declare interface ApiResponse<T> {
  code: number
  data: T
  message: string
}
/**use**/:
function handleResponse(res: ApiResponse<{ id: number; name: string }>) {
  console.log(res.data.name)
}
```


### 开发场景 3：第三方库没类型


方法：补写放入xxx.d.ts `typings/lodash-extra/index.d.ts` 写


GPT说Typings更像是“**错误驱动的产物**”，而不是“提前设计的东西”。我觉得也是，就是不断修补ts类型的一个候补文件目录。





