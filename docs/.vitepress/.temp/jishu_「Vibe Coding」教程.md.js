import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"「Vibe Coding」教程#","description":"","frontmatter":{"catalog":["jishu"],"date":"2025-12-24 08:00:00","type":"Post","slug":"vibecoding","title":"「Vibe Coding」教程#","status":"Draft","urlname":"2d0e9dc9-c245-800d-aff4-e1670ea8cdac","updated":"2025-12-24 16:43:00"},"headers":[],"relativePath":"jishu/「Vibe Coding」教程.md","filePath":"jishu/「Vibe Coding」教程.md"}');
const _sfc_main = { name: "jishu/「Vibe Coding」教程.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="定义" tabindex="-1">#定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;#定义&quot;">​</a></h2><p>Vibe Coding是由Andre Kaparthy于2025年2月3日在X平台上提出的新型编程方式。</p><h2 id="核心" tabindex="-1">#核心 <a class="header-anchor" href="#核心" aria-label="Permalink to &quot;#核心&quot;">​</a></h2><p>用AI编辑器如cursor等工具 完全不写代码</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("jishu/「Vibe Coding」教程.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _Vibe_Coding___ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _Vibe_Coding___ as default
};
