<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";
defineProps<{
  track_preview_url: string;
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
const rangeRef = ref<HTMLInputElement | null>(null);
const audio = ref<HTMLAudioElement | null>(null);
const playbtn_state = ref("/play.svg");
const music_start_time = ref(0);
const music_end_time = ref(0);
const playmusic = () => {
  if (!audio.value) return;
  if (audio.value.paused) {
    audio.value.volume=0.2
    audio.value.play();
    playbtn_state.value = "/pause.svg";
    emit("update:modelValue", true);
  } else {
    audio.value?.pause();
    playbtn_state.value = "/play.svg";
    emit("update:modelValue", false);
  }
};
function updateProgress() {
  if (audio.value) {
    music_start_time.value = audio.value.currentTime;
    if (audio.value.paused) {
      playbtn_state.value = "/play.svg";
      emit("update:modelValue", false);
    }
  }

  if (rangeRef.value) {
    const range = rangeRef.value;
    const percent = (music_start_time.value / music_end_time.value) * 100 || 0;
    // 将变量挂载在 input 上，确保 CSS 能读取
    range.style.setProperty("--progress", `${percent}%`);
  }
}

// 格式化时间显示 (00:02)
const formatTime = (s: number) => {
  const sec = Math.floor(s % 60);
  return `00:${sec.toString().padStart(2, "0")}`;
};
const updateMusicTime = () => {
  if (!audio.value) return;
  music_start_time.value = audio.value.currentTime;
  music_end_time.value = audio.value.duration;
};
onMounted(() => {
  updateProgress();
});
</script>

<template>
  <div class="music-controls">
    <audio
      ref="audio"
      id="audio"
      @loadedmetadata="updateMusicTime"
      @timeupdate="updateProgress"
      :src="track_preview_url"
    ></audio>

    <div class="progress-container">
      <input
        ref="rangeRef"
        type="range"
        class="progress-bar"
        value="0"
        min="0"
        max="100"
        @input="updateProgress"
      />
      <div class="time-info">
        <span>{{ formatTime(music_start_time) }}</span>
        <span>{{ formatTime(music_end_time) }}</span>
      </div>
      <img
        @click="playmusic"
        :src="playbtn_state"
        style="width: 25px"
        alt="play"
        class="play-btn"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.play-btn {
  transition: transform 0.2s ease;
  cursor: pointer;
}
.play-btn:hover {
  transform: scale(1.1);
}
.progress-bar {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: transparent; /* 关键：让 input 本身透明 */
  cursor: pointer;
  --progress: 30%;

  /* 针对 Webkit 浏览器 (Chrome, Safari, Edge) */
  &::-webkit-slider-runnable-track {
    height: 6px; /* 稍微加粗一点点，更符合 iOS 质感 */
    border-radius: 3px;
    /* 将渐变写在轨道上，而不是 input 上 */
    background: linear-gradient(
      to right,
      #201f1f 0%,
      #555 var(--progress),
      rgba(0, 0, 0, 0.1) var(--progress),
      rgba(0, 0, 0, 0.1) 100%
    );
    transition: height 0.2s ease;
  }

  /* 鼠标悬停时轨道变粗一点 */
  &:hover::-webkit-slider-runnable-track {
    height: 8px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: none;
    border-radius: 50%;
    margin-top: -4px; /* (轨道高度6px / 2) - (滑块高度14px / 2) */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    /* 默认隐藏状态 */
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::-webkit-slider-thumb {
    opacity: 1;
    transform: scale(1);
  }
}

.time-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text";
}
</style>
