import { useState } from 'react'
import LandingPage from './components/LandingPage'
import TextEncrypter from './components/TextEncrypter'
import LearnPage from './components/LearnPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('AES')

  const handleGetStarted = () => {
    setCurrentPage('encrypter')
  }

  const handleLearn = () => {
    setCurrentPage('learn')
  }

  const handleBackToHome = () => {
    setCurrentPage('landing')
  }

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm)
    setCurrentPage('encrypter')
  }

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} onLearn={handleLearn} onAlgorithmSelect={handleAlgorithmSelect} />
      )}
      {currentPage === 'encrypter' && (
        <TextEncrypter onBackToHome={handleBackToHome} onLearn={handleLearn} initialAlgorithm={selectedAlgorithm} />
      )}
      {currentPage === 'learn' && (
        <LearnPage onBackToHome={handleBackToHome} />
      )}
    </>
  )
}

export default App