import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted, onLearn, onAlgorithmSelect }) => {
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
            <span 
              className="algorithm" 
              onClick={() => onAlgorithmSelect('AES')} 
              onKeyDown={(e) => e.key === 'Enter' && onAlgorithmSelect('AES')}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              AES
            </span>
            <span className="separator">•</span>
            <span 
              className="algorithm" 
              onClick={() => onAlgorithmSelect('DES')} 
              onKeyDown={(e) => e.key === 'Enter' && onAlgorithmSelect('DES')}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              DES
            </span>
            <span className="separator">•</span>
            <span 
              className="algorithm" 
              onClick={() => onAlgorithmSelect('RSA')} 
              onKeyDown={(e) => e.key === 'Enter' && onAlgorithmSelect('RSA')}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              RSA
            </span>
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
