import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { Link } from 'react-router-dom';
import { Landmark, Activity, FileSignature, Droplet, FileText, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import OfficialsSection from '../components/OfficialsSection';
import EmergencyPopup from '../components/EmergencyPopup';

const heroSlides = [
  {
    titleMr: 'अभिमानाने नागरिकांची\nसेवा करत आहोत',
    titleEn: 'Proudly Serving\nOur Citizens',
    descMr: 'तुमचा विश्वासू नगरसेवा भागीदार — कार्यक्षम, पारदर्शक आणि प्रवेशयोग्य नागरी सेवा पुरवत आहे.',
    descEn: 'Your trusted civic services partner — delivering efficient, transparent, and accessible governance.',
    btnLabel: 'ऑनलाइन सेवा →',
    btnLabelEn: 'Online Services →',
    btnLink: '/services/property-tax',
    bg: 'linear-gradient(135deg, #00204A 0%, #1A5F7A 60%, #57C5B6 100%)',
  },
  {
    titleMr: 'डिजिटल इंडिया,\nस्मार्ट नगरपरिषद',
    titleEn: 'Digital India,\nSmart Municipality',
    descMr: 'अखंड डिजिटल सेवांचा अनुभव घ्या — कर भरा, तक्रार नोंदवा, सेवांचा मागोवा घ्या सर्व ऑनलाइन.',
    descEn: 'Experience seamless digital services — pay taxes, file complaints, track services — all online.',
    btnLabel: 'मालमत्ता कर भरा →',
    btnLabelEn: 'Pay Property Tax →',
    btnLink: '/services/property-tax',
    bg: 'linear-gradient(135deg, #1A5F7A 0%, #00204A 60%, #0D1B2A 100%)',
  },
  {
    titleMr: 'पारदर्शक आणि\nजबाबदार प्रशासन',
    titleEn: 'Transparent &\nAccountable Governance',
    descMr: 'माहिती अधिकार, ठराव, अंदाजपत्रके — सर्व नागरिकांसाठी सार्वजनिक.',
    descEn: 'RTI information, resolutions, budgets — all public for every citizen.',
    btnLabel: 'तक्रार नोंदवा →',
    btnLabelEn: 'Register Complaint →',
    btnLink: '/services/complaint',
    bg: 'linear-gradient(135deg, #0D1B2A 0%, #1A5F7A 50%, #57C5B6 100%)',
  },
];

const tickerItems = [
  { text: 'मालमत्ता कर ऑनलाइन भरा — सवलतीची शेवटची तारीख ३१ मार्च', isNew: true },
  { text: 'पाणीपुरवठा वेळापत्रक अद्ययावत केले आहे' },
  { text: 'नवीन तक्रार निवारण प्रणाली सुरू — ७ दिवसांत हमी निराकरण' },
  { text: 'जन्म/मृत्यू दाखले आता ऑनलाइन उपलब्ध' },
];

const pageVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const { currentMunicipality } = useMunicipality();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMr = i18n.language === 'mr';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!currentMunicipality) return <div style={{padding:32,textAlign:'center'}}>Loading...</div>;

  const services = [
    { icon: <Landmark size={28} />, title: t('services.propertyTax'), sla: 30, link: '/services/property-tax', color: '#FF6B1A' },
    { icon: <Activity size={28} />, title: t('services.complaint'), sla: 7, link: '/services/complaint', color: '#ef4444' },
    { icon: <FileSignature size={28} />, title: t('services.certificate'), sla: 15, link: '/services/certificate', color: '#8b5cf6' },
    { icon: <Droplet size={28} />, title: t('services.waterBill'), sla: 30, link: '/services/water-bill', color: '#0ea5e9' },
    { icon: <FileText size={28} />, title: t('services.tradeLicense'), sla: 21, link: '/services/trade-license', color: '#10b981' },
    { icon: <HelpCircle size={28} />, title: t('services.trackStatus'), sla: 0, link: '/track', color: '#6366f1' },
  ];

  return (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={pageVariant}>
      <EmergencyPopup />

      {/* Hero Slider */}
      <section className="hero-slider">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`hero-slide ${i === currentSlide ? 'active' : ''}`} style={{background: slide.bg}}>
            <div className="slide-overlay">
              <div className="slide-text">
                <h2 style={{whiteSpace:'pre-line'}}>{isMr ? slide.titleMr : slide.titleEn}</h2>
                <p>{isMr ? slide.descMr : slide.descEn}</p>
                <div className="hero-btns">
                  <Link to={slide.btnLink} className="hero-btn-primary">
                    {isMr ? slide.btnLabel : slide.btnLabelEn}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button className="slide-nav-btn prev" onClick={() => setCurrentSlide(p => (p - 1 + heroSlides.length) % heroSlides.length)}>
          <ChevronLeft size={22} />
        </button>
        <button className="slide-nav-btn next" onClick={() => setCurrentSlide(p => (p + 1) % heroSlides.length)}>
          <ChevronRight size={22} />
        </button>
        <div className="slide-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`slide-dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)} />
          ))}
        </div>
      </section>

      {/* News Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-label">
          <span className="dot-indicator" />
          {isMr ? 'ताज्या घडामोडी' : 'Latest Updates'}
        </div>
        <div className="ticker-track">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="ticker-item">
                <a href="#">
                  {item.text}
                  {item.isNew && <span className="new-badge">NEW</span>}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Officials */}
      <OfficialsSection />

      {/* Services Section */}
      <div className="section-title-wrap">
        <h2 className="section-title">{isMr ? 'नागरिक सेवा' : 'Citizen Services'}</h2>
        <div className="section-divider" />
      </div>
      <div className="services-grid">
        {services.map((svc, idx) => (
          <Link key={idx} to={svc.link} className="service-card">
            <div className="icon" style={{color: svc.color, background: `${svc.color}15`}}>
              {svc.icon}
            </div>
            <h3>{svc.title}</h3>
            {svc.sla > 0 && (
              <span className="sla">
                {isMr ? `सेवा हमी: ${svc.sla} दिवसांत` : `SLA: ${svc.sla} days`}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Stats Strip */}
      <div style={{background:'var(--surface)',padding:'48px 1.5rem',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div className="section-title-wrap" style={{margin:'0 0 32px'}}>
          <h2 className="section-title">{isMr ? 'नगर परिषद दृष्टीक्षेपात' : 'Nagar Parishad at a Glance'}</h2>
          <div className="section-divider" />
        </div>
        <div style={{maxWidth:1000,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))',gap:24,textAlign:'center'}}>
          <div>
            <div style={{fontSize:'2.2rem',fontWeight:700,color:'var(--navy)',fontFamily:"'Yeseva One', serif"}}>12,450+</div>
            <div style={{fontSize:'0.85rem',color:'var(--text3)',marginTop:4}}>{isMr ? 'नागरिक सेवा' : 'Citizens Served'}</div>
          </div>
          <div>
            <div style={{fontSize:'2.2rem',fontWeight:700,color:'var(--navy)',fontFamily:"'Yeseva One', serif"}}>8,920</div>
            <div style={{fontSize:'0.85rem',color:'var(--text3)',marginTop:4}}>{isMr ? 'तक्रारी निराकरण' : 'Complaints Resolved'}</div>
          </div>
          <div>
            <div style={{fontSize:'2.2rem',fontWeight:700,color:'var(--navy)',fontFamily:"'Yeseva One', serif"}}>3 {isMr ? 'दिवस' : 'Days'}</div>
            <div style={{fontSize:'0.85rem',color:'var(--text3)',marginTop:4}}>{isMr ? 'सरासरी निराकरण कालावधी' : 'Avg Resolution Time'}</div>
          </div>
          <div>
            <div style={{fontSize:'2.2rem',fontWeight:700,color:'var(--navy)',fontFamily:"'Yeseva One', serif"}}>{currentMunicipality.ward_count || 33}</div>
            <div style={{fontSize:'0.85rem',color:'var(--text3)',marginTop:4}}>{isMr ? 'सक्रिय वार्ड' : 'Active Wards'}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
