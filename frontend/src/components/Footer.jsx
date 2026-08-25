import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Phone, Mail, ExternalLink, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-8 border-t-4 border-[#F97316] font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Column 1: Brand & Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-slate-600 bg-slate-800 flex items-center justify-center shrink-0">
                <Building size={20} className="text-[#15803D]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-marathi">नगर परिषद</h3>
                <p className="text-xs text-slate-400">महाराष्ट्र शासन</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed font-marathi">
              नागरिकांच्या सेवेसाठी एक विश्वासार्ह डिजिटल व्यासपीठ. आमच्या सर्व नागरी सेवा आता अधिक सोप्या, जलद आणि पारदर्शक पद्धतीने ऑनलाइन उपलब्ध आहेत.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#F97316] mt-0.5 shrink-0" />
                <span className="font-marathi">नगर परिषद मुख्य कार्यालय, शिवाजी चौक, महाराष्ट्र - ४११०००</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#F97316] shrink-0" />
                <span>०२१-२२२२३३३३ / १८००-२२२-११११</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#F97316] shrink-0" />
                <span>contact@nagarparishad.gov.in</span>
              </div>
            </div>
          </div>
          
          {/* Column 2: Citizen Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-marathi flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#15803D] rounded-full inline-block"></span>
              नागरिक सेवा
            </h4>
            <ul className="space-y-3 text-[0.95rem] font-marathi">
              <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> सर्व सेवा</Link></li>
              <li><Link to="/services/property-tax" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> मालमत्ता कर</Link></li>
              <li><Link to="/services/water-bill" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> पाणी बिल</Link></li>
              <li><Link to="/applications/track" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> अर्जाचा मागोवा</Link></li>
              <li><Link to="/complaints" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> तक्रार नोंदवा</Link></li>
              <li><Link to="/payments" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> ऑनलाइन पेमेंट</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-marathi flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#15803D] rounded-full inline-block"></span>
              माहिती
            </h4>
            <ul className="space-y-3 text-[0.95rem] font-marathi">
              <li><Link to="/notices" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> सूचना आणि परिपत्रके</Link></li>
              <li><Link to="/tenders" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> निविदा (Tenders)</Link></li>
              <li><Link to="/downloads" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> डाउनलोड</Link></li>
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> माहिती अधिकार (RTI)</Link></li>
              <li><Link to="/departments" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight size={14} className="text-slate-500" /> विभाग</Link></li>
            </ul>
          </div>

          {/* Column 4: Important Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-marathi flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#15803D] rounded-full inline-block"></span>
              महत्त्वाचे दुवे
            </h4>
            <ul className="space-y-3 text-[0.95rem] font-marathi">
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ExternalLink size={14} className="text-slate-500" /> महाराष्ट्र शासन</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ExternalLink size={14} className="text-slate-500" /> आपले सरकार</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ExternalLink size={14} className="text-slate-500" /> जिल्हाधिकारी कार्यालय</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ExternalLink size={14} className="text-slate-500" /> निवडणूक आयोग</a></li>
            </ul>
            
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h5 className="text-sm font-bold text-white mb-2 font-marathi">नागरिक सहाय्यता कक्ष</h5>
              <p className="text-2xl font-bold text-[#F97316]">1800-222-1111</p>
              <p className="text-xs text-slate-400 mt-1 font-marathi">सकाळी १० ते सायं ६ (सुट्टीचे दिवस वगळून)</p>
            </div>
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 नगर परिषद डिजिटल सेवा. सर्व हक्क सुरक्षित.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/about" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
