<template>
 <Layout>
    <template #home-hero-info-after>
        <div class="video-background">
        <video autoplay muted loop playsinline>
            <source src="/bgvideo.mp4">
          
            您的浏览器不支持视频标签。
        </video>
    </div>

    </template>
  </Layout>

</template>
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

</script>
<style>

</style>