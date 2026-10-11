import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold mb-2">
              <span className="text-da-dark">DoAide</span>
              <span className="text-da-teal">|</span>
              <span className="text-da-teal font-semibold">Legal</span>
            </div>
            <p className="text-sm text-gray-600">
              Free legal document templates and generators for India. No login required.
            </p>
            <span className="inline-block mt-3 text-xs bg-da-teal/10 text-da-teal px-2 py-1 rounded font-medium">
              A DoAide Product
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Popular Tools</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link to="/rental-agreement" className="hover:text-da-teal">Rental Agreement</Link></li>
              <li><Link to="/nda" className="hover:text-da-teal">NDA Generator</Link></li>
              <li><Link to="/invoice" className="hover:text-da-teal">Invoice Generator</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-da-teal">Privacy Policy Generator</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-da-teal">Terms of Service Generator</Link></li>
              <li><Link to="/contract-clause-library" className="hover:text-da-teal">Contract Clause Library</Link></li>
              <li><Link to="/legal-document-checker" className="hover:text-da-teal">Legal Document Checker</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">DoAide Products</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="hover:text-da-teal">DoAide Home</a></li>
              <li><a href="https://legal.doaide.com" className="hover:text-da-teal">DoAide Legal</a></li>
              <li><Link to="/blog" className="hover:text-da-teal">Legal Tips Blog</Link></li>
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
