<template>
  <div class="info-card-container">
    <n-card
      title="State of YisuX"
      style="height: 90%; border-radius: 10px"
      header-style="font-size: 30px;"
    >
      <n-timeline horizontal size="large">
        <n-timeline-item content="最新记录" />
        <n-timeline-item
          type="success"
          title="更新成功"
          :content="latestPost?.title || '暂无最新文章'"
          :time="latestPost?.date || '---'"
        />

        <n-timeline-item type="info" title="浏览器" content="渲染完成" />
        <n-timeline-item type="error" title="移动端无适配" />
        <n-timeline-item
          type="warning"
          title="计划"
          content="计划修复部分bug&移动端"
        /> </n-timeline
    ></n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard, NTimeline, NTimelineItem } from "naive-ui";
interface Props {
  latestPost: {
    title: string;
    date: string;
  } | null;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.info-card-container {
  flex-grow: 1;
}
</style>
