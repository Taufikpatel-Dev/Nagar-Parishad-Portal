import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PropertyTax from './pages/PropertyTax';
import WaterBill from './pages/WaterBill';
import TradeLicense from './pages/TradeLicense';
import Certificate from './pages/Certificate';
import Complaint from './pages/Complaint';
import Track from './pages/Track';
import AdminDashboard from './pages/admin/AdminDashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />
      <main id="main-content" className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<PlaceholderPage title="आमच्याबद्दल (About Us)" />} />
            <Route path="/services" element={<PlaceholderPage title="नागरिक सेवा (Citizen Services)" />} />
            <Route path="/services/:id" element={<PlaceholderPage />} />
            <Route path="/applications" element={<PlaceholderPage title="अर्जांची यादी (Applications)" />} />
            <Route path="/applications/track" element={<Track />} />
            <Route path="/complaints" element={<Complaint />} />
            <Route path="/complaints/track" element={<Track />} />
            <Route path="/notices" element={<PlaceholderPage title="सूचना आणि अद्यतने (Notices & Updates)" />} />
            <Route path="/tenders" element={<PlaceholderPage title="निविदा (Tenders)" />} />
            <Route path="/downloads" element={<PlaceholderPage title="डाउनलोड (Downloads)" />} />
            <Route path="/departments" element={<PlaceholderPage title="विभाग (Departments)" />} />
            <Route path="/contact" element={<PlaceholderPage title="संपर्क (Contact Us)" />} />
            
            {/* Auth & Dashboards */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<PlaceholderPage title="नोंदणी (Register)" />} />
            <Route path="/citizen/dashboard" element={<Dashboard />} />
            <Route path="/officer/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<PlaceholderPage title="माझे खाते (Profile)" />} />
            <Route path="/payments" element={<PlaceholderPage title="पेमेंट इतिहास (Payments)" />} />
            <Route path="/notifications" element={<PlaceholderPage title="सूचना (Notifications)" />} />
            <Route path="/settings" element={<PlaceholderPage title="सेटिंग्ज (Settings)" />} />
            
            {/* Legacy Service Routes */}
            <Route path="/services/property-tax" element={<PropertyTax />} />
            <Route path="/services/water-bill" element={<WaterBill />} />
            <Route path="/services/trade-license" element={<TradeLicense />} />
            <Route path="/services/certificate" element={<Certificate />} />
            <Route path="/services/complaint" element={<Complaint />} />
            <Route path="/track" element={<Track />} />
            
            {/* Fallback */}
            <Route path="*" element={<PlaceholderPage title="पृष्ठ आढळले नाही (404 Page Not Found)" />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export default App;
