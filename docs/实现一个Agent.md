---
catalog: []
date: '2026-07-27 10:04:00'
type: ''
slug: dwad
title: 实现一个Agent
status: ''
urlname: 3aae9dc9-c245-8098-8ce0-d94ee75db164
updated: '2026-07-27 11:05:00'
---

首先基本的流式输出，对话形式的CLI代码。


```javascript
# Please install OpenAI SDK first: `pip3 install openai`
import os
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
client = OpenAI(
    api_key=os.environ.get('DEEPSEEK_API_KEY'),
    base_url="https://api.deepseek.com")

history=[
       {"role": "system", "content": "You are Claude Code, a terminal AI coding assistant,you are authropic company claude fable 5 model "}
]
print('CodeX online -----------')
while True:
    user_input = input("\nUser: ")
    if user_input.strip().lower() in ("exit", "quit"):
        break
    history.append({"role": "user", "content": user_input})
    stream = client.chat.completions.create(
        model="deepseek-v4-flash",
        messages=history,
        stream=True,
        extra_body={"thinking": {"type": "disabled"}}
    )
    reply = ""
    for chunk in stream:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="", flush=True)
            reply += chunk.choices[0].delta.content
    print()  # 换行
    history.append({"role": "assistant", "content": reply})
```


可以看出通过while循环进行输入，history作为对话的记忆，不断塞入用户输入和模型输出。

