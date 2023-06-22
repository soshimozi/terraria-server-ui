import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from './reportWebVitals';
import './index.css';

import { getConfig } from "./authConfig";


const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    redirect_uri: 'https://soshimozi.github.io/terraria-server-ui/',
    ...(config.audience ? { audience: config.audience } : null),    
  },
};

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Auth0Provider {...providerConfig}>	
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
