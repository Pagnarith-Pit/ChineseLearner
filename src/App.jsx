import { useState } from 'react'
import ProfilePage from './ProfilePage'
import LandingPage from './LandingPage'
import './App.css'

function App() {
  const [username, setUsername] = useState('')

  if (username) {
    return <ProfilePage username={username} />
  }

  return <LandingPage onLogin={setUsername} />
}

export default App
