// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import MicrosoftCallback from './MicrosoftCallback';
import UserInfo from './UserInfo';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth/microsoft/callback" element={<MicrosoftCallback />} />
      <Route path="/user-info" element={<UserInfo />} />
    </Routes>
  </Router>,
  document.getElementById('root'),
);
