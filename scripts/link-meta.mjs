// 扫描 docs 下所有 md 的外链，抓取网页名片元数据并缓存到 link-meta.json。
//
// 三层降级：og:image 封面 → microlink 整页截图 → 纯 favicon + 域名
// 图片一律本地化到 docs/public/link-covers：截图 URL 24 小时即过期、常用图标服务
// 在墙内不可达，且名片 HTML 是构建时固化的，源站换图会直接裂图。
//
// 用法：node scripts/link-meta.mjs [--refresh] [--images-only] [--no-images] [--concurrency=3]
// --images-only 只按缓存里已有的图片地址重下封面，完全不消耗 microlink 额度
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(ROOT, 'docs')
const DATA_FILE = join(DOCS, '.vitepress/data/link-meta.json')
const COVER_DIR = join(DOCS, 'public', 'link-covers')

const API = 'https://api.microlink.io/'
const TIMEOUT = 30_000
const OWN_HOSTS = ['yisux.com', 'yisupower.com']

const argv = process.argv.slice(2)
const REFRESH = argv.includes('--refresh')
const IMAGES_ONLY = argv.includes('--images-only')
const NO_IMAGES = argv.includes('--no-images')
const CONCURRENCY = Number(argv.find((a) => a.startsWith('--concurrency='))?.split('=')[1] ?? 3)

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(p)))
    else if (entry.name.endsWith('.md')) out.push(p)
  }
  return out
}

const LINK_RE = /(?<!!)\[([^\]]*)\]\((https?:\/\/[^)\s]+)(?:\s+"[^"]*")?\)/g

const safeHost = (u) => {
  try {
    return new URL(u).hostname
  } catch {
    return ''
  }
}

async function collectUrls() {
  const urls = new Set()
  for (const file of await walk(DOCS)) {
    const src = await readFile(file, 'utf-8')
    const body = src.replace(/^---[\s\S]*?---\n/, '').replace(/```[\s\S]*?```/g, '')
    for (const m of body.matchAll(LINK_RE)) {
      const raw = m[2]
      let url
      try {
        url = new URL(raw)
      } catch {
        continue
      }
      if (OWN_HOSTS.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))) continue
      urls.add(raw)
    }
  }
  return urls
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// 封面实际显示宽度只有 210px（移动端满屏约 430px），按 640px webp 取图即可
const resized = (u, w = 640, q = 72) =>
  `https://wsrv.nl/?url=${encodeURIComponent(u)}&w=${w}&output=webp&q=${q}&fit=inside&metadata=false`

// 限流时 microlink 返回 status:'error' 且 data 为 null，需连同超时/网络错误一起退避重试
async function api(url, tries = 3) {
  let last = 'unknown'
  for (let i = 0; i < tries; i++) {
    if (i) await sleep(2000 * 3 ** (i - 1))
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) })
      const after = Number(res.headers.get('retry-after'))
      if (Number.isFinite(after) && after > 0) {
        last = `retry-after ${after}s`
        await sleep(Math.min(after * 1000, 20_000))
        continue
      }
      const json = await res.json()
      if (json.status === 'success' && json.data) return json.data
      last = `microlink: ${json.message ?? json.code ?? 'error'}`
    } catch (e) {
      last = e.name === 'TimeoutError' ? 'timeout' : `fetch: ${e.message}`
    }
  }
  throw new Error(last)
}

async function saveRemote(url, file, maxBytes = 1_200_000) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT), redirect: 'follow' })
  if (!res.ok) throw new Error(`http ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (!buf.length) throw new Error('empty body')
  if (buf.length > maxBytes)
    throw new Error(`too large (${(buf.length / 1024 / 1024).toFixed(1)}MB > ${maxBytes / 1024}KB)`)
  const type = res.headers.get('content-type') ?? ''
  const ext =
    {
      'image/png': '.png',
      'image/jpeg': '.jpg',
      'image/webp': '.webp',
      'image/gif': '.gif',
      'image/svg+xml': '.svg',
      'image/x-icon': '.ico',
      'image/vnd.microsoft.icon': '.ico',
    }[type.split(';')[0].trim()] ?? extname(new URL(url).pathname).toLowerCase()
  if (!/^\.(png|jpe?g|webp|gif|svg|ico)$/.test(ext)) throw new Error(`unknown type ${type}`)
  const path = `${file}${ext}`
  await writeFile(join(COVER_DIR, path), buf)
  return { path: `/link-covers/${path}`, size: buf.length }
}

const hash = (s) => createHash('sha1').update(s).digest('hex').slice(0, 16)

const fetchShot = (q) =>
  api(
    `${API}?url=${q}&screenshot=true&screenshot_format=webp&screenshot_width=900&screenshot_quality=70`,
  ).then((d) => d?.screenshot?.url ?? null)

async function probe(pageUrl) {
  const q = encodeURIComponent(pageUrl)
  let data
  try {
    data = await api(`${API}?url=${q}`)
  } catch (e) {
    return { ok: false, error: e.message }
  }

  const hostname = safeHost(pageUrl)
  const title = (data.title ?? '').trim()
  const base = {
    hostname,
    description: (data.description ?? '').trim() || null,
    publisher: (data.publisher ?? '').trim() || hostname,
    logoUrl: data.logo?.url ?? null,
    finalUrl: data.url || pageUrl,
  }
  const code = data.statusCode
  // 目标站反爬、或没给出 og:image 时，改用整页截图兜底
  const needShot = !title || (code && code !== 200) || !data.image?.url

  if (!needShot) return { ...base, ok: true, level: 'cover', coverUrl: data.image.url, title }
  let shot = null
  try {
    shot = await fetchShot(q)
  } catch {
    /* 截图失败不判死，继续降级到无图版式 */
  }
  if (shot) return { ...base, ok: true, level: 'screenshot', coverUrl: shot, title: title || hostname }
  if (data.image?.url) return { ...base, ok: true, level: 'cover', coverUrl: data.image.url, title }
  if (!title) return { ok: false, error: `无标题 (statusCode ${code ?? 'n/a'})` }
  return { ...base, ok: true, level: 'none', title }
}

async function localize(pageUrl, meta) {
  if (NO_IMAGES || !meta.hostname) return meta
  const { coverUrl, level } = meta
  if (coverUrl) {
    const name = `${level}-${hash(coverUrl)}`
    let shot = null
    try {
      shot = await saveRemote(resized(coverUrl), name)
    } catch {
      try {
        // 缩放服务不可用时才取原图，且拒绝超大原图
        shot = await saveRemote(coverUrl, name, 260_000)
      } catch (e) {
        meta.coverNote = e.message
      }
    }
    // 反爬站截图出来是空白图（豆瓣实测 1KB），留着不如没有
    if (shot && level === 'screenshot' && shot.size < 4096) {
      meta.coverNote = 'blank screenshot'
      shot = null
    }
    meta.cover = shot?.path ?? null
  }
  const iconSrc = meta.logoUrl ?? `https://${meta.hostname}/favicon.ico`
  const iconName = `fav/${hash(meta.hostname)}`
  try {
    meta.favicon = (await saveRemote(resized(iconSrc, 64, 80), iconName)).path
  } catch {
    try {
      meta.favicon = (await saveRemote(iconSrc, iconName, 40_000)).path
    } catch {
      meta.favicon = null
    }
  }
  return meta
}

