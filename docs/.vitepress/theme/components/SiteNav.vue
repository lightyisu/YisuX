<template>
  <header class="site-nav">
    <div class="site-nav-inner">
      <a href="/" class="site-logo pill-dark" aria-label="YisuX 首页">YisuX</a>
      <nav class="site-nav-links" aria-label="主导航">
        <a href="/" :class="{ active: active === 'home' }">首页</a>
        <a href="/page" :class="{ active: active === 'page' }">Dev.</a>
        <a
          href="https://github.com/lightyisu/yisupower"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub</a
        >
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  active?: "home" | "page";
}>();
</script>

<style scoped lang="scss">
.site-nav {
  --ink: #050505;
  --muted: #777777;

  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}

.site-nav-inner {
  width: min(1120px, calc(100% - 64px));
  height: 72px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

// 黑色胶囊由全局 .pill-dark 提供（与「返回博客」按钮共用同一套样式）
.site-nav-links {
  display: flex;
  align-items: center;
  gap: 26px;

  a {
    color: var(--muted);
    font-size: 13px;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    transition: color 150ms ease;

    &:hover {
      color: var(--ink);
    }

    &.active {
      color: var(--ink);
      font-weight: 600;
    }
  }
}

@media (max-width: 720px) {
  .site-nav-inner {
    width: calc(100% - 36px);
    height: 66px;
  }

  .site-nav-links {
    gap: 18px;

    a[href='/'] {
      display: none;
    }
  }
}
</style>
