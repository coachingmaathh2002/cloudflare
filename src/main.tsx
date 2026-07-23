import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MathJaxContext } from 'better-react-mathjax';

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    enableMenu: false,
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
  startup: {
    typeset: true
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MathJaxContext 
      version={3} 
      config={mathJaxConfig}
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
    >
      <App />
    </MathJaxContext>
  </StrictMode>,
);
