
import React from 'react';

const DevTools: React.FC = () => (
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

export default DevTools;
