import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Others | 区块链相关","description":"","frontmatter":{"catalog":["jishu"],"date":"2025-10-13 08:00:00","type":"Post","slug":"blockchain","title":"Others | 区块链相关","status":"已发布","urlname":"28be9dc9-c245-802a-9356-c3d59739302a","updated":"2025-11-04 16:18:00"},"headers":[],"relativePath":"jishu/Others ! 区块链相关.md","filePath":"jishu/Others ! 区块链相关.md"}');
const _sfc_main = { name: "jishu/Others ! 区块链相关.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>区块链，Web3一直没接触过，感觉没事儿看看解闷也挺好的。</p><h3 id="初理解" tabindex="-1">初理解 <a class="header-anchor" href="#初理解" aria-label="Permalink to &quot;初理解&quot;">​</a></h3><p>区块链就是一个公开账本，在公开账本上添加新交易就产生了链。</p><p>区块链的安全性主要来自<strong>分布式共识 + 加密算法</strong>。</p><p>常见的两种共识机制：</p><p>1.PoW（Proof of Work，工作量证明）</p><p>比特币用的机制</p><p>谁先算出正确答案，就获得记账权，添加新的区块。</p><p>2.PoS（Proof of Stake，权益证明）</p><p>以太坊现在用的机制（以太坊2.0后）</p><p>矿工奖励：</p><p>初疑问：</p><p>1.手续费是自己写的还是怎么确定金额的？</p><p>✅ 手续费是用户自己决定的，但由矿工决定是否接受。</p><p>当在钱包里发起交易（比如用 Bitcoin Wallet、Metamask、或者交易所提币），</p><p>钱包软件会自动估算一个<strong>手续费（Fee）</strong>，比如：</p><blockquote><p>“当前平均确认时间 10 分钟的费率是 20 sat/vByte”</p></blockquote><p>2.如果全世界没有矿工，交易如何继续？</p><p>✅ <strong>不能。比特币网络会停止确认交易。</strong></p><p>没有矿工，就没有人生成新的区块，</p><p>那么所有新交易都会卡在“Pending”状态。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("jishu/Others ! 区块链相关.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Others________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Others________ as default
};
