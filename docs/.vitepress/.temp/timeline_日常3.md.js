import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"日常3","description":"","frontmatter":{},"headers":[],"relativePath":"timeline/日常3.md","filePath":"timeline/日常3.md"}');
const _sfc_main = { name: "timeline/日常3.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="日常3" tabindex="-1">日常3 <a class="header-anchor" href="#日常3" aria-label="Permalink to &quot;日常3&quot;">​</a></h1><p>内容待补充</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("timeline/日常3.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  __3 as default
};
