import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import LandingPage from './LandingPage'
import MainLearning from './MainLearning'
import './css/App.css'

function App() {
  const [username, setUsername] = useState('')

  return (
    <Routes>
      <Route path="/" element={
        username ? <ProfilePage username={username} /> : <LandingPage onLogin={setUsername} />
      } />
      <Route path="/MainLearning/*" element={<MainLearning />} />
    </Routes>
  )
}

export default App
