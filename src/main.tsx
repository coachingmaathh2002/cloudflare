import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MathJaxContext } from 'better-react-mathjax';

const mathJaxConfig = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MathJaxContext config={mathJaxConfig}>
      <App />
    </MathJaxContext>
  </StrictMode>,
);
