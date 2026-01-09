/** 找工作隐藏日常 */

import { Ref } from "vue";

const useForJob = (shouldHide: Ref<boolean>) => {
  const { hostname, pathname } = window.location;
  shouldHide.value = false;
  // 逻辑：域名匹配 且 路径包含 '介绍页'
  // 提示：decodeURIComponent 用于处理中文路径被编码的情况
  const isSpecificDomain = hostname === "jobs.yisux.com";
  const isIntroPage = decodeURIComponent(pathname).includes("介绍页");
  if (isSpecificDomain && isIntroPage) {
    shouldHide.value = true;
  }
};

export { useForJob };
