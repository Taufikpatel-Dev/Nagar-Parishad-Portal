import React, { useState } from 'react';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, CheckCircle, FileText, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TradeLicense = () => {
  const { currentMunicipality } = useMunicipality();
  const { session } = useAuth();
  const toast = useToast();

  const [step, setStep] = useState(1); // 1=form, 2=review, 3=success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  const [formData, setFormData] = useState({
    applicant_name: '',
    business_name: '',
    business_type: '',
    address: '',
    ward: '',
    mobile: '',
    aadhaar: '',
    gst_number: '',
  });

  const businessTypes = [
    'General Store / Kirana',
    'Restaurant / Hotel',
    'Medical Store / Pharmacy',
    'Hardware / Building Material',
    'Garment / Textile Shop',
    'Electronics / Mobile Shop',
    'Workshop / Garage',
    'Professional Services',
    'Other',
  ];

  const FEE_AMOUNT = 2500;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReview = (e) => {
    e.preventDefault();

    const wardNum = parseInt(formData.ward);
    const maxWards = currentMunicipality?.ward_count || 100;
    if (isNaN(wardNum) || wardNum < 1 || wardNum > maxWards) {
      toast.error(`Invalid ward. Please select between 1 and ${maxWards}.`);
      return;
    }

    setStep(2);
    toast.info('Please review your application details.');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const id = `TL-${currentMunicipality?.id?.substring(0, 3).toUpperCase() || 'PDH'}-${Date.now().toString().slice(-6)}`;
      setApplicationId(id);
      setStep(3);
      setIsSubmitting(false);
      toast.success('Trade License application submitted successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <Briefcase className="text-primary" /> Trade License Application
          </h2>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-primary text-white shadow-lg scale-110' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                  {step > s ? <CheckCircle size={20} /> : s}
                </div>
                {s < 3 && <div className={`w-16 h-1 rounded ${step > s ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Form */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <form onSubmit={handleReview} className="space-y-4">
                {!session && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-3 rounded mb-4 text-sm border border-blue-200 dark:border-blue-800">
                    You are applying as a guest. <a href="/login" className="underline font-medium">Login</a> to track your application.
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Applicant Full Name</label>
                    <input type="text" name="applicant_name" required value={formData.applicant_name} onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name</label>
                    <input type="text" name="business_name" required value={formData.business_name} onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Type</label>
                  <select name="business_type" required value={formData.business_type} onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700">
                    <option value="">Select Business Type</option>
                    {businessTypes.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Address</label>
                  <textarea name="address" required rows="2" value={formData.address} onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ward Number</label>
                    <input type="number" name="ward" required min="1" max={currentMunicipality?.ward_count || 100}
                      value={formData.ward} onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                    <input type="tel" name="mobile" required pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange}
                      placeholder="10-digit number"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aadhaar Number</label>
                    <input type="text" name="aadhaar" required pattern="[0-9]{12}" value={formData.aadhaar} onChange={handleChange}
                      placeholder="12-digit Aadhaar"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GST Number (Optional)</label>
                  <input type="text" name="gst_number" value={formData.gst_number} onChange={handleChange}
                    placeholder="If applicable"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700" />
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow hover:bg-opacity-90 transition">
                    Review Application →
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2">Review Your Application</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-sm">
                <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded"><span className="text-gray-500 block text-xs">Applicant</span><span className="font-medium text-gray-800 dark:text-white">{formData.applicant_name}</span></div>
                <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded"><span className="text-gray-500 block text-xs">Business</span><span className="font-medium text-gray-800 dark:text-white">{formData.business_name}</span></div>
                <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded"><span className="text-gray-500 block text-xs">Type</span><span className="font-medium text-gray-800 dark:text-white">{formData.business_type}</span></div>
                <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded"><span className="text-gray-500 block text-xs">Ward</span><span className="font-medium text-gray-800 dark:text-white">{formData.ward}</span></div>
                <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded col-span-2"><span className="text-gray-500 block text-xs">Address</span><span className="font-medium text-gray-800 dark:text-white">{formData.address}</span></div>
                <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded"><span className="text-gray-500 block text-xs">Mobile</span><span className="font-medium text-gray-800 dark:text-white">{formData.mobile}</span></div>
                <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded"><span className="text-gray-500 block text-xs">Aadhaar</span><span className="font-medium text-gray-800 dark:text-white">XXXX-XXXX-{formData.aadhaar.slice(-4)}</span></div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 flex justify-between items-center">
                <div>
                  <p className="text-blue-800 dark:text-blue-300 font-medium">License Fee (Annual)</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Includes processing charge</p>
                </div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">₹{FEE_AMOUNT}</p>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  ← Edit
                </button>
                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold shadow hover:bg-green-700 transition disabled:opacity-50">
                  {isSubmitting ? 'Submitting...' : `Pay ₹${FEE_AMOUNT} & Submit`}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
              <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Application Submitted!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Your trade license application has been submitted and payment received.</p>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg inline-block border border-gray-200 dark:border-gray-600 mb-4">
                <p className="text-sm text-gray-500 mb-1">Application ID</p>
                <p className="text-2xl font-mono font-bold text-primary">{applicationId}</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 flex items-center gap-2 mb-2">
                  <Clock size={16} /> Expected Timeline
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                  <li>• Document Verification: 2-3 Working Days</li>
                  <li>• Site Inspection: 3-5 Working Days</li>
                  <li>• License Issue: 7-10 Working Days</li>
                </ul>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => { setStep(1); setFormData({ applicant_name: '', business_name: '', business_type: '', address: '', ward: '', mobile: '', aadhaar: '', gst_number: '' }); setApplicationId(null); }}
                  className="border border-gray-300 px-6 py-2 rounded font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                  New Application
                </button>
                <a href="/track" className="bg-primary text-white px-6 py-2 rounded font-medium shadow hover:bg-opacity-90">
                  Track Status
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TradeLicense;
