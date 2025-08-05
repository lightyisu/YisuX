<template>
  <div class="wrapper">
    <div class="headline-container">
      <div class="text" ref="text">The Place built to be Life & Blog</div>
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
</style>
