import React, { useState, useRef } from 'react';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { useToast } from '../contexts/ToastContext';
import { Search, Droplets, Download, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2pdf from 'html2pdf.js';
import { motion } from 'framer-motion';

const WaterBill = () => {
  const { currentMunicipality } = useMunicipality();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [connection, setConnection] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const receiptRef = useRef();

  // Mock water connection data for demo
  const MOCK_CONNECTIONS = {
    'PDH-WTR-001': {
      id: '1', connection_number: 'PDH-WTR-001', owner_name: 'श्री. राजेश पाटील',
      address: '45, गणेश नगर, पंढरपूर', ward: 3, meter_number: 'MTR-2024-4521',
      connection_type: 'Domestic', pipe_size: '15mm',
      current_reading: 4520, previous_reading: 4380,
      consumption_units: 140, rate_per_unit: 8,
      bill_amount: 1120, arrears: 560, total_due: 1680,
      bill_month: 'July 2026', due_date: '2026-08-31',
    },
    'PDH-WTR-002': {
      id: '2', connection_number: 'PDH-WTR-002', owner_name: 'श्रीमती. सुनीता कुलकर्णी',
      address: '12, विठ्ठल पेठ, पंढरपूर', ward: 1, meter_number: 'MTR-2024-7891',
      connection_type: 'Domestic', pipe_size: '15mm',
      current_reading: 2100, previous_reading: 1980,
      consumption_units: 120, rate_per_unit: 8,
      bill_amount: 960, arrears: 0, total_due: 960,
      bill_month: 'July 2026', due_date: '2026-08-31',
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);

    setTimeout(() => {
      const found = MOCK_CONNECTIONS[searchQuery.toUpperCase()];
      if (found) {
        setConnection(found);
        toast.success(`Connection ${found.connection_number} found!`);
      } else {
        toast.error('Connection not found. Try PDH-WTR-001 or PDH-WTR-002');
      }
      setIsSearching(false);
    }, 800);
  };

  const handlePay = () => {
    if (connection.total_due <= 0) {
      toast.info('No outstanding dues!');
      return;
    }
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      toast.success('Water bill payment successful!');
    }, 2000);
  };

  const handleDownloadPDF = () => {
    html2pdf().set({
      margin: 1,
      filename: `water-bill-${connection.connection_number}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(receiptRef.current).save();
    toast.info('Downloading receipt PDF...');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <Droplets className="text-blue-500" /> Water Bill Payment
          </h2>

          {/* Search */}
          {!connection && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
              <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Search Water Connection</h3>
              <form onSubmit={handleSearch} className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter Connection Number (e.g. PDH-WTR-001)"
                  className="flex-grow border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
                <button type="submit" disabled={isSearching} className="bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50">
                  <Search size={18} /> {isSearching ? 'Searching...' : 'Search'}
                </button>
              </form>
            </div>
          )}

          {/* Connection Details */}
          {connection && paymentStatus === null && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="font-semibold text-gray-800 dark:text-white">Water Connection Details</h3>
                <button onClick={() => { setConnection(null); setSearchQuery(''); }} className="text-sm text-gray-500 hover:text-primary">← Back to Search</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                <div><span className="text-gray-500">Owner:</span> <span className="font-medium text-gray-800 dark:text-white">{connection.owner_name}</span></div>
                <div><span className="text-gray-500">Connection No:</span> <span className="font-medium text-gray-800 dark:text-white">{connection.connection_number}</span></div>
                <div><span className="text-gray-500">Address:</span> <span className="font-medium text-gray-800 dark:text-white">{connection.address}</span></div>
                <div><span className="text-gray-500">Type:</span> <span className="font-medium text-gray-800 dark:text-white">{connection.connection_type}</span></div>
                <div><span className="text-gray-500">Meter No:</span> <span className="font-medium text-gray-800 dark:text-white">{connection.meter_number}</span></div>
                <div><span className="text-gray-500">Ward:</span> <span className="font-medium text-gray-800 dark:text-white">{connection.ward}</span></div>
              </div>

              {/* Billing Details Table */}
              <div className="bg-gray-50 dark:bg-gray-750 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-blue-50 dark:bg-blue-900/20">
                    <tr>
                      <th className="text-left p-3 text-gray-600 dark:text-gray-300" colSpan="2">Bill for {connection.bill_month}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr><td className="p-3 text-gray-600">Previous Reading</td><td className="p-3 text-right font-medium text-gray-800 dark:text-white">{connection.previous_reading}</td></tr>
                    <tr><td className="p-3 text-gray-600">Current Reading</td><td className="p-3 text-right font-medium text-gray-800 dark:text-white">{connection.current_reading}</td></tr>
                    <tr><td className="p-3 text-gray-600">Units Consumed</td><td className="p-3 text-right font-medium text-gray-800 dark:text-white">{connection.consumption_units}</td></tr>
                    <tr><td className="p-3 text-gray-600">Rate per Unit</td><td className="p-3 text-right font-medium text-gray-800 dark:text-white">₹{connection.rate_per_unit}</td></tr>
                    <tr><td className="p-3 text-gray-600">Current Bill Amount</td><td className="p-3 text-right font-medium text-gray-800 dark:text-white">₹{connection.bill_amount}</td></tr>
                    {connection.arrears > 0 && <tr className="bg-red-50 dark:bg-red-900/10"><td className="p-3 text-red-600">Previous Arrears</td><td className="p-3 text-right font-bold text-red-600">₹{connection.arrears}</td></tr>}
                    <tr className="bg-blue-100 dark:bg-blue-900/30 font-bold"><td className="p-3 text-gray-800 dark:text-white text-base">Total Due</td><td className="p-3 text-right text-blue-700 dark:text-blue-300 text-xl">₹{connection.total_due}</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Due Date: <span className="font-bold text-red-600">{connection.due_date}</span></p>
                <button onClick={handlePay} className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold shadow hover:bg-green-700 transition">
                  Pay ₹{connection.total_due}
                </button>
              </div>
            </motion.div>
          )}

          {/* Processing */}
          {paymentStatus === 'processing' && (
            <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300">Processing Payment...</p>
            </div>
          )}

          {/* Success & Receipt */}
          {paymentStatus === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-lg text-center font-bold flex flex-col items-center gap-2">
                <div className="bg-green-500 text-white rounded-full p-2"><CheckCircle /></div>
                Water Bill Payment Successful!
              </div>

              <div className="flex justify-end">
                <button onClick={handleDownloadPDF} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                  <Download size={18} /> Download Receipt PDF
                </button>
              </div>

              <div className="bg-white p-8 rounded-lg shadow" ref={receiptRef}>
                <div className="border-b-2 border-gray-800 pb-4 mb-4 flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{currentMunicipality?.name_en}</h1>
                    <p className="text-gray-600">Water Bill Payment Receipt</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">Receipt No: WB-{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6 text-gray-800">
                  <div>
                    <p className="text-gray-500 text-sm">Consumer</p>
                    <p className="font-bold">{connection.owner_name}</p>
                    <p>{connection.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Connection</p>
                    <p>Number: <span className="font-medium">{connection.connection_number}</span></p>
                    <p>Meter: <span className="font-medium">{connection.meter_number}</span></p>
                  </div>
                </div>

                <table className="w-full text-left mb-6 border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-y border-gray-300">
                      <th className="p-3 text-gray-700">Description</th>
                      <th className="p-3 text-right text-gray-700">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-3">Water Charges ({connection.consumption_units} units × ₹{connection.rate_per_unit})</td><td className="p-3 text-right">{connection.bill_amount}.00</td></tr>
                    {connection.arrears > 0 && <tr className="border-b"><td className="p-3">Previous Arrears</td><td className="p-3 text-right">{connection.arrears}.00</td></tr>}
                    <tr><td className="p-3 font-bold text-right text-lg">Total Paid</td><td className="p-3 text-right font-bold text-lg">₹{connection.total_due}.00</td></tr>
                  </tbody>
                </table>

                <div className="flex justify-between items-end mt-8">
                  <div className="text-gray-500 text-sm">
                    <p>Payment Mode: Online</p>
                    <p>Transaction ID: WTR{Math.floor(Math.random() * 1000000000)}</p>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <QRCodeSVG value={`VERIFY:WB-${connection.connection_number}-${connection.total_due}`} size={80} />
                    <p className="text-xs text-gray-500 mt-2">Scan to Verify</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 border-b border-gray-400 mb-2"></div>
                    <p className="text-gray-700 text-sm font-medium">Authorized Signatory</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WaterBill;
