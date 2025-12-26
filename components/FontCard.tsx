
import React from 'react';
import { Font } from '../types';
import { Link } from 'react-router-dom';

interface FontCardProps {
  font: Font;
}

const FontCard: React.FC<FontCardProps> = ({ font }) => {
  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6 h-48 flex items-center justify-center border-b border-slate-50 bg-slate-50/50">
        <div 
          style={{ fontFamily: font.family }}
          className="text-4xl text-center leading-tight truncate px-4"
        >
          अक्षरा {font.name.split(' ')[0]}
          <div className="text-xl opacity-60 mt-1">Abc 123</div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-800">{font.name}</h3>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${font.licenseType === 'OFL' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>
            {font.licenseType}
          </span>
        </div>
        <div className="flex gap-1 mb-3">
          {font.tone.slice(0, 2).map(t => (
            <span key={t} className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-semibold text-slate-900">
            {font.price === 0 ? 'Free' : `₹${font.price}`}
          </span>
          <Link 
            to={`/font/${font.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
          >
            Preview
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FontCard;
