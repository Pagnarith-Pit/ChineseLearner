import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import './css/App.css'

function LandingPage({ onLogin }) {
  const [inputName, setInputName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputName.trim()) {
      onLogin(inputName.trim())
    }
  }

  return (
    <div className="landing-container">
      <div className="landing-content">
         <div className="landing-logo">
            <div className="landing-icon">中</div>
            <h1 className="landing-title">ChineseMaster</h1>
         </div>
         
         <p className="landing-pitch">
           Master the art of Chinese, one day at a time.
         </p>

         <form className="auth-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="auth-input"
              value={inputName} 
              onChange={(e) => setInputName(e.target.value)} 
              placeholder="Enter your name to begin..."
              autoFocus
            />
            <button type="submit" className="auth-button">
              <ArrowRight size={24} />
            </button>
         </form>
         
         <p className="landing-footer">No password required. Just start learning.</p>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>
    </div>
  )
}

export default LandingPage
