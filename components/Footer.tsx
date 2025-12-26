
import React from 'react';

const Footer: React.FC = () => (
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

export default Footer;
