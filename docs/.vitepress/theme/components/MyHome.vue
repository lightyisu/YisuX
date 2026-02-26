<template>
  <div class="home-container">
    <div class="home-wrapper">
      <div class="home-content">
        <h1>
          <span class="loop-text"> Every Story Needs a BLog !</span
          ><span class="cursor">|</span>
        </h1>

        <h1>NOW IS {{ formatted }}:)</h1>

        <div class="fav-list">
          <n-tag
            :bordered="false"
            type="success"
            v-for="item in favlist"
            :key="item"
          >
            {{ item }}
          </n-tag>
        </div>
      </div>
    </div>
    <div class="home-card">
      <div class="home-card-content">
        <n-card header-style="font-size: 30px" title="article 最新文章">
          <h2><<{{ latestPost?.title || "暂无最新文章" }}>></h2>
          <h2>
            <span style="color: var(--naver-green)">{{
              latestPost?.date || "---"
            }}</span>
            发布了新文章
          </h2>
          <div class="update-info">
            <img
              src="/update.png"
              alt="update"
              style="width: 30px"
            />距今已更新/发布 {{ daysDiff }}天
          </div>
          <div style="margin: 20px 0">
            <n-button>查看详情</n-button>
          </div>
        </n-card>
      </div>
      <div class="sub-card">
        <div class="music-card-container">
          <n-card
            header-style="font-size: 30px;"
            title="music play"
            class="music-card"
          >
            <div class="music-info">
              <n-image
                :src="track_info.cover_url"
                alt="music cover"
                style="
                  width: 100px;
                  border-radius: 4px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                "
              />
              <div class="lyrics">
                <p>{{ track_info.artist_name }} - {{ track_info.title }}</p>

                <MusicControl
                  :track_preview_url="track_info.preview_track_url"
                  v-model="isPlaying"
                />
              </div>
            </div>
          </n-card>
          <n-card style="width: 100%" class="music-bg-info">
            <div class="music-info-inner">
              <span>Track From Apple Music</span>
              <img
                src="/icons8-apple-music-48.png"
                alt="apple music"
                style="width: 30px"
              />
            </div>
          </n-card>
        </div>
        <StatusCard :latestPost="latestPost" />
        <SourceCard />
        <n-card title="DEMO Collection">
          <a href="https://demo.yisux.com" target="_blank">
               <n-button>demo.yisux.com</n-button>
          </a>
       
        </n-card>
      </div>
    </div>

    <div ref="lottieEl" class="lottie-btn" />
  </div>
</template>
<script setup lang="ts">
import { NTag, NButton, NImage } from "naive-ui";
import { onMounted, ref, watch, computed } from "vue";
import MusicControl from "../components/MusicControl.vue";
import { useTypeLoop } from "../composables/useTypeLoop";
import { useMusicData } from "../composables/useMusicData";
import { useLottieAnimation } from "../composables/useLottieAnimation";
import StatusCard from "../components/StatusCard.vue";
import SourceCard from "../components/SourceCard.vue";

import { useDaysDiff } from "../composables/useDayDiff";
import { data as posts } from "../utils/posts.data.mts";
// 静态数据
const favlist = ref([
  "F1 FAN",
  "KPOP FAN",
  "LESSERAFIN FAN",
  "2026",
  "YisuX2.0",
]);

// 播放状态
const isPlaying = ref(false);
const date = new Date();
const formatted = date
  .toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/-/g, "/");
// 使用组合式函数
const { initTypeLoop } = useTypeLoop();
const { track_info, getRandomTrack } = useMusicData();
const { lottieEl, loadAnimation, toggleAnimation } = useLottieAnimation();
// 监听播放状态变化
watch(isPlaying, (newval) => {
  toggleAnimation(newval);
});
const latestPost = computed(() => {
  return posts.length > 0 ? posts[0] : null;
});
const daysDiff = useDaysDiff(latestPost.value?.date || "");
// 页面挂载时执行初始化操作
onMounted(() => {
  // 初始化打字效果
  initTypeLoop();

  // 获取随机音乐数据
  getRandomTrack();

  // 加载 Lottie 动画
  if (lottieEl.value) {
    loadAnimation(
      lottieEl.value,
      new URL("/player music.json", import.meta.url).href
    );
  }
});
</script>
<style scoped lang="scss">
.home-container {
  width: 100%;
  font-family: "pixelfont", sans-serif;
  background-color: var(--gray-background);
  border-radius: 20px;
  .n-image {
    flex-shrink: 0; /* 强制不允许缩小，保持 100px */
  }
  .lottie-btn {
    width: 52px;
    height: 52px;
    cursor: pointer;
    position: fixed;
    bottom: 20px;
  }
  .home-card {
    margin-bottom: 140px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .home-card-content {
      width: 1200px;
    }
    h2 {
      font-size: 30px;
      line-height: 1.2;
    }
    .n-card {
      margin: 20px 0;

      min-width: 400px;
      border-radius: 10px;
    }
    .update-info {
      font-size: 20px;
      line-height: 1.2;
      display: flex;
      font-weight: bold;
      gap: 4px;
      align-items: center;
    }

    .music-info {
      display: flex;

      align-items: center;
      gap: 20px;
      .lyrics {
        flex-grow: 1;
        max-height: 200px;
        overflow: hidden;
      }
    }
    .sub-card {
      display: flex;
      width: 1200px;
      margin: 20px 0;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
}
.music-card-container {
  position: relative;
  max-width: 400px;
  .music-card {
    z-index: 2;
  }
  .music-bg-info {
    :deep(.n-card__content) {
      padding-top: 6px;
    }
    .music-info-inner {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    background: rgb(32, 32, 32);
    color: #fff;
    position: absolute;
    top: -4%;
    z-index: 1;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.home-wrapper {
  width: 100%;
  padding: 20px;
  border-radius: 20px;

  h1 {
    font-size: 80px;
    line-height: 1.2;
    color: var(--naver-green);
  }
  .home-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 70vh;
  }
  .fav-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
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
}
</style>
