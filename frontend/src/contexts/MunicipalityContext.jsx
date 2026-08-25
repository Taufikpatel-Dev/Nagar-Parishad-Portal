import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const MunicipalityContext = createContext();

export const MunicipalityProvider = ({ children }) => {
  const [municipalities, setMunicipalities] = useState([]);
  const [currentMunicipality, setCurrentMunicipality] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const { data, error } = await supabase.from('municipalities').select('*');
        if (error) throw error;
        
        setMunicipalities(data);
        // Default to Pandharpur if it exists
        const defaultM = data.find(m => m.code === 'pandharpur') || data[0];
        if (defaultM) {
          handleSetMunicipality(defaultM);
        }
      } catch (error) {
        console.error('Error fetching municipalities:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMunicipalities();
  }, []);

  const handleSetMunicipality = (municipality) => {
    setCurrentMunicipality(municipality);
    // Apply dynamic theme color
    if (municipality && municipality.primary_color) {
      document.documentElement.style.setProperty('--color-primary', municipality.primary_color);
    }
  };

  return (
    <MunicipalityContext.Provider value={{ 
      municipalities, 
      currentMunicipality, 
      setCurrentMunicipality: handleSetMunicipality,
      loading 
    }}>
      {children}
    </MunicipalityContext.Provider>
  );
};

export const useMunicipality = () => useContext(MunicipalityContext);
