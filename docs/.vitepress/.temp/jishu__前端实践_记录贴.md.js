import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"[前端实践]记录贴","description":"","frontmatter":{"catalog":["jishu"],"date":"2025-12-26 08:00:00","type":"Post","slug":"codefe","title":"[前端实践]记录贴","status":"Draft","urlname":"2d3e9dc9-c245-809e-b020-c3445cb33a76","updated":"2025-12-31 22:34:00"},"headers":[],"relativePath":"jishu/[前端实践]记录贴.md","filePath":"jishu/[前端实践]记录贴.md"}');
const _sfc_main = { name: "jishu/[前端实践]记录贴.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><ol><li>CSS原生变量在主题定制方面很常用 用法是<code>--name</code> 定义 <code>var(--name)</code>使用</li><li><code>scoped</code>的本质是为元素加上了<code>data-v-xxxx</code> 这样的属性 元素身上有这个不需要深度选择器没有则需要。深度选择器<strong>告诉 Vue 编译器，这条规则不要加</strong> <strong><code>data-v-xxxx</code></strong> <strong>属性选择器，让它“穿透”进去，影响到子组件</strong></li><li>ts定义类型可以提取出来放在一个文件 <code>d.ts</code>并且vue组件也可以用<code>d.ts</code>去单独定义 这样在传<code>props</code>给组件也能获得代码提示 称之为组件类型</li><li>用嵌套路由做公共<code>layout</code> ，需要多级<code>router-view</code></li><li><code>type pickPerson = Pick&lt;Person,&#39;age&#39;&gt;</code> 从原类型对象中选取需要的，<code>Pick</code>换成<code>Omit</code>就是排除掉参数后的新类型对象，<code>&amp;</code>用于再合并。一种ts类型复用的方法</li><li><code>user.a?.b</code> 可选链意味着a存在再去找b 如果不存在直接上一层停止</li><li>最近写vue项目的时候，解构一直是习惯丢响应式，没想到已经支持响应式解构了<code>（vue3.5+）</code>，给要是老点的村通网的AI都识别不出这个新特性。from:<a href="https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props" target="_blank" rel="noreferrer">https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props</a></li><li>在 3.4 及更低版本，响应式 Props 解构不会被默认启用。另一种选择是使用 <code>withDefaults</code> 编译器宏</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("jishu/[前端实践]记录贴.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _________ as default
};
