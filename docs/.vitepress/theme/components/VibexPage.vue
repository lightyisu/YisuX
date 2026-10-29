<template>
  <div class="vibex-page">
    <SiteNav active="vibex" />

    <main class="vibex-main">
      <h1 class="page-title">VibeX</h1>

      <div v-if="works.length" class="vibex-grid">
        <!-- 作品是 public 下的独立 HTML，新标签页打开以绕过 VitePress 路由 -->
        <a
          v-for="work in works"
          :key="work.file"
          :href="work.href"
          target="_blank"
          rel="noopener"
          class="vibex-card"
        >
          <img v-if="work.cover" class="vibex-cover" :src="work.cover" alt="" loading="lazy" />
          <span class="vibex-title">{{ work.title }}</span>
        </a>
      </div>
      <div v-if="works.length" class="vibex-credits">
        <p v-for="credit in credits" :key="credit.href" class="vibex-credit">
          {{ credit.label }}
          <a :href="credit.href" target="_blank" rel="noopener noreferrer"
            ><img class="vibex-credit-logo" src="/icons/claude.svg" alt="" aria-hidden="true" />{{ credit.name }}</a
          >
        </p>
      </div>
      <p v-else class="idx-empty">还没有作品，把 HTML 放进 docs/public/vibex/ 即可。</p>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteNav from "./SiteNav.vue";
import SiteFooter from "./SiteFooter.vue";
import { data as works } from "../utils/vibex.data.mts";

const credits = [
  { label: "Image From", name: "Claude Sonnet 5.5", href: "https://www.anthropic.com/claude-sonnet-5-5" },
  { label: "Made by", name: "Claude Opus 5.5", href: "https://www.anthropic.com/claude-opus-5-5" },
];
</script>

<style scoped lang="scss">
.vibex-page {
  --ink: #050505;
  --paper: #fff;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--ink);
  background: var(--paper);
  font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
}

.vibex-main {
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

.vibex-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

/* 封面铺满卡片，底部压暗渐变托住白色标题 */
.vibex-card {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  aspect-ratio: 16 / 9;
  padding: 20px 22px;
  overflow: hidden;
  border-radius: 16px;
  background: #1a1a1a;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.03em;
  text-decoration: none;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0) 58%);
  }

  &:hover .vibex-cover {
    transform: scale(1.04);
  }
}

.vibex-cover {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

/* 封面图来源与制作者 */
.vibex-credits {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 18px;
}

.vibex-credit {
  margin: 0;
  color: #777777;
  font-size: 13px;

  a {
    color: var(--ink);
    text-decoration: underline;
    text-decoration-color: #cfcfcf;
    text-underline-offset: 3px;
    transition: text-decoration-color 150ms ease;

    &:hover {
      text-decoration-color: var(--ink);
    }
  }
}

.vibex-credit-logo {
  display: inline-block;
  width: 1.1em;
  height: 1.1em;
  margin: 0 0.3em 0 0.15em;
  vertical-align: -0.2em;
}

.vibex-title {
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.25);
}

@media (max-width: 720px) {
  .vibex-main {
    width: calc(100% - 36px);
    padding: 58px 0 80px;
  }

  .page-title {
    margin-bottom: 34px;
    font-size: 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vibex-cover {
    transition: none;
  }
}
</style>
