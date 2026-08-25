import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200 overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services/property-tax" element={<PropertyTax />} />
        <Route path="/services/water-bill" element={<WaterBill />} />
        <Route path="/services/trade-license" element={<TradeLicense />} />
        <Route path="/services/certificate" element={<Certificate />} />
        <Route path="/services/complaint" element={<Complaint />} />
        <Route path="/track" element={<Track />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
      <ChatbotWidget />
    </div>
  );
}

export default App;
