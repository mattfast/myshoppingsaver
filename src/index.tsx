import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId={"639818267081-06fchc8fuc3uu5laf1sjb4csb1pr26k2.apps.googleusercontent.com"}>
    <App />
  </GoogleOAuthProvider>
);
