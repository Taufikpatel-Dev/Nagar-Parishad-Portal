import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n/config';
import { BrowserRouter } from 'react-router-dom';
import { MunicipalityProvider } from './contexts/MunicipalityContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MunicipalityProvider>
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <App />
            </Suspense>
          </ToastProvider>
        </AuthProvider>
      </MunicipalityProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
