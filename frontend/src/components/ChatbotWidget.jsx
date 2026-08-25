import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState([
    { text: i18n.language === 'mr' ? 'नमस्कार! मी AI सहाय्यक आहे. मी तुम्हाला कशी मदत करू शकतो?' : 'Hello! I am your AI Assistant. How can I help you today?', isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput('');

    // Mock response logic
    setTimeout(() => {
      let reply = i18n.language === 'mr' ? 'माफ करा, मला तुमचा प्रश्न समजला नाही. कृपया "tax", "water", "complaint", "license" किंवा "track" असे शब्द वापरा.' : 'I didn\'t understand that. Try keywords like "tax", "water", "complaint", "license", or "track".';
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('tax') || lowerInput.includes('टॅक्स')) {
        reply = i18n.language === 'mr' ? 'प्रॉपर्टी टॅक्स भरण्यासाठी मुख्य मेनूमधून "Property Tax" वर क्लिक करा. उदा. PDH-PROP-001 शोधा.' : 'To pay property tax, go to "Property Tax" from the main menu. Try searching PDH-PROP-001.';
      } else if (lowerInput.includes('water') || lowerInput.includes('पाणी') || lowerInput.includes('पाणीपट्टी')) {
        reply = i18n.language === 'mr' ? 'पाणीपट्टी भरण्यासाठी "Water Bill" वर जा. PDH-WTR-001 किंवा PDH-WTR-002 शोधा.' : 'To pay your water bill, go to "Water Bill" from the menu. Try PDH-WTR-001 or PDH-WTR-002.';
      } else if (lowerInput.includes('complaint') || lowerInput.includes('तक्रार')) {
        reply = i18n.language === 'mr' ? 'तक्रार नोंदवण्यासाठी "Register a Complaint" बटणावर क्लिक करा.' : 'Click the "Register a Complaint" button to file a new grievance.';
      } else if (lowerInput.includes('license') || lowerInput.includes('परवाना') || lowerInput.includes('trade')) {
        reply = i18n.language === 'mr' ? 'व्यवसाय परवान्यासाठी "Trade License" वर जा आणि फॉर्म भरा.' : 'Go to "Trade License" from the services menu to apply for a business license.';
      } else if (lowerInput.includes('track') || lowerInput.includes('status') || lowerInput.includes('स्थिती')) {
        reply = i18n.language === 'mr' ? 'तुमच्या अर्जाची स्थिती पाहण्यासाठी "Track Status" वर जा आणि तुमचा ID टाका.' : 'Go to "Track Status" and enter your complaint or application ID to check its progress.';
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('नमस्कार')) {
        reply = i18n.language === 'mr' ? 'नमस्कार! मी तुमचा AI सहाय्यक. मला "tax", "water", "complaint" याबद्दल विचारा!' : 'Hello! I\'m your AI assistant. Ask me about tax, water bills, complaints, or trade licenses!';
      }

      setMessages([...newMessages, { text: reply, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
            style={{ height: '400px' }}
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <MessageSquare size={18} /> 
                {i18n.language === 'mr' ? 'AI सहाय्यक' : 'AI Assistant'}
              </h3>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-200 transition">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.isBot ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200' : 'bg-primary text-white'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={i18n.language === 'mr' ? 'येथे टाईप करा...' : 'Type a message...'}
                className="flex-grow border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary"
              />
              <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-opacity-90 transition">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-opacity-90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default ChatbotWidget;
