// src/MicrosoftCallback.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MicrosoftCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const state = params.get('session_state');
      const codeVerifier = localStorage.getItem('pkce_code_verifier'); // Retrieve code_verifier

      if (code && codeVerifier) {
        // Ensure code_verifier is available
        try {
          const response = await fetch(
            `http://localhost:8000/api/v1/social/auth/microsoft/callback`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code,
                state,
                code_verifier: codeVerifier, // Include code_verifier in request body
              }),
            },
          );
          const data = await response.json();

          if (data.access_token) {
            // Store tokens in localStorage or cookies
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            // Redirect to user info page
            navigate('/user-info');
          } else {
            alert('Failed to authenticate with Microsoft.');
          }
        } catch (error) {
          console.error('Error during Microsoft authentication:', error);
          alert('An error occurred during authentication.');
        }
      } else {
        alert('Missing authorization code or code verifier.');
      }
    };

    handleCallback();
  }, [location.search, navigate]);

  return <div>Logging you in...</div>;
};

export default MicrosoftCallback;
