import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormField from '../components/FormField';
import ListField from '../components/ListField';
import ShareButtons from '../components/ShareButtons';
import { toolForms } from '../toolForms';
import { TOOLS } from '../config';
import { generateDocument, downloadBlob, generateClauses } from '../api';

function InvoiceItems({ items, setItems }) {
  const addItem = () => setItems([...items, { description: '', quantity: 1, rate: 0, hsn_code: '' }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: value };
    setItems(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Line Items</h3>
        <button type="button" onClick={addItem} className="text-sm text-brand-gold hover:underline font-medium">+ Add Item</button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-2 p-3 bg-gray-50 rounded-lg">
          <div className="col-span-2">
            <input type="text" placeholder="Description" value={item.description} onChange={(e) => updateItem(i, 'description', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" required />
          </div>
          <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => updateItem(i, 'quantity', e.target.value)}
            className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" required />
          <input type="number" placeholder="Rate" value={item.rate} onChange={(e) => updateItem(i, 'rate', e.target.value)}
            className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" required />
          <div className="flex gap-1">
            <input type="text" placeholder="HSN" value={item.hsn_code} onChange={(e) => updateItem(i, 'hsn_code', e.target.value)}
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" />
            {items.length > 1 && (
              <button type="button" onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 px-1 text-lg">&times;</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function WitnessFields({ witnesses, setWitnesses, count = 2 }) {
  const updateWitness = (i, field, value) => {
    const updated = [...witnesses];
    updated[i] = { ...updated[i], [field]: value };
    setWitnesses(updated);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-800">Witnesses</h3>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
          <input type="text" placeholder={`Witness ${i + 1} Name`} value={witnesses[i]?.name || ''} onChange={(e) => updateWitness(i, 'name', e.target.value)}
            className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" required />
          <input type="text" placeholder={`Witness ${i + 1} Address`} value={witnesses[i]?.address || ''} onChange={(e) => updateWitness(i, 'address', e.target.value)}
            className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" required />
        </div>
      ))}
    </div>
  );
}

function PartnerFields({ partners, setPartners }) {
  const addPartner = () => setPartners([...partners, { name: '', address: '', capital_contribution: 0, profit_share_percentage: 0 }]);
  const removePartner = (i) => setPartners(partners.filter((_, idx) => idx !== i));
  const updatePartner = (i, field, value) => {
    const updated = [...partners];
    updated[i] = { ...updated[i], [field]: value };
    setPartners(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Partners</h3>
        <button type="button" onClick={addPartner} className="text-sm text-brand-gold hover:underline font-medium">+ Add Partner</button>
      </div>
      {partners.map((p, i) => (
        <div key={i} className="p-3 bg-gray-50 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Partner {i + 1}</span>
            {partners.length > 2 && (
              <button type="button" onClick={() => removePartner(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input type="text" placeholder="Name" value={p.name} onChange={(e) => updatePartner(i, 'name', e.target.value)}
              className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" required />
            <input type="text" placeholder="Address" value={p.address} onChange={(e) => updatePartner(i, 'address', e.target.value)}
              className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" required />
            <input type="number" placeholder="Capital (₹)" value={p.capital_contribution} onChange={(e) => updatePartner(i, 'capital_contribution', e.target.value)}
              className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" required />
            <input type="number" placeholder="Profit Share (%)" value={p.profit_share_percentage} onChange={(e) => updatePartner(i, 'profit_share_percentage', e.target.value)}
              className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-gold outline-none" required />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ToolPage() {
  const { toolId } = useParams();
  const config = toolForms[toolId];
  const toolMeta = TOOLS.find((t) => t.id === toolId);

  const [formData, setFormData] = useState(() => {
    const defaults = config?.defaults || {};
    return { ...defaults };
  });
  const [listData, setListData] = useState(() => {
    const lists = {};
    (config?.listFields || []).forEach((lf) => { lists[lf.name] = []; });
    return lists;
  });
  const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0, hsn_code: '' }]);
  const [witnesses, setWitnesses] = useState([{ name: '', address: '' }, { name: '', address: '' }]);
  const [partners, setPartners] = useState([
    { name: '', address: '', capital_contribution: 0, profit_share_percentage: 50 },
    { name: '', address: '', capital_contribution: 0, profit_share_percentage: 50 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clauses, setClauses] = useState(null);

  if (!config || !toolMeta) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Tool Not Found</h1>
            <Link to="/" className="text-brand-gold hover:underline">Back to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildSubmitData = () => {
    let submitData = { ...formData };
    Object.entries(listData).forEach(([key, val]) => { submitData[key] = val; });
    if (config.itemFields) submitData.items = items;
    if (config.witnessFields) submitData.witnesses = witnesses;
    if (config.partnerFields) submitData.partners = partners;
    (config.sections || []).forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === 'number' && submitData[field.name] !== undefined && submitData[field.name] !== '') {
          submitData[field.name] = parseFloat(submitData[field.name]);
        }
      });
    });
    if (config.transformBeforeSubmit) {
      submitData = config.transformBeforeSubmit(submitData);
    }
    return submitData;
  };

  const handleSubmit = async (format) => {
    setLoading(true);
    setError('');
    try {
      const submitData = buildSubmitData();
      const blob = await generateDocument(toolId, submitData, format);
      const ext = format === 'docx' ? 'docx' : 'pdf';
      const filename = `${config.title.replace(/\s+/g, '_')}.${ext}`;
      downloadBlob(blob, filename);
    } catch (err) {
      setError(err.message || 'Failed to generate document');
    } finally {
      setLoading(false);
    }
  };

  const handleClauseGenerate = async () => {
    setLoading(true);
    setError('');
    setClauses(null);
    try {
      const submitData = buildSubmitData();
      const result = await generateClauses(submitData);
      setClauses(result);
    } catch (err) {
      setError(err.message || 'Failed to generate clauses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="canonical" href={`https://legal.doaide.com/${toolId}`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: config.title,
          url: `https://legal.doaide.com/${toolId}`,
          description: config.metaDescription,
          applicationCategory: 'LegalService',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
        })}</script>
      </Helmet>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-brand-gold">&larr; All Tools</Link>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{toolMeta.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
            <p className="text-sm text-gray-500">{toolMeta.description}</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {config.sections.map((section, si) => (
            <div key={si}>
              <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-1 border-b">{section.heading}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <FormField
                      {...field}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {config.itemFields && <InvoiceItems items={items} setItems={setItems} />}
          {config.witnessFields && <WitnessFields witnesses={witnesses} setWitnesses={setWitnesses} count={config.witnessFields.count} />}
          {config.partnerFields && <PartnerFields partners={partners} setPartners={setPartners} />}

          {(config.listFields || []).map((lf) => (
            <ListField
              key={lf.name}
              label={lf.label}
              value={listData[lf.name]}
              onChange={(val) => setListData((prev) => ({ ...prev, [lf.name]: val }))}
              placeholder={lf.placeholder}
            />
          ))}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          {config.isClauseLibrary ? (
            <div className="pt-4">
              <button
                type="button"
                onClick={handleClauseGenerate}
                disabled={loading}
                className="w-full bg-brand-dark text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Generating Clauses (AI)...' : 'Generate Clauses'}
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => handleSubmit('pdf')}
                disabled={loading}
                className="flex-1 bg-brand-dark text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? (config.aiPowered ? 'Generating (AI)...' : 'Generating...') : 'Download PDF'}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('docx')}
                disabled={loading}
                className="flex-1 bg-brand-gold text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50"
              >
                {loading ? (config.aiPowered ? 'Generating (AI)...' : 'Generating...') : 'Download DOCX'}
              </button>
            </div>
          )}
        </form>

        {clauses && clauses.clauses && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Generated Clauses</h2>
            {clauses.clauses.map((clause, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-semibold text-gray-900">{clause.title}</h3>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(clause.text)}
                    className="text-xs bg-brand-gold text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors whitespace-nowrap"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap mb-3">{clause.text}</p>
                {clause.notes && (
                  <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded"><strong>Usage note:</strong> {clause.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <ShareButtons title={config.title} />

        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-500">
          <p><strong>Disclaimer:</strong> This document is a template generated by DoAide Legal and is intended for general informational purposes only. It does not constitute legal advice. Please consult a qualified lawyer before using this document for any legal purpose.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
