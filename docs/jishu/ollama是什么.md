---
catalog:
  - jishu
date: '2026-09-30 08:00:00'
type: Post
slug: ''
title: ollama是什么
status: 已发布
urlname: 3ebe9dc9-c245-8035-a70f-db5a18636bdb
updated: '2026-10-02 00:54:00'
---

最近一直在想 OpenAi Completion API 的背后是什么。怎么把训练出的模型包裹成一个 OpenAI的接口呢。


于是乎问了一下 deepseek :


> 📌 应用层：ChatGPT / Claude / ComfyUI / Agent / 聊天机器人  
> 接口层：OpenAI API / Anthropic Messages API / 自定义 HTTP API  
>   
> 服务层：vLLM server / Ollama / FastChat / TGI server / text-generation-webui  
>   
> 推理引擎：vLLM / TensorRT-LLM / llama.cpp / TGI / SGLang  
>   
> 编译与内核：Triton 编译器 / CUDA / CUTLASS / cuDNN / TensorRT  
>   
> 训练框架：PyTorch / JAX / TensorFlow  
>   
> 训练优化：DeepSpeed / FSDP / Megatron / PEFT(LoRA) / bitsandbytes  
>   
> 硬件：NVIDIA GPU / AMD GPU / TPU / AWS Inferentia

