import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Ensure browser preserves scroll position naturally across refreshes
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto';
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

