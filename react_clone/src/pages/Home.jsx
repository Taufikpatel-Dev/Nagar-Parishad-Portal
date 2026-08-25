import React, { useEffect, useRef } from 'react';
import htmlContent from '../home.html?raw';

export default function Home() {
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

        const closeBtn = document.getElementById('closeBtn');
        const fakescreen = document.getElementById('fakescreen');
        if (closeBtn && fakescreen) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                fakescreen.style.display = 'none';
            });
        }
    }
  }, []);

  return (
    <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
}