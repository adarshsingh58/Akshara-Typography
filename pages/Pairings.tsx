
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FONTS, PAIRINGS } from '../data';
import { getPairingInsights } from '../geminiService';

const Pairings: React.FC = () => {
  const [insights, setInsights] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const fetchInsight = async (id: string, h: string, b: string) => {
    if (insights[id]) return;
    setLoading(id);
    const result = await getPairingInsights(h, b);
    setInsights(prev => ({ ...prev, [id]: result }));
    setLoading(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Curated Font Pairings</h1>
        <p className="text-slate-500">Expertly crafted combinations that ensure your bilingual content looks intentional.</p>
      </div>

      <div className="space-y-16">
        {PAIRINGS.map(pairing => {
          const headline = FONTS.find(f => f.id === pairing.headlineFontId)!;
          const body = FONTS.find(f => f.id === pairing.bodyFontId)!;
          return (
            <div key={pairing.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/30">
                  <div className="mb-10">
                    <h2 style={{ fontFamily: headline.family }} className="text-5xl font-bold mb-4 leading-tight">
                      सपनों की उड़ान • Chasing Dreams
                    </h2>
                    <p style={{ fontFamily: body.family }} className="text-xl text-slate-600 leading-relaxed">
                      टाइपोग्राफी केवल शब्द नहीं है, यह एक एहसास है। Proper pairing between Hindi and English creates a cohesive reading experience for your audience.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {pairing.tags.map(tag => (
                      <span key={tag} className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full font-medium text-slate-600">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <span className="text-indigo-600">💡</span> Pairing Strategy
                    </h3>
                    <div className="text-slate-600 leading-relaxed mb-6 italic">
                      {insights[pairing.id] || pairing.description}
                    </div>
                    {!insights[pairing.id] && (
                      <button 
                        onClick={() => fetchInsight(pairing.id, headline.name, body.name)}
                        disabled={loading === pairing.id}
                        className="text-indigo-600 text-sm font-bold flex items-center gap-2 hover:underline disabled:opacity-50"
                      >
                        {loading === pairing.id ? 'Generating Insights...' : '✨ Get AI Analysis'}
                      </button>
                    )}
                  </div>
                  <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Headline</div>
                        <Link to={`/font/${headline.id}`} className="font-bold text-slate-800 hover:text-indigo-600 underline decoration-indigo-200">{headline.name}</Link>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Body</div>
                        <Link to={`/font/${body.id}`} className="font-bold text-slate-800 hover:text-indigo-600 underline decoration-indigo-200">{body.name}</Link>
                      </div>
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700">
                      Get Pair
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pairings;
