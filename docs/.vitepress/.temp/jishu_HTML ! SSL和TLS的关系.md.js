import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"HTML | SSL和TLS的关系","description":"","frontmatter":{"catalog":["jishu"],"date":"2023-08-23 08:00:00","type":"Post","slug":"relofTLSandSSL","title":"HTML | SSL和TLS的关系","status":"已发布","urlname":"77da3939-fdb4-465f-9abb-c8ef1b8779f3","updated":"2025-10-04 11:43:00"},"headers":[],"relativePath":"jishu/HTML ! SSL和TLS的关系.md","filePath":"jishu/HTML ! SSL和TLS的关系.md"}');
const _sfc_main = { name: "jishu/HTML ! SSL和TLS的关系.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h3 id="引言" tabindex="-1">引言： <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言：&quot;">​</a></h3><p>一直认为SSL就是HTTPS的证书的意思，TLS是某个协议，其中的差别挺大的。其实不然，这是个错误误区。</p><h3 id="定义" tabindex="-1">定义： <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义：&quot;">​</a></h3><p>SSL:（<em>Secure Sockets Layer</em>）传输层安全性协议</p><p>TLS: (<em>Transport Layer Security</em>）安全套接层</p><p>关系：SSL是TLS的前身</p><p>SSL 1.0：因存在严重的安全漏洞，从未公开过</p><p>SSL 2.0：1995年，已于2011年弃用（参考<a href="https://link.juejin.cn/?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc6176" target="_blank" rel="noreferrer">RFC_6176</a>）。</p><p>SSL 3.0：1996年，已于2015年弃用（参考<a href="https://link.juejin.cn/?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc7568" target="_blank" rel="noreferrer">RFC_7568</a>）</p><p>TLS 1.0：1999年，参考<a href="https://link.juejin.cn/?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc2246" target="_blank" rel="noreferrer">RFC_2246</a></p><p>TLS 1.1：2006年，参考<a href="https://link.juejin.cn/?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc4346" target="_blank" rel="noreferrer">RFC_4346</a></p><p>TLS 1.2：2008年，参考<a href="https://link.juejin.cn/?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc5246" target="_blank" rel="noreferrer">RFC_5246</a></p><p>TLS 1.3：2018年，参考<a href="https://link.juejin.cn/?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc8446" target="_blank" rel="noreferrer">RFC_8446</a></p><p><a href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87b802a56645468fb6422fe3275d84c6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" target="_blank" rel="noreferrer">embed</a></p><h3 id="解释" tabindex="-1">解释 <a class="header-anchor" href="#解释" aria-label="Permalink to &quot;解释&quot;">​</a></h3><p>SSL和TLS之间存在密切的关系。它们都是用于在两个通信应用程序之间提供保密性和数据完整性的协议。</p><p>TLS协议是SSL协议的后续版本，它们的主要区别在于所支持的加密算法和证书验证级别。TLS协议通常被认为是更安全的协议，因为它要求更高的验证级别，而SSL协议可能存在一些安全漏洞。</p><p>在TLS协议中，记录协议（Record Protocol）负责将应用层的数据进行加密和压缩，然后将其传递给传输层进行传输。握手协议（Handshake Protocol）则负责在客户端和服务器之间建立安全连接，其中包括密钥交换和身份验证等步骤。</p><p>在SSL协议中，同样分为记录协议和握手协议。SSL记录协议（SSL Record Protocol）与TLS记录协议类似，它也负责将应用层的数据进行加密和压缩，然后传递给传输层进行传输。而SSL握手协议（SSL Handshake Protocol）也负责在客户端和服务器之间建立安全连接，但它与TLS握手协议略有不同。</p><p>在版本方面，TLS协议的版本包括TLS 1.0、TLS 1.1和TLS 1.2。而SSL协议的版本包括SSL 2.0、SSL 3.0、TLS 1.0、TLS 1.1和TLS 1.2。其中，TLS 1.0实际上是基于SSL 3.0开发的，因此可以说SSL 3.0是TLS 1.0的前身。</p><p>总的来说，SSL和TLS是密切相关的协议，它们都用于提供安全的数据传输服务。虽然SSL仍然被广泛使用，但TLS被认为是更安全和更现代的协议。</p><p>以后若见到SSL和TLS混用时候 基本可以认为是一个东西。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("jishu/HTML ! SSL和TLS的关系.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HTML___SSL_TLS___ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  HTML___SSL_TLS___ as default
};
