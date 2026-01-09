import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"emby与mac","description":"","frontmatter":{"catalog":["2025"],"date":"2025-06-13 08:00:00","type":"Post","slug":"emby","title":"emby与mac","status":"已发布","urlname":"211e9dc9-c245-808c-a758-f13ea3af5697","updated":"2025-06-13 20:18:00"},"headers":[],"relativePath":"2025/emby与mac.md","filePath":"2025/emby与mac.md"}');
const _sfc_main = { name: "2025/emby与mac.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="emby与mac" tabindex="-1">Emby与mac <a class="header-anchor" href="#emby与mac" aria-label="Permalink to &quot;Emby与mac&quot;">​</a></h1><p>很早之前就听说NAS搭建一个影视库的各种文章，但是看起来就很复杂懒得弄那么麻烦的事情。</p><p>上周无意间看到Emby影视数据库的事，无意间勾起来我的好奇心。之前用过plex还有一些相关的东西，但是觉得得自己下电影还得维护哪有那么多的空间呢。但是这次我发现有很多提供这种在线影视库的服务。</p><p>简而言之，emby就是一个构建影视数据库的系统，具有这样的功能-能够记录播放记录，刮削电影信息，跳过片头，存储影片建立索引等等。卖家首先在自己的服务器部署emby服务端，自己收集电影剧集然后对外暴露接口和用户账号就可以。如果单纯是自己建立一个家庭影音库，那自己其实即是生产者也是消费者，需要扮演卖家角色去自己部署服务端购买一些存储设备。</p><p>当我发现我现在不需要任何设备不用买所谓的NAS就能流媒体播放视频后，我发现这太好了。连下载的时间都省了就能够看4K hdr视频。</p><p>刚好我用的机场还免费提供emby服务这下连去别人那里购买一个月（看起来主流是18-25元左右）的费用都省了。连上机场的emby服务我随便看了下里面的电影都挺全的好像还有更新，质量上大部分都是4k 而且甚至都有杜比视界（杜比视界其实是高阶的hdr 亮度更还原）。</p><p>然后我的播放端需要一个能够连接emby服务的播放器，这里我是安卓手机我看了下vidhub就很好可以免费使用。然而windows端的话基本没有能用的，界面都不太美观。幸好家里还有个吃灰的macmini这下起码能发挥点作用了，感觉之后mac mini可以成为我的电视盒子了。macos上的播放端软件就很多，infuse,vidhub等等。我先试用了infuse，感觉infuse还行，有时候操作有点反逻辑，但是播放起来感觉效果很不错。我拿我最喜欢的 疾速追杀4 试了一下，疾速追杀4的色彩和音乐是我觉得目前看过电影的最强的天花板，infuse 视角下颜色色彩非常还原和真实，好的片源甚至音量就天生很大很足，这挺好的，有那种感觉了。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("2025/emby与mac.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const emby_mac = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  emby_mac as default
};
