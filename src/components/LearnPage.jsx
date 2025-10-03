import React, { useState } from 'react';
import './LearnPage.css';

const LearnPage = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('aes');

  const algorithms = {
    aes: {
      title: 'AES (Advanced Encryption Standard)',
      subtitle: '256-bit Symmetric Encryption',
      description: 'AES is a symmetric block cipher that encrypts data in 128-bit blocks using keys of 128, 192, or 256 bits.',
      howItWorks: [
        'Uses the same key for both encryption and decryption (symmetric)',
        'Divides plaintext into 128-bit blocks',
        'Applies multiple rounds of transformations (10, 12, or 14 rounds depending on key size)',
        'Each round involves substitution, permutation, mixing, and key addition operations',
        'Our implementation uses 256-bit keys for maximum security'
      ],
      modes: [
        {
          name: 'CBC (Cipher Block Chaining)',
          description: 'Each block is XORed with the previous ciphertext block before encryption. Requires an Initialization Vector (IV) for the first block.',
          pros: ['More secure than ECB', 'Identical plaintext blocks produce different ciphertext'],
          cons: ['Sequential processing', 'Error propagation']
        },
        {
          name: 'ECB (Electronic Codebook)',
          description: 'Each block is encrypted independently using the same key.',
          pros: ['Simple implementation', 'Parallel processing possible'],
          cons: ['Less secure', 'Identical plaintext blocks produce identical ciphertext', 'Patterns may be visible']
        }
      ],
      useCases: [
        'File encryption',
        'Database encryption',
        'VPN connections',
        'Secure messaging',
        'Password managers'
      ],
      security: 'AES-256 is considered quantum-resistant and is approved by the NSA for TOP SECRET information.'
    },
    des: {
      title: 'DES (Data Encryption Standard)',
      subtitle: '64-bit Symmetric Encryption (Legacy)',
      description: 'DES is an older symmetric block cipher that encrypts data in 64-bit blocks using a 56-bit key.',
      howItWorks: [
        'Uses a 64-bit key (but only 56 bits are used for encryption, 8 bits are parity)',
        'Divides plaintext into 64-bit blocks',
        'Applies 16 rounds of Feistel network transformations',
        'Each round uses a different 48-bit subkey derived from the main key',
        'Uses permutation and substitution operations'
      ],
      modes: [
        {
          name: 'CBC (Cipher Block Chaining)',
          description: 'Each block is XORed with the previous ciphertext block. Requires a 64-bit IV.',
          pros: ['More secure than ECB', 'Hides patterns in plaintext'],
          cons: ['Sequential processing', 'Error propagation']
        },
        {
          name: 'ECB (Electronic Codebook)',
          description: 'Each 64-bit block is encrypted independently.',
          pros: ['Simple implementation', 'No error propagation'],
          cons: ['Patterns visible', 'Not secure for large amounts of data']
        }
      ],
      useCases: [
        'Legacy system support',
        'Educational purposes',
        'Understanding symmetric encryption concepts'
      ],
      security: '⚠️ DES is considered cryptographically broken due to its short key length. Use only for compatibility with legacy systems.'
    },
    rsa: {
      title: 'RSA (Rivest-Shamir-Adleman)',
      subtitle: '2048-bit Asymmetric Encryption',
      description: 'RSA is an asymmetric (public-key) cryptosystem that uses a pair of keys: a public key for encryption and a private key for decryption.',
      howItWorks: [
        'Generate two large prime numbers (p and q)',
        'Calculate n = p × q (this becomes part of both keys)',
        'Calculate φ(n) = (p-1) × (q-1)',
        'Choose public exponent e (commonly 65537)',
        'Calculate private exponent d such that e × d ≡ 1 (mod φ(n))',
        'Public key = (n, e), Private key = (n, d)'
      ],
      keyGeneration: [
        'Our implementation uses 2048-bit keys for strong security',
        'Public key can be shared freely - used for encryption',
        'Private key must be kept secret - used for decryption',
        'Mathematically related but computationally infeasible to derive one from the other'
      ],
      useCases: [
        'Secure key exchange',
        'Digital signatures',
        'SSL/TLS certificates',
        'Email encryption (PGP)',
        'Software signing'
      ],
      limitations: [
        'Slower than symmetric encryption',
        'Limited message size (can only encrypt data smaller than key size)',
        'Not suitable for large amounts of data',
        'Vulnerable to quantum computing (in the future)'
      ],
      security: 'RSA-2048 is currently secure but RSA-3072 or higher is recommended for long-term security.'
    }
  };

  const currentAlgorithm = algorithms[activeTab];

  return (
    <div className="learn-page">
      <div className="container">
        <header className="header">
          <button className="back-button" onClick={onBackToHome}>
            ← Back to Home
          </button>
          <h1 className="title">Learn Encryption</h1>
        </header>

        <div className="content">
          <div className="tabs">
            {Object.keys(algorithms).map((key) => (
              <button
                key={key}
                className={`tab ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="algorithm-content">
            <div className="algorithm-header">
              <h2 className="algorithm-title">{currentAlgorithm.title}</h2>
              <p className="algorithm-subtitle">{currentAlgorithm.subtitle}</p>
              <p className="algorithm-description">{currentAlgorithm.description}</p>
            </div>

            <div className="sections">
              <section className="section">
                <h3 className="section-title">How It Works</h3>
                <ul className="section-list">
                  {currentAlgorithm.howItWorks.map((step, index) => (
                    <li key={index} className="section-item">{step}</li>
                  ))}
                </ul>
              </section>

              {currentAlgorithm.modes && (
                <section className="section">
                  <h3 className="section-title">Encryption Modes</h3>
                  {currentAlgorithm.modes.map((mode, index) => (
                    <div key={index} className="mode-card">
                      <h4 className="mode-title">{mode.name}</h4>
                      <p className="mode-description">{mode.description}</p>
                      <div className="pros-cons">
                        <div className="pros">
                          <h5>Advantages:</h5>
                          <ul>
                            {mode.pros.map((pro, idx) => (
                              <li key={idx}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="cons">
                          <h5>Disadvantages:</h5>
                          <ul>
                            {mode.cons.map((con, idx) => (
                              <li key={idx}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {currentAlgorithm.keyGeneration && (
                <section className="section">
                  <h3 className="section-title">Key Generation Process</h3>
                  <ul className="section-list">
                    {currentAlgorithm.keyGeneration.map((step, index) => (
                      <li key={index} className="section-item">{step}</li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="section">
                <h3 className="section-title">Common Use Cases</h3>
                <ul className="section-list">
                  {currentAlgorithm.useCases.map((useCase, index) => (
                    <li key={index} className="section-item">{useCase}</li>
                  ))}
                </ul>
              </section>

              {currentAlgorithm.limitations && (
                <section className="section">
                  <h3 className="section-title">Limitations</h3>
                  <ul className="section-list">
                    {currentAlgorithm.limitations.map((limitation, index) => (
                      <li key={index} className="section-item">{limitation}</li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="section security-section">
                <h3 className="section-title">Security Level</h3>
                <p className="security-info">{currentAlgorithm.security}</p>
              </section>
            </div>

            <div className="try-it-section">
              <h3 className="section-title">Ready to Try It?</h3>
              <p>Now that you understand how {currentAlgorithm.title} works, go back to the main application and try encrypting some text!</p>
              <button className="try-button" onClick={onBackToHome}>
                Try {activeTab.toUpperCase()} Encryption
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;