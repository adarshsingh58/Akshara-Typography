
import React, { useState, useEffect } from 'react';
import { Font } from '../types';
import { createLicenseSession, getDownloadLink } from '../geminiService';

interface CheckoutModalProps {
  font: Font;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (licenseId: string) => void;
}

type Step = 'payment' | 'provisioning' | 'download';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ font, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<Step>('payment');
  const [progress, setProgress] = useState(0);
  const [license, setLicense] = useState<any>(null);

  if (!isOpen) return null;

  const handleStartPayment = async () => {
    setStep('provisioning');
    
    // Simulate Progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 5;
      });
    }, 100);

    const result = await createLicenseSession(font.id, font.licenseType);
    if (result.success) {
      setLicense(result.license);
      setTimeout(() => {
        setStep('download');
        onSuccess(result.license.id);
      }, 2000);
    }
  };

  const handleDownload = async () => {
    const { downloadUrl, filename } = await getDownloadLink(font.id);
    // Simulate real download trigger
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          {step === 'payment' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">🛒</div>
              <h2 className="text-2xl font-bold mb-2">Checkout</h2>
              <p className="text-slate-500 mb-8">Confirm your {font.licenseType} license for <span className="font-bold text-slate-800">{font.name}</span>.</p>
              
              <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-500">License Fee</span>
                  <span className="font-bold">₹{font.price}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(font.price * 0.18)}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-indigo-600">₹{Math.round(font.price * 1.18)}</span>
                </div>
              </div>

              <button 
                onClick={handleStartPayment}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
              >
                {font.price === 0 ? 'Download Now' : 'Pay & Provision License'}
              </button>
            </div>
          )}

          {step === 'provisioning' && (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold mb-2">Provisioning Assets</h2>
              <p className="text-slate-500 mb-8">Signing font binaries and generating license keys...</p>
              
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {step === 'download' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✅</div>
              <h2 className="text-2xl font-bold mb-2">Ready to Install</h2>
              <p className="text-slate-500 mb-8">License generated successfully for <span className="font-bold text-slate-800">{font.name}</span>.</p>
              
              <div className="bg-green-50 rounded-2xl p-4 mb-8 font-mono text-xs text-green-700 border border-green-100 break-all">
                {license?.id}
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleDownload}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  <span>⬇️</span> Download .WOFF2 Package
                </button>
                <button 
                  onClick={onClose}
                  className="w-full text-slate-500 py-3 text-sm font-medium hover:text-slate-800"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
