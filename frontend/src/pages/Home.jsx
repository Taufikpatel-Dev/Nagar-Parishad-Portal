import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { FileText, Droplet, FileSignature, Landmark, HelpCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import NewsTicker from '../components/NewsTicker';
import OfficialsSection from '../components/OfficialsSection';
import EmergencyPopup from '../components/EmergencyPopup';

// Animation variants
const pageVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Home = () => {
  const { t } = useTranslation();
  const { currentMunicipality } = useMunicipality();

  if (!currentMunicipality) return <div className="p-8 text-center">Loading...</div>;

  const services = [
    { icon: <Landmark size={32} className="text-primary" />, title: t('services.propertyTax'), sla: 30, link: '/services/property-tax' },
    { icon: <Activity size={32} className="text-primary" />, title: t('services.complaint'), sla: 7, link: '/services/complaint' },
    { icon: <FileSignature size={32} className="text-primary" />, title: t('services.certificate'), sla: 15, link: '/services/certificate' },
    { icon: <Droplet size={32} className="text-primary" />, title: t('services.waterBill'), sla: 30, link: '/services/water-bill' },
    { icon: <FileText size={32} className="text-primary" />, title: t('services.tradeLicense'), sla: 21, link: '/services/trade-license' },
    { icon: <HelpCircle size={32} className="text-primary" />, title: t('services.trackStatus'), sla: 0, link: '/track' },
  ];

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariant}
    >
      <EmergencyPopup />
      <Header />
      <NewsTicker />
      
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <motion.div variants={itemVariant} className="bg-gradient-to-r from-primary to-gray-800 text-white py-12 md:py-16 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">{t('hero.tagline')}</h2>
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto px-2">
            Experience seamless digital civic services from the comfort of your home. 
            Fast, transparent, and efficient governance.
          </p>
        </motion.div>

        {/* Quick Services Grid */}
        <motion.div variants={itemVariant} className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {services.map((svc, idx) => (
              <a 
                key={idx} 
                href={svc.link}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all border-t-4 border-primary"
              >
                <div className="bg-gray-50 dark:bg-gray-700 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                  {svc.icon}
                </div>
                <h3 className="text-sm md:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{svc.title}</h3>
                
                {svc.sla > 0 && (
                  <div className="mt-auto pt-2 md:pt-4 w-full">
                    <span className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 text-[10px] md:text-xs px-1 md:px-2 py-1 rounded font-medium border border-yellow-200 dark:border-yellow-700/50">
                      सेवा हमी: {t('services.sla', { days: svc.sla })}
                    </span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Stats Strip */}
        <motion.div variants={itemVariant} className="bg-white dark:bg-gray-800 py-10 md:py-12 mt-12 md:mt-16 border-y border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-primary">Nagar Parishad at a Glance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">12,450+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 md:mt-2">Citizens Served</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">8,920</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 md:mt-2">Complaints Resolved</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">3 Days</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 md:mt-2">Avg Resolution Time</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">{currentMunicipality.ward_count}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 md:mt-2">Active Wards</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Leadership Section */}
        <motion.div variants={itemVariant}>
          <OfficialsSection />
        </motion.div>
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; 2026 {currentMunicipality.name_en}. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
