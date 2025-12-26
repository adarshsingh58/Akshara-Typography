
import React from 'react';

const DevTools: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
    <p className="text-slate-500 mb-12 text-xl">Implement domain-bound delivery and traceable assets.</p>

    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">Domain-Bound Webfont</h2>
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Recommended for Web</span>
        </div>
        <p className="text-slate-600 mb-4 text-sm">
          Akshara's Web Tier delivery checks the <code>Origin</code> of the request. No tokens are needed in the URL, preventing leakage while enforcing license compliance via CORS.
        </p>
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-sm overflow-x-auto border-4 border-slate-800">
          <pre>{`@font-face {
  font-family: 'AksharaHind';
  /* Managed delivery with domain verification */
  src: url('https://api.akshara.in/webfonts/hind/regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}`}</pre>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">Traceable Asset Download</h2>
          <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">App / Print Tier</span>
        </div>
        <p className="text-slate-600 mb-4 text-sm">
          Downloads are gated by identity and license checks. The API generates a single-use timed link for the requester.
        </p>
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-sm overflow-x-auto">
          <pre>{`// 1. Authenticate with your Identity Token
// 2. Request delivery endpoint
const { url } = await fetch('/api/delivery/hind_bold', {
  headers: { 'Authorization': 'Bearer YOUR_UID' }
}).then(r => r.json());

// 3. Link is valid for 60 seconds
window.location.href = url;`}</pre>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm border-l-4 border-l-indigo-600">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span className="text-indigo-500">🛡️</span> Security Headers
          </h3>
          <p className="text-xs text-slate-600 space-y-2">
            Our gateway strictly enforces:
            <br/><br/>
            <code>Access-Control-Allow-Origin</code> matching your license.
            <br/><br/>
            <code>X-Content-Type-Options: nosniff</code>
          </p>
        </div>
        <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm border-l-4 border-l-green-600">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span className="text-green-500">📜</span> Legal Audit Trail
          </h3>
          <p className="text-xs text-slate-600">
            Every webfont fetch and asset download is logged with IP and Referer data. In the event of license misuse, specific fingerprints can be revoked instantly.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DevTools;
