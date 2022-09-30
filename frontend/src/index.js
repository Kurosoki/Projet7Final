import React from 'react';
import 'bulma/css/bulma.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
export * from '@/_services/account.service'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


