import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, Users, FileText, Settings, ShieldAlert, Building,
  Bell, Search, ChevronDown, CheckCircle, XCircle, MoreVertical,
  ArrowUpRight, BarChart3, Clock, AlertTriangle, LogOut, Menu
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const AdminDashboard = () => {
  const { i18n } = useTranslation();
  const { session } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isMr = i18n.language === 'mr';

  const revenueData = [
    { name: isMr ? 'जानेवारी' : 'Jan', value: 4000 },
    { name: isMr ? 'फेब्रुवारी' : 'Feb', value: 3000 },
    { name: isMr ? 'मार्च' : 'Mar', value: 5000 },
    { name: isMr ? 'एप्रिल' : 'Apr', value: 2780 },
    { name: isMr ? 'मे' : 'May', value: 6890 },
    { name: isMr ? 'जून' : 'Jun', value: 4390 },
  ];

  const appData = [
    { name: isMr ? 'सोम' : 'Mon', apps: 40 },
    { name: isMr ? 'मंगळ' : 'Tue', apps: 30 },
    { name: isMr ? 'बुध' : 'Wed', apps: 45 },
    { name: isMr ? 'गुरू' : 'Thu', apps: 60 },
    { name: isMr ? 'शुक्र' : 'Fri', apps: 55 },
    { name: isMr ? 'शनि' : 'Sat', apps: 20 },
    { name: isMr ? 'रवि' : 'Sun', apps: 10 },
  ];

  const recentApps = [
    { id: 'APP-PT-101', name: 'Ramesh Patil', service: isMr ? 'मालमत्ता कर' : 'Property Tax', status: 'Pending', date: isMr ? 'आज, १०:२३ स' : 'Today, 10:23 AM' },
    { id: 'APP-BC-102', name: 'Sunita Sharma', service: isMr ? 'जन्म प्रमाणपत्र' : 'Birth Certificate', status: 'Approved', date: isMr ? 'काल, ०२:४५ दु' : 'Yesterday, 02:45 PM' },
    { id: 'APP-TL-103', name: 'Ganesh Traders', service: isMr ? 'व्यवसाय परवाना' : 'Trade License', status: 'Under Review', date: '22 Aug 2026' },
    { id: 'APP-WB-104', name: 'Vikram Singh', service: isMr ? 'पाणी कर' : 'Water Connection', status: 'Rejected', date: '20 Aug 2026' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Under Review': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const statusMap = {
    'Approved': isMr ? 'मंजूर' : 'Approved',
    'Pending': isMr ? 'प्रलंबित' : 'Pending',
    'Under Review': isMr ? 'पुनरावलोकनात' : 'Under Review',
    'Rejected': isMr ? 'नामंजूर' : 'Rejected'
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`bg-[var(--color-gov-navy)] text-slate-300 w-64 shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute z-50 h-full'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0 bg-[var(--color-gov-navy)] z-20">
          <div className="flex items-center">
            <Building className="text-[#16A34A] mr-2" size={24} />
            <h1 className="text-white font-bold text-lg font-marathi tracking-wide truncate">{isMr ? 'नगर परिषद ॲडमिन' : 'Nagar Parishad Admin'}</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <XCircle size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{isMr ? 'मुख्य (Main)' : 'Main'}</div>
          <nav className="space-y-1 px-2 mb-8">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-[#16A34A]/10 text-[#16A34A] rounded-lg border border-[#16A34A]/20">
              <LayoutDashboard size={18} /> <span className="font-medium font-marathi">{isMr ? 'डॅशबोर्ड' : 'Dashboard'}</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <FileText size={18} /> <span className="font-medium font-marathi">{isMr ? 'अर्ज' : 'Applications'}</span>
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <ShieldAlert size={18} /> <span className="font-medium font-marathi">{isMr ? 'तक्रारी' : 'Complaints'}</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Users size={18} /> <span className="font-medium font-marathi">{isMr ? 'नागरिक' : 'Citizens'}</span>
            </a>
          </nav>

          <div className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{isMr ? 'सेटिंग्ज (Settings)' : 'Settings'}</div>
          <nav className="space-y-1 px-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Building size={18} /> <span className="font-medium font-marathi">{isMr ? 'विभाग' : 'Departments'}</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Settings size={18} /> <span className="font-medium font-marathi">{isMr ? 'कॉन्फिगरेशन' : 'Configuration'}</span>
            </a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-slate-800">
            <LogOut size={18} /> <span className="font-medium font-marathi">{isMr ? 'बाहेर पडा' : 'Logout'}</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200 focus-within:border-[#15803D] focus-within:ring-1 focus-within:ring-[#15803D]">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder={isMr ? "अर्ज शोधा..." : "Search applications..."} className="bg-transparent border-none focus:outline-none text-sm w-64 font-marathi" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-slate-200 pr-4 mr-2">
              <button onClick={() => i18n.changeLanguage('mr')} className={`text-xs font-bold hover:text-[#15803D] ${isMr ? 'text-[#15803D]' : 'text-slate-400'}`}>MR</button>
              <span className="text-slate-300">|</span>
              <button onClick={() => i18n.changeLanguage('en')} className={`text-xs font-bold hover:text-[#15803D] ${!isMr ? 'text-[#15803D]' : 'text-slate-400'}`}>EN</button>
            </div>

            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#15803D] text-white flex items-center justify-center font-bold text-xs">
                AO
              </div>
              <span className="hidden sm:block">{isMr ? 'अधिकारी' : 'Admin Officer'}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8 bg-slate-50">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 font-marathi">{isMr ? 'डॅशबोर्ड विहंगावलोकन' : 'Dashboard Overview'}</h2>
              <p className="text-slate-500 text-sm mt-1 font-marathi">{isMr ? 'आजची नगर परिषदेची स्थिती आणि अद्यतने.' : "Here's what's happening today in the municipality."}</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button className="gov-btn-outline !py-2 !text-sm font-marathi">{isMr ? 'अहवाल डाउनलोड करा' : 'Download Report'}</button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 font-marathi">{isMr ? 'एकूण अर्ज' : 'Total Applications'}</p>
                  <h3 className="text-2xl font-bold text-slate-800">2,543</h3>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={20} /></div>
              </div>
              <div className="flex items-center text-xs font-medium text-green-600">
                <ArrowUpRight size={14} className="mr-1" />
                <span className="font-marathi">{isMr ? '+१२.५% मागील महिन्यापासून' : '+12.5% from last month'}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 font-marathi">{isMr ? 'प्रलंबित मंजुरी' : 'Pending Approval'}</p>
                  <h3 className="text-2xl font-bold text-slate-800">142</h3>
                </div>
                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Clock size={20} /></div>
              </div>
              <div className="flex items-center text-xs font-medium text-red-600">
                <ArrowUpRight size={14} className="mr-1" />
                <span className="font-marathi">{isMr ? '४ अर्जांना तातडीची आवश्यकता' : '+4 requires urgent attention'}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 font-marathi">{isMr ? 'प्रलंबित तक्रारी' : 'Active Complaints'}</p>
                  <h3 className="text-2xl font-bold text-slate-800">28</h3>
                </div>
                <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={20} /></div>
              </div>
              <div className="flex items-center text-xs font-medium text-green-600">
                <span className="text-slate-500 font-marathi">{isMr ? 'या आठवड्यात १२ सोडवल्या' : '12 resolved this week'}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 font-marathi">{isMr ? 'एकूण महसूल' : 'Total Revenue'}</p>
                  <h3 className="text-2xl font-bold text-slate-800">{isMr ? '₹४२.५ लाख' : '₹42.5L'}</h3>
                </div>
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><BarChart3 size={20} /></div>
              </div>
              <div className="flex items-center text-xs font-medium text-green-600">
                <ArrowUpRight size={14} className="mr-1" />
                <span className="font-marathi">{isMr ? '+८.२% मागील महिन्यापासून' : '+8.2% from last month'}</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-6 font-marathi">{isMr ? 'प्राप्त अर्ज (हा आठवडा)' : 'Applications Received (This Week)'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={appData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0'}} />
                    <Bar dataKey="apps" fill="#15803D" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-6 font-marathi">{isMr ? 'महसूल विहंगावलोकन (६ महिने)' : 'Revenue Overview (6 Months)'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <RechartsTooltip contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0'}} />
                    <Line type="monotone" dataKey="value" stroke="#F97316" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Applications Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-800 font-marathi">{isMr ? 'अलीकडील अर्ज' : 'Recent Applications'}</h3>
              <button className="text-sm font-semibold text-[#15803D] hover:underline font-marathi">{isMr ? 'सर्व पहा' : 'View All'}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="px-6 py-3 font-semibold font-marathi">{isMr ? 'अर्ज आयडी' : 'App ID'}</th>
                    <th className="px-6 py-3 font-semibold font-marathi">{isMr ? 'अर्जदार' : 'Applicant'}</th>
                    <th className="px-6 py-3 font-semibold font-marathi">{isMr ? 'सेवा' : 'Service'}</th>
                    <th className="px-6 py-3 font-semibold font-marathi">{isMr ? 'दिनांक' : 'Date'}</th>
                    <th className="px-6 py-3 font-semibold font-marathi">{isMr ? 'स्थिती' : 'Status'}</th>
                    <th className="px-6 py-3 font-semibold font-marathi text-right">{isMr ? 'कृती' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {recentApps.map((app, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700">{app.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
                            {app.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <span className="font-medium text-slate-800">{app.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-marathi">{app.service}</td>
                      <td className="px-6 py-4 text-slate-500 font-marathi">{app.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider font-marathi ${getStatusBadge(app.status)}`}>
                          {statusMap[app.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 text-slate-400 hover:text-slate-800 transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
      
    </div>
  );
};

export default AdminDashboard;
