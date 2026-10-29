// 预生成收藏页封面：站点 og:image → 本地 640w JPEG，并生成 24px LQIP 占位。
// 产物直接提交进仓库，构建与运行时都不再访问外网。
//
// 用法：node scripts/site-covers.mjs [--refresh]
// 依赖 macOS 自带 sips 做缩放/压缩（构建流程不会调用本脚本）。
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'docs/public/site-covers')
const MANIFEST = join(ROOT, 'docs/.vitepress/data/site-covers.json')
const REFRESH = process.argv.includes('--refresh')
const TIMEOUT = 30_000
const MIN_WIDTH = 600

const SITES = [
  { slug: 'claude-dev', url: 'https://claude.dev/' },
  { slug: 'qwen-research', url: 'https://qwen.ai/research' },
  { slug: 'freeegg-top', url: 'https://freeegg.top/' },
  { slug: 'designing-the-wait', url: 'https://chloemaillot.fr/writing/designing-the-wait' },
  { slug: 'motion-dev', url: 'https://motion.dev/' },
  { slug: 'recent-design', url: 'https://recent.design/' },
  { slug: 'toolcraft-sh', url: 'https://toolcraft.sh/' },
  { slug: 'pinui-xyz', url: 'https://www.pinui.xyz/' },
  { slug: 'bencho-dev', url: 'https://bencho.dev/' },
  { slug: 'vibrant-design', url: 'https://vibrant.design/' },
]

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function request(url, { referer } = {}, tries = 3) {
  let last = 'unknown'
  for (let i = 0; i < tries; i++) {
    if (i) await sleep(2000 * 2 ** (i - 1))
    try {
      const res = await fetch(url, {
        headers: {
          'user-agent': UA,
          accept: '*/*',
          ...(referer ? { referer } : {}),
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(TIMEOUT),
      })
      if (!res.ok) throw new Error(`http ${res.status}`)
      return res
    } catch (e) {
      last = e.name === 'TimeoutError' ? 'timeout' : e.message
    }
  }
  throw new Error(last)
}

async function fetchImage(url, referer) {
  const res = await request(url, { referer })
  const type = (res.headers.get('content-type') ?? '').split(';')[0].trim()
  if (!/^image\/(jpeg|png|webp|gif)$/.test(type)) {
    throw new Error(`unsupported image type ${type || 'unknown'}`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 3000) throw new Error(`image too small (${buf.length}B)`)
  return { buf, ext: { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' }[type] }
}

function extractOgImage(html) {
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => {
    const attrs = {}
    for (const a of m[0].matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)) {
      attrs[a[1].toLowerCase()] = a[2].replace(/&amp;/g, '&')
    }
    return attrs
  })
  const pick = (key) => metas.find((m) => (m.property ?? m.name) === key && m.content)?.content
  return pick('og:image') ?? pick('og:image:url') ?? pick('twitter:image') ?? null
}

function sips(args) {
  const r = spawnSync('sips', args, { encoding: 'utf8' })
  if (r.error) throw new Error(`sips 不可用：${r.error.message}`)
  if (r.status !== 0) throw new Error(r.stderr?.trim() || `sips exited ${r.status}`)
}

function imageWidth(file) {
  const r = spawnSync('sips', ['-g', 'pixelWidth', file], { encoding: 'utf8' })
  const m = r.stdout?.match(/pixelWidth:\s*(\d+)/)
  return m ? Number(m[1]) : 0
}

const thumUrl = (url) => `https://image.thum.io/get/width/960/crop/600/noanimate/${url}`

async function resolveSource(site) {
  const reasons = []
  try {
    const res = await request(site.url)
    const og = extractOgImage(await res.text())
    if (!og) throw new Error('未找到 og:image')
    const img = await fetchImage(new URL(og, site.url).href, site.url)
    const tmp = join(OUT_DIR, `.${site.slug}.og${img.ext}`)
    await writeFile(tmp, img.buf)
    if (imageWidth(tmp) >= MIN_WIDTH) return { path: tmp, from: og }
    await rm(tmp, { force: true })
    throw new Error(`og 图过窄（<${MIN_WIDTH}px）`)
  } catch (e) {
    reasons.push(`og: ${e.message}`)
  }

  // 旧版本地 PNG 通常就是当年抓的高清截图，优先复用
  const legacy = join(OUT_DIR, `${site.slug}.png`)
  if (existsSync(legacy) && imageWidth(legacy) >= MIN_WIDTH) {
    return { path: legacy, from: 'legacy png' }
  }

  try {
    const img = await fetchImage(thumUrl(site.url))
    const tmp = join(OUT_DIR, `.${site.slug}.shot${img.ext}`)
    await writeFile(tmp, img.buf)
    if (imageWidth(tmp) >= MIN_WIDTH) return { path: tmp, from: thumUrl(site.url) }
    await rm(tmp, { force: true })
    throw new Error(`截图过窄（<${MIN_WIDTH}px）`)
  } catch (e) {
    reasons.push(`screenshot: ${e.message}`)
  }

  throw new Error(reasons.join('；'))
}

async function build(site) {
  const { path: source, from } = await resolveSource(site)
  const coverPath = join(OUT_DIR, `${site.slug}.jpg`)
  const lqipPath = join(OUT_DIR, `.${site.slug}.lqip.jpg`)
  const tmpSource = basename(source).startsWith(`.${site.slug}.`) ? source : null

  try {
    sips(['-Z', '640', source, '--out', coverPath, '-s', 'format', 'jpeg', '-s', 'formatOptions', '70'])
    sips(['-Z', '24', coverPath, '--out', lqipPath, '-s', 'format', 'jpeg', '-s', 'formatOptions', '40'])
    const lqip = `data:image/jpeg;base64,${(await readFile(lqipPath)).toString('base64')}`
    // 旧版 PNG 封面已由 JPEG 取代
    if (basename(source) !== `${site.slug}.png`) await rm(join(OUT_DIR, `${site.slug}.png`), { force: true })
    return {
      cover: `/site-covers/${site.slug}.jpg`,
      lqip,
      from,
      source: site.url,
      fetchedAt: new Date().toISOString(),
    }
  } finally {
    if (tmpSource) await rm(tmpSource, { force: true })
    await rm(lqipPath, { force: true })
  }
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true })
  const cache = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf-8')) : {}

  const todo = SITES.filter((site) => {
    if (REFRESH) return true
    const entry = cache[site.slug]
    if (!entry?.cover || !existsSync(join(ROOT, 'docs/public', entry.cover))) return true
    return false
  })
  console.log(`[site-covers] 共 ${SITES.length} 个站点，待处理 ${todo.length} 个`)

  for (const site of todo) {
    try {
      cache[site.slug] = await build(site)
      const size = (await readFile(join(OUT_DIR, `${site.slug}.jpg`))).length
      console.log(`[site-covers] ${site.slug} 完成（${(size / 1024).toFixed(0)}KB，来源：${cache[site.slug].from}）`)
    } catch (e) {
      console.warn(`[site-covers] ${site.slug} 失败：${e.message}`)
    }
  }

  const sorted = Object.fromEntries(
    SITES.filter((s) => cache[s.slug]).map((s) => [s.slug, cache[s.slug]]),
  )
  await mkdir(dirname(MANIFEST), { recursive: true })
  await writeFile(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`)

  const missing = SITES.filter((s) => !sorted[s.slug]).map((s) => s.slug)
  if (missing.length) {
    console.warn(`[site-covers] 仍有未生成：${missing.join(', ')}，重跑本脚本即可补采`)
  } else {
    console.log(`[site-covers] 全部就绪 → ${MANIFEST.replace(`${ROOT}/`, '')}`)
  }
}

run().catch((e) => {
  console.error(`[site-covers] 失败：${e?.message ?? e}`)
  process.exitCode = 1
})
