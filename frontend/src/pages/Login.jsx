import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // In a real app, use supabase auth
    // const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    // For this demo without actual auth setup on backend:
    setTimeout(() => {
      // simulate login
      if(email && password) {
        // we'd redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Please enter both email and password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">{t('header.login')}</h2>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : t('header.login')}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
