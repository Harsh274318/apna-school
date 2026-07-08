import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "../src/layout/index.css";
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'
import Provider from './components/context/Provider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider>
      <App />
      <ToastContainer 
      position="bottom-right"
      />
    </Provider>
  </BrowserRouter>,
)
