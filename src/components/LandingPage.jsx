import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-page">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">SecureText</h1>
          <p className="hero-subtitle">
            Simple, secure text encryption
          </p>
          <div className="algorithms">
            <span className="algorithm">AES</span>
            <span className="separator">•</span>
            <span className="algorithm">DES</span>
            <span className="separator">•</span>
            <span className="algorithm">RSA</span>
          </div>
          <button className="cta-button" onClick={onGetStarted}>
            Start Encrypting
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
