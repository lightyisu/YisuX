<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <span>© 2026 YisuX</span>
      <a
        href="https://github.com/lightyisu/yisupower"
        target="_blank"
        rel="noopener noreferrer"
        >GitHub</a
      >
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  --muted: #777777;

  font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}

.site-footer-inner {
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  padding: 28px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--muted);
  font-size: 13px;

  a {
    color: var(--muted);
    text-decoration: none;

    &:hover {
      color: var(--ink);
    }
  }
}

@media (max-width: 720px) {
  .site-footer-inner {
    width: calc(100% - 36px);
  }
}
</style>
