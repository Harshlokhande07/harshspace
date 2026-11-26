import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppErrorBoundary } from './components/UI/AppErrorBoundary';
import { WebGLFallback } from './components/UI/WebGLFallback';
import { isWebGLAvailable } from './utils/webglCheck';

const rootElement = document.getElementById('root')!;
const webglSupported = isWebGLAvailable();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppErrorBoundary>
      {webglSupported ? <App /> : <WebGLFallback />}
    </AppErrorBoundary>
  </React.StrictMode>
);
