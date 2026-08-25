import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ClipboardList, AlertCircle, FileText, CheckCircle, Clock, Search, ChevronRight, FileSearch, ShieldAlert, Download, Landmark, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useMunicipality } from '../contexts/MunicipalityContext';

const Dashboard = () => {
  const { i18n } = useTranslation();
  const { session } = useAuth();
  const { currentMunicipality } = useMunicipality();
  
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const isMr = i18n.language === 'mr';

  const isDemo = !session?.user;

  useEffect(() => {
    if (isDemo) {
      setComplaints([
        { id: 'CMP-2026-0812', categoryMr: 'पाणीपुरवठा', categoryEn: 'Water Supply', status: 'In Process', date: '12 Aug 2026', ward: '4' },
        { id: 'CMP-2026-0705', categoryMr: 'स्वच्छता', categoryEn: 'Sanitation', status: 'Resolved', date: '05 Jul 2026', ward: '4' },
        { id: 'CMP-2026-0622', categoryMr: 'रस्ते', categoryEn: 'Roads', status: 'Resolved', date: '22 Jun 2026', ward: '4' },
      ]);
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, [session, currentMunicipality]);

  const fetchUserData = async () => {
    if (!session?.user || !currentMunicipality) return;
    setLoading(true);
    const { data } = await supabase
      .from('complaints')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('municipality_id', currentMunicipality.id)
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setComplaints(data);
    setLoading(false);
  };

  const applications = [
    { id: 'APP-PT-2026-9921', serviceMr: 'मालमत्ता कर नाव नोंदणी', serviceEn: 'Property Tax Registration', status: 'Pending', date: '15 Aug 2026' },
    { id: 'APP-BC-2026-8812', serviceMr: 'जन्म प्रमाणपत्र', serviceEn: 'Birth Certificate', status: 'Approved', date: '02 Aug 2026' }
  ];

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'resolved':
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'in process': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 bg-slate-50">
      
      <div className="bg-[var(--color-gov-navy)] text-white pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-marathi mb-1">{isMr ? 'नमस्कार, रमेश पाटील!' : 'Hello, Ramesh Patil!'}</h1>
            <p className="text-slate-400 text-sm font-marathi">{isMr ? 'नागरिक डॅशबोर्ड मध्ये आपले स्वागत आहे.' : 'Welcome to the Citizen Dashboard.'}</p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
            <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white">
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=RP&backgroundColor=15803d" alt="Profile" />
            </div>
            <div>
              <p className="text-sm font-bold">Ramesh Patil</p>
              <p className="text-xs text-slate-300">{isMr ? 'प्रभाग क्र. ४' : 'Ward No. 4'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 pb-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="gov-card p-5 border-l-4 border-l-[#15803D]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 font-semibold mb-1">{isMr ? 'एकूण अर्ज' : 'Total Applications'}</p>
                <h3 className="text-3xl font-bold text-slate-800">{isMr ? '१२' : '12'}</h3>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg text-[#15803D]">
                <FileText size={24} />
              </div>
            </div>
          </div>
          
          <div className="gov-card p-5 border-l-4 border-l-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 font-semibold mb-1">{isMr ? 'प्रलंबित अर्ज' : 'Pending Apps'}</p>
                <h3 className="text-3xl font-bold text-slate-800">{isMr ? '२' : '2'}</h3>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
                <Clock size={24} />
              </div>
            </div>
          </div>
          
          <div className="gov-card p-5 border-l-4 border-l-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 font-semibold mb-1">{isMr ? 'नोंदवलेल्या तक्रारी' : 'Grievances'}</p>
                <h3 className="text-3xl font-bold text-slate-800">{isMr ? '३' : '3'}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <ShieldAlert size={24} />
              </div>
            </div>
          </div>
          
          <div className="gov-card p-5 border-l-4 border-l-red-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 font-semibold mb-1">{isMr ? 'थकबाकी (Rs.)' : 'Dues (Rs.)'}</p>
                <h3 className="text-3xl font-bold text-red-600">{isMr ? '०.००' : '0.00'}</h3>
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-red-600">
                <Landmark size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 gov-card overflow-hidden">
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800 font-marathi flex items-center gap-2">
                <FileSearch size={20} className="text-[#15803D]" /> {isMr ? 'माझे अलीकडील अर्ज' : 'My Recent Applications'}
              </h2>
              <Link to="/applications" className="text-sm font-semibold text-[#15803D] hover:underline">{isMr ? 'सर्व पहा' : 'View All'}</Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                    <th className="px-6 py-3 font-semibold">{isMr ? 'अर्ज क्रमांक' : 'App ID'}</th>
                    <th className="px-6 py-3 font-semibold">{isMr ? 'सेवेचे नाव' : 'Service Name'}</th>
                    <th className="px-6 py-3 font-semibold">{isMr ? 'दिनांक' : 'Date'}</th>
                    <th className="px-6 py-3 font-semibold">{isMr ? 'स्थिती' : 'Status'}</th>
                    <th className="px-6 py-3 font-semibold text-right">{isMr ? 'कृती' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {applications.map((app, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700">{app.id}</td>
                      <td className="px-6 py-4 font-marathi">{isMr ? app.serviceMr : app.serviceEn}</td>
                      <td className="px-6 py-4 text-slate-500">{app.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 text-slate-400 hover:text-[#15803D] hover:bg-[#15803D]/10 rounded transition-colors" title={isMr ? "पहा (View)" : "View"}>
                          <Eye size={18} />
                        </button>
                        {app.status === 'Approved' && (
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors ml-1" title={isMr ? "डाउनलोड (Download)" : "Download"}>
                            <Download size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            
            <div className="gov-card overflow-hidden">
              <div className="bg-white px-5 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800 font-marathi flex items-center gap-2">
                  <AlertCircle size={20} className="text-[#F97316]" /> {isMr ? 'माझ्या तक्रारी' : 'My Grievances'}
                </h2>
              </div>
              <div className="divide-y divide-slate-100 p-2">
                {complaints.length > 0 ? complaints.map((c, i) => (
                  <div key={i} className="p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800 font-marathi">{isMr ? (c.categoryMr || c.category) : (c.categoryEn || c.category)}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>{c.id}</span>
                      <span>{c.date || new Date(c.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                )) : (
                  <div className="p-6 text-center text-slate-500 text-sm">{isMr ? 'कोणतीही तक्रार आढळली नाही.' : 'No grievances found.'}</div>
                )}
                <div className="p-3 text-center border-t border-slate-100 mt-2">
                  <Link to="/complaints" className="text-sm font-bold text-[#15803D] hover:underline">{isMr ? 'नवीन तक्रार नोंदवा' : 'File New Grievance'}</Link>
                </div>
              </div>
            </div>
            
            <div className="gov-card overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-green-600 border border-green-100">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-800 font-marathi mb-2">{isMr ? 'कोणतीही थकबाकी नाही!' : 'No Outstanding Dues!'}</h3>
                <p className="text-green-600 text-sm font-marathi mb-6">
                  {isMr ? 'आपले सर्व कर भरलेले आहेत. एक जबाबदार नागरिक असल्याबद्दल धन्यवाद.' : 'All your taxes are paid. Thank you for being a responsible citizen.'}
                </p>
                <Link to="/payments" className="gov-btn-outline !border-green-600 !text-green-700 hover:!bg-green-600 hover:!text-white w-full block">
                  {isMr ? 'पेमेंट इतिहास पहा' : 'View Payment History'}
                </Link>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
