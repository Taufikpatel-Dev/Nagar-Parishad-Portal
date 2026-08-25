import React from 'react';
import { useTranslation } from 'react-i18next';

const OfficialsSection = () => {
  const { t, i18n } = useTranslation();

  const officials = [
    {
      name: i18n.language === 'mr' ? 'श्री. रमेश बैस' : 'Shri. Ramesh Bais',
      role: i18n.language === 'mr' ? 'मा. राज्यपाल, महाराष्ट्र' : 'Hon. Governor, Maharashtra',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Governor_of_Maharashtra%._Shri._Ramesh_Bais_%281%29_%28cropped%29.jpg'
    },
    {
      name: i18n.language === 'mr' ? 'श्री. एकनाथ शिंदे' : 'Shri. Eknath Shinde',
      role: i18n.language === 'mr' ? 'मा. मुख्यमंत्री, महाराष्ट्र' : 'Hon. Chief Minister, Maharashtra',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Shri._Eknath_Shinde_2.jpg'
    },
    {
      name: i18n.language === 'mr' ? 'श्री. देवेंद्र फडणवीस' : 'Shri. Devendra Fadnavis',
      role: i18n.language === 'mr' ? 'मा. उपमुख्यमंत्री' : 'Hon. Deputy Chief Minister',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Devendra_Fadnavis_%28cropped%29.jpg'
    },
    {
      name: i18n.language === 'mr' ? 'श्री. विनायक कोंड्याल' : 'Shri. Vinayak Kondyal',
      role: i18n.language === 'mr' ? 'महापौर' : 'Mayor',
      image: null
    },
    {
      name: i18n.language === 'mr' ? 'डॉ. सचिन ओम्बासे' : 'Dr. Sachin Ombase',
      role: i18n.language === 'mr' ? 'आयुक्त' : 'Commissioner',
      image: null
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-800 shadow-md border-b-4 border-primary p-6 my-6 mx-4 md:mx-auto max-w-6xl rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white border-l-4 border-primary pl-3">
          {i18n.language === 'mr' ? 'प्रशासकीय नेतृत्व' : 'Administrative Leadership'}
        </h2>
        <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-orange-400 via-white to-green-600 rounded"></div>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-5 gap-4 md:gap-6 pb-4 no-scrollbar">
        {officials.map((official, idx) => (
          <div key={idx} className="shrink-0 w-36 md:w-auto snap-center flex flex-col items-center text-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer border md:border-none border-gray-100 dark:border-gray-700">
            <div className="w-20 h-20 mb-3 rounded-full border-2 border-primary overflow-hidden shadow-sm flex items-center justify-center bg-gray-200 text-gray-400 text-2xl font-bold">
              {official.image ? (
                <img src={official.image} alt={official.name} className="w-full h-full object-cover" />
              ) : (
                <span>{official.name.substring(0, 2)}</span>
              )}
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-tight">{official.name}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{official.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfficialsSection;
