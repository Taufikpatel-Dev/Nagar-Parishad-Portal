import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Check, ChevronRight, UploadCloud, FileText, CheckCircle2, ArrowLeft, CreditCard, Building, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ApplyService = () => {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const isMr = i18n.language === 'mr';

  const steps = [
    { id: 1, titleMr: 'अर्जदार', titleEn: 'Applicant', desc: 'Applicant Details' },
    { id: 2, titleMr: 'सेवा माहिती', titleEn: 'Service Details', desc: 'Service Details' },
    { id: 3, titleMr: 'कागदपत्रे', titleEn: 'Documents', desc: 'Documents' },
    { id: 4, titleMr: 'पूर्वावलोकन', titleEn: 'Review', desc: 'Review' },
    { id: 5, titleMr: 'पेमेंट', titleEn: 'Payment', desc: 'Payment' },
    { id: 6, titleMr: 'पावती', titleEn: 'Confirmation', desc: 'Confirmation' },
  ];

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const simulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nextStep();
    }, 2000);
  };

  return (
    <div className="flex-1 bg-slate-50 pb-16">
      
      <div className="bg-[var(--color-gov-navy)] text-white pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-4">
            <ArrowLeft size={16} /> {isMr ? 'सेवा सूचीवर परत जा' : 'Back to Services'}
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold font-marathi mb-2">
            {isMr ? 'नवीन मालमत्ता नोंदणी (New Property Registration)' : 'New Property Registration'}
          </h1>
          <p className="text-slate-400 text-sm font-marathi">
            {isMr ? 'कृपया खालील फॉर्म अचूक भरा. * चिन्हांकित रकाने भरणे आवश्यक आहे.' : 'Please fill out the form accurately. * marked fields are mandatory.'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          <div className="bg-slate-50 border-b border-slate-200 p-4 md:p-6 overflow-x-auto">
            <div className="flex items-center min-w-[600px]">
              {steps.map((step, i) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
                      currentStep > step.id ? 'bg-[#15803D] border-[#15803D] text-white' :
                      currentStep === step.id ? 'bg-white border-[#15803D] text-[#15803D] shadow-[0_0_0_4px_rgba(21,128,61,0.1)]' :
                      'bg-white border-slate-300 text-slate-400'
                    }`}>
                      {currentStep > step.id ? <Check size={18} /> : step.id}
                    </div>
                    <div className="text-center mt-2 absolute top-12 w-24 -ml-7">
                      <p className={`text-xs font-bold font-marathi ${currentStep >= step.id ? 'text-slate-800' : 'text-slate-400'}`}>{isMr ? step.titleMr : step.titleEn}</p>
                    </div>
                  </div>
                  
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 bg-slate-200 rounded-full relative -mt-6">
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#15803D] rounded-full transition-all duration-500"
                        style={{ width: currentStep > step.id ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="h-8"></div>
          </div>

          <div className="p-6 md:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                
                {currentStep === 1 && (
                  <div className="space-y-6 max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-slate-800 font-marathi mb-6 border-b pb-2">{isMr ? 'अर्जदाराची माहिती' : 'Applicant Details'}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="gov-label">{isMr ? 'पहिले नाव (First Name) *' : 'First Name *'}</label>
                        <input type="text" className="gov-input" placeholder={isMr ? "उदा. रमेश" : "e.g. Ramesh"} />
                      </div>
                      <div>
                        <label className="gov-label">{isMr ? 'आडनाव (Last Name) *' : 'Last Name *'}</label>
                        <input type="text" className="gov-input" placeholder={isMr ? "उदा. पाटील" : "e.g. Patil"} />
                      </div>
                      <div>
                        <label className="gov-label">{isMr ? 'मोबाईल क्रमांक *' : 'Mobile Number *'}</label>
                        <input type="tel" className="gov-input bg-slate-100" value="9876543210" disabled />
                      </div>
                      <div>
                        <label className="gov-label">{isMr ? 'ईमेल (Optional)' : 'Email (Optional)'}</label>
                        <input type="email" className="gov-input" placeholder="ramesh@example.com" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="gov-label">{isMr ? 'संपूर्ण पत्ता (Full Address) *' : 'Full Address *'}</label>
                        <textarea className="gov-input h-24 resize-none" placeholder={isMr ? "तुमचा कायमस्वरूपी पत्ता लिहा..." : "Enter your permanent address..."}></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-slate-800 font-marathi mb-6 border-b pb-2">{isMr ? 'मालमत्तेची माहिती' : 'Property Details'}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="gov-label">{isMr ? 'मालमत्तेचा प्रकार *' : 'Property Type *'}</label>
                        <select className="gov-input">
                          <option>{isMr ? 'निवासी (Residential)' : 'Residential'}</option>
                          <option>{isMr ? 'व्यावसायिक (Commercial)' : 'Commercial'}</option>
                          <option>{isMr ? 'औद्योगिक (Industrial)' : 'Industrial'}</option>
                          <option>{isMr ? 'मोकळा भूखंड (Open Plot)' : 'Open Plot'}</option>
                        </select>
                      </div>
                      <div>
                        <label className="gov-label">{isMr ? 'प्रभाग क्र. (Ward No.) *' : 'Ward No. *'}</label>
                        <select className="gov-input">
                          <option>{isMr ? 'प्रभाग १' : 'Ward 1'}</option>
                          <option>{isMr ? 'प्रभाग २' : 'Ward 2'}</option>
                          <option>{isMr ? 'प्रभाग ३' : 'Ward 3'}</option>
                          <option>{isMr ? 'प्रभाग ४' : 'Ward 4'}</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="gov-label">{isMr ? 'मालमत्तेचा पत्ता *' : 'Property Address *'}</label>
                        <textarea className="gov-input h-24 resize-none" placeholder={isMr ? "मालमत्तेचा सविस्तर पत्ता..." : "Detailed property address..."}></textarea>
                      </div>
                      <div>
                        <label className="gov-label">{isMr ? 'बिल्ट-अप क्षेत्र (चौ. फूट) *' : 'Built-up Area (Sq.ft) *'}</label>
                        <input type="number" className="gov-input" placeholder={isMr ? "उदा. 1200" : "e.g. 1200"} />
                      </div>
                      <div>
                        <label className="gov-label">{isMr ? 'खरेदी वर्ष *' : 'Purchase Year *'}</label>
                        <input type="number" className="gov-input" placeholder={isMr ? "उदा. 2024" : "e.g. 2024"} />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-slate-800 font-marathi mb-6 border-b pb-2">{isMr ? 'कागदपत्रे अपलोड करा' : 'Upload Documents'}</h3>
                    
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-sm mb-6 flex items-start gap-3">
                      <AlertCircle className="shrink-0 mt-0.5" size={18} />
                      <p>{isMr ? 'कृपया मूळ कागदपत्रांच्या स्पष्ट स्कॅन केलेल्या प्रती अपलोड करा. (कमाल आकार: ५ MB, प्रकार: PDF/JPG/PNG)' : 'Please upload clear scanned copies of original documents. (Max size: 5 MB, Format: PDF/JPG/PNG)'}</p>
                    </div>

                    <div className="space-y-4">
                      {['आधार कार्ड (Aadhar Card) *', 'खरेदी खत (Sale Deed) *', 'वीज बिल (Electricity Bill)'].map((doc, i) => (
                        <div key={i} className="border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{doc}</p>
                            <p className="text-xs text-slate-500">{isMr ? 'प्रलंबित' : 'Pending'}</p>
                          </div>
                          
                          <label className="flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-[#15803D] hover:text-[#15803D] text-slate-600 px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm font-semibold">
                            <UploadCloud size={18} /> {isMr ? 'अपलोड करा' : 'Upload'}
                            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-6 border-b pb-2">
                      <h3 className="text-xl font-bold text-slate-800 font-marathi">{isMr ? 'माहितीचे पूर्वावलोकन (Review)' : 'Review Details'}</h3>
                      <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">Draft</span>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2"><FileText size={18} /> {isMr ? 'अर्जदाराची माहिती' : 'Applicant Details'}</h4>
                        <button onClick={() => setCurrentStep(1)} className="text-sm text-blue-600 hover:underline font-semibold">Edit</button>
                      </div>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <div><p className="text-slate-500 mb-1">{isMr ? 'नाव' : 'Name'}</p><p className="font-semibold text-slate-900">{isMr ? 'रमेश पाटील' : 'Ramesh Patil'}</p></div>
                        <div><p className="text-slate-500 mb-1">{isMr ? 'मोबाईल' : 'Mobile'}</p><p className="font-semibold text-slate-900">9876543210</p></div>
                        <div className="col-span-2"><p className="text-slate-500 mb-1">{isMr ? 'पत्ता' : 'Address'}</p><p className="font-semibold text-slate-900">{isMr ? 'शिवाजी नगर, मुख्य रस्ता, पिन ४११०००' : 'Shivaji Nagar, Main Road, Pin 411000'}</p></div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2"><Building size={18} /> {isMr ? 'मालमत्तेची माहिती' : 'Property Details'}</h4>
                        <button onClick={() => setCurrentStep(2)} className="text-sm text-blue-600 hover:underline font-semibold">Edit</button>
                      </div>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <div><p className="text-slate-500 mb-1">{isMr ? 'प्रकार' : 'Type'}</p><p className="font-semibold text-slate-900">{isMr ? 'निवासी' : 'Residential'}</p></div>
                        <div><p className="text-slate-500 mb-1">{isMr ? 'प्रभाग' : 'Ward'}</p><p className="font-semibold text-slate-900">{isMr ? 'प्रभाग ४' : 'Ward 4'}</p></div>
                        <div><p className="text-slate-500 mb-1">{isMr ? 'बिल्ट-अप क्षेत्र' : 'Built-up Area'}</p><p className="font-semibold text-slate-900">1200 sq.ft</p></div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6 max-w-lg mx-auto">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 font-marathi">{isMr ? 'ऑनलाइन पेमेंट' : 'Online Payment'}</h3>
                      <p className="text-sm text-slate-500">{isMr ? 'अर्ज प्रक्रिया पूर्ण करण्यासाठी शुल्क भरा' : 'Pay the fee to complete the application process'}</p>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                      <div className="flex justify-between text-sm mb-3 text-slate-600">
                        <span>{isMr ? 'अर्ज शुल्क (Application Fee)' : 'Application Fee'}</span>
                        <span>₹१५०.००</span>
                      </div>
                      <div className="flex justify-between text-sm mb-4 text-slate-600">
                        <span>{isMr ? 'सुविधा शुल्क (Convenience Fee)' : 'Convenience Fee'}</span>
                        <span>₹१०.००</span>
                      </div>
                      <div className="border-t border-slate-300 pt-4 flex justify-between items-center">
                        <span className="font-bold text-slate-900">{isMr ? 'एकूण रक्कम (Total)' : 'Total Amount'}</span>
                        <span className="text-2xl font-bold text-[#15803D]">₹१६०.००</span>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <p className="text-sm font-semibold text-slate-800 mb-4">{isMr ? 'पेमेंट पर्याय निवडा (Select Payment Mode)' : 'Select Payment Mode'}</p>
                      <div className="space-y-3">
                        {['UPI (GPay, PhonePe, etc.)', 'Credit / Debit Card', 'Net Banking'].map((mode, i) => (
                          <label key={i} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="radio" name="payment_mode" className="text-[#15803D] focus:ring-[#15803D]" defaultChecked={i===0} />
                            <span className="text-sm font-medium text-slate-700">{mode}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="text-center py-10 max-w-lg mx-auto">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 font-marathi mb-2">{isMr ? 'अर्ज यशस्वीरीत्या सबमिट झाला!' : 'Application Submitted Successfully!'}</h2>
                    <p className="text-slate-600 font-marathi mb-8">
                      {isMr ? 'तुमचा अर्ज प्राप्त झाला आहे. पुढील प्रक्रियेसाठी संबंधित अधिकाऱ्याकडे पाठवण्यात आला आहे.' : 'Your application has been received and forwarded to the concerned officer.'}
                    </p>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 text-left">
                      <p className="text-sm text-slate-500 mb-1">{isMr ? 'तुमचा अर्ज क्रमांक (Application No.)' : 'Application Number'}</p>
                      <p className="text-2xl font-bold text-slate-900 tracking-wider mb-4">APP-2026-90812</p>
                      <div className="w-full bg-slate-200 h-[1px] mb-4"></div>
                      <p className="text-xs text-slate-500">{isMr ? 'या क्रमांकाच्या मदतीने तुम्ही अर्जाची स्थिती जाणून घेऊ शकता. याची नोंद एसएमएस द्वारे पाठवण्यात आली आहे.' : 'You can track your application status using this number. An SMS has been sent to your registered mobile number.'}</p>
                    </div>
                    
                    <Link to="/citizen/dashboard" className="gov-btn-primary inline-block">
                      {isMr ? 'डॅशबोर्डवर परत जा' : 'Back to Dashboard'}
                    </Link>
                  </div>
                )}
                
              </motion.div>
            </AnimatePresence>
          </div>

          {currentStep < 6 && (
            <div className="bg-slate-50 border-t border-slate-200 p-4 md:p-6 flex justify-between items-center rounded-b-2xl">
              <button 
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${currentStep === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100'}`}
              >
                {isMr ? 'मागे जा (Back)' : 'Back'}
              </button>
              
              {currentStep === 5 ? (
                <button 
                  onClick={simulatePayment}
                  disabled={loading}
                  className="gov-btn-primary !px-8 flex items-center gap-2"
                >
                  {loading ? (isMr ? 'प्रक्रिया चालू आहे...' : 'Processing...') : (isMr ? 'पेमेंट करा (Pay Now)' : 'Pay Now')}
                </button>
              ) : (
                <button 
                  onClick={nextStep}
                  className="gov-btn-primary flex items-center gap-2"
                >
                  {isMr ? 'पुढे जा (Next)' : 'Next'} <ChevronRight size={18} />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ApplyService;
