import React from 'react';
import { useTranslation } from 'react-i18next';
import { Megaphone } from 'lucide-react';

const NewsTicker = () => {
  const { t, i18n } = useTranslation();

  const newsItems = [
    i18n.language === 'mr' ? 'मालमत्ता कर भरण्यासाठी ५% सूट १५ जुलैपर्यंत उपलब्ध!' : '5% discount on property tax available until July 15!',
    i18n.language === 'mr' ? 'पावसाळ्यातील आपत्कालीन परिस्थितीसाठी हेल्पलाईन १४४२० वर संपर्क साधा.' : 'For monsoon emergencies, contact helpline 14420.',
    i18n.language === 'mr' ? 'नवीन स्मार्ट सिटी प्रकल्पाचे भूमिपूजन.' : 'Groundbreaking for the new Smart City project.',
    i18n.language === 'mr' ? 'घंटागाडी लोकेशनचा मागोवा घेण्यासाठी ट्रॅकिंग पोर्टल सुरू.' : 'Tracking portal launched for garbage collection vehicles.'
  ];

  return (
    <div className="bg-primary text-white flex items-center shadow-inner relative overflow-hidden h-10">
      {/* Label */}
      <div className="bg-primary px-4 py-2 font-bold flex items-center gap-2 z-10 whitespace-nowrap border-r border-white/20 h-full">
        <Megaphone size={16} className="text-yellow-400 animate-pulse" />
        {i18n.language === 'mr' ? 'ताज्या घडामोडी' : 'Latest Updates'}
      </div>
      
      {/* Scrolling Track */}
      <div className="flex-1 overflow-hidden relative h-full">
        <div className="absolute whitespace-nowrap animate-marquee flex items-center h-full">
          {newsItems.map((item, idx) => (
            <span key={idx} className="mx-8 text-sm flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
              {item}
            </span>
          ))}
          {/* Duplicate for seamless looping */}
          {newsItems.map((item, idx) => (
            <span key={`dup-${idx}`} className="mx-8 text-sm flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
