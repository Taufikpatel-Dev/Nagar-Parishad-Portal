import React, { useState } from 'react';
import Header from '../components/Header';
import { useMunicipality } from '../contexts/MunicipalityContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MessageSquare, UploadCloud, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Complaint = () => {
  const { currentMunicipality } = useMunicipality();
  const { session } = useAuth();
  
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    ward: '',
    address: '',
    mobile: '' // for guest users
  });
  const [submittedId, setSubmittedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState('');
  const categories = ['Water Supply', 'Streetlights', 'Garbage', 'Drainage', 'Roads/Potholes', 'Other'];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Strict Client-Side Validation
    const wardNum = parseInt(formData.ward);
    const maxWards = currentMunicipality?.ward_count || 100;
    if (isNaN(wardNum) || wardNum < 1 || wardNum > maxWards) {
      alert(`Invalid ward. Please select a ward between 1 and ${maxWards}.`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      let photo_url = null;
      if (selectedFile) {
        setUploadProgress('Uploading photo...');
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${currentMunicipality.id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('complaint_photos')
          .upload(filePath, selectedFile);
          
        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('complaint_photos')
            .getPublicUrl(filePath);
          photo_url = publicUrlData.publicUrl;
        } else {
          console.warn("Storage upload failed, proceeding without photo:", uploadError);
        }
      }

      setUploadProgress('Saving complaint...');
      const { data, error } = await supabase
        .from('complaints')
        .insert({
          municipality_id: currentMunicipality.id,
          user_id: session?.user?.id || null, // null for guest
          category: formData.category,
          description: formData.description,
          ward: parseInt(formData.ward),
          address: formData.address,
          mobile: formData.mobile || null,
          photo_url: photo_url,
          status: 'Pending'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setSubmittedId(data.id);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          <MessageSquare className="text-primary" /> Register a Complaint
        </h2>

        {!submittedId ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            {!session && (
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-3 rounded mb-6 text-sm border border-blue-200 dark:border-blue-800">
                You are filing a complaint as a guest. <a href="/login" className="underline font-medium">Login</a> to track it easily from your dashboard.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!session && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Complaint Category</label>
                <select 
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ward Number</label>
                <input 
                  type="number" 
                  min="1" max={currentMunicipality?.ward_count || 100}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                  value={formData.ward}
                  onChange={e => setFormData({...formData, ward: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address / Landmark</label>
                <textarea 
                  required
                  rows="2"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Photo (Optional, Max 5MB)</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-750 transition relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {!selectedFile ? (
                    <>
                      <UploadCloud className="mx-auto text-gray-400 mb-2" size={32} />
                      <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                    </>
                  ) : (
                    <div className="text-primary font-medium text-sm flex items-center justify-center gap-2">
                      <CheckCircle size={18} />
                      {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                {isSubmitting && <p className="text-sm text-blue-600 text-center animate-pulse">{uploadProgress}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow hover:bg-opacity-90 transition disabled:opacity-50">
                  {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
            <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Complaint Submitted</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Your complaint has been successfully registered.</p>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg inline-block border border-gray-200 dark:border-gray-600 mb-8">
              <p className="text-sm text-gray-500 mb-1">Your Complaint ID</p>
              <p className="text-2xl font-mono font-bold text-primary">{submittedId}</p>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">Please save this ID. You can use it to track the status of your complaint.</p>
            
            <div className="flex justify-center gap-4">
              <button onClick={() => setSubmittedId(null)} className="border border-gray-300 px-6 py-2 rounded font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                File Another
              </button>
              <a href="/track" className="bg-primary text-white px-6 py-2 rounded font-medium shadow hover:bg-opacity-90">
                Track Status
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Complaint;
