import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  const { i18n } = useTranslation();
  const { currentMunicipality } = useMunicipality();
  const isMr = i18n.language === 'mr';

  if (!currentMunicipality) return null;

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h3 className="fc-heading">{isMr ? 'सेवा' : 'Services'}</h3>
          <ul className="fc-links">
            <li><Link to="/services/property-tax"><ChevronRight size={12} />{isMr ? 'मालमत्ता कर' : 'Property Tax'}</Link></li>
            <li><Link to="/services/complaint"><ChevronRight size={12} />{isMr ? 'तक्रार नोंदवा' : 'Register Complaint'}</Link></li>
            <li><Link to="/services/water-bill"><ChevronRight size={12} />{isMr ? 'पाणी बिल' : 'Water Bill'}</Link></li>
            <li><Link to="/services/certificate"><ChevronRight size={12} />{isMr ? 'जन्म/मृत्यू दाखला' : 'Certificates'}</Link></li>
            <li><Link to="/services/trade-license"><ChevronRight size={12} />{isMr ? 'व्यवसाय परवाना' : 'Trade License'}</Link></li>
            <li><Link to="/track"><ChevronRight size={12} />{isMr ? 'स्थिती तपासा' : 'Track Status'}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="fc-heading">{isMr ? 'जलद दुवे' : 'Quick Links'}</h3>
          <ul className="fc-links">
            <li><Link to="/about"><ChevronRight size={12} />{isMr ? 'आमच्याबद्दल' : 'About Us'}</Link></li>
            <li><Link to="/page/contact"><ChevronRight size={12} />{isMr ? 'संपर्क' : 'Contact'}</Link></li>
            <li><Link to="/page/rti"><ChevronRight size={12} />{isMr ? 'माहिती अधिकार' : 'RTI'}</Link></li>
            <li><Link to="/page/citizen-charter"><ChevronRight size={12} />{isMr ? 'नागरिक सनद' : 'Citizen Charter'}</Link></li>
            <li><Link to="/page/budget"><ChevronRight size={12} />{isMr ? 'अर्थसंकल्प' : 'Budget'}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="fc-heading">{isMr ? 'संपर्क माहिती' : 'Contact Info'}</h3>
          <div style={{fontSize:'0.82rem',lineHeight:2,color:'rgba(255,255,255,0.7)'}}>
            <p>📞 {currentMunicipality.helpline_number || '02186-222222'}</p>
            <p>📱 {currentMunicipality.whatsapp_number || '9876543210'}</p>
            <p>🆓 {currentMunicipality.toll_free_number || '1800-222-1111'}</p>
            <p style={{marginTop:12,fontSize:'0.75rem',color:'rgba(255,255,255,0.4)'}}>
              🕐 {isMr ? 'सोम-शुक्र: सकाळी ९:४५ - संध्याकाळी ६:१५' : 'Mon-Fri: 9:45 AM - 6:15 PM'}
            </p>
          </div>
        </div>

        <div>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
            {currentMunicipality.logo_url && (
              <img src={currentMunicipality.logo_url} alt="Logo" width="60" style={{borderRadius:'50%'}} />
            )}
            <h2 className="fc-heading" style={{fontSize:'1rem',marginBottom:0,borderBottom:'none',paddingBottom:0}}>
              {isMr ? currentMunicipality.name_mr : currentMunicipality.name_en}
            </h2>
          </div>
          <p style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.5)',lineHeight:1.7}}>
            {currentMunicipality.address || 'Maharashtra, India'}
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          {isMr
            ? `कॉपीराइट © २०२५ - सर्व हक्क राखीव — ${currentMunicipality.name_mr || 'नगर परिषद'}, महाराष्ट्र सरकार, भारत.`
            : `Copyright © 2025 — All rights reserved — ${currentMunicipality.name_en || 'Municipal Council'}, Govt. of Maharashtra, India.`
          }
        </p>
      </div>
    </footer>
  );
};

export default Footer;
