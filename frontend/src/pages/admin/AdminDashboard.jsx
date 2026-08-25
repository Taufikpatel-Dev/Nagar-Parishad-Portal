import React, { useState } from 'react';
import Header from '../../components/Header';
import { useMunicipality } from '../../contexts/MunicipalityContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { AlertTriangle, Users, CheckCircle, Clock, Download, Map as MapIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import html2pdf from 'html2pdf.js';
import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for Leaflet default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const AdminDashboard = () => {
  const { currentMunicipality } = useMunicipality();
  const [activeTab, setActiveTab] = useState('overview');

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState(new Set());
  const dashboardRef = useRef();

  useEffect(() => {
    if(currentMunicipality) {
      fetchComplaints();
    }
  }, [currentMunicipality]);

  const fetchComplaints = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .eq('municipality_id', currentMunicipality.id)
      .order('created_at', { ascending: false });
      
    if (data) setComplaints(data);
    setLoading(false);
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    setUpdatingIds(prev => new Set(prev).add(id));
    const nextStatus = currentStatus === 'Pending' ? 'In Process' : currentStatus === 'In Process' ? 'Resolved' : 'Pending';
    const { error } = await supabase
      .from('complaints')
      .update({ status: nextStatus })
      .eq('id', id);
      
    if (!error) {
      await fetchComplaints();
    }
    setUpdatingIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleExportPDF = () => {
    const element = dashboardRef.current;
    const opt = {
      margin:       0.5,
      filename:     `dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
  };

  // Dynamic calculations
  const pendingCount = complaints.filter(c => c.status === 'Pending').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
  
  // Calculate SLA breached (Pending > 48h)
  const now = new Date();
  const breachedCount = complaints.filter(c => {
    if(c.status === 'Resolved') return false;
    const createdAt = new Date(c.created_at);
    const diffHours = (now - createdAt) / (1000 * 60 * 60);
    return diffHours > 48;
  }).length;
  
  const categoriesMap = {};
  complaints.forEach(c => {
    categoriesMap[c.category] = (categoriesMap[c.category] || 0) + 1;
  });
  const complaintsByCategory = Object.keys(categoriesMap).map(key => ({
    name: key,
    value: categoriesMap[key]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:block">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">Admin Panel</h3>
            <p className="text-sm text-gray-500">{currentMunicipality?.name_en}</p>
          </div>
          <nav className="p-4 space-y-2">
            <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Overview</button>
            <button onClick={() => setActiveTab('complaints')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'complaints' ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Complaints</button>
            <button onClick={() => setActiveTab('activity')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'activity' ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Activity Log</button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">{activeTab}</h2>
            {activeTab === 'overview' && (
              <button onClick={handleExportPDF} className="flex items-center gap-2 bg-gray-800 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded shadow hover:opacity-90">
                <Download size={18} /> Export PDF
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
          ) : activeTab === 'overview' && (
            <div ref={dashboardRef}>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-blue-500">
                  <p className="text-sm text-gray-500 mb-1">Total Citizens</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2"><Users size={24} className="text-blue-500"/> 12,450</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-500 mb-1">Pending Complaints</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2"><Clock size={24} className="text-yellow-500"/> {pendingCount}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-green-500">
                  <p className="text-sm text-gray-500 mb-1">Resolved</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2"><CheckCircle size={24} className="text-green-500"/> {resolvedCount}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-red-500">
                  <p className="text-sm text-gray-500 mb-1">SLA Breached (48h+)</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2"><AlertTriangle size={24} className="text-red-500"/> {breachedCount}</p>
                </div>
              </div>

              {/* Charts & Map */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                
                {/* Map Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow xl:col-span-2">
                  <h3 className="font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                    <MapIcon className="text-primary" /> Live Complaint Heatmap
                  </h3>
                  <div className="h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 z-0 relative">
                    <MapContainer center={[17.6599, 75.9064]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {complaints.map((c, i) => {
                        // Mocking some slight offsets for demonstration based on Solapur's coord
                        const lat = 17.6599 + (Math.random() - 0.5) * 0.05;
                        const lng = 75.9064 + (Math.random() - 0.5) * 0.05;
                        return (
                          <Marker key={c.id} position={[lat, lng]}>
                            <Popup>
                              <strong className="block mb-1">{c.category}</strong>
                              <span className="text-xs text-gray-600 block">Ward: {c.ward}</span>
                              <span className={`text-xs font-bold ${c.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>{c.status}</span>
                            </Popup>
                          </Marker>
                        )
                      })}
                    </MapContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">Complaints by Category</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={complaintsByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                          {complaintsByCategory.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">Complaints Trend (Last 30 Days)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={complaintsTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="complaints" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow xl:col-span-2">
                  <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">Ward-wise Complaint Status</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wardWiseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="pending" fill="#FFBB28" name="Pending" stackId="a" />
                        <Bar dataKey="resolved" fill="#00C49F" name="Resolved" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && !loading && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-750 text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="p-4">ID / Photo</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Ward</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {complaints.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No complaints found.</td></tr>}
                  {complaints.map(c => {
                    const isBreached = c.status !== 'Resolved' && ((new Date() - new Date(c.created_at)) / (1000 * 60 * 60) > 48);
                    const isUpdating = updatingIds.has(c.id);
                    return (
                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="p-4 font-medium text-gray-800 dark:text-gray-200">
                        <div className="flex flex-col gap-1">
                          <span>{c.id.substring(0, 8)}...</span>
                          {c.photo_url && (
                            <a href={c.photo_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                              View Photo
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{c.category}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">Ward {c.ward}</td>
                      <td className="p-4 flex flex-col items-start gap-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${c.status === 'Resolved' ? 'bg-green-100 text-green-800 border-green-200' : c.status === 'In Process' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}`}>
                          {c.status}
                        </span>
                        {isBreached && <span className="text-[10px] text-red-600 font-bold bg-red-100 px-1 rounded">SLA Breach</span>}
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleUpdateStatus(c.id, c.status)} 
                          disabled={isUpdating}
                          className="text-primary hover:underline text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                          {isUpdating ? 'Updating...' : 'Toggle Status'}
                        </button>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold mb-6 text-gray-800 dark:text-white">Recent Admin Activity</h3>
              <div className="space-y-6 relative border-l-2 border-gray-200 dark:border-gray-700 ml-3">
                <div className="pl-6 relative">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Ward Officer (Ward 2) updated PDH-CMP-002</p>
                  <p className="text-xs text-gray-500">Status changed from Pending → In Process</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
                <div className="pl-6 relative">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Sanitation Dept resolved PDH-CMP-003</p>
                  <p className="text-xs text-gray-500">Status changed from In Process → Resolved</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
