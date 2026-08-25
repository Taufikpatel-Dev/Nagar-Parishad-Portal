import fs from 'fs';
import path from 'path';

const cloneDir = 'd:/solapurpmc/full_clone/cloned_website';
const pagesDir = 'd:/solapurpmc/react_clone/src/pages';
const appJsxPath = 'd:/solapurpmc/react_clone/src/App.jsx';

// Get all html files
const files = fs.readdirSync(cloneDir).filter(f => f.endsWith('.html'));

let imports = `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';\n`;

let routes = `export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>\n`;

files.forEach(file => {
    const baseName = file.replace('.html', '');
    const componentName = baseName.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    
    const componentCode = `import React, { useEffect, useRef } from 'react';
import htmlContent from '../../full_clone/cloned_website/${file}?raw';

export default function ${componentName}() {
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
`;
    fs.writeFileSync(path.join(pagesDir, componentName + '.jsx'), componentCode);
    
    imports += `import ${componentName} from './pages/${componentName}';\n`;
    
    if (file === 'home_marathi.html') {
        routes += `        <Route index element={<${componentName} />} />\n`;
    } else {
        routes += `        <Route path="${file.replace('.html', '.aspx')}" element={<${componentName} />} />\n`;
        routes += `        <Route path="${file}" element={<${componentName} />} />\n`;
    }
});

routes += `      </Route>
    </Routes>
  );
}
`;

fs.writeFileSync(appJsxPath, imports + routes);
console.log('Successfully generated ' + files.length + ' pages and updated App.jsx');