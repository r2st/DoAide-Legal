export default function ShareButtons({ title }) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `Generate ${title} for free on DoAide Legal!`;

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3 mt-4">
      <span className="text-sm text-gray-500">Share:</span>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-full hover:bg-green-600 transition-colors"
      >
        WhatsApp
      </a>
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-full hover:bg-sky-600 transition-colors"
      >
        Twitter
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-700 text-white text-xs font-medium rounded-full hover:bg-blue-800 transition-colors"
      >
        LinkedIn
      </a>
    </div>
  );
}
