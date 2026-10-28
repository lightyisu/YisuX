---
catalog:
  - jishu
date: '2026-10-28 08:00:00'
type: Post
slug: ''
title: Vibecoding Now  vol.1
status: 已发布
urlname: 407e9dc9-c245-807c-a1d3-dd3c6cf3d32d
updated: '2026-10-28 14:10:00'
---

记录 Vibe Coding 遇到的，这里是 Vol1。


WorkTree


从 Git 延伸过来的开发概念，比较适合 Vibe Coding 应该是。之前没有接触过 worktree 更多的是分支。但是 Vibe Coding 工作效率提高随之带来需要并行开发的需求，worktree 便是非常适合的选择。**本质是复制多个目录同时工作且互不覆盖写入打扰。**


**① 一个仓库，多个工作目录**


Vibe 时，主仓库不变，开俩个 Worktree，一个 Worktree A 去做登录界面，一个 Worktree B 去做设置界面，Worktree 是基于真实磁盘创建的。需要真实的建立一个项目。


**② 每个目录可以处于不同分支**


不同 Agent 可以同时修改各自负责的代码。


**③ 共享 Git 仓库数据，不共享工作区**


worktree 共享 Git 的对象数据库和仓库历史，但各自的工作文件、暂存区和工作区状态是独立的。


**Git 树是共享的!**


**④ 提交后，不会自动进入 main**


想让 `main` 获得这些改动，仍然需要 `merge`、`rebase` 或其他整合操作。


**⑤ 工作目录和分支可以分别清理**


`git worktree remove` 删除的是对应工作目录；它不会自动删除分支，也不会自动合并或删除已经提交的历史。


实践：举个例子我在 Qoder 里把桌面的 Test 作为工作区，在这个工作区使用了 Worktree 然后 Qoder 就会在自己的软件缓存目录.qoder 里创建一个 worktree 随机名的目录和分支，然后在里面做修改。但是实际上去原桌面的工作区是没有任何改动的，所以还是需要合并回去。

