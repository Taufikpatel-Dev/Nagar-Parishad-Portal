import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, MonitorSmartphone, Eye, LogIn, UserCircle, Phone, MenuSquare, FileText, Download, Building, Home, LayoutDashboard, Volume2, Shield } from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const setFontScale = (scale) => {
    document.documentElement.style.setProperty('--fs-scale', scale);
  };

  const navLinks = [
    { label: 'मुखपृष्ठ', to: '/', icon: Home },
    { 
      label: 'आमच्याबद्दल', 
      icon: Building,
      children: [
        { label: 'इतिहास', to: '/about' },
        { label: 'मिशन आणि व्हिजन', to: '/about' },
        { label: 'अधिकारी', to: '/departments' }
      ]
    },
    { 
      label: 'नागरिक सेवा', 
      icon: LayoutDashboard,
      children: [
        { label: 'सर्व सेवा पहा', to: '/services' },
        { label: 'अर्जाची स्थिती', to: '/applications/track' },
        { label: 'प्रमाणपत्रे डाउनलोड', to: '/downloads' }
      ]
    },
    { label: 'विभाग', to: '/departments', icon: MenuSquare },
    { label: 'तक्रार निवारण', to: '/complaints', icon: Shield },
    { 
      label: 'माहिती', 
      icon: FileText,
      children: [
        { label: 'सूचना', to: '/notices' },
        { label: 'निविदा', to: '/tenders' },
        { label: 'RTI', to: '/about' }
      ]
    },
    { label: 'संपर्क', to: '/contact', icon: Phone },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm relative z-50">
      
      {/* Top Utility Bar */}
      <div className="bg-[#0F172A] text-slate-300 text-[0.75rem] font-medium py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span>महाराष्ट्र शासन | Government of Maharashtra</span>
            <span className="text-[#F97316]">नगर परिषद डिजिटल सेवा</span>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 border-r border-slate-700 pr-4">
              <span>अक्षराचा आकार:</span>
              <button onClick={() => setFontScale(0.9)} className="px-1.5 py-0.5 hover:text-white border border-slate-600 rounded bg-slate-800">अ-</button>
              <button onClick={() => setFontScale(1)} className="px-1.5 py-0.5 hover:text-white border border-slate-600 rounded bg-slate-800">अ</button>
              <button onClick={() => setFontScale(1.1)} className="px-1.5 py-0.5 hover:text-white border border-slate-600 rounded bg-slate-800">अ+</button>
            </div>
            
            <div className="flex items-center gap-3 border-r border-slate-700 pr-4">
              <button className="flex items-center gap-1 hover:text-white transition-colors" title="Screen Reader Access">
                <Volume2 size={14} /> Screen Reader
              </button>
              <button className="flex items-center gap-1 hover:text-white transition-colors" title="High Contrast">
                <Eye size={14} /> High Contrast
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => i18n.changeLanguage('mr')} className={`hover:text-white ${i18n.language === 'mr' ? 'text-[#F97316] font-bold' : ''}`}>मराठी</button>
              <span>|</span>
              <button onClick={() => i18n.changeLanguage('en')} className={`hover:text-white ${i18n.language === 'en' ? 'text-[#F97316] font-bold' : ''}`}>English</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-slate-100 py-3 md:py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          
          <Link to="/" className="flex items-center gap-3 md:gap-4 shrink-0">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
              <Building size={24} className="text-[#15803D]" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-[1.6rem] font-bold text-[#0F172A] leading-tight font-marathi">नगर परिषद डिजिटल सेवा</h1>
              <p className="text-xs md:text-sm text-slate-500 font-medium">नागरिकांच्या सेवेसाठी एक विश्वासार्ह डिजिटल व्यासपीठ</p>
            </div>
          </Link>

          <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto mt-2 md:mt-0 justify-end">
            <div className="relative hidden lg:block w-[300px]">
              <input 
                type="text" 
                placeholder="येथे शोधा..." 
                className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-[#15803D] transition-all"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            
            <div className="flex gap-2">
              <Link to="/login" className="gov-btn-primary flex items-center gap-2 text-sm !py-2 !px-4">
                <UserCircle size={18} />
                <span className="hidden sm:inline">Citizen Login</span>
                <span className="sm:hidden">Login</span>
              </Link>
              <Link to="/officer/dashboard" className="gov-btn-outline flex items-center gap-2 text-sm !py-2 !px-4">
                <Shield size={18} />
                <span className="hidden sm:inline">Officer Login</span>
              </Link>
            </div>
          </div>
          
        </div>
      </div>

      {/* Primary Navigation - Desktop */}
      <div className="bg-[#15803D] text-white hidden md:block border-b-4 border-[#F97316]">
        <nav className="max-w-7xl mx-auto flex items-center px-4 relative">
          {navLinks.map((link, idx) => (
            <div 
              key={idx}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.children ? (
                <button className="flex items-center gap-1.5 px-4 lg:px-5 py-3.5 text-[0.95rem] font-medium hover:bg-[#16A34A] transition-colors focus:bg-[#16A34A] focus:outline-none focus:ring-inset focus:ring-2 focus:ring-white">
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link to={link.to} className="flex items-center gap-1.5 px-4 lg:px-5 py-3.5 text-[0.95rem] font-medium hover:bg-[#16A34A] transition-colors focus:bg-[#16A34A] focus:outline-none focus:ring-inset focus:ring-2 focus:ring-white">
                  {link.label}
                </Link>
              )}
              
              {/* Mega Dropdown */}
              {link.children && activeDropdown === idx && (
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 shadow-xl rounded-b-lg overflow-hidden animate-slide-up z-50 text-slate-800">
                  <div className="py-2">
                    {link.children.map((child, cidx) => (
                      <Link 
                        key={cidx} 
                        to={child.to}
                        className="block px-5 py-2.5 text-[0.9rem] font-medium hover:bg-slate-50 hover:text-[#15803D] hover:pl-6 transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <button 
            className="ml-auto px-4 py-3.5 hover:bg-[#16A34A] transition-colors focus:outline-none"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </nav>
      </div>

      {/* Mobile Menu Toggle Button (Floating) */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#0F172A] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] z-[100] border-2 border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-transform active:scale-95"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Slide-out Drawer */}
      <div className={`md:hidden fixed inset-0 z-[90] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        
        <div className={`absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="bg-[#0F172A] text-white p-5">
            <h2 className="text-xl font-bold font-marathi">डिजिटल सेवा</h2>
            <p className="text-xs text-slate-400 mt-1">महाराष्ट्र शासन</p>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link, idx) => (
              <div key={idx} className="border-b border-slate-100 last:border-0">
                {link.children ? (
                  <>
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-5 py-3.5 text-[0.95rem] font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-3"><link.icon size={18} className="text-slate-400" /> {link.label}</span>
                      <ChevronDown size={18} className={`text-slate-400 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === idx && (
                      <div className="bg-slate-50 pb-2">
                        {link.children.map((child, cidx) => (
                          <Link 
                            key={cidx} 
                            to={child.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-12 py-2.5 text-sm font-medium text-slate-600 hover:text-[#15803D] hover:bg-slate-100 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link 
                    to={link.to} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 text-[0.95rem] font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <link.icon size={18} className="text-slate-400" /> {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-5 border-t border-slate-100 bg-slate-50 mt-auto">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="gov-btn-primary w-full flex items-center justify-center gap-2 mb-3">
              <UserCircle size={18} />
              Citizen Login
            </Link>
            <Link to="/officer/dashboard" onClick={() => setMobileMenuOpen(false)} className="gov-btn-outline w-full flex items-center justify-center gap-2 bg-white">
              <Shield size={18} />
              Officer Login
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
