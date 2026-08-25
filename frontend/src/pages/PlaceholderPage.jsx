import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Construction } from 'lucide-react';

const pageTitles = {
  'mission': { mr: 'ध्येय आणि दृष्टिकोन', en: 'Mission & Vision' },
  'city-info': { mr: 'शहर माहिती', en: 'City Information' },
  'history': { mr: 'इतिहास', en: 'History' },
  'roles': { mr: 'भूमिका आणि कार्ये', en: 'Roles & Functions' },
  'who-is-who': { mr: 'कोण काय आहे', en: 'Who is Who' },
  'at-a-glance': { mr: 'दृष्टीक्षेपात', en: 'At a Glance' },
  'holidays': { mr: 'सार्वजनिक सुट्ट्या', en: 'Public Holidays' },
  'resolutions': { mr: 'ठराव', en: 'Resolutions' },
  'budget': { mr: 'अर्थसंकल्प', en: 'Budget' },
  'audit': { mr: 'लेखापरीक्षण अहवाल', en: 'Audit Reports' },
  'balance-sheet': { mr: 'ताळेबंद', en: 'Balance Sheet' },
  'city-dev-plan': { mr: 'शहर विकास आराखडा', en: 'City Development Plan' },
  'office-orders': { mr: 'कार्यालयीन आदेश', en: 'Office Orders' },
  'rti': { mr: 'माहिती अधिकार कायदा', en: 'Right to Information Act' },
  'section4': { mr: 'कलम ४ माहिती', en: 'Section 4 Information' },
  'rts': { mr: 'सेवा हमी कायदा', en: 'Right to Services Act' },
  'citizen-charter': { mr: 'नागरिक सनद', en: 'Citizen Charter' },
  'e-news': { mr: 'ई-न्यूज', en: 'E-News' },
  'recruitment': { mr: 'भरती', en: 'Recruitment' },
  'achievements': { mr: 'उपलब्धी', en: 'Achievements' },
  'whats-new': { mr: 'नवीन काय आहे', en: "What's New" },
  'contact': { mr: 'मनपा संपर्क', en: 'Municipal Contact' },
};

const PlaceholderPage = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isMr = i18n.language === 'mr';

  const pageInfo = pageTitles[slug] || { mr: slug, en: slug };

  return (
    <div className="placeholder-page">
      <div className="icon">🏗️</div>
      <h2>{isMr ? pageInfo.mr : pageInfo.en}</h2>
      <p>
        {isMr 
          ? 'हे पृष्ठ लवकरच उपलब्ध होईल. कृपया नंतर पुन्हा भेट द्या.'
          : 'This page is coming soon. Please visit again later.'
        }
      </p>
      <Link 
        to="/" 
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--navy)',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 50,
          fontWeight: 600,
          fontSize: '0.9rem',
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
      >
        <ArrowLeft size={16} />
        {isMr ? 'मुख्यपृष्ठावर जा' : 'Go to Home'}
      </Link>
    </div>
  );
};

export default PlaceholderPage;