const stats = {
  cover: 0,
  screenshot: 0,
  none: 0,
  failed: 0,
  total() {
    return this.cover + this.screenshot + this.none + this.failed
  },
}

async function pool(items, fn) {
  if (!items.length) return
  const width = Math.min(CONCURRENCY, items.length)
  let done = 0
  const tick = () => {
    done += 1
    if (process.stdout.isTTY) process.stdout.write(`\r[link-meta] ${done}/${items.length}`)
  }
  async function worker(chunk) {
    for (const item of chunk) {
      await fn(item)
      tick()
    }
  }
  const chunks = Array.from({ length: width }, () => [])
  items.forEach((it, i) => chunks[i % width].push(it))
  await Promise.all(chunks.map(worker))
}

async function walkFiles(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walkFiles(p)))
    else out.push(relative(COVER_DIR, p))
  }
  return out
}

// 封面按内容哈希命名，压缩参数一变扩展名就可能从 .png 变 .webp，旧文件成了死重
async function pruneOrphans(cache) {
  if (!existsSync(COVER_DIR)) return
  const keep = new Set()
  for (const m of Object.values(cache)) {
    for (const p of [m.cover, m.favicon]) {
      if (typeof p === 'string' && p.startsWith('/link-covers/')) keep.add(p.slice('/link-covers/'.length))
    }
  }
  let removed = 0
  for (const rel of await walkFiles(COVER_DIR)) {
    if (keep.has(rel.split('\\').join('/'))) continue
    await rm(join(COVER_DIR, rel), { force: true })
    removed += 1
  }
  if (removed) console.log(`[link-meta] 清理无人引用的封面文件 ${removed} 个`)
}

async function run() {
  if (typeof fetch !== 'function') {
    console.warn('[link-meta] 当前 Node 缺少全局 fetch（需 18+），已跳过名片采集。')
    return
  }
  const urls = await collectUrls()
  const cache = existsSync(DATA_FILE) ? JSON.parse(await readFile(DATA_FILE, 'utf-8')) : {}
  const all = [...urls]
  if (!NO_IMAGES) await mkdir(join(COVER_DIR, 'fav'), { recursive: true })

  if (IMAGES_ONLY) {
    const targets = all.filter((u) => cache[u]?.coverUrl || cache[u]?.favicon)
    console.log(`[link-meta] 仅重下图片，共 ${targets.length} 个（不调用 microlink）`)
    await pool(targets, async (url) => {
      await localize(url, cache[url])
    })
  } else {
    const todo = REFRESH ? all : all.filter((u) => !cache[u]?.ok)
    console.log(`[link-meta] 共 ${all.length} 个外链，待采集 ${todo.length} 个`)
    await pool(todo, async (url) => {
      const prev = cache[url]
      let entry = await probe(url)
      if (entry.ok) {
        await localize(url, entry)
        entry.fetchedAt = new Date().toISOString()
      } else if (prev?.ok) {
        // 限流/临时故障不该毁掉已有封面，保留旧数据并标记待刷新
        entry = { ...prev, stale: true }
      } else {
        const host = safeHost(url)
        Object.assign(entry, { hostname: host, publisher: host, title: null })
      }
      cache[url] = entry
      stats[entry.ok ? entry.level : 'failed'] += 1
    })
  }

  const sorted = Object.fromEntries(
    Object.entries(cache)
      .filter(([u]) => urls.has(u))
      .sort(([a], [b]) => (a < b ? -1 : 1)),
  )
  await mkdir(dirname(DATA_FILE), { recursive: true })
  await writeFile(DATA_FILE, `${JSON.stringify(sorted, null, 2)}\n`)
  if (!NO_IMAGES) await pruneOrphans(sorted)
  console.log(
    stats.total()
      ? `\n[link-meta] 封面 ${stats.cover} · 截图 ${stats.screenshot} · 无图 ${stats.none} · 失败 ${stats.failed} → ${relative(ROOT, DATA_FILE)}`
      : `[link-meta] 未发起采集请求 → ${relative(ROOT, DATA_FILE)}`,
  )
}

run().catch((e) => {
  console.warn(`[link-meta] 采集异常，已忽略：${e?.message ?? e}`)
})
