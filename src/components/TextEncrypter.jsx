import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import './TextEncrypter.css';

const TextEncrypter = ({ onBackToHome }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [algorithm, setAlgorithm] = useState('AES');
  const [key, setKey] = useState('');
  const [operation, setOperation] = useState('encrypt');
  const [rsaKeyPair, setRsaKeyPair] = useState(null);
  const [encryptionMode, setEncryptionMode] = useState('CBC');
  const [iv, setIv] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  // Generate RSA key pair
  const generateRSAKeys = () => {
    const encrypt = new JSEncrypt({ default_key_size: 2048 });
    encrypt.getKey();
    
    const publicKey = encrypt.getPublicKey();
    const privateKey = encrypt.getPrivateKey();
    
    setRsaKeyPair({ publicKey, privateKey, encrypt });
    alert('RSA key pair generated successfully!');
  };

  // AES Encryption/Decryption with different modes
  const processAES = () => {
    if (!key) {
      alert('Please enter a key for AES encryption/decryption');
      return;
    }

    if (!inputText.trim()) {
      alert('Please enter text to process');
      return;
    }

    try {
      let result;
      
      if (operation === 'encrypt') {
        // Generate random IV for CBC mode if not provided
        let ivToUse = iv;
        if (encryptionMode === 'CBC' && !ivToUse) {
          ivToUse = CryptoJS.lib.WordArray.random(128/8).toString();
          setIv(ivToUse);
        }

        if (encryptionMode === 'ECB') {
          // ECB mode - no IV needed
          result = CryptoJS.AES.encrypt(inputText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString();
        } else if (encryptionMode === 'CBC') {
          // CBC mode - requires IV
          const ivWordArray = ivToUse ? CryptoJS.enc.Hex.parse(ivToUse) : CryptoJS.lib.WordArray.random(128/8);
          result = CryptoJS.AES.encrypt(inputText, key, {
            iv: ivWordArray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }).toString();
          
          // Store the IV for decryption reference
          if (!ivToUse) {
            setIv(ivWordArray.toString());
          }
        }
        
        setOutputText(result);
      } else {
        // Decryption
        if (encryptionMode === 'CBC' && !iv) {
          alert('IV is required for CBC mode decryption. Please enter the IV used during encryption.');
          return;
        }

        if (encryptionMode === 'ECB') {
          result = CryptoJS.AES.decrypt(inputText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString(CryptoJS.enc.Utf8);
        } else if (encryptionMode === 'CBC') {
          const ivWordArray = CryptoJS.enc.Hex.parse(iv);
          result = CryptoJS.AES.decrypt(inputText, key, {
            iv: ivWordArray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }).toString(CryptoJS.enc.Utf8);
        }

        if (!result) {
          throw new Error('Decryption failed - invalid key, IV, or corrupted data');
        }
        
        setOutputText(result);
      }
    } catch (error) {
      console.error('AES Error:', error);
      if (error.message.includes('Malformed UTF-8')) {
        alert('Decryption failed: Invalid ciphertext or wrong key/IV combination');
      } else if (error.message.includes('Invalid base64')) {
        alert('Invalid input format. Please check your encrypted text.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  // DES Encryption/Decryption with different modes
  const processDES = () => {
    if (!key) {
      alert('Please enter a key for DES encryption/decryption');
      return;
    }

    // Validate key length for DES (8 bytes = 64 bits)
    if (key.length < 8) {
      alert('DES key must be at least 8 characters long');
      return;
    }

    if (!inputText.trim()) {
      alert('Please enter text to process');
      return;
    }

    try {
      let result;
      
      if (operation === 'encrypt') {
        // Generate random IV for CBC mode if not provided
        let ivToUse = iv;
        if (encryptionMode === 'CBC' && !ivToUse) {
          ivToUse = CryptoJS.lib.WordArray.random(64/8).toString();
          setIv(ivToUse);
        }

        if (encryptionMode === 'ECB') {
          // ECB mode - no IV needed
          result = CryptoJS.DES.encrypt(inputText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString();
        } else if (encryptionMode === 'CBC') {
          // CBC mode - requires IV
          const ivWordArray = ivToUse ? CryptoJS.enc.Hex.parse(ivToUse) : CryptoJS.lib.WordArray.random(64/8);
          result = CryptoJS.DES.encrypt(inputText, key, {
            iv: ivWordArray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }).toString();
          
          // Store the IV for decryption reference
          if (!ivToUse) {
            setIv(ivWordArray.toString());
          }
        }
        
        setOutputText(result);
      } else {
        // Decryption
        if (encryptionMode === 'CBC' && !iv) {
          alert('IV is required for CBC mode decryption. Please enter the IV used during encryption.');
          return;
        }

        if (encryptionMode === 'ECB') {
          result = CryptoJS.DES.decrypt(inputText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString(CryptoJS.enc.Utf8);
        } else if (encryptionMode === 'CBC') {
          const ivWordArray = CryptoJS.enc.Hex.parse(iv);
          result = CryptoJS.DES.decrypt(inputText, key, {
            iv: ivWordArray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }).toString(CryptoJS.enc.Utf8);
        }

        if (!result) {
          throw new Error('Decryption failed - invalid key, IV, or corrupted data');
        }
        
        setOutputText(result);
      }
    } catch (error) {
      console.error('DES Error:', error);
      if (error.message.includes('Malformed UTF-8')) {
        alert('Decryption failed: Invalid ciphertext or wrong key/IV combination');
      } else if (error.message.includes('Invalid base64')) {
        alert('Invalid input format. Please check your encrypted text.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  // RSA Encryption/Decryption
  const processRSA = () => {
    if (!rsaKeyPair) {
      alert('Please generate RSA keys first');
      return;
    }

    try {
      if (operation === 'encrypt') {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(rsaKeyPair.publicKey);
        const encrypted = encrypt.encrypt(inputText);
        if (!encrypted) {
          throw new Error('Encryption failed - text might be too long');
        }
        setOutputText(encrypted);
      } else {
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(rsaKeyPair.privateKey);
        const decrypted = decrypt.decrypt(inputText);
        if (!decrypted) {
          throw new Error('Decryption failed - invalid key or corrupted data');
        }
        setOutputText(decrypted);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleProcess = () => {
    if (!inputText.trim()) {
      alert('Please enter some text to process');
      return;
    }

    switch (algorithm) {
      case 'AES':
        processAES();
        break;
      case 'DES':
        processDES();
        break;
      case 'RSA':
        processRSA();
        break;
      default:
        alert('Please select an algorithm');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage('Copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 3000); // Clear message after 3 seconds
    });
  };

  // Generate random IV
  const generateIV = () => {
    const ivSize = algorithm === 'AES' ? 128/8 : 64/8; // AES uses 128-bit IV, DES uses 64-bit IV
    const randomIV = CryptoJS.lib.WordArray.random(ivSize).toString();
    setIv(randomIV);
  };

  // Clear all fields
  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setKey('');
    setIv('');
  };

  return (
    <div className="text-encrypter">
      <div className="container">
        <header className="header">
          <button className="back-button" onClick={onBackToHome}>
            ← Back
          </button>
          <h1 className="title">SecureText</h1>
        </header>

        <div className="main-content">
          <div className="controls">
            <div className="control-row">
              <div className="control-group">
                <label className="label">Algorithm</label>
                <select 
                  value={algorithm} 
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="select"
                >
                  <option value="AES">AES</option>
                  <option value="DES">DES</option>
                  <option value="RSA">RSA</option>
                </select>
              </div>

              <div className="control-group">
                <label className="label">Operation</label>
                <div className="toggle-container">
                  <span className={`toggle-label ${operation === 'encrypt' ? 'active' : ''}`}>
                    Encrypt
                  </span>
                  <div className="toggle-switch" onClick={() => setOperation(operation === 'encrypt' ? 'decrypt' : 'encrypt')}>
                    <div className={`toggle-slider ${operation === 'decrypt' ? 'active' : ''}`}></div>
                  </div>
                  <span className={`toggle-label ${operation === 'decrypt' ? 'active' : ''}`}>
                    Decrypt
                  </span>
                </div>
              </div>
            </div>

            {algorithm !== 'RSA' && (
              <>
                <div className="control-group">
                  <label className="label">Secret Key</label>
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Enter your secret key"
                    className="input"
                  />
                </div>

                <div className="control-group">
                  <label className="label">Encryption Mode</label>
                  <select 
                    value={encryptionMode} 
                    onChange={(e) => setEncryptionMode(e.target.value)}
                    className="select"
                  >
                    <option value="CBC">CBC (Cipher Block Chaining)</option>
                    <option value="ECB">ECB (Electronic Codebook)</option>
                  </select>
                </div>

                {encryptionMode === 'CBC' && (
                  <div className="control-group">
                    <label className="label">Initialization Vector (IV)</label>
                    <div className="iv-input-container">
                      <input
                        type="text"
                        value={iv}
                        onChange={(e) => setIv(e.target.value)}
                        placeholder="Enter IV (hex) or generate random"
                        className="input"
                      />
                      <button 
                        onClick={generateIV} 
                        className="generate-iv-button"
                        type="button"
                      >
                        Generate
                      </button>
                    </div>
                    <small className="iv-help">
                      {algorithm === 'AES' 
                        ? 'AES requires a 128-bit (32 hex chars) IV for CBC mode.' 
                        : 'DES requires a 64-bit (16 hex chars) IV for CBC mode.'
                      } Leave empty to auto-generate during encryption.
                    </small>
                  </div>
                )}
              </>
            )}

            {algorithm === 'RSA' && (
              <div className="control-group">
                <label className="label">RSA Keys</label>
                <button onClick={generateRSAKeys} className="generate-button">
                  {rsaKeyPair ? 'Regenerate Keys' : 'Generate Keys'}
                </button>
                {rsaKeyPair && (
                  <p className="key-status">Keys generated successfully</p>
                )}
              </div>
            )}
          </div>

          <div className="text-areas">
            <div className="textarea-group">
              <label className="label">Input</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="textarea"
                rows="6"
              />
            </div>

            <div className="textarea-group">
              <label className="label">Output</label>
              <div className="output-container">
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Your encrypted/decrypted text will appear here"
                  className="textarea output"
                  rows="6"
                />
                {outputText && (
                  <button 
                    onClick={() => copyToClipboard(outputText)}
                    className="copy-button"
                    title="Copy to clipboard"
                  >
                    Copy
                  </button>
                )}
                {copyMessage && (
                  <div className="copy-message">
                    {copyMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="actions">
            <button onClick={handleProcess} className="process-button">
              {operation === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </button>
            <button onClick={clearAll} className="clear-button">
              Clear
            </button>
          </div>
        </div>

        {algorithm === 'RSA' && rsaKeyPair && (
          <div className="rsa-keys">
            <h3 className="keys-title">Generated Keys</h3>
            <div className="key-section">
              <label className="label">Public Key</label>
              <div className="key-container">
                <textarea 
                  value={rsaKeyPair.publicKey} 
                  readOnly 
                  className="key-textarea"
                  rows="4"
                />
                <button 
                  onClick={() => copyToClipboard(rsaKeyPair.publicKey)} 
                  className="copy-key-button"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="key-section">
              <label className="label">Private Key</label>
              <div className="key-container">
                <textarea 
                  value={rsaKeyPair.privateKey} 
                  readOnly 
                  className="key-textarea"
                  rows="6"
                />
                <button 
                  onClick={() => copyToClipboard(rsaKeyPair.privateKey)} 
                  className="copy-key-button"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextEncrypter;
