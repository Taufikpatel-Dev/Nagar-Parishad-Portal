import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Track = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery) {
      // Mock tracking result
      setResult({
        id: searchQuery.toUpperCase(),
        type: 'Complaint',
        category: 'Streetlights',
        dateSubmitted: '2026-08-20',
        currentStatus: 'In Process',
        slaDays: 3,
        timeline: [
          { status: 'Pending', date: '2026-08-20', remark: 'Complaint registered by citizen.', by: 'System' },
          { status: 'In Process', date: '2026-08-21', remark: 'Forwarded to electrical dept. Site inspection scheduled.', by: 'Ward Officer (Ward 2)' }
        ]
      });
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock className="text-yellow-500" />;
      case 'In Process': return <AlertCircle className="text-blue-500" />;
      case 'Resolved': return <CheckCircle className="text-green-500" />;
      default: return <Clock />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          <MapPin className="text-primary" /> Track Application / Complaint
        </h2>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Enter your Complaint ID or Application ID to view its real-time status.</p>
          <form onSubmit={handleSearch} className="flex gap-4">
            <input 
              type="text" 
              placeholder="e.g. PDH-CMP-002"
              className="flex-grow border border-gray-300 dark:border-gray-600 rounded p-3 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button type="submit" className="bg-primary text-white px-8 py-3 rounded font-bold flex items-center gap-2 hover:bg-opacity-90">
              <Search size={20} /> Track
            </button>
          </form>
        </div>

        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-750 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{result.id}</h3>
                <p className="text-gray-500">{result.type} • {result.category}</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {result.currentStatus}
                </span>
                <p className="text-xs text-gray-500 mt-2">Submitted: {result.dateSubmitted}</p>
              </div>
            </div>

            <div className="p-8">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-6">Status Timeline</h4>
              
              <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 md:ml-6 space-y-8">
                {result.timeline.map((event, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute -left-4 top-1 bg-white dark:bg-gray-800 p-1 rounded-full">
                      {getStatusIcon(event.status)}
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800 dark:text-white">{event.status}</h5>
                      <p className="text-sm text-gray-500 mb-2">{event.date} • {event.by}</p>
                      <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-750 p-3 rounded text-sm border border-gray-100 dark:border-gray-700">
                        "{event.remark}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
