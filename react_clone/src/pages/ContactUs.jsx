import React, { useEffect, useRef } from 'react';
import htmlContent from '../../../full_clone/cloned_website/contact_us_marathi.html?raw';

export default function ContactUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
        // Strip out duplicate headers/footers if they exist, or just render it
        const scripts = containerRef.current.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }
  }, []);

  return (
    <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
}