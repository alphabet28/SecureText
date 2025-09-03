# SecureText

A modern React-based text encryption application supporting multiple encryption algorithms including AES, DES, and RSA.

## Features

- **Multiple Encryption Algorithms**:
  - AES (Advanced Encryption Standard) - 256-bit encryption
  - DES (Data Encryption Standard) - Legacy support
  - RSA (Rivest-Shamir-Adleman) - Asymmetric encryption with 2048-bit keys

- **Modern UI**: Beautiful landing page with gradient backgrounds and smooth animations
- **Easy to Use**: Simple interface for quick encryption and decryption
- **Secure**: All encryption happens locally in your browser
- **Fast**: Instant encryption with optimized algorithms
- **Free**: No registration required, completely free to use

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd text-encrypter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### AES/DES Encryption
1. Select AES or DES algorithm
2. Choose encrypt or decrypt operation
3. Enter your secret key
4. Input your text
5. Click the encrypt/decrypt button

### RSA Encryption
1. Select RSA algorithm
2. Generate RSA key pair
3. Choose encrypt or decrypt operation
4. Input your text
5. Click the encrypt/decrypt button

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **CryptoJS** - JavaScript crypto library for AES and DES
- **NodeRSA** - RSA encryption library
- **CSS3** - Custom styling with gradients and animations

## Security Features

- Client-side encryption (no data sent to servers)
- Secure key generation for RSA
- Support for strong encryption algorithms
- Copy to clipboard functionality
- Key visibility controls

## Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx      # Landing page component
│   ├── LandingPage.css      # Landing page styles
│   ├── TextEncrypter.jsx    # Main encrypter component
│   └── TextEncrypter.css    # Encrypter styles
├── App.jsx                  # Main app component
├── App.css                  # App styles
├── index.css               # Global styles
└── main.jsx                # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

This application works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Web Crypto API (for clipboard functionality)

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Security Note

While this application provides strong encryption, always remember:
- Keep your keys secure
- Use strong, unique keys
- For RSA, safely share public keys and keep private keys secret
- This tool is for educational and basic security purposes
