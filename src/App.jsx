import { useMemo } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import LandingPage from './LandingPage'
import MainLearning from './MainLearning'
import './css/App.css'
import { useSupabase } from './context/SupabaseProvider'

function App() {
  const navigate = useNavigate()
  const { user, loading } = useSupabase()

  const username = useMemo(() => {
    if (!user?.email) return ''
    return user.email
  }, [user])

  const handleLogin = () => {
    navigate('/profile')
  }

  if (loading) {
    return null
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
      <Route path="/profile" element={
        user ? <ProfilePage username={username} /> : <Navigate to="/" replace />
      } />
      <Route path="/MainLearning/*" element={<MainLearning />} />
    </Routes>
  )
}

export default App
