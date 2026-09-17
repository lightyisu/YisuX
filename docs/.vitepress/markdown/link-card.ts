// 把「整段只有一个裸链接」的段落渲染成网页名片。
// 元数据来自 scripts/link-meta.mjs 的采集缓存，缺失该缓存时本插件完全不生效。

const norm = (u) =>
  String(u)
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '')

const esc = (s) =>
  String(s ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )

const hostOf = (u) => {
  try {
    return new URL(u).hostname
  } catch {
    return ''
  }
}

const pathOf = (u) => {
  try {
    const { pathname, search } = new URL(u)
    const p = `${pathname}${search}`
    return p === '/' ? '' : p
  } catch {
    return ''
  }
}

// 段落里只有一个链接、且链接文字就是该 URL 本身时才算裸链接
function parseBareLink(children) {
  if (children.some((t) => t.type === 'image')) return null

  const opens = children.filter((t) => t.type === 'link_open')
  if (opens.length !== 1) return null
  const oi = children.indexOf(opens[0])
  const ci = children.findIndex((t) => t.type === 'link_close')
  if (ci < oi) return null

  const href = opens[0].attrGet('href')
  if (!href || !/^https?:\/\//i.test(href)) return null

  const inner = children.slice(oi + 1, ci)
  const text = inner
    .filter((t) => t.type === 'text')
    .map((t) => t.content)
    .join('')
  const bare = !text.trim() || norm(text) === norm(href)
  if (!bare) return null

  const outside = [...children.slice(0, oi), ...children.slice(ci + 1)]
  if (outside.some((t) => t.type !== 'text')) return null
  const label = outside
    .map((t) => t.content)
    .join('')
    .replace(/[|｜]/g, ' ')
    .replace(/^(?:\s*[|｜]\s*)+|\s*[|｜:：-]+\s*$/g, '')
    .trim()
  if (label.length > 24) return null // 长句属于正文，不拆成卡片

  return { href, label }
}

function render(href, m, label) {
  const host = m.hostname || hostOf(href)
  const site = m.publisher || host
  const raw = String(m.title ?? '').trim()
  // 目标站被反爬时 microlink 会把查询串当标题，退回域名 + 路径
  const usable = !!raw && !/^[/?#.\s]/.test(raw)
  const title = usable ? raw : host.replace(/^www\./i, '') || href
  const path = !m.ok || !usable ? pathOf(href) : ''
  const dupSite = !usable || title === site || title === host
  const siteLine = m.favicon || path || !dupSite ? `
        <div class="vlc-site">
          ${m.favicon ? `<img class="vlc-fav" src="${esc(m.favicon)}" alt="" aria-hidden="true">` : ''}
          ${dupSite ? '' : `<span class="vlc-site-name">${esc(site)}</span>`}
          ${path ? `<span class="vlc-path">${esc(path)}</span>` : ''}
        </div>` : ''
  const cls = ['vp-link-card', m.cover ? '' : 'is-compact'].join(' ').trim()
  const inner = `
      <div class="vlc-body">${siteLine}
        <div class="vlc-title">${esc(title)}</div>
        ${m.description ? `<div class="vlc-desc">${esc(m.description)}</div>` : ''}
      </div>${m.cover ? `
      <div class="vlc-cover"><img src="${esc(m.cover)}" alt="" loading="lazy" decoding="async"></div>` : ''}`

  return `<div class="${cls}">${label ? `<div class="vlc-label">${esc(label)}</div>` : ''}<a class="vlc" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${inner}
    </a>
  </div>`
}

export function linkCard(md, store) {
  if (!store || !Object.keys(store).length) return

  md.core.ruler.push('yisux-link-card', (state) => {
    if (state.env?.file?.includes('node_modules')) return
    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i++) {
      const open = tokens[i]
      // level 0 保证只处理顶层段落，列表项与引用块内的段落不动
      if (open.type !== 'paragraph_open' || open.level !== 0) continue
      const inline = tokens[i + 1]
      const close = tokens[i + 2]
      if (inline?.type !== 'inline' || close?.type !== 'paragraph_close') continue

      const parsed = parseBareLink(inline.children)
      if (!parsed) continue
      const meta = store[parsed.href]
      if (!meta) continue

      const html = new state.Token('html_block', '', 0)
      html.content = `${render(parsed.href, meta, parsed.label)}\n`
      tokens.splice(i, 3, html)
    }
  })
}
