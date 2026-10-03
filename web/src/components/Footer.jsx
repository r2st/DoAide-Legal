import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-1 text-lg font-bold mb-2">
              <span className="text-brand-dark">DoAide</span>
              <span className="italic text-brand-gold">Legal</span>
            </div>
            <p className="text-sm text-gray-600">
              Free legal document templates and generators for India. No login required.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link to="/rental-agreement" className="hover:text-brand-gold">Rental Agreement</Link></li>
              <li><Link to="/invoice" className="hover:text-brand-gold">Invoice Generator</Link></li>
              <li><Link to="/salary-slip" className="hover:text-brand-gold">Salary Slip</Link></li>
              <li><Link to="/nda" className="hover:text-brand-gold">NDA Generator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">More from DoAide</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">DoAide Home</a></li>
              <li><Link to="/blog" className="hover:text-brand-gold">Legal Tips Blog</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} DoAide. All rights reserved. Documents generated are templates — consult a lawyer for legal advice.
        </div>
      </div>
    </footer>
  );
}
