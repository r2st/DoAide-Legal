import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TOOLS } from '../config';

const categories = ['Property', 'Business', 'Employment', 'Finance', 'Legal', 'Compliance'];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>DoAide Legal — Free Legal Document Generator for India</title>
        <meta name="description" content="Generate free legal documents for India — rental agreements, NDAs, invoices, salary slips, privacy policies, and more. No login required. Download as PDF or DOCX." />
        <link rel="canonical" href="https://legal.doaide.com" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'DoAide Legal',
          url: 'https://legal.doaide.com',
          description: 'Free legal document generator for India. Generate rental agreements, NDAs, invoices, privacy policies, terms of service, and more. No login required.',
          applicationCategory: 'LegalService',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
        })}</script>
      </Helmet>
      <Header />

      {/* Hero */}
      <section className="bg-brand-dark text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Free Legal Documents for <span className="text-brand-gold">India</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Generate professional legal documents in seconds. No login, no fees. Download as PDF or DOCX.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#tools" className="bg-brand-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
              Browse Tools
            </a>
            <Link to="/blog" className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Legal Tips
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-brand-dark">15</div>
              <div className="text-sm text-gray-500">Free Tools</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-brand-dark">100%</div>
              <div className="text-sm text-gray-500">Free Forever</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-brand-dark">0</div>
              <div className="text-sm text-gray-500">Login Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">Legal Document Templates</h2>

          {categories.map((cat) => {
            const catTools = TOOLS.filter((t) => t.category === cat);
            if (catTools.length === 0) return null;
            return (
              <div key={cat} className="mb-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-brand-gold rounded-full inline-block"></span>
                  {cat}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/${tool.id}`}
                      className="group block p-5 border border-gray-200 rounded-xl hover:border-brand-gold hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{tool.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900 group-hover:text-brand-gold transition-colors">{tool.title}</h4>
                            {tool.aiPowered && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-medium">AI</span>}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-brand-gold font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Generate Free &rarr;
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-brand-gold text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
              <h3 className="font-semibold mb-1">Choose a Template</h3>
              <p className="text-sm text-gray-500">Pick from 15 legal document templates designed for India.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-brand-gold text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
              <h3 className="font-semibold mb-1">Fill in the Details</h3>
              <p className="text-sm text-gray-500">Enter the relevant information in a clean, guided form.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-brand-gold text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
              <h3 className="font-semibold mb-1">Download Instantly</h3>
              <p className="text-sm text-gray-500">Get your document as a professional PDF or editable DOCX.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
