#!/usr/bin/env node
/**
 * prerender-routes.mjs
 *
 * Post-build script that creates a static HTML file for every route defined
 * in routeMeta.js.  Each file is a copy of dist/index.html with the correct
 * <title>, <meta description>, <link canonical>, OG tags, and twitter tags
 * injected into <head>.
 *
 * This ensures search-engine crawlers that do NOT execute JavaScript still
 * receive the right per-page metadata for every route.
 *
 * Usage:  node scripts/prerender-routes.mjs
 * Run after:  npm run build
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');

// --- Dynamic import of routeMeta (ESM, same project) ---
// We inline the data rather than import the module directly because
// routeMeta.js imports toolForms.js and blogPosts.js which may use
// import.meta.env or other Vite-only features.  Instead, we duplicate
// the route list here from the source of truth.

import { buildRouteMeta, OG_IMAGE } from '../src/routeMeta.js';

const routes = buildRouteMeta();
const template = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

let created = 0;

for (const [path, meta] of Object.entries(routes)) {
  // Skip the root — it's already dist/index.html
  if (path === '/') {
    // Still patch <head> in the root index.html
    const patched = injectMeta(template, meta);
    writeFileSync(resolve(DIST, 'index.html'), patched, 'utf-8');
    created++;
    continue;
  }

  // e.g. /rental-agreement → dist/rental-agreement/index.html
  const dir = resolve(DIST, path.slice(1));
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const patched = injectMeta(template, meta);
  writeFileSync(resolve(dir, 'index.html'), patched, 'utf-8');
  created++;
}

// Route each prerendered URL to its own index.html, with the SPA fallback
// last. `serve -s` would put its own catch-all first and shadow these, so the
// web unit runs plain `serve dist`. serve-handler re-applies the remaining
// rewrites to a rewritten path, so the fallback only matches dot-free paths.
const serveConfig = {
  rewrites: [
    ...Object.keys(routes)
      .filter((path) => path !== '/')
      .map((path) => ({ source: path, destination: `${path}/index.html` })),
    { source: '/:path([^.]+)', destination: '/index.html' },
  ],
  headers: [
    { source: '/assets/**', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
  ],
};
writeFileSync(resolve(DIST, 'serve.json'), JSON.stringify(serveConfig, null, 2) + '\n', 'utf-8');

console.log(`✓ Prerendered ${created} routes into ${DIST}`);

// ---------------------------------------------------------------------------

function injectMeta(html, meta) {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(meta.canonical)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(meta.canonical)}" />`,
    `<meta property="og:type" content="${esc(meta.ogType)}" />`,
    `<meta property="og:site_name" content="DoAide Legal" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}" />`,
    `<script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');

  // Replace the existing <title> and static meta tags block with per-route tags
  return html
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta name="description"[^>]*\/>/, '')
    .replace(/<link rel="canonical"[^>]*\/>/, '')
    .replace(/<meta property="og:[^>]*\/>/g, '')
    .replace(/<meta name="twitter:[^>]*\/>/g, '')
    .replace('</head>', `    ${tags}\n  </head>`)
    // A crawler-visible h1; React replaces #root's children on mount.
    .replace('<div id="root"></div>', () => `<div id="root"><h1>${esc(meta.h1)}</h1></div>`);
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
