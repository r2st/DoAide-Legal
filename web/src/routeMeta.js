/**
 * Route-level metadata for SEO prerendering.
 * Used by scripts/prerender-routes.mjs to inject per-page
 * <title>, <meta description>, <link canonical>, and OG tags
 * into static HTML files so crawlers see real content without JS.
 */

import { toolForms } from './toolForms.js';
import { blogPosts } from './blogPosts.js';

const SITE = 'https://legal.doaide.com';
const OG_IMAGE = `${SITE}/og-image.svg`;

/** Build route metadata map: path → { title, description, canonical, ogType } */
export function buildRouteMeta() {
  const routes = {};

  // Home
  routes['/'] = {
    title: 'DoAide | Legal — Free Legal Document Generator for India',
    description:
      'Generate free legal documents for India — rental agreements, NDAs, invoices, salary slips, privacy policies, and more. No login required. Download as PDF or DOCX.',
    canonical: SITE,
    ogType: 'website',
  };

  // Tool pages
  Object.entries(toolForms).forEach(([id, config]) => {
    routes[`/${id}`] = {
      title: config.metaTitle,
      description: config.metaDescription,
      canonical: `${SITE}/${id}`,
      ogType: 'website',
    };
  });

  // Blog listing
  routes['/blog'] = {
    title: 'Legal Tips Blog — Free Legal Guides for India | DoAide Legal',
    description:
      'Free legal guides about Indian contracts, privacy policies, NDAs, freelancer agreements, and compliance. Expert articles from DoAide Legal.',
    canonical: `${SITE}/blog`,
    ogType: 'website',
  };

  // Blog posts
  blogPosts.forEach((post) => {
    routes[`/blog/${post.slug}`] = {
      title: `${post.title} | DoAide Legal`,
      description: post.excerpt,
      canonical: `${SITE}/blog/${post.slug}`,
      ogType: 'article',
    };
  });

  return routes;
}

export { SITE, OG_IMAGE };
