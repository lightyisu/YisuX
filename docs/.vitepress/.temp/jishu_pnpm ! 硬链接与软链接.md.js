import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"pnpm | 硬链接与软链接","description":"","frontmatter":{"catalog":["jishu"],"date":"2025-08-27 08:00:00","type":"Post","slug":"pnpm1","title":"pnpm | 硬链接与软链接","status":"已发布","urlname":"25ce9dc9-c245-8072-aab2-ea8df93773da","updated":"2025-09-05 18:28:00"},"headers":[],"relativePath":"jishu/pnpm ! 硬链接与软链接.md","filePath":"jishu/pnpm ! 硬链接与软链接.md"}');
const _sfc_main = { name: "jishu/pnpm ! 硬链接与软链接.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><blockquote><p>Linux 文件系统（ext4 等）里，一个<strong>文件本质上是 inode + 数据块</strong>。</p></blockquote><ul><li><strong>inode</strong>：保存文件的元信息（权限、时间戳、指向的数据块位置等）。</li><li><strong>目录项 (directory entry)</strong>：其实就是 <em>文件名 → inode 号</em> 的映射。</li></ul><h3 id="硬链接-ln" tabindex="-1">硬链接（ln） <a class="header-anchor" href="#硬链接-ln" aria-label="Permalink to &quot;硬链接（ln）&quot;">​</a></h3><p>源文件 f1 创建硬链接 f2 ( ln f1 f2)</p><p>此时 f2 得到了 f1 的 inode信息 数据块始终保持一个</p><p>删除 f1 并不会导致 f2 信息丢失，只有系统中这个inode不再被使用 数据块才会被丢弃e</p><h3 id="软链接-ln-s" tabindex="-1">软链接 (ln -s) <a class="header-anchor" href="#软链接-ln-s" aria-label="Permalink to &quot;软链接 (ln -s)&quot;">​</a></h3><p>只是一个指向路径的特殊文件；删除“源文件”后，软链接会失效（悬挂链接）</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("jishu/pnpm ! 硬链接与软链接.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pnpm__________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  pnpm__________ as default
};
