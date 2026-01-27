---
catalog:
  - jishu
date: '2025-12-10 08:00:00'
type: Post
slug: mianshi2
title: 面试 | 前端问题Ai未来型
status: 已发布
urlname: 2c5e9dc9-c245-8031-874a-e60b6a70ae7a
updated: '2026-01-27 21:47:00'
---

## 前端工程师未来会被ai取代吗


GPT帮整理+筛选：


产品方面：模糊的需求AI无法去界定一个很好的技术方案，技术选型，性能策略，架构拆分，复杂场景的边界问题取舍问题。


前端方面：前端本身的迭代速度快，AI的学习能力经验可能跟不上前端产品的更新速度。产品细节AI无法做到完美。


## 怎么优化技术债


一般会先识别技术债的类型和影响面，然后按是否阻塞业务排序。对于 P0/P1 的债务，会采用伴随式重构或局部隔离的方式逐步解决，同时通过 lint、规范和 review 防止新增技术债。不会做大规模无收益重构，而是用数据推动逐步演进。


## 如果核心模块代码非常糟，但线上又不能动，你怎么办？


如果核心模块代码质量很差，但线上又不能动，我一般不会选择直接重构或替换。首先会把重点放在**保证线上稳定**上，在不改动核心逻辑的前提下补充必要的监控、日志和报警，确保问题可观测、可回滚。接着会通过**隔离的方式控制影响面**，比如在核心模块外加一层适配或封装，把它当成一个不可修改的第三方模块，新业务只和隔离层交互，避免技术债继续扩散。在此基础上，如果条件允许，会采用**渐进式替换**的方式，比如双写、影子流量或灰度切换，在保证行为一致和风险可控的情况下逐步引入新的实现，而不是一次性重写。同时我会补齐核心路径的回归用例和边界测试，让系统先变得“可验证”，再逐步变得“可修改”。整体目标不是追求代码立刻变干净，而是在可控风险下持续降低技术债。


## 平时如何使用ai


**Ai补全代码:**使用AI补全代码快速生成样板代码 


1.小范围补全代码 


一个完整的类似代码中包含的复杂对象，比vscode编辑器自带的快捷键更加方便一些


CSS代码的补全


2.template代码


比如，我要写一个新的React Hook 、Vue Hook。基础的HTML中的骨架结构（表单，菜单，列表


3.TS代码的补全


TS类型需要精准编写复杂的泛型，代码补全能够自动推导泛型，AI也能够解决类型报错


4.正则表达式


5.API封装请求头这样的模板的补全，API模块，组件模块导入的AI自动补全


+除AI补全之外使用提问、bug调试、找报错问题


**做Code Review：**1.检查代码可能的漏洞 2.用AI去解释一个陌生代码的结构节省Review时间


### 更好的用TRAE/Cursor/ClaudeCode:


1.让AI改动前先commit 防止后续出现代码混乱的情况 特别是完全agent/solo模式


2.将危险的操作加入黑名单例如rm/git,告诉明确的范围 不盲目accept


3.确定一个**上限模型Claude和下限模型GLM**,轻任务使用下限模型，重任务使用上限模型


4.**把重要信息写成文件让Code Agent自动读取作为一个长期记忆+多对话窗口**


5.任务过于复杂的时候首先让AI或者自己拆分任务步骤 **设计方案和计划**


6.阅读这些agent工具的文档站，查看最佳实践


**总结：顶尖模型决定了处理问题的上限和深度，高性价比模型决定了下限和探索的广度**


ref:[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)


## Claude Code的最佳实践一览


![1769521480314.png](https://r2.yisux.com/blog_img/1769521480314.png)


![1769521555091.png](https://r2.yisux.com/blog_img/1769521555091.png)


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/ed141b76-e4f4-4030-b3c9-9f8f9925cc4f/794b52b2-42c2-4853-93cd-3217071e773d/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVVYO7HA%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T155003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHD0A7Hon7x5ssPnqUKT9MHxAanLL1qwOVGrzOqFLB3dAiEAhhLnH0DdArgZaS2Za3PxPGGai16G1RlcwLXJvvd1NYQq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDCsa7eUtGoBaXXVD3SrcA4qeYu3W7rsppF%2FqAv1p1NulyXVuzCjl4eWAe5Nk%2BFLwBJjuB%2FmaD0qlxRjuLgSAdJkqwmI0eutQoxZxmo4NlfLWpEHUnpw8MtY3y%2Bw9IL2%2BuQG6pRXdq%2BeRR%2BP85dYMNQX0yd8R%2BClauH7O4BZ4IZP4M5A%2FwEdk9sYpCOjWfx66w%2BRS%2BzhzsYp%2B79oA0wYQquGXGUQDsQjrQZg3DSkOCfC4uqPiWwvpQYKLtVco0X0mMiGKbg%2BdcAqItfj5fVjEbxyqnrxvXnPKWFpj4dX7rML1nLAv5Zm%2B3t8xaOhxuSzI%2B4cGGxOkjvBfasa9ynk4YOE%2FmLbwWLoRKNNhkZjYsZMKPH%2FUy7na1ZFRfP8yYO%2BX1y8s2Mdo4iVji0R1C656cUoVzO8wWdYb0cnbEw4ob%2Bofzu%2Fz%2FSe1p7AKg%2Bieay0NlCitgNK52RSX10nvcI1WzjZT3ZJ%2BS9hHd4JwWbSIO42GHWfpx6k86sqdv3p2WWYuv0A3Q6lhRp2meKtXXv%2FusfK3mqXm4N7E1BKO%2BEfbl9I%2BE8Zm%2B0ePhhjW2u7CRMP8JXdtKshXBeYGgyC3%2FnRqi%2Bg7aD7s65s8D3AH35Rh%2F4qFtfsitEccXH4W940ahdJmx6B%2FEXL0zWvNJt1uMOus48sGOqUBgApds%2FZolr1SukYPiCN3ehiKd08oUtcitp%2Ft51F18anH5iop7ZNHElxclEyZjZTSx8%2Bvo%2FbdbvGs986Uugna7OJashs5qAYhWzzEX8SgPL2tT3yf9glo9izmdcVI3IgmYKVqcib7UldD9RlTcwOK0zoZYYKMXs%2FtXMZ0GCXjeAOVNWzI2cCKubQoSAJBCUEn0Zd4Labe5hiYBuqsrXy0HYB1wCKl&X-Amz-Signature=e263989262e8af47ff3d91f8475fe37e53bdd1fdd585f6cdde5bc3a84a570d22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

