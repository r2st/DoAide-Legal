import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShareButtons from '../components/ShareButtons';
import { blogPosts } from '../blogPosts';

function renderMarkdown(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-lg font-semibold text-gray-800 mt-6 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith('- **')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        const text = lines[i].slice(2);
        items.push(<li key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-gold hover:underline">$1</a>') }} />);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="list-disc pl-6 mb-4 text-gray-700 text-sm leading-relaxed">{items}</ul>);
      continue;
    } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const text = lines[i].replace(/^\d+\.\s/, '');
        items.push(<li key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-gold hover:underline">$1</a>') }} />);
        i++;
      }
      elements.push(<ol key={`ol-${i}`} className="list-decimal pl-6 mb-4 text-gray-700 text-sm leading-relaxed">{items}</ol>);
      continue;
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="font-semibold text-gray-800 mb-2">{line.slice(2, -2)}</p>);
    } else if (line.trim() === '') {
      // skip
    } else {
      elements.push(
        <p key={i} className="text-gray-700 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-gold hover:underline">$1</a>')
        }} />
      );
    }
    i++;
  }
  return elements;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h1>
            <Link to="/blog" className="text-brand-gold hover:underline">Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://legal.doaide.com/blog/${post.slug}`,
    author: { '@type': 'Organization', name: 'DoAide Legal' },
    publisher: {
      '@type': 'Organization',
      name: 'DoAide',
      url: 'https://doaide.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://legal.doaide.com/blog/${post.slug}`,
    },
  };

  const faqJsonLd = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{post.title} | DoAide Legal</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://legal.doaide.com/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
      </Helmet>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="mb-6">
          <Link to="/blog" className="text-sm text-gray-500 hover:text-brand-gold">&larr; All Posts</Link>
        </div>

        <article>
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
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

          <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

          <div className="prose-container">
            {renderMarkdown(post.content)}
          </div>
        </article>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-10 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <details key={idx} className="border border-gray-200 rounded-lg p-4 group">
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs ml-2">&#9660;</span>
                  </summary>
                  <p className="text-gray-700 text-sm leading-relaxed mt-3">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <ShareButtons title={post.title} />

        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-500">
          <p><strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute legal advice. Please consult a qualified lawyer for advice specific to your situation.</p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/blog" className="text-brand-gold hover:underline font-medium">&larr; Back to Blog</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
