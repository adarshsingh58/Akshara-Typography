
import React, { useState } from 'react';
import { Font, PreviewContext } from '../types';

interface PreviewEngineProps {
  font: Font;
}

const SAMPLE_TEXTS = {
  mixed: "नमस्ते, Welcome to the world of curated typography. सही फॉन्ट का चुनाव आपकी वेबसाइट की पहचान बदल सकता है।",
  hindi: "भारतीय भाषाओं के लिए बेहतरीन टाइपोग्राफी। अक्षरा के साथ अपनी कहानी को एक नया मोड़ दें।",
  english: "High-quality Hindi and English fonts. Elevate your digital products with professional pairings."
};

const PreviewEngine: React.FC<PreviewEngineProps> = ({ font }) => {
  const [text, setText] = useState(SAMPLE_TEXTS.mixed);
  const [size, setSize] = useState(24);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [weight, setWeight] = useState(font.weights[0]);
  const [context, setContext] = useState<PreviewContext>('blog');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const containerClasses = theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900';

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['mixed', 'hindi', 'english'].map((type) => (
            <button
              key={type}
              onClick={() => setText(SAMPLE_TEXTS[type as keyof typeof SAMPLE_TEXTS])}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white border border-slate-200 hover:border-indigo-500 transition-colors capitalize"
            >
              {type}
            </button>
          ))}
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Size</span>
            <input 
              type="range" min="12" max="120" value={size} 
              onChange={(e) => setSize(Number(e.target.value))} 
              className="w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div className="flex items-center gap-2">
             <span className="text-xs text-slate-500">Weight</span>
             <select 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="text-xs border border-slate-200 rounded px-2 py-1"
             >
               {font.weights.map(w => <option key={w} value={w}>{w}</option>)}
             </select>
          </div>
          <button 
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="p-1.5 rounded-full hover:bg-slate-200"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      <div className={`${containerClasses} p-8 min-h-[400px] font-preview-container flex flex-col items-center justify-center`}>
        {context === 'blog' && (
          <div className="max-w-2xl w-full">
            <h1 style={{ fontFamily: font.family, fontSize: `${size * 1.5}px`, fontWeight: 700, lineHeight: 1.2 }} className="mb-4">
              यह एक शीर्षक है • This is a Headline
            </h1>
            <textarea
              className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
              style={{ fontFamily: font.family, fontSize: `${size}px`, fontWeight: weight, lineHeight: lineHeight }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center gap-4">
        {(['blog', 'landing', 'mobile', 'ui'] as PreviewContext[]).map((ctx) => (
          <button
            key={ctx}
            onClick={() => setContext(ctx)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${context === ctx ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            {ctx.charAt(0).toUpperCase() + ctx.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreviewEngine;
