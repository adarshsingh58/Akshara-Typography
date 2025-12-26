
import React, { useState } from 'react';
import { FONTS } from '../data';
import { Script, Category } from '../types';
import FontCard from '../components/FontCard';

const Library: React.FC = () => {
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

export default Library;
