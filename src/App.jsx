import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import LandingPage from './LandingPage'
import MainLearning from './MainLearning'
import './css/App.css'

function App() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleLogin = (name) => {
    setUsername(name)
    navigate('/profile')
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
      <Route path="/profile" element={
        username ? <ProfilePage username={username} /> : <Navigate to="/" replace />
      } />
      <Route path="/MainLearning/*" element={<MainLearning />} />
    </Routes>
  )
}

export default App
