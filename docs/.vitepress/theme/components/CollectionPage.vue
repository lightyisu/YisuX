<template>
  <div class="collection-page">
    <header class="collection-nav">
      <a class="back-link pill-dark" href="/">返回博客 <span aria-hidden="true">↗</span></a>
    </header>

    <main class="collection-main">
      <section class="collection-section">
        <h1>Pages Dev</h1>

        <div class="site-grid" aria-label="开发网站收藏列表">
        <article class="site-card">
          <a
            href="https://claude.dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="打开 claude.dev（新窗口）"
          >
            <img
              class="site-cover site-cover--claude"
              :src="claudeScreenshot"
              alt="claude.dev 网站首页截图"
              decoding="async"
              @error="useFallback($event, '/site-covers/claude-dev.png')"
            />
            <div class="site-title">
              <img :src="claudeFavicon" alt="" aria-hidden="true" />
              <h2>Claude Dev</h2>
            </div>
            <p class="site-meta">claude.dev</p>
          </a>
        </article>

        <article class="site-card">
          <a
            href="https://qwen.ai/research"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="打开 Qwen Research（新窗口）"
          >
            <img
              class="site-cover site-cover--qwen"
              :src="qwenScreenshot"
              alt="Qwen Research 网站首页截图"
              decoding="async"
              @error="useFallback($event, '/site-covers/qwen-research.png')"
            />
            <div class="site-title">
              <img :src="qwenFavicon" alt="" aria-hidden="true" />
              <h2>Qwen Research</h2>
            </div>
            <p class="site-meta">qwen.ai/research</p>
          </a>
        </article>
        </div>
      </section>

      <section class="collection-section">
        <h1>Pages Free</h1>

        <div class="site-grid" aria-label="免费资源网站收藏列表">
          <article class="site-card">
            <a
              href="https://freeegg.top/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="打开 FreeEgg（新窗口）"
            >
              <img
                class="site-cover"
                :src="freeEggScreenshot"
                alt="FreeEgg 网站首页截图"
                decoding="async"
              />
              <div class="site-title">
                <img :src="freeEggFavicon" alt="" aria-hidden="true" />
                <h2>FreeEgg 赛博鸡蛋</h2>
              </div>
              <p class="site-meta">freeegg.top</p>
            </a>
          </article>
        </div>
      </section>

      <section class="collection-section">
        <h1>Pages Design</h1>

        <div class="site-grid" aria-label="文章收藏列表">
          <article class="site-card">
            <a
              href="https://chloemaillot.fr/writing/designing-the-wait"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="打开 Designing the Wait（新窗口）"
            >
              <img
                class="site-cover"
                :src="designingWaitScreenshot"
                alt="Designing the Wait 文章页面截图"
                decoding="async"
              />
              <div class="site-title">
                <img
                  :src="designingWaitFavicon"
                  alt=""
                  aria-hidden="true"
                  @error="useFaviconFallback($event, 'chloemaillot.fr')"
                />
                <h2>Designing the Wait</h2>
              </div>
              <p class="site-meta">chloemaillot.fr</p>
            </a>
          </article>

          <article class="site-card">
            <a
              href="https://motion.dev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="打开 Motion（新窗口）"
            >
              <img
                class="site-cover"
                :src="motionScreenshot"
                alt="Motion 网站首页截图"
                decoding="async"
              />
              <div class="site-title">
                <img
                  :src="motionFavicon"
                  alt=""
                  aria-hidden="true"
                  @error="useFaviconFallback($event, 'motion.dev')"
                />
                <h2>Motion</h2>
              </div>
              <p class="site-meta">motion.dev</p>
            </a>
          </article>

          <article class="site-card">
            <a
              href="https://recent.design/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="打开 Recent（新窗口）"
            >
              <img
                class="site-cover"
                :src="recentScreenshot"
                alt="Recent Design 网站首页截图"
                decoding="async"
              />
              <div class="site-title">
                <img
                  :src="recentFavicon"
                  alt=""
                  aria-hidden="true"
                  @error="useFaviconFallback($event, 'recent.design')"
                />
                <h2>Recent</h2>
              </div>
              <p class="site-meta">recent.design</p>
            </a>
          </article>
        </div>
      </section>
    </main>

  </div>
