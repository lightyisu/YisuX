// 正文里出现图标库中的关键词时，在词前自动补上图标。
// 图标放在 docs/public/icons/，文件名即关键词；别名写在 data/icons.json。
// 每次出现都会加；标题、链接文字与代码不处理。
// frontmatter 写 kwIcons: false 可整篇关闭。

import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export interface KeywordIcon {
  key: string
  src: string
  // SVG 用 currentColor 绘制时按 mask 渲染，颜色跟随正文
  mono: boolean
  words: string[]
}

// 插件与 Icons 页共用：public/icons 下的文件名即关键词，data/icons.json 补充别名
export function readKeywordIcons(): KeywordIcon[] {
  const dir = fileURLToPath(new URL('../../public/icons/', import.meta.url))
  let aliases: Record<string, string[]> = {}
  try {
    aliases = JSON.parse(readFileSync(fileURLToPath(new URL('../data/icons.json', import.meta.url)), 'utf-8'))
  } catch {}
  try {
    return readdirSync(dir)
      .filter((f) => /\.(svg|png|webp|jpe?g)$/i.test(f))
      .sort()
      .map((f) => {
        const key = f.replace(/\.[^.]+$/, '')
        const mono = f.endsWith('.svg') && readFileSync(dir + f, 'utf-8').includes('currentColor')
        return { key, src: `/icons/${f}`, mono, words: [key, ...(aliases[key] ?? [])] }
      })
  } catch {
    return []
  }
}

const esc = (s) =>
  String(s ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function iconHtml(icon: KeywordIcon) {
  return icon.mono
    ? `<span class="kw-icon kw-icon--mono" style="--kw-icon:url('${esc(icon.src)}')" aria-hidden="true"></span>`
    : `<img class="kw-icon" src="${esc(icon.src)}" alt="" aria-hidden="true" loading="lazy">`
}

export function keywordIcon(md, icons: KeywordIcon[]) {
  if (!icons?.length) return

  // 长词优先，"Vue.js" 先于 "Vue" 命中
  const byWord = new Map<string, KeywordIcon>()
  for (const icon of icons) for (const w of icon.words) byWord.set(w.toLowerCase(), icon)
  const words = [...byWord.keys()].sort((a, b) => b.length - a.length)
  // 只给英文字母数字加边界，中英文紧挨着（"用Qoder写"）也能命中；
  // 路径与标识符里的词（.qoder、qoder.json、qoder-cli）不算
  const re = new RegExp(
    `(?<![A-Za-z0-9_./\\\\@~-])(?:${words.map(escRe).join('|')})(?![A-Za-z0-9_]|[./\\\\-][A-Za-z0-9])`,
    'gi',
  )

  md.core.ruler.push('yisux-keyword-icon', (state) => {
    // parseInline 用于从 frontmatter 推导页面标题等纯文本，插入 HTML 会把关键词吞掉
    if (state.inlineMode) return
    const env = state.env ?? {}
    if (env.file?.includes('node_modules') || env.frontmatter?.kwIcons === false) return

    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i++) {
      const inline = tokens[i]
      if (inline.type !== 'inline' || tokens[i - 1]?.type === 'heading_open') continue

      const out = []
      let inLink = 0
      for (const t of inline.children ?? []) {
        if (t.type === 'link_open') inLink++
        if (t.type === 'link_close') inLink--
        if (t.type !== 'text' || inLink > 0) {
          out.push(t)
          continue
        }

        let last = 0
        for (const m of t.content.matchAll(re)) {
          const icon = byWord.get(m[0].toLowerCase())
          if (!icon) continue

          if (m.index > last) out.push(text(state, t.content.slice(last, m.index)))
          const html = new state.Token('html_inline', '', 0)
          html.content = `<span class="kw">${iconHtml(icon)}${esc(m[0])}</span>`
          out.push(html)
          last = m.index + m[0].length
        }
        if (last === 0) out.push(t)
        else if (last < t.content.length) out.push(text(state, t.content.slice(last)))
      }
      inline.children = out
    }
  })
}

function text(state, content) {
  const t = new state.Token('text', '', 0)
  t.content = content
  return t
}
