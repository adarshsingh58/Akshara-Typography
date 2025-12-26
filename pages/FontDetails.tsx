
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FONTS } from '../data';
import PreviewEngine from '../components/PreviewEngine';
import CheckoutModal from '../components/CheckoutModal';

const FontDetails: React.FC = () => {
  const { id } = useParams();
  const font = FONTS.find(f => f.id === id);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [licensed, setLicensed] = useState(false);

  if (!font) return <div className="p-20 text-center">Font not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        <div className="flex-1">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link to="/library" className="hover:text-indigo-600">Library</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{font.name}</span>
          </nav>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">{font.name}</h1>
          <div className="flex gap-2 mb-6">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">{font.category}</span>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">{font.licenseType}</span>
            {licensed && <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">✨ Licensed</span>}
          </div>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {font.description}
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className={`flex-1 ${licensed ? 'bg-slate-900' : 'bg-indigo-600'} text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-indigo-100`}
            >
              {licensed ? 'Download Again' : (font.price === 0 ? 'Access Assets' : `Get License — ₹${font.price}`)}
            </button>
            <button className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-xl">
              ❤️
            </button>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-indigo-600">📋</span> License Details
          </h3>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Use on unlimited commercial websites</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Embed in mobile applications</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Logo & brand identity usage</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold">×</span>
              <span>Do not resell or redistribute font files</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold">Live Preview Engine</h2>
          <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500"></span> 
             LOCAL ASSET ACTIVE
          </span>
        </div>
        <PreviewEngine font={font} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold mb-2">Technical Specs</h3>
          <div className="text-sm space-y-2 text-slate-600">
            <p><strong>Glyph count:</strong> 1,200+</p>
            <p><strong>Formats:</strong> WOFF2 (Local Host)</p>
            <p><strong>Hinting:</strong> Modern ClearType</p>
            <p><strong>Languages:</strong> Hindi, English, Marathi</p>
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold mb-2">Designers Note</h3>
          <p className="text-sm text-slate-600 italic">
            "Vertical rhythm was tuned specifically for bilingual Devanagari/Latin baseline alignment."
          </p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold mb-2">Performance Focus</h3>
          <p className="text-sm text-slate-600">
            Self-hosted WOFF2 files reduce latency by 120ms compared to external CDNs.
          </p>
        </div>
      </div>

      <CheckoutModal 
        font={font}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => setLicensed(true)}
      />
    </div>
  );
};

export default FontDetails;
