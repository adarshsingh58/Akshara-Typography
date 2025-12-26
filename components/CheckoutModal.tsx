
import React, { useState } from 'react';
import { Font, License } from '../types';
import { createLicenseSession, getSecureDownloadLink } from '../geminiService';

interface CheckoutModalProps {
  font: Font;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (license: License) => void;
}

type Step = 'payment' | 'provisioning' | 'ready' | 'error';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ font, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<Step>('payment');
  const [progress, setProgress] = useState(0);
  const [license, setLicense] = useState<License | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartPayment = async () => {
    setStep('provisioning');
    setProgress(0);
    
    // Simulate multi-step backend provisioning
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 95) {
          clearInterval(interval);
          return 95;
        }
        return p + 5;
      });
    }, 80);

    try {
      const result = await createLicenseSession(font.id, font.licenseType);
      clearInterval(interval);
      setProgress(100);

      if (result.success) {
        setLicense(result.license);
        setTimeout(() => {
          setStep('ready');
          onSuccess(result.license);
        }, 600);
      } else {
        setError(result.error || 'Provisioning failed');
        setStep('error');
      }
    } catch (e) {
      setError('Licensing server unreachable');
      setStep('error');
    }
  };

  const handleDownload = async () => {
    try {
      const result = await getSecureDownloadLink(font.id);
      if (result.error) {
        alert(result.message || result.error);
        return;
      }
      
      const link = document.createElement('a');
      link.href = result.url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("Download gateway error.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          {step === 'payment' && (
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 rotate-3">⚖️</div>
              <h2 className="text-2xl font-bold mb-2">License Acquisition</h2>
              <p className="text-slate-500 mb-8 text-sm">Assigning {font.licenseType} usage rights to <span className="font-bold text-slate-800">USR-AKSHARA-101</span>.</p>
              
              <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-500">Tier: {font.licenseType}</span>
                  <span className="font-bold">₹{font.price}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Tax Compliance (GST)</span>
                  <span>₹{Math.round(font.price * 0.18)}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-lg font-bold">
                  <span>Total Payable</span>
                  <span className="text-indigo-600">₹{Math.round(font.price * 1.18)}</span>
                </div>
              </div>

              <button 
                onClick={handleStartPayment}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl"
              >
                {font.price === 0 ? 'Accept Terms & Download' : 'Confirm Purchase'}
              </button>
              <p className="mt-4 text-[10px] text-slate-400">By clicking, you agree to the Akshara End User License Agreement (EULA).</p>
            </div>
          )}

          {step === 'provisioning' && (
            <div className="text-center py-12">
              <div className="relative w-20 h-20 mx-auto mb-8">
                 <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                 <div 
                   className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"
                 ></div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Identity Mapping</h2>
              <p className="text-slate-500 mb-8 text-sm">Fingerprinting asset for user traceability...</p>
              
              <div className="max-w-[200px] mx-auto bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {step === 'ready' && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">🔒</div>
              <h2 className="text-2xl font-bold mb-2">Securely Provisioned</h2>
              <p className="text-slate-500 mb-6 text-sm">Your license is active and traceable. Usage is limited to authorized domains.</p>
              
              <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left border border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">License ID</span>
                  <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-slate-200">{license?.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fingerprint</span>
                  <span className="font-mono text-[10px] text-indigo-600 truncate max-w-[140px]">{license?.fingerprint}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleDownload}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  Download Secured Package
                </button>
                <button 
                  onClick={onClose}
                  className="w-full text-slate-400 py-3 text-sm font-medium hover:text-slate-600 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold mb-2">Gatekeeper Rejection</h2>
              <p className="text-slate-500 mb-8">{error}</p>
              <button 
                onClick={() => setStep('payment')}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold"
              >
                Retry Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