</template>

<script setup lang="ts">
const screenshotUrl = (url: string) => {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "960",
    "viewport.height": "600",
    "viewport.deviceScaleFactor": "1",
    "screenshot.type": "jpeg",
    "screenshot.quality": "65",
  });

  return `https://api.microlink.io/?${params.toString()}`;
};

const claudeScreenshot = screenshotUrl("https://claude.dev/");
const qwenScreenshot = screenshotUrl("https://qwen.ai/research");
const freeEggScreenshot = screenshotUrl("https://freeegg.top/");
const designingWaitScreenshot = screenshotUrl(
  "https://chloemaillot.fr/writing/designing-the-wait",
);
const motionScreenshot = screenshotUrl("https://motion.dev/");
const recentScreenshot = screenshotUrl("https://recent.design/");

const faviconUrl = (url: string) =>
  `https://deck.mcl39.com/favicon?url=${encodeURIComponent(url)}`;

const claudeFavicon = faviconUrl("https://claude.dev/");
const qwenFavicon = faviconUrl("https://qwen.ai/research");
const freeEggFavicon = faviconUrl("https://freeegg.top/");
const designingWaitFavicon = faviconUrl(
  "https://chloemaillot.fr/",
);
const motionFavicon = faviconUrl("https://motion.dev/");
const recentFavicon = faviconUrl("https://recent.design/");

function useFallback(event: Event, fallback: string) {
  const image = event.currentTarget as HTMLImageElement;
  if (image.src.endsWith(fallback)) return;
  image.src = fallback;
}

function useFaviconFallback(event: Event, domain: string) {
  const image = event.currentTarget as HTMLImageElement;
  const fallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  if (image.src === fallback) {
    image.style.display = "none";
    return;
  }
  image.src = fallback;
}
</script>

<style scoped lang="scss">
.collection-page {
  --ink: #050505;
  --paper: #fff;
  min-height: 100vh;
  color: var(--ink);
  background: var(--paper);
  font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}

.collection-nav {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 32px;
}

.collection-main {
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  padding: 82px 0 120px;
}

.collection-main h1 {
  margin: 0 0 52px;
  font-size: clamp(26px, 2.5vw, 34px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

.collection-section + .collection-section {
  margin-top: 104px;
}

.site-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 320px));
  gap: 24px;
}

.site-card {
  min-width: 0;

  a {
    display: block;
    color: var(--ink);
    text-decoration: none;
  }

  h2 {
    margin: 0;
    font-size: clamp(20px, 2vw, 25px);
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.035em;
  }
}

.site-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  img {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
    object-fit: contain;
  }
}

.site-meta {
  margin: 22px 0 0;
  color: #777;
  font-size: 16px;
  line-height: 1.4;
}

.site-cover {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center top;
  border-radius: 8px;
  transition: transform 260ms ease, opacity 260ms ease;
}

.site-cover--claude {
  object-position: left top;
}

.site-card a:hover .site-cover {
  opacity: 0.9;
  transform: scale(0.99);
}

@media (max-width: 720px) {
  .collection-nav {
    height: 66px;
    padding: 0 18px;
  }

  .collection-main {
    width: calc(100% - 36px);
    padding: 58px 0 80px;
  }

  .collection-main h1 {
    margin-bottom: 34px;
    font-size: 28px;
  }

  .collection-section + .collection-section {
    margin-top: 76px;
  }

  .site-grid {
    grid-template-columns: 1fr;
    gap: 58px;
  }

  .site-card {
    max-width: 320px;
  }

  .site-card h2 { font-size: 22px; }
  .site-title { margin-top: 16px; }

  .site-meta {
    margin-top: 14px;
    font-size: 14px;
  }

}

@media (prefers-reduced-motion: reduce) {
  .site-cover { transition: none; }
}
</style>
