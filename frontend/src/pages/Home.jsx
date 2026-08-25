import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, FileText, Landmark, FileSignature, Droplet, Users, ShieldAlert, FileSearch, HelpCircle, Activity, Building2, MapPin, Settings, AlertTriangle, ArrowRight, Download, UsersRound } from 'lucide-react';

const Home = () => {
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const isMr = i18n.language === 'mr';
  
  const quickActions = [
    { 
      titleMr: 'अर्जाची स्थिती तपासा', titleEn: 'Track Application', 
      icon: FileSearch, to: '/applications/track', color: 'bg-blue-100 text-blue-700' 
    },
    { 
      titleMr: 'तक्रार नोंदवा', titleEn: 'File Grievance', 
      icon: ShieldAlert, to: '/complaints', color: 'bg-red-100 text-red-700' 
    },
    { 
      titleMr: 'ऑनलाइन पेमेंट', titleEn: 'Online Payment', 
      icon: Landmark, to: '/payments', color: 'bg-green-100 text-green-700' 
    },
    { 
      titleMr: 'प्रमाणपत्र डाउनलोड', titleEn: 'Download Certificate', 
      icon: Download, to: '/downloads', color: 'bg-purple-100 text-purple-700' 
    },
  ];

  const services = [
    { 
      titleMr: 'मालमत्ता कर', titleEn: 'Property Tax',
      descMr: 'नवीन नोंदणी, कर भरणा आणि पावती', descEn: 'New registration, tax payment and receipt',
      icon: Landmark, to: '/services/property-tax', slaMr: '७ दिवस', slaEn: '7 Days' 
    },
    { 
      titleMr: 'पाणी कर', titleEn: 'Water Tax',
      descMr: 'नवीन जोडणी आणि कर भरणा', descEn: 'New connection and tax payment',
      icon: Droplet, to: '/services/water-bill', slaMr: '१५ दिवस', slaEn: '15 Days' 
    },
    { 
      titleMr: 'व्यवसाय परवाना', titleEn: 'Trade License',
      descMr: 'नवीन परवाना आणि नूतनीकरण', descEn: 'New license and renewal',
      icon: FileSignature, to: '/services/trade-license', slaMr: '२१ दिवस', slaEn: '21 Days' 
    },
    { 
      titleMr: 'जन्म/मृत्यू नोंदणी', titleEn: 'Birth/Death Registration',
      descMr: 'नोंदणी आणि प्रमाणपत्र डाउनलोड', descEn: 'Registration and certificate download',
      icon: Users, to: '/services/certificate', slaMr: '७ दिवस', slaEn: '7 Days' 
    },
    { 
      titleMr: 'बांधकाम परवानगी', titleEn: 'Building Permission',
      descMr: 'नवीन बांधकाम आणि NOC', descEn: 'New construction and NOC',
      icon: Building2, to: '/services', slaMr: '४५ दिवस', slaEn: '45 Days' 
    },
    { 
      titleMr: 'तक्रार निवारण', titleEn: 'Grievance Redressal',
      descMr: 'सार्वजनिक समस्यांची नोंद', descEn: 'Register public issues',
      icon: AlertTriangle, to: '/complaints', slaMr: '३ दिवस', slaEn: '3 Days' 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[var(--color-gov-navy)] text-white pt-20 pb-28 px-4 overflow-hidden border-b-4 border-[#15803D]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
            {isMr ? 'महाराष्ट्र शासन • डिजिटल सेवा' : 'Govt of Maharashtra • Digital Seva'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-marathi leading-tight mb-6">
            {isMr ? 'नगर परिषद डिजिटल सेवांमध्ये आपले स्वागत आहे' : 'Welcome to Nagar Parishad Digital Seva'}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-marathi mb-10 max-w-2xl mx-auto">
            {isMr 
              ? 'आपल्या सर्व नागरी सेवा आता अधिक सोप्या, जलद आणि पारदर्शक पद्धतीने ऑनलाइन.' 
              : 'All your civic services are now online in an easier, faster, and transparent manner.'}
          </p>
          
          {/* Main Search Bar */}
          <div className="bg-white rounded-2xl p-3 shadow-2xl flex items-center max-w-2xl mx-auto mb-8 transition-transform focus-within:scale-[1.02]">
            <Search className="text-slate-400 ml-3 shrink-0" size={24} />
            <input 
              type="text" 
              placeholder={isMr ? "आपल्याला कोणती सेवा हवी आहे? उदा. मालमत्ता कर, जन्म प्रमाणपत्र..." : "Which service do you need? e.g., Property Tax, Birth Certificate..."}
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 text-lg px-4 py-2 font-marathi outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="gov-btn-primary !rounded-xl !py-3 whitespace-nowrap shrink-0">
              {isMr ? 'शोधा' : 'Search'}
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services" className="gov-btn-primary !bg-[#F97316] hover:!bg-[#ea580c] !py-3 text-lg">
              {isMr ? 'नागरिक सेवा पहा' : 'View Citizen Services'}
            </Link>
            <Link to="/applications/track" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              {isMr ? 'अर्जाची स्थिती तपासा' : 'Track Application Status'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTIONS (Floating over hero) */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 mb-16 w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.to} className="group flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:shadow-md ${action.color}`}>
                  <action.icon size={28} />
                </div>
                <h3 className="font-semibold text-slate-800 font-marathi">{isMr ? action.titleMr : action.titleEn}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CITIZEN SERVICES DIRECTORY */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 font-marathi mb-4">{isMr ? 'प्रमुख नागरिक सेवा' : 'Key Citizen Services'}</h2>
            <div className="w-24 h-1.5 bg-[#15803D] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link key={i} to={service.to} className="gov-card p-6 flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-[var(--color-gov-navy)] shrink-0 group-hover:bg-[var(--color-gov-navy)] group-hover:text-white transition-colors">
                  <service.icon size={26} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900 font-marathi">{isMr ? service.titleMr : service.titleEn}</h3>
                  </div>
                  <p className="text-sm text-slate-500 font-marathi mb-4 leading-relaxed line-clamp-2">{isMr ? service.descMr : service.descEn}</p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      {isMr ? 'ऑनलाइन उपलब्ध' : 'Available Online'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{isMr ? 'कालावधी:' : 'SLA:'} {isMr ? service.slaMr : service.slaEn}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="gov-btn-outline inline-flex items-center gap-2">
              {isMr ? 'सर्व सेवा पहा' : 'View All Services'} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TRACKER & GRIEVANCE SPLIT */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Application Tracker */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#15803D]/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white rounded-lg shadow-sm text-[#15803D]">
                    <FileSearch size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 font-marathi">{isMr ? 'आपल्या अर्जाचा मागोवा घ्या' : 'Track Your Application'}</h2>
                </div>
                <p className="text-slate-600 mb-8 font-marathi text-sm">
                  {isMr ? 'तुमचा अर्ज क्रमांक टाकून अर्जाची सद्यस्थिती त्वरित जाणून घ्या.' : 'Know the current status of your application instantly by entering your application number.'}
                </p>
                
                <form className="space-y-4">
                  <div>
                    <label className="gov-label">{isMr ? 'अर्ज क्रमांक (Application Number)' : 'Application Number'}</label>
                    <input type="text" className="gov-input" placeholder="उदा. APP-2026-10293" />
                  </div>
                  <div>
                    <label className="gov-label">{isMr ? 'मोबाईल क्रमांक (Mobile Number)' : 'Mobile Number'}</label>
                    <input type="text" className="gov-input" placeholder={isMr ? "तुमचा १० अंकी क्रमांक" : "Your 10-digit number"} />
                  </div>
                  <button type="button" className="gov-btn-primary w-full mt-2 font-marathi py-3">
                    {isMr ? 'स्थिती तपासा' : 'Check Status'}
                  </button>
                </form>
              </div>
            </div>

            {/* Grievance / Complaint */}
            <div className="bg-[var(--color-gov-navy)] rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-tl-full -z-0"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/10 rounded-lg text-[#F97316]">
                    <ShieldAlert size={24} />
                  </div>
                  <h2 className="text-2xl font-bold font-marathi">{isMr ? 'आपली तक्रार आमच्यापर्यंत पोहोचवा' : 'Register Your Grievance'}</h2>
                </div>
                <p className="text-slate-300 mb-8 font-marathi leading-relaxed">
                  {isMr 
                    ? 'पाणीपुरवठा, स्वच्छता, रस्ते, पथदिवे किंवा इतर नागरी सुविधांबाबत काही अडचण असल्यास त्वरित तक्रार नोंदवा. आम्ही ३ दिवसांत निराकरण करण्याची हमी देतो.' 
                    : 'Report any issue regarding water supply, sanitation, roads, streetlights, or other civic amenities immediately. We guarantee a resolution in 3 days.'}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {(isMr ? ['पाणीपुरवठा', 'स्वच्छता', 'रस्ते', 'पथदिवे', 'कचरा', 'इतर'] : ['Water', 'Sanitation', 'Roads', 'Lights', 'Waste', 'Other']).map((cat, i) => (
                    <div key={i} className="bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-center text-sm font-medium font-marathi">
                      {cat}
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto flex flex-wrap gap-4">
                  <Link to="/complaints" className="gov-btn-primary !bg-[#F97316] hover:!bg-[#ea580c] flex-1 text-center font-marathi">
                    {isMr ? 'नवीन तक्रार नोंदवा' : 'File New Grievance'}
                  </Link>
                  <Link to="/complaints/track" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex-1 text-center font-marathi">
                    {isMr ? 'स्थिती तपासा' : 'Track Status'}
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. NOTICES & UPDATES */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 font-marathi mb-4">{isMr ? 'सूचना आणि अद्यतने' : 'Notices & Updates'}</h2>
              <div className="w-24 h-1.5 bg-[#15803D] rounded-full"></div>
            </div>
            <Link to="/notices" className="text-[#15803D] font-bold flex items-center gap-1 hover:underline">
              {isMr ? 'सर्व सूचना पहा' : 'View All Notices'} <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-200 overflow-x-auto">
                <button className="px-6 py-4 font-bold text-[#15803D] border-b-2 border-[#15803D] whitespace-nowrap">{isMr ? 'ताज्या सूचना' : 'Latest Notices'}</button>
                <button className="px-6 py-4 font-semibold text-slate-500 hover:text-slate-800 whitespace-nowrap">{isMr ? 'निविदा (Tenders)' : 'Tenders'}</button>
                <button className="px-6 py-4 font-semibold text-slate-500 hover:text-slate-800 whitespace-nowrap">{isMr ? 'शासन निर्णय' : 'Govt Resolutions (GR)'}</button>
              </div>
              <div className="divide-y divide-slate-100">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col items-center justify-center bg-slate-100 text-[var(--color-gov-navy)] rounded-lg w-14 h-14 shrink-0 border border-slate-200">
                      <span className="text-xl font-bold leading-none mb-1">२४</span>
                      <span className="text-xs uppercase font-semibold">ऑगस्ट</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">New</span>
                        <span className="text-xs text-slate-500 font-medium">{isMr ? 'सार्वजनिक आरोग्य' : 'Public Health'}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 font-marathi mb-2 hover:text-[#15803D] cursor-pointer line-clamp-2">
                        {isMr ? 'शहरातील पाणीपुरवठा वेळेत बदल करण्याबाबतची अत्यंत महत्त्वाची सूचना आणि मार्गदर्शक तत्त्वे.' : 'Important notice and guidelines regarding the change in water supply timings in the city.'}
                      </h4>
                      <button className="text-[#15803D] text-sm font-semibold flex items-center gap-1 hover:underline">
                        <FileText size={14} /> {isMr ? 'PDF डाउनलोड करा' : 'Download PDF'} (2.4 MB)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 6. MUNICIPALITY INFO (STATS) & MAYOR */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[var(--color-gov-navy)] to-[var(--color-gov-navy-light)] rounded-xl shadow-sm border border-slate-700 p-6 text-white">
                <h3 className="text-lg font-bold font-marathi mb-6 border-b border-white/10 pb-3">{isMr ? 'नगर परिषद दृष्टीक्षेपात' : 'Nagar Parishad at a Glance'}</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{isMr ? 'लोकसंख्या' : 'Population'}</p>
                    <p className="text-2xl font-bold font-marathi text-[#F97316]">{isMr ? '२,५०,०००+' : '2,50,000+'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{isMr ? 'क्षेत्रफळ' : 'Area'}</p>
                    <p className="text-2xl font-bold font-marathi text-[#F97316]">{isMr ? '४५ चौ.किमी' : '45 Sq.Km'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{isMr ? 'प्रभाग' : 'Wards'}</p>
                    <p className="text-2xl font-bold font-marathi text-[#F97316]">{isMr ? '६४' : '64'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{isMr ? 'अधिकारी' : 'Officers'}</p>
                    <p className="text-2xl font-bold font-marathi text-[#F97316]">{isMr ? '१,२००+' : '1,200+'}</p>
                  </div>
                </div>
              </div>
              
              <div className="gov-card p-6 border-t-4 border-[#F97316]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border-2 border-white shadow-sm overflow-hidden">
                    <UsersRound size={32} className="text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-marathi text-lg">{isMr ? '[मुख्याधिकारी नाव]' : '[Chief Officer Name]'}</h3>
                    <p className="text-sm text-[#15803D] font-semibold">{isMr ? 'मुख्याधिकारी (Chief Officer)' : 'Chief Officer'}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 font-marathi italic border-l-2 border-slate-300 pl-3 leading-relaxed">
                  {isMr 
                    ? '"नागरिकांना पारदर्शक, तत्पर आणि आधुनिक तंत्रज्ञानावर आधारित सेवा देण्यासाठी आम्ही कटिबद्ध आहोत. हे पोर्टल त्या दिशेने टाकलेले एक महत्त्वाचे पाऊल आहे."' 
                    : '"We are committed to providing transparent, prompt, and modern technology-based services to citizens. This portal is a significant step in that direction."'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
