<template>
  <div class="icons-page">
    <SiteNav active="icons" />

    <main class="icons-main">
      <h1 class="page-title">Icons</h1>

      <div class="icons-head">
        <p class="icons-desc">正文里出现这些关键词时，会自动用胶囊包上图标和关键词。</p>
        <span class="icons-count">{{ icons.length }} 个</span>
      </div>

      <div v-if="icons.length" class="icon-grid">
        <article v-for="icon in icons" :key="icon.key" class="icon-cell">
          <div class="icon-preview">
            <span
              v-if="icon.mono"
              class="kw-icon kw-icon--mono"
              :style="{ '--kw-icon': `url('${icon.src}')` }"
              aria-hidden="true"
            />
            <img v-else class="kw-icon" :src="icon.src" alt="" aria-hidden="true" />
          </div>

          <div class="icon-info">
            <h2 class="icon-name">{{ icon.key }}</h2>
            <ul class="icon-words" aria-label="匹配的关键词">
              <li v-for="word in icon.words" :key="word">{{ word }}</li>
            </ul>
            <p class="icon-type">{{ icon.mono ? "单色 · 跟随文字颜色" : "彩色" }}</p>
          </div>
        </article>
      </div>
      <p v-else class="idx-empty">还没有图标，把文件放进 docs/public/icons/ 即可。</p>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteNav from "./SiteNav.vue";
import SiteFooter from "./SiteFooter.vue";
import { data as icons } from "../utils/icons.data.mts";
</script>

<style scoped lang="scss">
.icons-page {
  --ink: #050505;
  --paper: #fff;
  --muted: #777777;
  --line: #dedede;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--ink);
  background: var(--paper);
  font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
}

.icons-main {
  flex: 1;
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  padding: 82px 0 120px;
}

.page-title {
  margin: 0 0 52px;
  font-size: clamp(26px, 2.5vw, 34px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

.icons-head {
  display: flex;
  align-items: baseline;
  gap: 24px;
  margin-bottom: 34px;
}

.icons-desc {
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.6;
}

.icons-count {
  margin-left: auto;
  color: var(--muted);
  font-size: 13px;
  white-space: nowrap;
}

/* 细线网格：每格只画右边与下边，外框由容器补齐 */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.icon-cell {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 26px 22px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.icon-preview {
  flex: none;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: #f5f5f5;
  font-size: 30px;

  .kw-icon {
    margin: 0;
    vertical-align: 0;
  }
}

.icon-info {
  min-width: 0;
}

.icon-name {
  margin: 2px 0 10px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.icon-words {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 3px 8px;
    border: 1px solid var(--line);
    border-radius: 999px;
    font-size: 12px;
    line-height: 1.4;
  }
}

.icon-type {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 12px;
}

@media (max-width: 720px) {
  .icons-main {
    width: calc(100% - 36px);
    padding: 58px 0 80px;
  }

  .page-title {
    margin-bottom: 34px;
    font-size: 28px;
  }

  .icons-head {
    flex-direction: column;
    gap: 8px;
  }

  .icons-count {
    margin-left: 0;
  }
}
</style>
