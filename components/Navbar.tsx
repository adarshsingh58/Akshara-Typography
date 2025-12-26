
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
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

export default Navbar;
