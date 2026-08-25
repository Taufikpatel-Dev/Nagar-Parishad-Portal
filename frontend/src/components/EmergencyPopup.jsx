import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, X, PhoneCall } from 'lucide-react';

const EmergencyPopup = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show only once per session
    const hasSeenPopup = sessionStorage.getItem('hasSeenEmergencyPopup');
    if (!hasSeenPopup) {
      setIsOpen(true);
      sessionStorage.setItem('hasSeenEmergencyPopup', 'true');
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full shadow-2xl overflow-hidden animate-bounce-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-red-700 p-4 flex items-center justify-between">
          <div>
            <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
              {i18n.language === 'mr' ? 'जाहीर आवाहन' : 'Public Appeal'}
            </div>
            <h2 className="text-white text-lg font-bold flex items-center gap-2">
              <AlertTriangle size={20} />
              {i18n.language === 'mr' ? 'आपत्कालीन संपर्क क्रमांक' : 'Emergency Contact Numbers'}
            </h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-3 text-sm text-yellow-900 dark:text-yellow-200 shrink-0">
          {i18n.language === 'mr' ? (
            <p>पावसाळ्यात कोणतीही आपत्ती निर्माण झाल्यास खालील ठिकाणी <strong className="text-red-700 dark:text-red-400">संपर्क साधावा</strong> — सदर ठिकाणी <strong className="text-red-700 dark:text-red-400">२४ तास</strong> यंत्रणा कार्यरत आहे.</p>
          ) : (
            <p>In case of any disaster during monsoon, <strong className="text-red-700 dark:text-red-400">contact immediately</strong>. Services are operational <strong className="text-red-700 dark:text-red-400">24/7</strong>.</p>
          )}
        </div>

        {/* Contacts Grid */}
        <div className="p-4 md:p-5 overflow-y-auto">
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
              <div className="bg-red-100 dark:bg-red-800 p-2 rounded-lg text-red-700 dark:text-red-300">
                <PhoneCall size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {i18n.language === 'mr' ? 'नगर अभियंता कार्यालय' : 'City Engineer Office'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {i18n.language === 'mr' ? 'इमारत पडणे, झाड पडणे, पाणी साचणे' : 'Building/Tree Collapse, Waterlogging'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-px bg-gray-200 dark:bg-gray-700">
              <div className="bg-white dark:bg-gray-800 p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{i18n.language === 'mr' ? 'टोल फ्री नं.' : 'Toll Free'}</p>
                <p className="font-bold text-green-700 dark:text-green-400">1800-233-1914</p>
                <p className="font-bold text-green-700 dark:text-green-400">1800-233-1916</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{i18n.language === 'mr' ? 'मोबाईल नं.' : 'Mobile'}</p>
                <p className="font-bold text-primary dark:text-blue-400">9423991653</p>
                <p className="font-bold text-primary dark:text-blue-400">9423993906</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 rounded-lg transition-colors"
          >
            {i18n.language === 'mr' ? 'बंद करा (Close)' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmergencyPopup;
