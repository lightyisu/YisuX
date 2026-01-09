import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"2025日常感慨","description":"","frontmatter":{"catalog":[],"date":"2025-09-21 00:39:00","type":"","slug":"","title":"2025日常感慨","status":"","urlname":"274e9dc9-c245-804b-807a-d088bce61810","updated":"2025-09-21 00:53:00"},"headers":[],"relativePath":"2025日常感慨.md","filePath":"2025日常感慨.md"}');
const _sfc_main = { name: "2025日常感慨.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>*实在无聊，但又没有地方可以记录，便又开一个板块记录心境。心境也是有趣的，记录和回头看也是打发时间的方式。</p><p>2025.9</p><p>最近发现自己变成了一个做任何事情都不主动的人。不主动提前做事，不主动联系别人，不主动麻烦别人，甚至不主动做该做的事儿…这样的不主动的行为太多了。很多时候不想去麻烦别人给别人带来烦恼，心里总是过意不去。</p><p>不过细想，也不是最近发现的，感觉是慢慢养的习惯。只要是能不做的我好像都不做，能做的我好像都是最小化程度的去做。上完大学后好像就变成这样的人了，鉴于我懒得改变所以我有点难以去变成主动的人了。我好像有点被这种习惯（也许是弱点）所困惑，但是我好像又有点享受了些许好处。哇，往深了想总是越来越困惑。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("2025日常感慨.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _2025____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _2025____ as default
};
