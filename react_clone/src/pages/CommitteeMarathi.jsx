import React, { useEffect, useRef } from 'react';
import htmlContent from '../../full_clone/cloned_website/committee_marathi.html?raw';

export default function CommitteeMarathi() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
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
