import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"个人导航","description":"","frontmatter":{"layout":"doc","sidebar":false,"prev":false,"next":false},"headers":[],"relativePath":"nav2web.md","filePath":"nav2web.md"}');
const _sfc_main = { name: "nav2web.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Nav2web = resolveComponent("Nav2web", true);
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="个人导航" tabindex="-1">个人导航 <a class="header-anchor" href="#个人导航" aria-label="Permalink to &quot;个人导航&quot;">​</a></h1><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3>`);
  _push(ssrRenderComponent(_component_Nav2web, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("nav2web.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const nav2web = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  nav2web as default
};
