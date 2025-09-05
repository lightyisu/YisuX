---
catalog:
  - jishu
date: '2025-08-27 08:00:00'
type: Post
slug: pnpm1
title: pnpm | 硬链接与软链接
status: 已发布
urlname: 25ce9dc9-c245-8072-aab2-ea8df93773da
updated: '2025-09-05 18:28:00'
---


> Linux 文件系统（ext4 等）里，一个**文件本质上是 inode + 数据块**。

- **inode**：保存文件的元信息（权限、时间戳、指向的数据块位置等）。
- **目录项 (directory entry)**：其实就是 _文件名 → inode 号_ 的映射。

### 硬链接（ln）


源文件 f1 创建硬链接 f2 ( ln f1 f2)


此时 f2 得到了 f1 的 inode信息 数据块始终保持一个


删除 f1 并不会导致 f2 信息丢失，只有系统中这个inode不再被使用 数据块才会被丢弃e


### 软链接 (ln -s)


只是一个指向路径的特殊文件；删除“源文件”后，软链接会失效（悬挂链接）

