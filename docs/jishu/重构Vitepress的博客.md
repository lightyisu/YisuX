---
catalog:
  - jishu
date: '2026-01-11 08:00:00'
type: Post
slug: adwa
title: 重构Vitepress的博客
status: 已发布
urlname: 2e5e9dc9-c245-8086-b20a-c9c591817515
updated: '2026-01-11 14:47:00'
---

## 起因


一直想重构我的博客来着，因为主要是原来的Vitepress默认下少了很多我想要的东西。

1. 首页不能够大改，一般来说填入一些配置项来改细节，大改得修改主题了。
2. 导航栏上的技术/日常这样的链接无法指向到最新一个文章的链接，做文档一般是指向不需要修改的介绍页这个对我的博客来说不适合。应该也有不用修改主题就能够解决的办法但是没有那么麻烦的必要了。
3. 样式上的问题，我还是偏向能够自定义更高程度点。

但是怎么改比较好呢，一直心里没有很好的完整的想法。感觉以前看过Naver还是kakao的博客感觉设计的很简洁又克制，我又去Behance上找一找。找了找又用Figma画了画，感觉可以实现了。


## 过程


### 首页


首先我是想使用Vitepress的扩展默认主题而不是彻底自定义的，因为我感觉舍弃默认主题后面的`asidebar`以及markdown转html不好自己调整。最先尝试的是直接在首页的markdown文件中直接插入vue组件。使用**注册全局组件**的方式以及**重写内部组件**的方式，但是局限都很大，后面写到文章页的时候这种方式没有办法修改默认的`asidebar` 以及 `navbar` 。最后的解决方案是完全自定义主题。


实现方式：


```html
<div v-if="frontmatter.layout === 'home'">
    <MyHome />
  </div>
  <div v-else class='page-content'>
  .....
  </div>
```


