
import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { FONTS, PAIRINGS } from './data';
import { Font, Script, Category } from './types';
import PreviewEngine from './components/PreviewEngine';
import FontCard from './components/FontCard';
import { getPairingInsights } from './geminiService';

// --- Shared Components ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">अ</div>
          <span className="font-bold text-xl tracking-tight text-slate-900">AKSHARA</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/library" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Library</Link>
          <Link to="/pairings" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pairings</Link>
          <Link to="/dev" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Developers</Link>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          Subscribe
        </button>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-white font-bold text-xs">अ</div>
        <span className="font-bold text-lg text-white">Akshara Typography</span>
      </div>
      <p className="max-w-md mx-auto mb-8">
        Beautiful Hindi-English typography that actually works together. Designed for the modern Indian web.
      </p>
      <div className="flex justify-center gap-6 mb-8">
        <button className="hover:text-white transition-colors">Twitter</button>
        <button className="hover:text-white transition-colors">Instagram</button>
        <button className="hover:text-white transition-colors">Dribbble</button>
      </div>
      <div className="text-sm border-t border-slate-800 pt-8">
        &copy; 2024 Akshara Typography Systems. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home = () => (
  <div>
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            The <span className="text-indigo-600 underline decoration-slate-200">Typography System</span> for Bilingual India.
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Stop struggling with mismatched fonts. Akshara provides curated Hindi-English font families and pairings built for designers and developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/library" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all text-lg shadow-xl shadow-indigo-100 text-center">
              Browse Font Library
            </Link>
            <Link to="/pairings" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all text-lg text-center">
              Explore Pairings
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none select-none overflow-hidden h-full flex items-center justify-center text-[40vw] font-bold leading-none">
        अ आ इ ई
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Fonts</h2>
            <p className="text-slate-500">Hand-picked for exceptional legibility and style.</p>
          </div>
          <Link to="/library" className="text-indigo-600 font-bold hover:underline">View All &rarr;</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FONTS.slice(0, 3).map(font => (
            <FontCard key={font.id} font={font} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

const Library = () => {
  const [activeScript, setActiveScript] = useState<Script | 'All'>('All');
  const [activeCat, setActiveCat] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');

  const filteredFonts = FONTS.filter(f => {
    const matchesScript = activeScript === 'All' || f.scripts.includes(activeScript as Script);
    const matchesCat = activeCat === 'All' || f.category === activeCat;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesScript && matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Font Library</h1>
        <p className="text-slate-500">Discover premium fonts optimized for Hindi and English scripts.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-bold mb-4 text-slate-800">Search</h3>
            <input 
              type="text" 
              placeholder="Search fonts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <h3 className="font-bold mb-4 text-slate-800">Script Support</h3>
            <div className="space-y-2">
              {['All', Script.HINDI, Script.ENGLISH, Script.MIXED].map(s => (
                <label key={s} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="script" 
                    checked={activeScript === s}
                    onChange={() => setActiveScript(s as any)}
                    className="accent-indigo-600"
                  />
                  <span className={`text-sm ${activeScript === s ? 'text-indigo-600 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{s}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-slate-800">Category</h3>
            <div className="space-y-2">
              {['All', Category.SANS, Category.SERIF, Category.DISPLAY, Category.UI].map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="cat" 
                    checked={activeCat === c}
                    onChange={() => setActiveCat(c as any)}
                    className="accent-indigo-600"
                  />
                  <span className={`text-sm ${activeCat === c ? 'text-indigo-600 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{c}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredFonts.length > 0 ? (
              filteredFonts.map(font => (
                <FontCard key={font.id} font={font} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-400">
                No fonts found matching your criteria.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const FontDetails = () => {
  const { id } = useParams();
  const font = FONTS.find(f => f.id === id);

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
          </div>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {font.description}
          </p>
          <div className="flex items-center gap-4">
            <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              {font.price === 0 ? 'Download Free' : `Buy License — ₹${font.price}`}
            </button>
            <button className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50">
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
        <h2 className="text-2xl font-bold mb-6">Live Preview Engine</h2>
        <PreviewEngine font={font} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="font-bold mb-2">Technical Specs</h3>
          <div className="text-sm space-y-2 text-slate-600">
            <p><strong>Glyph count:</strong> 1,200+</p>
            <p><strong>Formats:</strong> WOFF2, TTF, OTF</p>
            <p><strong>Hinting:</strong> Modern ClearType</p>
            <p><strong>Languages:</strong> Hindi, English, Sanskrit, Marathi</p>
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="font-bold mb-2">Designers Note</h3>
          <p className="text-sm text-slate-600 italic">
            "We focused on the vertical rhythm of Devanagari to ensure it pairs perfectly with the x-height of Latin characters."
          </p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="font-bold mb-2">Subsetting Recommended</h3>
          <p className="text-sm text-slate-600">
            Enable Devanagari subsetting for 40% smaller payload sizes on the web.
          </p>
        </div>
      </div>
    </div>
  );
};

const Pairings = () => {
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

const DevTools = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
    <p className="text-slate-500 mb-12 text-xl">Ready-to-use snippets and performance tips for bilingual font delivery.</p>

    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-6">Standard @font-face</h2>
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-sm overflow-x-auto">
          <pre>{`@font-face {
  font-family: 'AksharaHind';
  src: url('https://cdn.akshara.in/fonts/hind-v2.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9;
}`}</pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">CSS Custom Properties</h2>
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-sm overflow-x-auto">
          <pre>{`:root {
  --font-headline: 'AksharaRozha', 'AksharaHind', serif;
  --font-body: 'AksharaHind', 'Inter', sans-serif;
}

h1 { font-family: var(--font-headline); }
p { font-family: var(--font-body); }`}</pre>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span className="text-indigo-500">⚡</span> Performance Checklist
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex gap-2"><span>•</span> Use WOFF2 for smallest file sizes.</li>
            <li className="flex gap-2"><span>•</span> Implement <code>unicode-range</code> for script-specific loading.</li>
            <li className="flex gap-2"><span>•</span> Preload critical weights in <code>&lt;head&gt;</code>.</li>
            <li className="flex gap-2"><span>•</span> Use <code>font-display: swap</code> to prevent FOIT.</li>
          </ul>
        </div>
        <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span className="text-indigo-500">🌍</span> Subsetting Strategy
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Our API allows you to request only the characters you need for static landing pages.
          </p>
          <code className="text-[10px] bg-slate-100 p-2 rounded block">
            GET /api/v1/subset?font=hind&text=नमस्ते
          </code>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/font/:id" element={<FontDetails />} />
            <Route path="/pairings" element={<Pairings />} />
            <Route path="/dev" element={<DevTools />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
