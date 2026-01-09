import { computed, type Ref } from "vue";
const useDaysDiff = (startDate: string | Date) => {
  const now = new Date();
  return computed(() => {
    const start = new Date(startDate).getTime();
    const current = now.getTime();

    // 1000ms * 60s * 60m * 24h = 86400000 ms/天
    const diff = current - start;

    // 如果日期还没到，返回 0 或者负数，这里用 Math.floor
    return Math.floor(diff / 86400000);
  });
};
export { useDaysDiff };
