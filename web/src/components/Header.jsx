import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-xl font-bold">
          <span>DoAide</span>
          <span className="italic text-brand-gold">Legal</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-brand-gold transition-colors">Tools</Link>
          <Link to="/blog" className="hover:text-brand-gold transition-colors">Legal Tips</Link>
          <a
            href="https://doaide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-gold transition-colors"
          >
            DoAide
          </a>
        </nav>
      </div>
    </header>
  );
}
