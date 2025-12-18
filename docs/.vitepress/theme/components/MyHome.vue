<template>
  <div class="wrapper">
    <div class="headline-container">
      <!-- 背景图片 -->
      <div class="hero-bg"></div>

      <!-- 极简句子内容 -->
      <main class="main-content">
        <div class="headline">
          <div class="line-wrapper">
            <span class="animate-text">Every story</span>
          </div>
          <div class="line-wrapper">
            <span class="animate-text" style="animation-delay: 0.1s"
              >needs a</span
            >
          </div>
          <div class="line-wrapper" style="margin-top: -5px">
            <span class="animate-text" style="animation-delay: 0.2s"
              >blog.</span
            >
          </div>
        </div>
      </main>
      <div class="box-container">
        <div id="box" ref="box"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ref, nextTick } from "vue";

const words = ["Life", "FrontEnd", "AnyOther Things"];
const box = ref<HTMLElement | null>(null);
const text = ref<HTMLElement | null>(null);
let index = 0;
const fun = () => {};
const createWordSpan = (word: string) => {
  const wordEl = document.createElement("div");
  wordEl.className = "word";
  wordEl.textContent = word;
  return wordEl;
};
const animateText = () => {
  createWordSpan("Life");
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  width: 100%;

  line-height: normal;
  .headline-container {
    align-items: center;
    vertical-align: center;
    font-weight: bold;
    font-size: 60px;
    position: relative;

    .text {
      display: inline-block;
      transition: transform 0.5s ease; // ✅ 平滑移动
    }

    .box-container {
      position: relative;

      #box {
        position: absolute;
        padding: 10px;
        top: 0;
        left: 0;

        box-sizing: border-box;
        transition: width 0.5s ease; // ✅ 平滑移动
      }
    }
  }
}

.word {
  position: absolute;

  display: flex;
}

.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* 模拟梅奔/高级感背景处理 */
.hero-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url("https://wallpapercave.com/wp/wp12483319.jpg");
  margin: 60px;
  background-size: cover;
  z-index: -1;
  transform: scale(1.1);
  animation: slowZoom 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes slowZoom {
  to {
    transform: scale(1);
  }
}

/* 纯净主体排版：下沉对齐 */
.main-content {
  height: 100vh;
  display: flex;
  align-items: flex-end;
  padding: 0 0 8% 8%;
  margin-right: 1000px;
}
@media screen and (max-width: 1400px) {
  .main-content {
    margin-right: 0;
  }
}

/* 核心标题 */
.headline {
  font-size: clamp(7rem, 10vw, 8.5rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}

.line-wrapper {
  overflow: hidden;
  margin-bottom: 2px;
}

/* 入场动画 + 时间流动渐变 */
.animate-text {
  display: block;
  transform: translateY(110%);
  animation: slideUp 1.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;

  /* 时间流动渐变设置 */
  background: linear-gradient(
    to right,
    #ffffff 20%,
    #ff8700 40%,
    #ff8700 60%,
    #ffffff 80%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: slideUp 1.6s cubic-bezier(0.19, 1, 0.22, 1) forwards,
    flowGradient 5s linear infinite; /* 时间流动的动画 */
}

@keyframes slideUp {
  to {
    transform: translateY(0);
  }
}

@keyframes flowGradient {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: -200% center;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .main-content {
    padding-bottom: 15%;
    padding-left: 6%;
  }
}
</style>
