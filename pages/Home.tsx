
import React from 'react';
import { Link } from 'react-router-dom';
import { FONTS } from '../data';
import FontCard from '../components/FontCard';

const Home: React.FC = () => (
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

export default Home;
