import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

class ADUCalculator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.shadowRoot!.appendChild(mountPoint);

    const styleSheet = document.createElement('link');
    styleSheet.setAttribute('rel', 'stylesheet');
    styleSheet.setAttribute('href', '/assets/index.css');
    this.shadowRoot!.appendChild(styleSheet);

    createRoot(mountPoint).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

customElements.define('adu-calculator', ADUCalculator);

// Export for script tag usage
(window as any).ADUCalculator = ADUCalculator;