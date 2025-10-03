import { useState } from 'react'
import LandingPage from './components/LandingPage'
import TextEncrypter from './components/TextEncrypter'
import LearnPage from './components/LearnPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const handleGetStarted = () => {
    setCurrentPage('encrypter')
  }

  const handleLearn = () => {
    setCurrentPage('learn')
  }

  const handleBackToHome = () => {
    setCurrentPage('landing')
  }

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} onLearn={handleLearn} />
      )}
      {currentPage === 'encrypter' && (
        <TextEncrypter onBackToHome={handleBackToHome} onLearn={handleLearn} />
      )}
      {currentPage === 'learn' && (
        <LearnPage onBackToHome={handleBackToHome} />
      )}
    </>
  )
}

export default App