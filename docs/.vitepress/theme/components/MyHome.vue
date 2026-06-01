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
      <div class="card-item article-card">
        <n-card title="article 最新文章">
          <h2><<{{ latestPost?.title || "暂无最新文章" }}>></h2>
          <h2>
            <span style="color: var(--naver-green)">{{
              latestPost?.date || "---"
            }}</span>
        
          </h2>
          <div class="update-info">
            <img
              src="/update.png"
              alt="update"
              style="width: 30px"
            />距今已更新/发布 {{ daysDiff }}天
          </div>
      
        </n-card>
      </div>
      <div class="card-item music-card-container">
        <n-card
   
          title="music play"
          class="music-card"
          :header-style="{ padding: '12px 16px', fontSize: '18px', fontWeight: 'bold' }"
        >
          <div class="music-info">
            <n-image
              :src="track_info.cover_url"
              alt="music cover"
              style="
                width: 50px;
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
        <n-card 
          style="width: auto" 
          class="music-bg-info"
          @click="togglePlay"
        >
          <div class="music-info-inner">
            <img
              src="/icons8-apple-music-48.png"
              alt="apple music"
              style="width: 18px"
            />
          </div>
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

// 切换播放状态
const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

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
  min-height: 100%;
  font-family: "pixelfont", sans-serif;
  padding: 20px;
  overflow-x: hidden;
  
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
    width: calc(100% - 40px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    grid-auto-rows: 200px;
    gap: 40px;
    .card-item {
      min-width: 260px;
    
      .n-card {
        height: 100%;
      }
    }
    h2 {
      font-size: 20px;
      line-height: 1.2;
    }
    .n-card {
      border-radius: 10px;
    }
    .update-info {
     
      line-height: 1.2;
      display: flex;
      font-weight: bold;
      gap: 4px;
      align-items: center;
    }

    .music-info {

      align-items: center;
      gap: 20px;
      .lyrics {
        
        max-height: 100px;
        overflow: hidden;
      }
    }
  }
}
.music-card-container {
  position: relative;
  .music-card {
    z-index: 2;
    height: 100%;
    
    :deep(.n-card__content) {
      display: flex;
      flex-direction: column;
      height: 100%;
      .music-info {
        position: relative;
        top: -10px;
        flex: 1;
      }
    }
  }
  .music-bg-info {
    height: 22px !important;
    width: auto !important;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateX(100%) scale(1.05);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
      transform: translateX(100%) scale(0.98);
    }
    
    :deep(.n-card__content) {
      padding: 0px 16px;
      display: flex;
    }
    .music-info-inner {
      display: flex;
      align-items: center;
    }

    background-color: rgb(17, 17, 17);
    color: #fff;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(100%);
    z-index: 3;
    border:1px solid rgb(214, 210, 210);
    border-radius: 999px;
    backdrop-filter: blur(10px);
  
  }
}

.home-wrapper {
  width: 100%;
  padding: 20px;
  border-radius: 20px;

  h1 {
    font-size: 52px;
    line-height: 1.2;
    margin: 8px 0;
    color: var(--naver-green);
  }
  .home-content {
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    height: 25vh;
  }
  .fav-list {
    display: flex;
  
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

@media (max-width: 960px) {
  .home-container .home-card {
    grid-template-columns: 1fr;
  }
}
</style>
