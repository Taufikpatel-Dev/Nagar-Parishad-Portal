import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useMunicipality } from '../contexts/MunicipalityContext';

const Dashboard = () => {
  const { t } = useTranslation();
  const { session } = useAuth();
  const { currentMunicipality } = useMunicipality();
  
  const [complaints, setComplaints] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchUserData();
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

  const handleReopen = async (id) => {
    if(!window.confirm("Are you sure you want to re-open this complaint?")) return;
    
    await supabase
      .from('complaints')
      .update({ status: 'In Process' })
      .eq('id', id);
      
    fetchUserData(); // refresh list
  };

  const pendingComplaints = complaints.filter(c => c.status === 'Pending' || c.status === 'In Process').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;

  // Stats
  const stats = [
    { label: 'Pending Complaints', value: pendingComplaints, icon: <AlertTriangle className="text-yellow-500" /> },
    { label: 'Resolved Complaints', value: resolvedComplaints, icon: <CheckCircle className="text-green-500" /> },
    { label: 'Active Applications', value: 0, icon: <FileText className="text-blue-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between border-l-4 border-primary">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Complaints */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <ClipboardList size={18} className="text-primary" /> My Recent Complaints
              </h3>
              <Link to="/services/complaint" className="text-sm text-primary hover:underline">New Complaint</Link>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading...</div>
              ) : complaints.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No recent complaints found.</div>
              ) : (
                complaints.map(c => (
                  <div key={c.id} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{c.category}</p>
                      <p className="text-xs text-gray-500">ID: {c.id.substring(0,8)}... • Ward {c.ward}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-1 rounded ${c.status === 'Resolved' ? 'bg-green-100 text-green-800' : c.status === 'In Process' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {c.status}
                      </span>
                      {c.status === 'Resolved' && (
                        <button onClick={() => handleReopen(c.id)} className="text-[10px] text-red-600 hover:underline mt-1">Re-open Issue</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tax & Bills */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-primary" /> Dues & Payments
              </h3>
            </div>
            <div className="p-6 text-center">
              <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4">
                <p className="font-medium">All dues cleared!</p>
                <p className="text-sm mt-1">Thank you for being a responsible citizen.</p>
              </div>
              <Link to="/services/property-tax" className="inline-block border border-primary text-primary px-4 py-2 rounded text-sm hover:bg-primary hover:text-white transition">
                View Payment History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
