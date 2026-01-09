<template>
  <div class="footer-container">
    <h2>
      inspired By <span class="naver-design">Naver&Claude Design</span> &
      redesign in 2026 <br />Maybe Every Story Really Needs a Blog
    </h2>
    <div>
      <img src="/logo.png" style="width: 120px" alt="logo" />
      <p style="font-size: 16px; font-weight: bold">
        @YiusX.com<br />
        2020-2026
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer-container {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 40px;
  font-family: "inter", sans-serif;
  .naver-design {
    color: var(--naver-green);
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