[https://vitepress.dev/zh/guide/custom-theme](https://vitepress.dev/zh/guide/custom-theme)


### 打字机效果


首页的打字机是带回删的打字机。具体原理是对`el.textContent`进行增删。


**光标**：同时在文字后还需要一个光标这里直接用`<span> | <span>` 实现就可以，然后给一个透明 `opacity=(0|1）` 一会，这是一个循环的动画直接用 `animation` 做css就可以不需要引入 js 。


```css
.cursor {
    animation: blink 1s infinite;
    color: var(--naver-green);
  }
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
```


**完全打字机**：


当做一个不带回删完全的打字机时，就是往一个元素的`textcontent`不断塞入变长的文字，原理是：


```javascript
el.textContent = fullText.slice(0, charIndex + 1);
 charIndex++;
```


并且不断的递归这段代码，设置一个异步`settimeout`以模拟打字速度。


**回删打字机**：


定义两段文字（一段固定文字+回删文字）


这里我是:


```javascript
const text2replace: string[] = [
  "Blog!",
  "Web?",
  "Race?(F1 car?",
  "kpop music!",
  "spaghetti?(album",
];
let baseText = "Every Story Needs a ";
```


回删打字机时基于完全打字机的逻辑模式，所以需要在完全打字机结束的时候设置回删状态开始。


同时往`textContent`减少变长文字的长度至固定文字为止。


```javascript
const currentReplace = text2replace[textIndex % text2replace.length]; //保持循环
 const fullText = baseText + currentReplace;
 /** ..... **/
 const deleteStart = baseText.length; // 保留 baseText
 el.textContent = fullText.slice(0, charIndex - 1);
 charIndex--;
 if (charIndex === deleteStart) {
      isDeleting = false;
      textIndex++; // 下一句
      setTimeout(() => {
        typeLoop(el);
      }, pauseAfterDelete);
      return;
  }
```


完整流程：

- 打字中 → 逐个增加字符
- 打完 → 暂停 → 切换为回删状态
- 回删中 → 逐个删除字符
- 删完 → 暂停 → 切换为下一句话

**RAF优化：**


```javascript
function typeLoopRAF(el: HTMLElement, timestamp?: number) {
  if (timestamp === undefined) timestamp = performance.now(); // 或者 0
  if (!lastTimestamp) lastTimestamp = timestamp;
  const delta = timestamp - lastTimestamp;

  // 暂停阶段
  if (timestamp < pauseUntil) {
    requestAnimationFrame((t) => typeLoopRAF(el, t));
    return;
  }
  }
```


在只用setTimeout的时候能够经常发现动画变速了，此时需要RAF来优化天然的对齐动画。


并且页面不在前台也不会有计算消耗。


### 首页音乐播放


这里主要用的是**编译时请求**，并不是实时请求音乐数据，当然音频是实时请求的。


```typescript
import { ref } from 'vue';
import { data } from '../utils/music.data.ts';
import { randomInt } from '../utils/random';

// 定义音乐信息类型
interface TrackInfo {
  cover_url: string;
  artist_name: string;
  title: string;
  preview_track_url: string;
}

export function useMusicData() {
  // 音乐信息状态
  const track_info = ref<TrackInfo>({
    cover_url: '',
    artist_name: '',
    title: '',
    preview_track_url: '',
  });

  /**
   * 随机获取一首音乐信息
   */
  const getRandomTrack = () => {
    if (data && data.list && data.list.length > 0) {
      const randomIndex = randomInt(0, data.list.length);
      const randomTrack = data.list[randomIndex];
      
      track_info.value = {
        cover_url: randomTrack.artworkUrl100,
        artist_name: randomTrack.artistName,
        title: randomTrack.trackName,
        preview_track_url: randomTrack.previewUrl,
      };
      
      return track_info.value;
    }
    return null;
  };

  return {
    track_info,
    getRandomTrack,
  };
}
```


方法来自：[https://vitepress.dev/zh/guide/data-loading](https://vitepress.dev/zh/guide/data-loading)


只在**构建/编译**的时候请求一次，对于我这个静态博客来说非常合适：


好处是，

- **不需要浏览器发请求**
- **没有 CORS / Auth 之类的问题 Nodejs请求 跨域完美解决**
- **没有加载延迟，除了音频文件只要编译完成，其他数据都是写死的不会因为API改了或者其他原因导致浏览器请求掉数据，没有依赖焦虑了**

### 页面TOC实现


获取内容中的标题 => 生成 tocItems


| 步骤 | 说明                  |
| -- | ------------------- |
| 1  | 选择文章里的 `h2` `h3`    |
| 2  | 找到 DOM 节点并循环        |
| 3  | 确保每个标题都有 `id` (跳转用) |
| 4  | 生成 `tocItems` 列表    |


```typescript
const extractToc = () => {
  const selectors = [
    ".post-content h2",
    ".post-content h3",
    ".content-wrapper h2",
    ".content-wrapper h3",
  ];

  let headers: NodeListOf<Element> | null = null;

  for (const selector of selectors) {
    const found = document.querySelectorAll(selector);
    if (found.length > 0) {
      headers = found;
      break;
    }
  }

  if (!headers) return;

  const items: TocItem[] = [];

  headers.forEach((header, index) => {
    if (!header.id) {
      const text = header.textContent || "";
      header.id = `heading-${text.replace(/\s+/g, "-").toLowerCase()}-${index}`;
    }

    items.push({
      id: header.id,
      text: header.textContent || "",
      level: header.tagName === "H2" ? 2 : 3,
    });
  });

  tocItems.value = items;
};
```


### 自动收集博客文章列表


```typescript
import { createContentLoader } from "vitepress";
```


VitePress 内部提供的工具，用于扫描 markdown 内容。


```typescript
// .vitepress/theme/posts.data.ts
import { createContentLoader } from "vitepress";

export interface Post {
  title: string;
  url: string;
  date: string;
}

declare const data: Post[];
export { data };

export default createContentLoader("**/*.md", {
  // 扫描所有md文件
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => url !== "/") // 排除首页
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || "无题",
        url,
        date: frontmatter.updated || "", // 建议在 md 的 frontmatter 里写 date: 2026-01-02
      }))
      .sort((a, b) => b.date.localeCompare(a.date)); // 按日期倒序排
  },
});
```

