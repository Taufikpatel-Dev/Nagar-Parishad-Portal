import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ICONS = {
  success: <CheckCircle size={20} className="text-green-500" />,
  error: <AlertTriangle size={20} className="text-red-500" />,
  info: <Info size={20} className="text-blue-500" />,
  warning: <AlertTriangle size={20} className="text-yellow-500" />,
};

const COLORS = {
  success: 'border-green-500 bg-green-50 dark:bg-green-900/30',
  error: 'border-red-500 bg-red-50 dark:bg-red-900/30',
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
  warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
    warning: (msg) => addToast(msg, 'warning'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[200] space-y-3 pointer-events-none" style={{ maxWidth: '400px' }}>
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border-l-4 ${COLORS[t.type]} backdrop-blur-sm`}
            >
              {ICONS[t.type]}
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100 flex-grow">{t.message}</p>
              <button onClick={() => removeToast(t.id)} className="text-gray-400 hover:text-gray-600 transition">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
