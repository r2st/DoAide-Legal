/**
 * Route-level metadata for SEO prerendering.
 * Used by scripts/prerender-routes.mjs to inject per-page
 * <title>, <meta description>, <link canonical>, and OG tags
 * into static HTML files so crawlers see real content without JS.
 */

import { toolForms } from './toolForms.js';
import { blogPosts } from './blogPosts.js';

const SITE = 'https://legal.doaide.com';
const OG_IMAGE = `${SITE}/og-image.png`;
const ORG = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' };

const webApp = (name, url, description) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  url,
  description,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: ORG,
});

/** Build route metadata map: path → { title, description, canonical, ogType, h1, jsonLd } */
export function buildRouteMeta() {
  const routes = {};

  // Home
  routes['/'] = {
    title: 'DoAide | Legal — Free Legal Document Generator for India',
    description:
      'Generate free legal documents for India — rental agreements, NDAs, invoices, salary slips, privacy policies, and more. No login required. Download as PDF or DOCX.',
    canonical: SITE,
    ogType: 'website',
    h1: 'Free Legal Document Generator for India',
  };
  routes['/'].jsonLd = webApp('DoAide Legal', SITE, routes['/'].description);

  // Tool pages
  Object.entries(toolForms).forEach(([id, config]) => {
    routes[`/${id}`] = {
      title: config.metaTitle,
      description: config.metaDescription,
      canonical: `${SITE}/${id}`,
      ogType: 'website',
      h1: config.title,
      jsonLd: webApp(config.title, `${SITE}/${id}`, config.metaDescription),
    };
  });

  // Blog listing
  routes['/blog'] = {
    title: 'Legal Tips Blog — Free Legal Guides for India | DoAide Legal',
    description:
      'Free legal guides about Indian contracts, privacy policies, NDAs, freelancer agreements, and compliance. Expert articles from DoAide Legal.',
    canonical: `${SITE}/blog`,
    ogType: 'website',
    h1: 'Legal Tips Blog',
  };
  routes['/blog'].jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'DoAide Legal Blog',
    url: `${SITE}/blog`,
    description: routes['/blog'].description,
    publisher: ORG,
  };

  // Blog posts
  blogPosts.forEach((post) => {
    routes[`/blog/${post.slug}`] = {
      title: `${post.title} | DoAide Legal`,
      description: post.excerpt,
      canonical: `${SITE}/blog/${post.slug}`,
      ogType: 'article',
      h1: post.title,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `${SITE}/blog/${post.slug}`,
        mainEntityOfPage: `${SITE}/blog/${post.slug}`,
        image: OG_IMAGE,
        author: ORG,
        publisher: ORG,
        ...(post.date ? { datePublished: post.date } : {}),
      },
    };
  });

  return routes;
}

export { SITE, OG_IMAGE };
