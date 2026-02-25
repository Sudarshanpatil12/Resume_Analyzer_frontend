import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AlertProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);
