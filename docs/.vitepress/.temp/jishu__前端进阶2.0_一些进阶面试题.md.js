import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"[前端进阶2.0]一些进阶面试题","description":"","frontmatter":{"catalog":["jishu"],"date":"2025-12-10 08:00:00","type":"Post","slug":"mianshi2","title":"[前端进阶2.0]一些进阶面试题","status":"已发布","urlname":"2c5e9dc9-c245-8031-874a-e60b6a70ae7a","updated":"2025-12-31 22:26:00"},"headers":[],"relativePath":"jishu/[前端进阶2.0]一些进阶面试题.md","filePath":"jishu/[前端进阶2.0]一些进阶面试题.md"}');
const _sfc_main = { name: "jishu/[前端进阶2.0]一些进阶面试题.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="前端路由模式" tabindex="-1">前端路由模式 <a class="header-anchor" href="#前端路由模式" aria-label="Permalink to &quot;前端路由模式&quot;">​</a></h2><p>对于前端路由来说，路由的映射函数通常是进行一些 <code>DOM</code> 的显示和隐藏操作。这样，当访问不同的路径的时候，会显示不同的页面组件。前端路由主要有以下两种实现方案：</p><ul><li><code>Hash</code></li><li><code>History</code></li></ul><p><strong>Hash 模式</strong></p><p>早期的前端路由的实现就是基于 <code>location.hash</code> 来实现的。</p><p>hash原理：直接使用 <code>JavaScript</code>来对 <code>loaction.hash</code> 进行赋值，从而改变 <code>URL</code>，触发 <code>hashchange</code> 事件 <strong>History 模式</strong> 提供了 <code>History API</code> 来实现 <code>URL</code> 的变化。其中做最主要的 <code>API</code> 有以下两个：<code>history.pushState()</code> 和 <code>history.repalceState()</code></p><p>在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录</p><h2 id="前端工程师未来会被ai取代吗" tabindex="-1">前端工程师未来会被ai取代吗 <a class="header-anchor" href="#前端工程师未来会被ai取代吗" aria-label="Permalink to &quot;前端工程师未来会被ai取代吗&quot;">​</a></h2><p>GPT帮整理：</p><p>前端工程师不会被 AI 取代，但「大量低价值前端」一定会消失。</p><h3 id="做懂「工程」的前端" tabindex="-1">做懂「工程」的前端 <a class="header-anchor" href="#做懂「工程」的前端" aria-label="Permalink to &quot;做懂「工程」的前端&quot;">​</a></h3><p>AI 很会写代码，但<strong>极弱于工程决策</strong>：</p><ul><li>项目结构怎么拆？</li><li>状态放哪里？Redux / Zustand / URL / Server？</li><li>组件怎么设计才能复用 3 年？</li><li>怎么避免后期技术债爆炸？</li></ul><p>技术债不是因为代码写得不优雅，而是因为「变化没有被显式建模」</p><p>你以为不会变的东西，最后一定会变。</p><ol><li>把稳定的东西写成灵活 把一定会变的东西写死</li><li>隐式约定太多</li><li>抽象提前 or 抽象错误 用一个组件 cover 10 种场景</li></ol><p>解决方法：</p><ol><li><strong>用「变化轴」而不是「功能」拆模块</strong> 其实就是哪些容易变动放到一块去不容易变动的放一起</li><li><strong>把「不稳定的东西」显式包一层</strong> 立刻包一层，不要直连。</li><li><strong>宁愿“重复一点”，也不要“错误抽象”</strong> 其实是组件复用性的坏处 因为复用多处等于改多处</li><li><strong>状态来源不清晰</strong></li><li><strong>每个模块必须有「逃生通道」</strong> 会被替换的可能性</li></ol><h3 id="懂「业务-产品」的前端" tabindex="-1">懂「业务 &amp; 产品」的前端 <a class="header-anchor" href="#懂「业务-产品」的前端" aria-label="Permalink to &quot;懂「业务 &amp; 产品」的前端&quot;">​</a></h3><ul><li>这个交互是不是用户真的需要？</li><li>这个 loading 会不会让用户焦虑？</li><li>为什么这里要“慢一点反而更好”？</li></ul><h3 id="高级前端-前端架构师" tabindex="-1">高级前端 / 前端架构师 <a class="header-anchor" href="#高级前端-前端架构师" aria-label="Permalink to &quot;高级前端 / 前端架构师&quot;">​</a></h3><ul><li>微前端 / Monorepo</li><li>SSR / RSC / Edge</li><li>性能优化（LCP、CLS、INP）</li><li>跨端（Web + RN + Electron + 小程序）</li><li>可视化 / 编辑器 / 图形系统</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("jishu/[前端进阶2.0]一些进阶面试题.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _____2_0________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _____2_0________ as default
};
