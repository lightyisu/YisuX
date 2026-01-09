import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"HTML | Opera浏览器关闭代理不能上网的问题","description":"","frontmatter":{"catalog":["jishu"],"date":"2023-08-16 08:00:00","type":"Post","slug":"opera_1","title":"HTML | Opera浏览器关闭代理不能上网的问题","status":"已发布","urlname":"041350c8-c2c1-4805-8389-e426d0bcda1b","updated":"2025-10-04 11:43:00"},"headers":[],"relativePath":"jishu/HTML ! Opera浏览器关闭代理不能上网的问题.md","filePath":"jishu/HTML ! Opera浏览器关闭代理不能上网的问题.md"}');
const _sfc_main = { name: "jishu/HTML ! Opera浏览器关闭代理不能上网的问题.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>今天下载了Opera浏览器 ，发现界面确实让我很喜欢。于是我就使用，发现速度还行，基本和我现在用的 CentBrowser 差不多。但是也出现了不少问题。</p><p><a href="https://www.opera.com/zh-cn" target="_blank" rel="noreferrer">Opera官网</a></p><p>经常出现不能上网，突然显示不能连接的问题。</p><p>捣鼓发现其实发生在关闭代理之后，总会有这种情况。</p><p>搜索后，觉得是DNS出问题了，Edge浏览器也会出现这个问题，显示DNS错误。于是，搜到一个解决方案：</p><p>使用腾讯DNS可以解决：</p><p>1.打开 Opera 浏览器的设置，搜索DNS</p><p><img src="https://main.qcloudimg.com/raw/b977613fade7cf3d3a0d8277131a1cdd.png" alt="b977613fade7cf3d3a0d8277131a1cdd.png" loading="lazy"></p><p>2.将其改为腾讯DNS:</p><p><a href="https://docs.dnspod.cn/public-dns/opera-public-dns/#:~:text=%E6%9C%AC%E6%96%87%E6%A1%A3%E6%8C%87%E5%AF%BC%E6%82%A8%E5%A6%82%E4%BD%95%E5%9C%A8%20Opera%20%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E6%8E%A5%E5%85%A5%20Public%20DNS%20%E3%80%82%20%E6%93%8D%E4%BD%9C%E6%8C%87%E5%8D%97%20%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4,%E5%9C%A8%20Opera%20%E6%B5%8F%E8%A7%88%E5%99%A8%E5%9C%B0%E5%9D%80%E6%A0%8F%E4%B8%AD%EF%BC%8C%E8%BE%93%E5%85%A5%20opera%3A%2F%2Fsettings%20%E5%B9%B6%E5%9B%9E%E8%BD%A6%2C%E8%BF%9B%E5%85%A5%E5%B8%B8%E8%A7%84%E8%AE%BE%E7%BD%AE%E9%A1%B5%E9%9D%A2%E3%80%82%20%E5%B9%B6%E5%9C%A8%E6%90%9C%E7%B4%A2%E6%A1%86%E4%B8%AD%E8%BE%93%E5%85%A5%20DNS-over-HTTPS%20%E8%BF%9B%E8%A1%8C%E6%9F%A5%E6%89%BE%E3%80%82" target="_blank" rel="noreferrer">Opera浏览器接入腾讯DNS</a></p><p>3.可以愉快上网了，Edge应该是同理，猜测他俩特殊在都是用了内置的安全DNS系统？</p><p>4.腾讯云的Public DNS 基础服务请填入 <code>https://doh.pub/dns-query</code>。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("jishu/HTML ! Opera浏览器关闭代理不能上网的问题.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HTML___Opera______________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  HTML___Opera______________ as default
};
