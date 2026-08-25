import React, { useState, useRef } from 'react';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { useToast } from '../contexts/ToastContext';
import { FileSignature, Download, Search, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2pdf from 'html2pdf.js';
import { motion } from 'framer-motion';

const Certificate = () => {
  const { currentMunicipality } = useMunicipality();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('apply'); // 'apply' | 'download'
  
  // Apply Form State
  const [formData, setFormData] = useState({
    type: 'Birth', // Birth or Death
    name: '',
    date_of_event: '',
    place_of_event: '',
    father_name: '',
    mother_name: '',
    mobile: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  // Download State
  const [searchQuery, setSearchQuery] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const certRef = useRef();

  // Handlers
  const handleApply = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const id = `${currentMunicipality?.id?.substring(0,3).toUpperCase() || 'PDH'}-CRT-${Date.now().toString().slice(-6)}`;
      setSubmittedId(id);
      setIsSubmitting(false);
      toast.success('Certificate application submitted successfully!');
    }, 1500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    
    setTimeout(() => {
      // Mock search result
      if (searchQuery.includes('CRT')) {
        setCertificateData({
          id: searchQuery,
          type: 'Birth',
          name: 'Anaya Sharma',
          date_of_event: '2024-05-12',
          place_of_event: 'Civil Hospital',
          father_name: 'Rahul Sharma',
          mother_name: 'Priya Sharma',
          registration_date: '2024-05-15',
          issue_date: new Date().toLocaleDateString()
        });
        toast.success('Certificate found!');
      } else {
        toast.error('Certificate not found. Try PDH-CRT-123456');
      }
      setIsSearching(false);
    }, 800);
  };

  const handleDownloadPDF = () => {
    html2pdf().set({
      margin: 0.5,
      filename: `${certificateData.type}-Certificate-${certificateData.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(certRef.current).save();
    toast.info('Downloading Certificate PDF...');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <FileSignature className="text-primary" /> Certificate Services
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setActiveTab('apply')}
              className={`px-6 py-3 font-medium transition ${activeTab === 'apply' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Apply for New Certificate
            </button>
            <button 
              onClick={() => setActiveTab('download')}
              className={`px-6 py-3 font-medium transition ${activeTab === 'download' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Download Certificate
            </button>
          </div>

          {/* Apply Tab */}
          {activeTab === 'apply' && !submittedId && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Certificate Type</label>
                  <select 
                    value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary"
                  >
                    <option value="Birth">Birth Certificate</option>
                    <option value="Death">Death Certificate</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Person's Full Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of {formData.type}</label>
                    <input type="date" required value={formData.date_of_event} onChange={(e) => setFormData({...formData, date_of_event: e.target.value})}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Father's Name</label>
                    <input type="text" required value={formData.father_name} onChange={(e) => setFormData({...formData, father_name: e.target.value})}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mother's Name</label>
                    <input type="text" required value={formData.mother_name} onChange={(e) => setFormData({...formData, mother_name: e.target.value})}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Place of {formData.type} (Hospital/Home Address)</label>
                  <textarea required rows="2" value={formData.place_of_event} onChange={(e) => setFormData({...formData, place_of_event: e.target.value})}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Applicant Mobile Number</label>
                  <input type="tel" required pattern="[0-9]{10}" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" placeholder="10-digit number" />
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow hover:bg-opacity-90 disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Apply Success State */}
          {activeTab === 'apply' && submittedId && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
              <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Application Submitted</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Your {formData.type.toLowerCase()} certificate application is under review.</p>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg inline-block border border-gray-200 dark:border-gray-600 mb-6">
                <p className="text-sm text-gray-500 mb-1">Application ID</p>
                <p className="text-2xl font-mono font-bold text-primary">{submittedId}</p>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => { setSubmittedId(null); setFormData({...formData, name: '', date_of_event: '', place_of_event: '', father_name: '', mother_name: ''}); }} className="border border-gray-300 px-6 py-2 rounded font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                  New Application
                </button>
                <button onClick={() => setActiveTab('download')} className="bg-primary text-white px-6 py-2 rounded font-medium shadow hover:bg-opacity-90">
                  Check Status
                </button>
              </div>
            </motion.div>
          )}

          {/* Download Tab */}
          {activeTab === 'download' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {!certificateData && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
                  <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Search Certificate</h3>
                  <form onSubmit={handleSearch} className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Enter Application ID (e.g. PDH-CRT-123456)"
                      className="flex-grow border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                    <button type="submit" disabled={isSearching} className="bg-primary text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-opacity-90 disabled:opacity-50">
                      <Search size={18} /> {isSearching ? 'Searching...' : 'Search'}
                    </button>
                  </form>
                </div>
              )}

              {certificateData && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-green-800 font-medium">Certificate Generated Successfully!</p>
                    <div className="flex gap-2">
                      <button onClick={() => setCertificateData(null)} className="text-gray-500 hover:text-gray-700 px-3 py-1">Back</button>
                      <button onClick={handleDownloadPDF} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 shadow">
                        <Download size={18} /> Download PDF
                      </button>
                    </div>
                  </div>

                  {/* Certificate Template for PDF Export */}
                  <div className="bg-white p-12 rounded-lg shadow-lg border-[10px] border-double border-gray-300 relative" ref={certRef}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                       {/* Watermark logo */}
                       {currentMunicipality?.logo_url && <img src={currentMunicipality.logo_url} className="w-96 h-96 object-contain" alt="" />}
                    </div>

                    <div className="text-center mb-8 relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        {currentMunicipality?.logo_url && <img src={currentMunicipality.logo_url} alt="Logo" className="w-24 h-24 object-contain" />}
                        <div className="text-right">
                          <QRCodeSVG value={`VERIFY:CERT-${certificateData.id}`} size={70} />
                        </div>
                      </div>
                      <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider">{currentMunicipality?.name_en}</h1>
                      <h2 className="text-xl font-medium text-gray-700 mt-2">DEPARTMENT OF PUBLIC HEALTH</h2>
                      <h3 className="text-2xl font-bold text-primary mt-6 uppercase border-b-2 border-primary inline-block pb-1">{certificateData.type} CERTIFICATE</h3>
                    </div>

                    <div className="space-y-6 text-gray-800 text-lg leading-relaxed relative z-10">
                      <p>This is to certify that the following information has been taken from the original record of {certificateData.type} which is the register for <strong>{currentMunicipality?.name_en}</strong> of State/Union territory <strong>Maharashtra</strong>.</p>
                      
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8 my-8">
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-wide">Name</p>
                          <p className="font-bold text-xl">{certificateData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-wide">Date of {certificateData.type}</p>
                          <p className="font-bold">{certificateData.date_of_event}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-wide">Name of Father</p>
                          <p className="font-bold">{certificateData.father_name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-wide">Name of Mother</p>
                          <p className="font-bold">{certificateData.mother_name}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500 uppercase tracking-wide">Place of {certificateData.type}</p>
                          <p className="font-bold">{certificateData.place_of_event}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200 mt-12">
                        <div>
                          <p className="text-sm text-gray-500">Registration Number: <span className="font-bold text-gray-900">{certificateData.id}</span></p>
                          <p className="text-sm text-gray-500 mt-1">Date of Registration: <span className="font-medium text-gray-900">{certificateData.registration_date}</span></p>
                          <p className="text-sm text-gray-500 mt-1">Date of Issue: <span className="font-medium text-gray-900">{certificateData.issue_date}</span></p>
                        </div>
                        <div className="text-center flex flex-col items-center justify-end">
                          <div className="w-40 border-b-2 border-gray-800 mb-2"></div>
                          <p className="font-bold text-gray-800">Registrar (Birth & Death)</p>
                          <p className="text-sm text-gray-600">{currentMunicipality?.name_en}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default Certificate;
