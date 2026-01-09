import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"HTML | web调试方法","description":"","frontmatter":{"catalog":["jishu"],"date":"2025-08-11 08:00:00","type":"Post","slug":"tiaoshi","title":"HTML | web调试方法","status":"已发布","urlname":"24ce9dc9-c245-809e-b930-e13b64a9c9ee","updated":"2025-10-04 11:42:00"},"headers":[],"relativePath":"jishu/HTML ! web调试方法.md","filePath":"jishu/HTML ! web调试方法.md"}');
const _sfc_main = { name: "jishu/HTML ! web调试方法.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h3 id="_1-当元素不能直接点击审查时候的调试" tabindex="-1">1.当元素不能直接点击审查时候的调试 <a class="header-anchor" href="#_1-当元素不能直接点击审查时候的调试" aria-label="Permalink to &quot;1.当元素不能直接点击审查时候的调试&quot;">​</a></h3><p>情景：最近复现Grok的ui界面发现下面的选择模式按钮点击会弹出一个选项菜单。这个菜单是类似一种悬浮的元素，总是点击不上没法直接在F12触发审查元素。</p><p>方法：</p><p>1.使用F8进行断点暂停/使用F12里的源代码面板对整个页面的Click事件做断点监听</p><p>→可以暂时的让菜单显示出来不掉，但是仍然没有办法选中元素进行审查</p><p>2.使用快捷键 Ctrl+Shift+C（选择元素）自由选择元素这样可以在最后的末尾找到元素的结果。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("jishu/HTML ! web调试方法.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HTML___web____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  HTML___web____ as default
};
