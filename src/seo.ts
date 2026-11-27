// Build-time SEO, generated from the same data the app renders (src/data/profile.ts):
// - a plain-HTML copy of the page inside #app, so crawlers, link previews and résumé parsers
//   that don't run JavaScript still read every role, project and skill (Vue replaces it on mount);
// - ProfilePage + Person structured data (JSON-LD);
// - sitemap.xml with the build date.
import type { Plugin } from 'vite'
import { profile, work, moreProjects, experience, education, languages, stack } from './data/profile'

const SITE = 'https://agustin-1998.github.io'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const list = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`

function fallbackHtml(): string {
  const parts: string[] = []
  parts.push(`<header><h1>${esc(profile.name)} · ${esc(profile.role)}</h1>`)
  parts.push(`<p>${esc(profile.headline)}</p><p>${esc(profile.intro)}</p>`)
  parts.push(`<p>${esc(profile.location)} (${esc(profile.timezone)}) · ${esc(profile.availability)}</p></header>`)

  parts.push('<section><h2>Selected work</h2>')
  for (const s of work) {
    parts.push(`<article><h3>${esc(s.title)}</h3><p>${esc(s.context)} · ${esc(s.period)} · ${esc(s.status)}</p>`)
    parts.push(`<p>${esc(s.summary)}</p><p>${esc(s.problem)}</p>${list(s.built)}${list(s.decisions)}`)
    parts.push(`<p>${s.metrics.map((m) => `${esc(m.value)} ${esc(m.label)}`).join(' · ')}</p>`)
    parts.push(`<p>Stack: ${esc(s.stack.join(', '))}</p></article>`)
  }
  for (const p of moreProjects) {
    const title = p.href ? `<a href="${esc(p.href)}">${esc(p.title)}</a>` : esc(p.title)
    parts.push(`<article><h3>${title}</h3><p>${esc(p.context)}</p><p>${esc(p.summary)}</p><p>Stack: ${esc(p.stack.join(', '))}</p></article>`)
  }
  parts.push('</section>')

  parts.push('<section><h2>Experience</h2>')
  for (const r of experience) {
    parts.push(`<article><h3>${esc(r.title)} · ${esc(r.company)}</h3><p>${esc(r.period)} · ${esc(r.place)}</p>`)
    parts.push(`${list(r.points)}<p>Tech: ${esc(r.stack.join(', '))}</p></article>`)
  }
  parts.push('</section>')

  parts.push('<section><h2>Skills</h2>')
  for (const g of stack) parts.push(`<p><strong>${esc(g.name)}:</strong> ${esc(g.items.join(', '))}</p>`)
  parts.push('</section>')

  parts.push('<section><h2>Education and languages</h2>')
  parts.push(list(education.map((e) => [e.title, e.place, e.period].filter(Boolean).join(' · '))))
  parts.push(list(languages))
  parts.push('</section>')

  parts.push(
    `<footer><h2>Contact</h2><p>${esc(profile.email)} · <a href="${profile.links.linkedin}">LinkedIn</a> · ` +
      `<a href="${profile.links.github}">GitHub</a> · <a href="${profile.links.resume}">Résumé (PDF)</a> · ` +
      `<a href="/hu-flow/">hu-flow walkthrough</a></p></footer>`,
  )
  return `<div class="seo-fallback">${parts.join('')}</div>`
}

function jsonLd(today: string): string {
  const knowsAbout = [...new Set(stack.flatMap((g) => g.items))]
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${SITE}/`,
    dateModified: today,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      alternateName: 'Agustin Rodriguez',
      jobTitle: 'Senior Full Stack Engineer and AI Engineer',
      description: profile.intro,
      url: `${SITE}/`,
      email: `mailto:${profile.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
      worksFor: { '@type': 'Organization', name: 'Provincia NET' },
      knowsLanguage: ['es', 'en'],
      knowsAbout,
      sameAs: [profile.links.linkedin, profile.links.github],
    },
  }
  // Escape "<" so no string in the data can close the script tag.
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

function sitemap(today: string): string {
  const urls = [`${SITE}/`, `${SITE}/hu-flow/`, `${SITE}${profile.links.resume}`]
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    '\n</urlset>\n'
  )
}

export function seoFromProfile(): Plugin {
  const today = new Date().toISOString().slice(0, 10)
  return {
    name: 'seo-from-profile',
    transformIndexHtml(html) {
      return html
        .replace('<!--seo:jsonld-->', jsonLd(today))
        .replace('<div id="app"></div>', `<div id="app">${fallbackHtml()}</div>`)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap(today) })
    },
  }
}
