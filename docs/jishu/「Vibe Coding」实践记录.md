---
catalog:
  - jishu
date: '2025-12-24 08:00:00'
type: Post
slug: vibecoding
title: 「Vibe Coding」实践记录
status: 已发布
urlname: 2d0e9dc9-c245-800d-aff4-e1670ea8cdac
updated: '2026-01-19 19:29:00'
---

## 定义


Vibe Coding是由Andre Kaparthy于2025年2月3日在X平台上提出的新型编程方式。


## Vibe Coding工具


## TRAE


TRAE是一开始接触的工具，因为是国内的用着方便，不用太多的折腾适合直接入门不容易劝退。


最常用的功能是AI代码补全，以及一些agent修改代码的操作。缺点是目前只能用国内的几个模型但是没有额度限制就是。


## Claude Code


**Claude Code** 是 Anthropic 推出的一个 **智能编码代理（agentic coding assistant）**，本质上是一个可以在终端（CLI）里运行的 AI 工具，主要是用来全局理解代码上下文以及修改。


我的初步理解的话就是CLI版本的TRAE。


地址：[https://code.claude.com/docs/zh-CN/quickstart](https://code.claude.com/docs/zh-CN/quickstart)


这里我用的 mac 需要在 terminal 中设置命令行代理 设置方法：


```shell
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
```


因为claude code默认用的claude 模型需要充订阅 尝试能不能用第三方的


最后用第三方工具改了一下调用配置 用GLM模型实验的


![20260117_x1.png](https://r2.yisux.com/blog_img/20260117_x1.png)


将claude code注入到vscode插件中：


链接：[https://code.claude.com/docs/zh-CN/vs-code](https://code.claude.com/docs/zh-CN/vs-code)


![20260117_x2.png](https://r2.yisux.com/blog_img/20260117_x2.png)


使用claude code后感觉就是TRAE了。但是感觉vscode+claude code效果比TRAE好，感觉claude code的步骤更有逻辑？而且界面感觉干净又克制。


**VsCode的ai补全**


这个我没找到使用claude code还能接上AI补全的方法，找一下，不过别人说既然用cc这种agent向的，要么用自带的copliot要么用TRAE了。也就是copliot+claude code。


**效果暂时没有实验怎么样**


## CodeX


## 当我们在对比cursor、trae、claude code我们实际上在对比什么


参考：[https://www.huxiu.com/article/4827313.html](https://www.huxiu.com/article/4827313.html)


一直很好奇为什么claude code / codex 要做成cli的产品。从对比角度来说，Cursor/TRAE是IDE，它的目标是帮你更好地写代码。Claude Code是Shell，是计算机的通用控制面板。从Shell出发，你可以做任何事，发邮件、操作文件系统、跑服务器、控制云端基础设施。


**Claude Code做了对Claude模型的“最薄的可能封装”**


两者一个是IDE Agent 一个是 Cli Agent，有很多地方都是重叠的，两者都可以生成代码、运行脚本、进行调试，对于日常开发任务（git、shell 脚本、调试）都有一定能力。当我们在对比这些看起来形态不一样的产品的时候我们实际上还是在对比他们最核心的这些重叠业务能力。


## Vibe Coding供应商


### bigmodel.cn


[https://bigmodel.cn/](https://bigmodel.cn/)


智谱清源 GLM供应商


价格相对便宜 可以用GLM系列模型


### Open Code


感觉是完全偏命令行的CLI模型内置免费供应商


[https://opencode.ai/](https://opencode.ai/)


## Vibe Coding感受


目前也只用了Claude Code/TRAE 做一点vibe coding，体验下来就是细节改不了不如直接上手，不过以结果为导向倒是非常好的工具。


原因主要是AI也看不着界面，只能模糊的去打磨一点点，功能上AI也没办法连锁反应，比如我可能是去设置cookie导致了另一个错误，但是AI可能又把cookie这事忘了转而把这个错误计算为一个通用错误，从而在一直兜圈，兜了半天最好的结果是找到问题了最差的是因为缺少了这个的前置条件一直在循环。


如果把vibe coing作为结果导向一点不去介入只看结果的话，这就是比较好的工具了。

