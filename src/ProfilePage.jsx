import { useState, useEffect } from 'react'
import { Flame, LayoutDashboard, BookOpen, Trophy, Settings, Bell, Search, User, PiggyBank, GraduationCap } from 'lucide-react'
import WordBank from './WordBank'
import './App.css'

function ProfilePage({ username }) {
  const [currentView, setCurrentView] = useState('dashboard') // 'dashboard' or 'wordbank'
  const [streak, setStreak] = useState(12)
  
  const days = [
    { name: 'Mon', active: true },
    { name: 'Tue', active: true },
    { name: 'Wed', active: true },
    { name: 'Thu', active: true }, 
    { name: 'Fri', active: false },
    { name: 'Sat', active: false },
    { name: 'Sun', active: false },
  ]
  
  const activeDayIndex = days.filter(d => d.active).length - 1;

  const [flameScale, setFlameScale] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
        setFlameScale(prev => prev === 1 ? 1.05 : 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="logo-container">
            <div className="logo-icon">中</div>
            <h1>ChineseMaster</h1>
        </div>
        
        <ul className="nav-links">
          <li 
            className={currentView === 'dashboard' ? 'active' : ''} 
            onClick={() => setCurrentView('dashboard')}
           >
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </li>
          
          <li><BookOpen size={20} /> <span>Lessons</span></li>
          
          <li 
            className={currentView === 'wordbank' ? 'active' : ''}
            onClick={() => setCurrentView('wordbank')}
           >
            <PiggyBank size={20} /> <span>Word Bank</span>
          </li>
          
          <li><Settings size={20} /> <span>Settings</span></li>
        </ul>

        <div className="user-mini-profile">
            <div className="avatar">{username ? username[0].toUpperCase() : 'U'}</div>
            <div className="user-info">
                <span className="name">{username || 'User'}</span>
                <span className="status">Free Plan</span>
            </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {currentView === 'wordbank' ? (
           <WordBank />
        ) : (
           <div className="content-scroll">
            {/* Welcome Banner */}
            <section className="welcome-banner">
                <div className="banner-content">
                    <h1>{username ? `Welcome back, ${username}!` : 'Ni Hao, Scholar!'}</h1>
                    <p>You're on a roll. Continue your daily lesson to keep your streak alive.</p>
                    <button className="cta-button">Resume Learning</button>
                </div>
                <div className="banner-decoration">
                    <span className="chinese-char">学习</span>
                </div>
            </section>

            {/* Dashboard Grid */}
            <div className="dashboard-grid">
                
                {/* Card 1: Streak */}
                <div className="card streak-card">
                    <div className="card-header">
                        <h3>Current Streak</h3>
                        <Trophy size={16} className="text-muted" />
                    </div>
                    <div className="streak-content">
                         <div className="flame-wrapper" style={{ transform: `scale(${flameScale})` }}>
                            <Flame size={120} fill="#e53935" color="#ff6f60" strokeWidth={1} />
                            <div className="flame-glow"></div>
                         </div>
                         <div className="streak-stats">
                             <span className="streak-value">{streak}</span>
                             <span className="streak-label">Days Fire!</span>
                         </div>
                    </div>
                </div>

                {/* Card 2: Weekly Progress */}
                <div className="card week-card">
                     <div className="card-header">
                        <h3>Weekly Activity</h3>
                        <span className="badge">On Track</span>
                    </div>
                    <div className="week-progress-container">
                        <div className="progress-track">
                            <div className="track-line-bg"></div>
                            <div 
                                className="track-line-fill" 
                                style={{ width: `${(activeDayIndex / (days.length - 1)) * 100}%` }}
                            ></div>
                        </div>
                        <div className="days-row">
                            {days.map((day) => (
                            <div key={day.name} className={`day-column ${day.active ? 'active' : ''}`}>
                                <div className="day-bubble">
                                {day.active ? '✓' : ''}
                                </div>
                                <span className="day-name">{day.name}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="week-summary">
                        <p>You've completed <strong>4 out of 7</strong> daily goals this week.</p>
                    </div>
                </div>

                {/* Card 3: Total Learnt Words */}
                <div className="card stat-card" onClick={() => setCurrentView('wordbank')} style={{cursor: 'pointer'}}>
                    <div className="card-header">
                        <h3>Total Learnt</h3>
                        <BookOpen size={16} className="text-muted" />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">15</span>
                        <span className="stat-label">Words</span>
                    </div>
                </div>

                {/* Card 4: Average Exam Performance */}
                <div className="card stat-card">
                    <div className="card-header">
                        <h3>Exam Average</h3>
                        <GraduationCap size={16} className="text-muted" />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">90%</span>
                        <span className="stat-label">Performance</span>
                    </div>
                </div>
            </div>
        </div> 
        )}
      </main>
    </div>
  )
}

export default ProfilePage
