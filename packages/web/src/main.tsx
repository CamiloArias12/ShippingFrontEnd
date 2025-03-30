import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { App } from './App';
import './translations/i18n.ts';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
