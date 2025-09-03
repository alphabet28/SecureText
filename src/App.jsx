import { useState } from 'react'
import LandingPage from './components/LandingPage'
import TextEncrypter from './components/TextEncrypter'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const handleGetStarted = () => {
    setCurrentPage('encrypter')
  }

  const handleBackToHome = () => {
    setCurrentPage('landing')
  }

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <TextEncrypter onBackToHome={handleBackToHome} />
      )}
    </>
  )
}

export default App
