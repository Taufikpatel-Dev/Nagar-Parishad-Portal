import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Phone, PhoneCall, MessageCircle, LogIn, User, Menu, X } from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { municipalities, currentMunicipality, setCurrentMunicipality } = useMunicipality();
  const { session } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Font scale logic
  const changeFontScale = (scale) => {
    document.documentElement.style.setProperty('--font-scale', scale);
  };

  const toggleHighContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'mr' ? 'en' : 'mr';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark-mode');
  };

  const handleScreenReader = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      } else {
        const textToRead = document.getElementById('main-content')?.innerText || "No content found to read.";
        const utterance = new SpeechSynthesisUtterance(textToRead);
        // Set language based on current i18n
        utterance.lang = i18n.language === 'mr' ? 'mr-IN' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  if (!currentMunicipality) return null;

  return (
    <header className="w-full shadow-md z-50 bg-white dark:bg-gray-800 transition-colors sticky top-0">
      {/* Top Utility & A11y Bar */}
      <div className="bg-primary text-white text-xs sm:text-sm px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        <div className="flex gap-4 items-center w-full md:w-auto justify-center md:justify-start">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute p-1 bg-white text-primary rounded">{t('header.skipToContent')}</a>
          <span className="inline-flex items-center gap-1"><Phone size={14}/> {currentMunicipality.helpline_number}</span>
          <span className="inline-flex items-center gap-1"><PhoneCall size={14}/> {currentMunicipality.toll_free_number}</span>
        </div>
        
        <div className="flex gap-3 items-center w-full md:w-auto justify-center md:justify-end shrink-0">
          {/* Accessibility Controls */}
          <div className="flex bg-white/10 rounded overflow-hidden">
            <button onClick={() => changeFontScale(0.875)} className="px-2 py-1 hover:bg-white/20 border-r border-white/20" title="Decrease Font">A-</button>
            <button onClick={() => changeFontScale(1)} className="px-2 py-1 hover:bg-white/20 border-r border-white/20" title="Normal Font">A</button>
            <button onClick={() => changeFontScale(1.125)} className="px-2 py-1 hover:bg-white/20" title="Increase Font">A+</button>
          </div>
          
          <button onClick={toggleHighContrast} className="hover:bg-black/20 px-2 py-1 rounded border border-white/20" title="High Contrast">
            ◐ Contrast
          </button>

          {/* Screen Reader Button */}
          <button onClick={handleScreenReader} className="hover:bg-black/20 px-2 py-1 rounded border border-white/20" title="Screen Reader / Read Aloud">
            🔊 {i18n.language === 'mr' ? 'वाचा' : 'Read'}
          </button>

          <button onClick={toggleLanguage} className="hover:underline font-bold px-2 py-1 border-l pl-3 ml-1 border-white/20">
            {i18n.language === 'mr' ? 'English' : 'मराठी'}
          </button>
          <button onClick={toggleTheme} className="hover:bg-black/20 px-2 py-1 rounded border border-white/20" aria-label={t('header.themeToggle')} title="Dark Mode">
            🌗
          </button>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-primary dark:text-white p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo and Title */}
        <div className="flex items-center gap-3 flex-1 justify-center md:justify-start">
          {currentMunicipality.logo_url && (
            <img src={currentMunicipality.logo_url} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain bg-gray-100 rounded-full" />
          )}
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-primary dark:text-white leading-tight">
              {i18n.language === 'mr' ? currentMunicipality.name_mr : currentMunicipality.name_en}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Government of Maharashtra</p>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <select 
            className="border p-2 rounded text-sm bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary"
            value={currentMunicipality.id}
            onChange={(e) => {
              const selected = municipalities.find(m => m.id === e.target.value);
              setCurrentMunicipality(selected);
            }}
          >
            {municipalities.map(m => (
              <option key={m.id} value={m.id}>
                {i18n.language === 'mr' ? m.name_mr : m.name_en}
              </option>
            ))}
          </select>

          {session ? (
             <Link to="/dashboard" className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded shadow hover:bg-opacity-90">
               <User size={18} /> {t('header.dashboard')}
             </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-1 border border-primary text-primary px-4 py-2 rounded shadow hover:bg-primary hover:text-white transition">
               <LogIn size={18} /> {t('header.login')}
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Secondary Nav Bar */}
      <div className="bg-gray-50 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 hidden md:block">
        <div className="container mx-auto px-4 py-2 flex gap-6 text-sm font-semibold text-gray-700 dark:text-gray-200">
          <Link to="/" className="hover:text-primary transition">{t('home.title', 'Home')}</Link>
          <Link to="#" className="hover:text-primary transition">Corporation</Link>
          <Link to="#" className="hover:text-primary transition">Administration</Link>
          <Link to="#" className="hover:text-primary transition">Right To Information</Link>
          <Link to="#" className="hover:text-primary transition">Right to Services</Link>
          <Link to="#" className="hover:text-primary transition">Publications</Link>
          <Link to="#" className="hover:text-primary transition">Contact</Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-xl border-t border-gray-200 dark:border-gray-700 flex flex-col py-2 z-50 animate-slide-down">
          
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Select City:</span>
            <select 
              className="border p-2 rounded text-sm bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 w-3/5"
              value={currentMunicipality.id}
              onChange={(e) => {
                const selected = municipalities.find(m => m.id === e.target.value);
                setCurrentMunicipality(selected);
                setMobileMenuOpen(false);
              }}
            >
              {municipalities.map(m => (
                <option key={m.id} value={m.id}>
                  {i18n.language === 'mr' ? m.name_mr : m.name_en}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col text-base font-semibold text-gray-800 dark:text-gray-200">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-50 dark:border-gray-700">{t('home.title', 'Home')}</Link>
            <Link to="#" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-50 dark:border-gray-700">Corporation</Link>
            <Link to="#" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-50 dark:border-gray-700">Right to Services</Link>
            <Link to="#" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">Contact</Link>
          </div>

          <div className="px-4 py-4 mt-2 border-t border-gray-100 dark:border-gray-700">
            {session ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg shadow font-bold w-full">
                <User size={20} /> {t('header.dashboard')}
              </Link>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 border-2 border-primary text-primary dark:text-white dark:border-white px-4 py-3 rounded-lg shadow font-bold w-full">
                <LogIn size={20} /> {t('header.login')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
