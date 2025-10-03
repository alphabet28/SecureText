import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted, onLearn }) => {
  return (
    <div className="landing-page">
      <div className="container">
        {/* <div className="learn-button-container">
          <button className="learn-button" onClick={onLearn}>
            📚 Learn
          </button>
        </div> */}
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
          <div className="button-group">
            <button className="cta-button" onClick={onGetStarted}>
              Start Encrypting
            </button>
            <button className="learn-cta-button" onClick={onLearn}>
              Learn How It Works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
