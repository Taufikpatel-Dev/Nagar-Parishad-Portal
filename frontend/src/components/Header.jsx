import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, ChevronRight, Phone, Volume2, LogIn, User, FileText, MessageCircle, Home, Building2, ClipboardList, Newspaper, HandHelping, Users, Download, PhoneCall } from 'lucide-react';

const navItems = [
  { label: 'मुख्यपृष्ठ', labelEn: 'Home', icon: Home, to: '/' },
  {
    label: 'महानगरपालिका', labelEn: 'Corporation', icon: Building2,
    children: [
      { label: 'आमच्याबद्दल', labelEn: 'About Us', to: '/about' },
      { label: 'ध्येय-दृष्टिकोन', labelEn: 'Mission & Vision', to: '/page/mission' },
      { label: 'शहर माहिती', labelEn: 'City Info', to: '/page/city-info' },
      { label: 'इतिहास', labelEn: 'History', to: '/page/history' },
      { label: 'भूमिका-कार्ये', labelEn: 'Roles & Functions', to: '/page/roles' },
      { label: 'कोण काय आहे', labelEn: 'Who is Who', to: '/page/who-is-who' },
      { label: 'दृष्टीक्षेपात', labelEn: 'At a Glance', to: '/page/at-a-glance' },
      { label: 'सार्वजनिक सुट्ट्या', labelEn: 'Public Holidays', to: '/page/holidays' },
    ]
  },
  {
    label: 'प्रशासन', labelEn: 'Administration', icon: ClipboardList,
    children: [
      { label: 'ठराव', labelEn: 'Resolutions', to: '/page/resolutions' },
      { label: 'अर्थसंकल्प', labelEn: 'Budget', to: '/page/budget' },
      { label: 'लेखापरीक्षण अहवाल', labelEn: 'Audit Reports', to: '/page/audit' },
      { label: 'ताळेबंद', labelEn: 'Balance Sheet', to: '/page/balance-sheet' },
      { label: 'शहर विकास आराखडा', labelEn: 'City Dev Plan', to: '/page/city-dev-plan' },
      { label: 'कार्यालयीन आदेश', labelEn: 'Office Orders', to: '/page/office-orders' },
    ]
  },
  {
    label: 'माहिती अधिकार', labelEn: 'RTI', icon: Newspaper,
    children: [
      { label: 'माहिती अधिकार कायदा', labelEn: 'RTI Act', to: '/page/rti' },
      { label: 'कलम ४ माहिती', labelEn: 'Section 4 Info', to: '/page/section4' },
    ]
  },
  {
    label: 'सेवेचा अधिकार', labelEn: 'Right to Services', icon: HandHelping,
    children: [
      { label: 'सेवा हमी कायदा', labelEn: 'Service Guarantee Act', to: '/page/rts' },
      { label: 'नागरिक सनद', labelEn: 'Citizen Charter', to: '/page/citizen-charter' },
    ]
  },
  {
    label: 'नागरिक', labelEn: 'Citizens', icon: Users,
    children: [
      { label: 'मालमत्ता कर', labelEn: 'Property Tax', to: '/services/property-tax' },
      { label: 'तक्रार नोंदवा', labelEn: 'Register Complaint', to: '/services/complaint' },
      { label: 'पाणी बिल', labelEn: 'Water Bill', to: '/services/water-bill' },
      { label: 'जन्म/मृत्यू दाखला', labelEn: 'Certificate', to: '/services/certificate' },
      { label: 'व्यवसाय परवाना', labelEn: 'Trade License', to: '/services/trade-license' },
      { label: 'स्थिती तपासा', labelEn: 'Track Status', to: '/track' },
    ]
  },
  {
    label: 'प्रकाशन', labelEn: 'Publications', icon: Download,
    children: [
      { label: 'ई-न्यूज', labelEn: 'E-News', to: '/page/e-news' },
      { label: 'भरती', labelEn: 'Recruitment', to: '/page/recruitment' },
      { label: 'उपलब्धी', labelEn: 'Achievements', to: '/page/achievements' },
      { label: 'नवीन काय आहे', labelEn: 'What\'s New', to: '/page/whats-new' },
    ]
  },
  {
    label: 'संपर्क', labelEn: 'Contact', icon: PhoneCall,
    children: [
      { label: 'मनपा संपर्क', labelEn: 'Municipal Contact', to: '/page/contact' },
    ]
  },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const { municipalities, currentMunicipality, setCurrentMunicipality } = useMunicipality();
  const { session } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  const isMr = i18n.language === 'mr';

  const setFontScale = (s) => document.documentElement.style.setProperty('--fs-scale', s);

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(isMr ? 'en' : 'mr');
  };

  if (!currentMunicipality) return null;

  return (
    <>
      {/* Layer 1: Accessibility Bar */}
      <div className="a11y-bar" role="toolbar" aria-label="Accessibility Controls">
        <span className="ab-label">अक्षर</span>
        <div className="ab-group">
          <button className="ab-btn" onClick={() => setFontScale(0.875)}>अ-</button>
          <button className="ab-btn active" onClick={() => setFontScale(1)}>अ</button>
          <button className="ab-btn" onClick={() => setFontScale(1.125)}>अ+</button>
        </div>
        <div className="ab-sep" />
        <span className="ab-label">थीम</span>
        <div className="ab-group">
          <button className="ab-btn active" onClick={() => setTheme('light')}>☀ हलकी</button>
          <button className="ab-btn" onClick={() => setTheme('dark')}>☾ डार्क</button>
        </div>
        <div className="ab-sep" />
        <div className="ab-group">
          <button className="ab-btn" onClick={toggleLanguage}>
            🌐 {isMr ? 'English' : 'मराठी'}
          </button>
        </div>
      </div>

      {/* Layer 2: Top Strip */}
      <div className="top-strip">
        <div className="top-emergency">
          <span><Phone size={14} /> {currentMunicipality.helpline_number || '02186-222222'}</span>
          <span><Phone size={14} /> {currentMunicipality.toll_free_number || '1800-222-1111'}</span>
        </div>
        <div className="top-actions">
          <button className="ta-btn" onClick={toggleLanguage}>
            🌐 {isMr ? 'English' : 'मराठी'}
          </button>
        </div>
      </div>

      {/* Layer 3: Main Header */}
      <header className="main-header">
        <div className="mh-inner">
          <div className="logo-wrap">
            <Link to="/" className="logo-img">
              {currentMunicipality.logo_url ? (
                <img src={currentMunicipality.logo_url} alt="Logo" />
              ) : (
                <span style={{color:'#fff',fontSize:'1.5rem',fontWeight:800}}>
                  {(currentMunicipality.code || 'NP').substring(0,2).toUpperCase()}
                </span>
              )}
            </Link>
            <div className="logo-text">
              <h1>{isMr ? currentMunicipality.name_mr : currentMunicipality.name_en}</h1>
              <p>महाराष्ट्र सरकार</p>
            </div>
          </div>

          <div style={{position:'relative',maxWidth:420,width:'100%'}}>
            <div className="hdr-search">
              <input type="search" placeholder={isMr ? 'सेवा, निविदा, बातम्या शोधा…' : 'Search services, tenders…'} />
              <button><Search size={18} /></button>
            </div>
          </div>

          <div className="hdr-actions">
            {session ? (
              <Link to="/dashboard" className="ha-btn">
                <User size={18} /> <span>{isMr ? 'डॅशबोर्ड' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link to="/login" className="ha-btn">
                <LogIn size={18} /> <span>{isMr ? 'लॉगिन' : 'Login'}</span>
              </Link>
            )}
            <Link to="/services/complaint" className="ha-btn">
              <MessageCircle size={18} /> <span>{isMr ? 'तक्रार' : 'Complaint'}</span>
            </Link>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="nav-bar" aria-label="Primary Navigation">
          <div className="nav-inner">
            <ul className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
              {navItems.map((item, i) => (
                <li key={i}
                  onClick={() => {
                    if (item.children && mobileMenuOpen) {
                      setOpenMobileSubmenu(openMobileSubmenu === i ? null : i);
                    }
                  }}
                  className={openMobileSubmenu === i ? 'open' : ''}
                >
                  {item.to && !item.children ? (
                    <Link to={item.to} onClick={() => setMobileMenuOpen(false)}>
                      {item.icon && <item.icon size={15} />}
                      {isMr ? item.label : item.labelEn}
                    </Link>
                  ) : (
                    <a href="#" onClick={e => e.preventDefault()}>
                      {item.icon && <item.icon size={15} />}
                      {isMr ? item.label : item.labelEn}
                      <ChevronDown size={12} />
                    </a>
                  )}
                  {item.children && (
                    <ul className="submenu">
                      {item.children.map((child, j) => (
                        <li key={j}>
                          <Link to={child.to} onClick={() => setMobileMenuOpen(false)}>
                            <ChevronRight size={14} />
                            {isMr ? child.label : child.labelEn}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <button className="mob-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
