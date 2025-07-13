<template>
    <div class="timeline">
      <div v-for="item in timelineData" :key="item.id" class="timeline-item">
        <div class="timeline-date">{{ formatDate(item.frontmatter?.date) || "No Date" }}</div>
        <div class="timeline-content">
            <p>{{ item.content || "No Content" }}</p>
        </div>
      </div>
      <div v-if="!timelineData.length">没有加载到时间线数据，请检查控制台输出。</div>
    </div>
    </template>

<script>
export default {
  setup() {
    // 加载 Markdown 文件
    const timelineModules = import.meta.glob("/timeline/*.md", { eager: true, as: "raw" });

    // 打印原始模块数据
    console.log("Timeline Modules:", timelineModules);

    // 处理模块
    let timelineData = Object.keys(timelineModules).map((filePath) => { // 注意这里使用 let，因为后面要重新赋值
      const module = timelineModules[filePath];
      console.log("File Path:", filePath);
      console.log("Module:", module);

      // 解析 frontmatter 和正文
      let frontmatter = {};
      let content = "No Content";
      try {
        if (typeof module === "string") {
          // 分离 frontmatter 和正文
          const match = module.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
          if (match) {
            const yaml = match[1];
            content = match[2].trim();
            // 简单解析 YAML
            frontmatter = yaml.split("\n").reduce((acc, line) => {
              const [key, value] = line.split(": ").map((s) => s.trim());
              if (key && value) acc[key] = value;
              return acc;
            }, {});
          } else {
            content = module.trim();
          }
        } else if (module.frontmatter) {
          frontmatter = module.frontmatter;
          content = module.default?.render ? "Vue Component" : module.default || "No Content";
        }
      } catch (error) {
        console.error("Error parsing file", filePath, error);
      }

      console.log("Parsed Frontmatter:", frontmatter);
      console.log("Parsed Content:", content);

      return {
        frontmatter,
        content,
        id: frontmatter.title || filePath || "unknown",
        filePath,
      };
    }).filter((item) => item.frontmatter.title); // 保留有 title 的项

    // ⭐ 新增：按日期排序 timelineData
    timelineData.sort((a, b) => {
      const dateA = a.frontmatter && a.frontmatter.date ? new Date(a.frontmatter.date.replace(/'/g, '')) : new Date(0); // 处理日期不存在或格式错误的情况
      const dateB = b.frontmatter && b.frontmatter.date ? new Date(b.frontmatter.date.replace(/'/g, '')) : new Date(0); // 如果日期不存在，视为很早的日期

      // 默认按升序排序 (从早到晚)。如果需要降序 (从新到旧)，则改为 dateB - dateA
      return dateA - dateB;
    });

    // 打印最终数据
    console.log("Timeline Data (Sorted):", timelineData);

    return {
      timelineData,
    };
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return null;
      try {
        const date = new Date(dateStr.replace(/'/g, "")); // 移除单引号
        if (isNaN(date)) return null;
        return date.toISOString().split("T")[0]; // 返回 YYYY-MM-DD
      } catch (error) {
        console.error("Error formatting date:", dateStr, error);
        return null;
      }
    },
  },
};
</script>
  <style scoped>
  
  .timeline {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .timeline-item {
    display: flex;
    margin-bottom: 20px;
  }
  .timeline-date {
    width: 150px;
    font-weight: bold;
    color: #797171;
  }
  .timeline-content {
    flex: 1;
    padding: 10px 20px;
    
    background: #f3f3f3;
    border-radius: 2px;
  }
  .timeline-content h3 {
    margin: 0 0 10px;
  }
  @media (max-width: 768px) {
    .timeline-item {
      flex-direction: column;
    }
    .timeline-date {
      width: 100%;
      text-align: center;
    }
    .timeline-content {
      margin-top: 10px;
    }
  }

  </style>