import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PlaceholderPage = ({ title }) => {
  const { slug } = useParams();
  
  const displayTitle = title || slug || "येथे लवकरच नवीन पृष्ठ येईल";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
      <div className="text-5xl mb-6">🚧</div>
      <h2 className="text-3xl font-bold text-slate-800 mb-4">{displayTitle}</h2>
      <p className="text-slate-500 mb-8 max-w-lg mx-auto">
        हे पृष्ठ सध्या विकसित केले जात आहे. लवकरच आम्ही आपल्यासाठी हे पृष्ठ उपलब्ध करू. कृपया काही कालावधीनंतर पुन्हा भेट द्या.
      </p>
      <Link 
        to="/" 
        className="gov-btn-primary flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        मुख्यपृष्ठावर परत जा
      </Link>
    </div>
  );
};

export default PlaceholderPage;
