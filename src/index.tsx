import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'components/theme-context';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <TooltipProvider>
      <ThemeProvider>
        <App />
        <Toaster />
      </ThemeProvider>
    </TooltipProvider>
  </React.StrictMode>
);
