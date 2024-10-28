import React from 'react';
import { generatePkcePair } from './utils';

const App = () => {
  const handleMicrosoftLogin = async () => {
    const { codeVerifier, codeChallenge } = await generatePkcePair();
    localStorage.setItem('pkce_code_verifier', codeVerifier); // Store codeVerifier for later use

    const params = {
      client_id: 'db3ce909-3cc6-4238-80dc-4e63d3c0c1a7',
      response_type: 'code',
      redirect_uri: 'http://localhost:3000/auth/microsoft/callback',
      response_mode: 'query',
      code_challenge: codeChallenge, // Add PKCE code challenge
      code_challenge_method: 'S256',
      scope: 'openid profile email Mail.Read User.Read User.ReadBasic.All',
    };

    const queryString = new URLSearchParams(params).toString();
    window.location.href = `https://login.microsoftonline.com/c09fae9e-0750-4861-a01d-0dd6d9721be7/oauth2/v2.0/authorize?${queryString}`;
  };

  return (
    <div>
      <h1>React Microsoft SSO Demo with PKCE</h1>
      <button onClick={handleMicrosoftLogin}>Login with Microsoft</button>
    </div>
  );
};

export default App;
