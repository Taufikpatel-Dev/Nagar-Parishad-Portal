import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { Search, FileText, Download, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2pdf from 'html2pdf.js';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

const PropertyTax = () => {
  const { currentMunicipality } = useMunicipality();
  const [searchQuery, setSearchQuery] = useState('');
  const [property, setProperty] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'processing', 'success'
  const receiptRef = useRef();

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery) return;
    
    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('property_number', searchQuery.toUpperCase())
        .eq('municipality_id', currentMunicipality.id)
        .single();
        
      if (error) {
        if(error.code === 'PGRST116') alert("Property not found. Try PDH-PROP-001");
        else throw error;
      } else {
        setProperty(data);
      }
    } catch(err) {
      console.error(err);
      alert("Error finding property.");
    } finally {
      setIsSearching(false);
    }
  };

  const handlePay = async () => {
    setPaymentStatus('processing');
    
    try {
      // Re-fetch property to prevent double-payment race conditions
      const { data: freshProperty, error: fetchErr } = await supabase
        .from('properties')
        .select('outstanding_amount')
        .eq('id', property.id)
        .single();
        
      if (fetchErr) throw fetchErr;
      if (freshProperty.outstanding_amount <= 0) {
        alert("This property tax has already been paid!");
        setProperty({ ...property, outstanding_amount: 0 });
        setPaymentStatus(null);
        return;
      }

      // Record transaction
      const { error } = await supabase
        .from('property_tax_payments')
        .insert({
          property_id: property.id,
          amount: freshProperty.outstanding_amount,
          payment_method: 'Online',
          transaction_id: `ONL${Math.floor(Math.random()*1000000000)}`
        });
        
      if(error) throw error;
      
      // Update property outstanding amount to 0
      await supabase
        .from('properties')
        .update({ outstanding_amount: 0 })
        .eq('id', property.id);
        
      setPaymentStatus('success');
      setProperty({ ...property, outstanding_amount: 0 }); // update local state
    } catch(err) {
      console.error(err);
      alert("Payment failed.");
      setPaymentStatus(null);
    }
  };

  const handleDownloadPDF = () => {
    const element = receiptRef.current;
    const opt = {
      margin:       1,
      filename:     `receipt-${property.property_number}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <FileText className="text-primary" /> Property Tax Payment
          </h2>

          {!property && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
              <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Search Property</h3>
            <form onSubmit={handleSearch} className="flex gap-4">
              <input 
                type="text" 
                placeholder="Enter Property Number (e.g. PDH-PROP-001)"
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

          {property && paymentStatus === null && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4 border-b pb-2 text-gray-800 dark:text-white">Property Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><span className="text-gray-500">Owner Name:</span> <span className="font-medium text-gray-800 dark:text-white">{property.owner_name}</span></div>
              <div><span className="text-gray-500">Property No:</span> <span className="font-medium text-gray-800 dark:text-white">{property.property_number}</span></div>
              <div><span className="text-gray-500">Address:</span> <span className="font-medium text-gray-800 dark:text-white">{property.address}</span></div>
              <div><span className="text-gray-500">Type:</span> <span className="font-medium text-gray-800 dark:text-white">{property.property_type}</span></div>
              <div><span className="text-gray-500">Ward:</span> <span className="font-medium text-gray-800 dark:text-white">{property.ward}</span></div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4 flex justify-between items-center">
              <div>
                <p className="text-red-800 dark:text-red-400 font-medium">Outstanding Tax Amount</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-500">₹{property.outstanding_amount}</p>
              </div>
              <button 
                onClick={handlePay}
                className="bg-green-600 text-white px-8 py-3 rounded text-lg font-bold shadow hover:bg-green-700 transition"
              >
                Pay Now
              </button>
              </div>
            </motion.div>
          )}

          {paymentStatus === 'processing' && (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Processing Payment...</p>
          </div>
        )}

          {paymentStatus === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-bold flex flex-col items-center gap-2">
              <div className="bg-green-500 text-white rounded-full p-2"><CheckCircle /></div>
              Payment Successful!
            </div>
            
            <div className="flex justify-end">
              <button onClick={handleDownloadPDF} className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2">
                <Download size={18} /> Download Receipt PDF
              </button>
            </div>

            {/* Receipt template to be exported to PDF */}
            <div className="bg-white p-8 rounded-lg shadow" ref={receiptRef}>
              <div className="border-b-2 border-gray-800 pb-4 mb-4 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  {currentMunicipality.logo_url && <img src={currentMunicipality.logo_url} alt="Logo" className="w-16 h-16 object-contain" />}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{currentMunicipality.name_en}</h1>
                    <p className="text-gray-600">Property Tax Payment Receipt</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">Receipt No: TX-{Math.floor(Math.random()*10000)}</p>
                  <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 text-gray-800">
                <div>
                  <p className="text-gray-500 text-sm">Received From</p>
                  <p className="font-bold">{property.owner_name}</p>
                  <p>{property.address}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Property Details</p>
                  <p>Number: <span className="font-medium">{property.property_number}</span></p>
                  <p>Ward: <span className="font-medium">{property.ward}</span></p>
                </div>
              </div>

              <table className="w-full text-left mb-8 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-y border-gray-300">
                    <th className="p-3 text-gray-700">Description</th>
                    <th className="p-3 text-right text-gray-700">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">Property Tax Payment (2025-2026)</td>
                    <td className="p-3 text-right font-medium">{property.outstanding_amount}.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-right text-lg">Total Paid</td>
                    <td className="p-3 text-right font-bold text-lg">₹{property.outstanding_amount}.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between items-end mt-12">
                <div className="text-gray-500 text-sm">
                  <p>Payment Mode: Online</p>
                  <p>Transaction ID: ONL{Math.floor(Math.random()*1000000000)}</p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <QRCodeSVG value={`VERIFY:TX-${property.property_number}-${property.outstanding_amount}`} size={80} />
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

export default PropertyTax;
