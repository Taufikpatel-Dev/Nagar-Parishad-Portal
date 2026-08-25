import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Smartphone, Mail, Lock, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('mobile');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const isMr = i18n.language === 'mr';

  const handleSendOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/citizen/dashboard');
    }, 1500);
  };

  return (
    <div className="flex-1 flex bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-80 bg-[var(--color-gov-navy)] -z-0 rounded-b-[40px] md:rounded-b-[80px]"></div>
      
      <div className="w-full max-w-5xl mx-auto px-4 py-12 lg:py-20 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center relative z-10">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2 text-white flex flex-col justify-center text-center lg:text-left">
          <div className="w-20 h-20 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center mb-8 mx-auto lg:mx-0 backdrop-blur-sm">
            <Building size={40} className="text-[#16A34A]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-marathi mb-6 leading-tight">
            {isMr ? 'नगर परिषद' : 'Nagar Parishad'} <br/><span className="text-[#F97316]">{isMr ? 'डिजिटल सेवा' : 'Digital Seva'}</span> {isMr ? 'मध्ये आपले स्वागत आहे' : 'Welcome'}
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto lg:mx-0 font-marathi">
            {isMr ? 'आपले सरकार, आपल्या दारी. आता सर्व नागरी सेवा एकाच सुरक्षित प्लॅटफॉर्मवर.' : 'Your government, at your doorstep. All civic services now on a single secure platform.'}
          </p>
          
          <div className="space-y-4 font-marathi text-slate-300 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#16A34A]" />
              <span>{isMr ? '१००% सुरक्षित आणि एन्क्रिप्टेड लॉगिन' : '100% Secure & Encrypted Login'}</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#16A34A]" />
              <span>{isMr ? 'सर्व सेवांसाठी एकच खाते (Single Sign-On)' : 'One Account for All Services (SSO)'}</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#16A34A]" />
              <span>{isMr ? 'अर्जाचा त्वरित आणि पारदर्शक मागोवा' : 'Quick and Transparent Application Tracking'}</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 font-marathi mb-2">{isMr ? 'नागरिक लॉगिन' : 'Citizen Login'}</h2>
              <p className="text-slate-500 font-marathi text-sm">{isMr ? 'लॉगिन करण्यासाठी पद्धत निवडा' : 'Select a method to login'}</p>
            </div>

            {step === 1 && (
              <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
                <button 
                  onClick={() => setLoginMethod('mobile')}
                  className={`flex-1 py-2.5 flex justify-center items-center gap-2 rounded-lg text-sm font-semibold transition-colors ${loginMethod === 'mobile' ? 'bg-white text-[#15803D] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Smartphone size={18} /> {isMr ? 'मोबाईल + OTP' : 'Mobile + OTP'}
                </button>
                <button 
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2.5 flex justify-center items-center gap-2 rounded-lg text-sm font-semibold transition-colors ${loginMethod === 'email' ? 'bg-white text-[#15803D] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Mail size={18} /> {isMr ? 'ईमेल + पासवर्ड' : 'Email + Password'}
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {loginMethod === 'mobile' && (
                <motion.div key="mobile" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}}>
                  {step === 1 ? (
                    <form onSubmit={handleSendOTP} className="space-y-5">
                      <div>
                        <label className="gov-label">{isMr ? 'मोबाईल क्रमांक (Mobile Number)' : 'Mobile Number'}</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-slate-500 font-medium">+91</span>
                          </div>
                          <input 
                            type="tel" required maxLength="10" pattern="[0-9]{10}"
                            className="gov-input pl-12 font-medium tracking-wide"
                            placeholder="९८७६५४३२१०"
                            value={mobile} onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>
                      </div>
                      <button type="submit" disabled={loading} className="gov-btn-primary w-full flex justify-center items-center gap-2 py-3.5">
                        {loading ? (isMr ? 'कृपया प्रतीक्षा करा...' : 'Please Wait...') : (isMr ? 'OTP पाठवा (Send OTP)' : 'Send OTP')} 
                        {!loading && <ArrowRight size={18} />}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-5">
                      <div className="text-center mb-6">
                        <p className="text-sm text-slate-500 font-marathi">
                          {isMr ? `+91 ${mobile} वर पाठवलेला ६ अंकी OTP प्रविष्ट करा` : `Enter the 6-digit OTP sent to +91 ${mobile}`}
                        </p>
                        <button type="button" onClick={() => setStep(1)} className="text-[#15803D] text-xs font-semibold mt-1 hover:underline">
                          {isMr ? 'मोबाईल क्रमांक बदला' : 'Change Mobile Number'}
                        </button>
                      </div>
                      <div>
                        <label className="gov-label text-center">{isMr ? 'वन-टाईम पासवर्ड (OTP)' : 'One-Time Password (OTP)'}</label>
                        <input 
                          type="text" required maxLength="6"
                          className="gov-input text-center text-2xl tracking-[0.5em] font-bold"
                          placeholder="••••••"
                          value={otp} onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                      <button type="submit" disabled={loading} className="gov-btn-primary w-full py-3.5">
                        {loading ? (isMr ? 'पडताळणी करत आहे...' : 'Verifying...') : (isMr ? 'लॉगिन करा (Verify & Login)' : 'Verify & Login')}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}

              {loginMethod === 'email' && (
                <motion.div key="email" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="gov-label">{isMr ? 'ईमेल आयडी (Email ID)' : 'Email ID'}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Mail size={18} className="text-slate-400" />
                        </div>
                        <input 
                          type="email" required
                          className="gov-input pl-10"
                          placeholder="citizen@example.com"
                          value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-semibold text-slate-700">{isMr ? 'पासवर्ड (Password)' : 'Password'}</label>
                        <a href="#" className="text-xs font-semibold text-[#15803D] hover:underline">{isMr ? 'विसरलात?' : 'Forgot?'}</a>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Lock size={18} className="text-slate-400" />
                        </div>
                        <input 
                          type="password" required
                          className="gov-input pl-10"
                          placeholder="••••••••"
                          value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="gov-btn-primary w-full py-3.5">
                      {loading ? (isMr ? 'लॉगिन करत आहे...' : 'Logging in...') : (isMr ? 'लॉगिन करा (Login)' : 'Login')}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Shield size={14} className="text-[#15803D]" />
                <span>{isMr ? 'सुरक्षित महाराष्ट्र शासन पोर्टल' : 'Secure Govt of Maharashtra Portal'}</span>
              </div>
              <p className="text-slate-600 font-marathi text-sm">
                {isMr ? 'नवीन आहात?' : 'New here?'} {' '}
                <Link to="/register" className="text-[#F97316] font-bold hover:underline">
                  {isMr ? 'येथे नोंदणी करा' : 'Register Here'}
                </Link>
              </p>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
