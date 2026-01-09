import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"日常1","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/日常1.md","filePath":"timeline/日常1.md"}');
const _sfc_main = { name: "timeline/日常1.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="日常1" tabindex="-1">日常1 <a class="header-anchor" href="#日常1" aria-label="Permalink to &quot;日常1&quot;">​</a></h1><p>内容待补充</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("timeline/日常1.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  __1 as default
};
