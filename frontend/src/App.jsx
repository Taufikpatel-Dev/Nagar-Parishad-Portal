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
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'var(--bg)',color:'var(--text)'}}>
      <Header />
      <main id="main-content" style={{flex:1}}>
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
            <Route path="/about" element={<PlaceholderPage />} />
            <Route path="/page/:slug" element={<PlaceholderPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export default App;
