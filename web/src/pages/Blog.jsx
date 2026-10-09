import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogPosts } from '../blogPosts';

export default function Blog() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'DoAide Legal Blog',
    description: 'Legal tips, guides, and articles about Indian legal documents, contracts, and compliance.',
    url: 'https://legal.doaide.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'DoAide',
      url: 'https://doaide.com',
    },
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://legal.doaide.com/blog/${post.slug}`,
      author: { '@type': 'Organization', name: 'DoAide Legal' },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Legal Tips Blog — Free Legal Guides for India | DoAide Legal</title>
        <meta name="description" content="Free legal guides about Indian contracts, privacy policies, NDAs, freelancer agreements, and compliance. Expert articles from DoAide Legal." />
        <link rel="canonical" href="https://legal.doaide.com/blog" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Tips</h1>
        <p className="text-gray-500 mb-8">Guides and articles about Indian legal documents and compliance.</p>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="border border-gray-200 rounded-xl p-6 hover:border-brand-gold transition-colors">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                <span>{post.date}</span>
                <span>&middot;</span>
                <span>{post.readTime} read</span>
                {post.category && (
                  <>
                    <span>&middot;</span>
                    <span className="text-brand-gold">{post.category}</span>
                  </>
                )}
              </div>
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-brand-gold transition-colors">{post.title}</h2>
              </Link>
              <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="text-sm text-brand-gold font-medium hover:underline">
                Read More &rarr;
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="text-brand-gold hover:underline font-medium">&larr; Back to Tools</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
