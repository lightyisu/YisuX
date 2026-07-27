---
catalog:
  - jishu
date: '2026-07-23 08:00:00'
type: Post
slug: fefs
title: 'MCP,Skill 和 Agents'
status: Draft
urlname: 3a6e9dc9-c245-80e7-bfd5-defbefbcf3db
updated: '2026-07-27 10:04:00'
---

最近认真的学习了一下Agent, Agent 本质上是围绕LLM开发的生态。MCP和Skill也是如此应该。


**Agent** 的本质，是三个元素构成的。分别是提示词工程的感知和思考，循环，工具调用。最标准的Agent范式应该是ReAct范式。我也觉得设计的很不错。巧妙的在结构化数据和非结构化数据之间变换是Agent设计的一种美学。ReAct主要是TAO,Thought,Action and Observer。思考行动再观察并将整个流程循环，最后设置一个终止符完成自主能力的行为，这很符合自然界的自主能力。


**MCP**是function tool的延伸，function call是模型需要通过一些具体的函数获得模型外部的信息。MCP设计了Client/Server的方式使其标准化，Client一般都是由本地Agent设计的，比如Cursor,Qoder,OpenCode内部实现。Server则是需要开发的部分，可以在server内部设计不同的function。在开发上基本是代码为主。


**Skill**是上下文的大量填充，通过Skill可以增加一些预设。并且能够指导模型去查阅资料甚至引导模型使用MCP,使其更加有理解能力。比如金谷园饺子馆的Skill,都是大量的文字去介绍如何使用他的MCP能力。并且通过渐进式深入，相当于外层的skill.md给索引，内层的reference给具体信息有种小的RAG知识库的感觉。

