import ReactDOM from 'react-dom/client';
import './main.css';
import { App } from './App';
import './translations/i18n.ts';
import { Provider } from 'react-redux';
import { store } from './store';
import { StrictMode } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider >
        <Toaster position="top-right" richColors />
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
