import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/Errorboundary/ErrorBoundary';
import store from './store/store';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
      <App />
      </ErrorBoundary>      
    </Provider>
  </React.StrictMode>
);