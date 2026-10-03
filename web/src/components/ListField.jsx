import { useState } from 'react';

export default function ListField({ label, value = [], onChange, placeholder }) {
  const [input, setInput] = useState('');

  const addItem = () => {
    const trimmed = input.trim();
    if (trimmed) {
      onChange([...value, trimmed]);
      setInput('');
    }
  };

  const removeItem = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
          placeholder={placeholder || 'Type and press Enter'}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none text-sm"
        />
        <button type="button" onClick={addItem} className="px-3 py-2 bg-brand-gold text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
          Add
        </button>
      </div>
      {value.length > 0 && (
        <ul className="mt-2 space-y-1">
          {value.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-1.5 rounded">
              <span className="flex-1">{i + 1}. {item}</span>
              <button type="button" onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
