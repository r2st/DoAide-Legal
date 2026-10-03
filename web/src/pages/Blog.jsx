import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const posts = [
  {
    slug: 'rental-agreement-india-guide',
    title: 'Everything You Need to Know About Rental Agreements in India',
    excerpt: 'Learn about the key clauses, stamp duty, registration requirements, and how to protect yourself as a landlord or tenant in India.',
    date: '2025-01-15',
    readTime: '5 min',
  },
  {
    slug: 'gst-invoice-requirements',
    title: 'GST Invoice Requirements in India — A Complete Guide',
    excerpt: 'Understand the mandatory fields, HSN codes, GSTIN format, and the difference between CGST+SGST vs IGST invoicing.',
    date: '2025-01-10',
    readTime: '4 min',
  },
  {
    slug: 'nda-why-you-need-one',
    title: 'Why Every Business in India Needs an NDA',
    excerpt: 'Non-disclosure agreements protect your trade secrets and confidential information. Learn when and how to use them.',
    date: '2025-01-05',
    readTime: '3 min',
  },
  {
    slug: 'salary-slip-components-explained',
    title: 'Indian Salary Slip Components Explained — Basic, HRA, DA, PF, ESI',
    excerpt: 'A breakdown of every component on an Indian salary slip and how they affect your take-home pay and taxes.',
    date: '2024-12-28',
    readTime: '6 min',
  },
  {
    slug: 'freelancer-contract-tips',
    title: '7 Must-Have Clauses in Your Freelancer Contract',
    excerpt: 'Protect your work and get paid on time. These clauses are essential for every Indian freelancer.',
    date: '2024-12-20',
    readTime: '4 min',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Legal Tips Blog | DoAide Legal</title>
        <meta name="description" content="Legal tips, guides, and articles about Indian legal documents, contracts, and compliance. Free knowledge from DoAide Legal." />
      </Helmet>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Tips</h1>
        <p className="text-gray-500 mb-8">Guides and articles about Indian legal documents and compliance.</p>

        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border border-gray-200 rounded-xl p-6 hover:border-brand-gold transition-colors">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                <span>{post.date}</span>
                <span>&middot;</span>
                <span>{post.readTime} read</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
              <span className="text-sm text-brand-gold font-medium">Coming soon &rarr;</span>
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
