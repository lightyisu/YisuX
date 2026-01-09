// .vitepress/theme/apiData.data.js
//from https://vitepress.dev/zh/guide/data-loading
//powered by Apple Music API
export default {
  async load() {
    const resp = await fetch(
      "https://itunes.apple.com/search?term=lesserafim&entity=song&attribute=artistTerm&limit=20"
    );
    const json = await resp.json();
    return {
      serverTime: new Date().toLocaleString(),
      list: json.results,
    };
  },
};
interface musicApiItem {
  artistName: string;
  trackName: string;
  trackPreviewUrl: string;
  collectionName: string;
  trackTimeMillis: number;
  artworkUrl100: string;
  trackNumber: string;
  previewUrl: string;
}
export interface MusicData {
  serverTime: string;
  list: musicApiItem[];
}
// 1. 显式声明给 TS 看
declare const data: MusicData;
export { data };
