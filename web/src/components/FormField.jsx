export default function FormField({ label, name, type = 'text', value, onChange, required = false, placeholder, options, rows }) {
  const baseClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-colors text-sm';

  if (type === 'select') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
        <select name={name} value={value || ''} onChange={onChange} required={required} className={baseClass}>
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
              {typeof opt === 'string' ? opt : opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
        <textarea name={name} value={value || ''} onChange={onChange} required={required} placeholder={placeholder} rows={rows || 3} className={baseClass} />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <input type={type} name={name} value={value || ''} onChange={onChange} required={required} placeholder={placeholder} className={baseClass} />
    </div>
  );
}
