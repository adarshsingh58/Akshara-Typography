
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FONTS } from '../data';
import { License } from '../types';
import PreviewEngine from '../components/PreviewEngine';
import CheckoutModal from '../components/CheckoutModal';

const FontDetails: React.FC = () => {
  const { id } = useParams();
  const font = FONTS.find(f => f.id === id);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeLicense, setActiveLicense] = useState<License | null>(null);

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
            {activeLicense && (
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-green-200">
                ✨ Verified License: {activeLicense.id}
              </span>
            )}
          </div>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {font.description}
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className={`flex-1 ${activeLicense ? 'bg-slate-900' : 'bg-indigo-600'} text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-indigo-100`}
            >
              {activeLicense ? 'Access Download' : (font.price === 0 ? 'Claim License & Download' : `Purchase License — ₹${font.price}`)}
            </button>
            <button className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-xl transition-colors">
              ❤️
            </button>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-indigo-600 underline decoration-indigo-200">Legal Compliance</span>
          </h3>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Commercial usage granted per identity</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Traceable fingerprinting for protection</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Unlimited pageviews/sessions</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500 font-bold">!</span>
              <span>Licensed exclusively to USR-AKSHARA-101</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold">Live Preview Engine</h2>
          <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> 
             SECURE PREVIEW ACTIVE
          </span>
        </div>
        <PreviewEngine font={font} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-2 text-slate-800">Identity Audit</h3>
          <p className="text-sm text-slate-600">
            All downloads are logged and linked to your User ID and IP address for compliance auditing.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-2 text-slate-800">Economic Friction</h3>
          <p className="text-sm text-slate-600">
            One-time licensing fee ensures high-quality support and ongoing updates for local scripts.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-2 text-slate-800">Delivery Gateway</h3>
          <p className="text-sm text-slate-600">
            Font binaries are served via signed endpoints. Unauthorized hotlinking is strictly prevented.
          </p>
        </div>
      </div>

      <CheckoutModal 
        font={font}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(license) => setActiveLicense(license)}
      />
    </div>
  );
};

export default FontDetails;
