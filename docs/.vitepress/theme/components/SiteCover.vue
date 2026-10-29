<template>
  <div
    class="cover-frame"
    :class="{
      'is-loaded': loaded,
      'is-failed': failed,
      'cover-frame--left': position === 'left',
    }"
    :style="entry ? { '--lqip': `url(${entry.lqip})` } : undefined"
  >
    <img
      v-if="entry"
      class="site-cover"
      :src="entry.cover"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      @load="loaded = true"
      @error="failed = true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import covers from "../../data/site-covers.json";

const props = withDefaults(
  defineProps<{
    slug: string;
    alt: string;
    position?: "center" | "left";
    eager?: boolean;
  }>(),
  { position: "center", eager: false },
);

const entry = computed(() => covers[props.slug as keyof typeof covers]);
const loaded = ref(false);
const failed = ref(false);
</script>

<style scoped lang="scss">
.cover-frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1200 / 630;
  border-radius: 8px;
  background: #f2f2f2;
  transition: transform 260ms ease, opacity 260ms ease;
}

/* 加载期间显示模糊的 24px 占位图，加载完成后被封面完全盖住 */
.cover-frame::before {
  content: "";
  position: absolute;
  inset: -12px;
  background: var(--lqip) center top / cover no-repeat;
  filter: blur(14px);
  transform: scale(1.05);
  pointer-events: none;
}

.site-cover {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  opacity: 0;
  transition: opacity 320ms ease;
}

.cover-frame--left .site-cover {
  object-position: left top;
}

.is-loaded .site-cover {
  opacity: 1;
}

.is-failed .site-cover {
  visibility: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .cover-frame,
  .site-cover {
    transition: none;
  }
}
</style>
