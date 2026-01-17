import './css/App.css'

function HSK({ onSelectLevel }) {
  // Dummy data for progress
  const hskLevels = [
    { level: 1, progress: 100, color: '#42a5f5' },
    { level: 2, progress: 100, color: '#42a5f5' },
    { level: 3, progress: 0, color: '#42a5f5' },
    { level: 4, progress: 0, color: '#42a5f5' },
    { level: 5, progress: 0, color: '#42a5f5' },
    { level: 6, progress: 0, color: '#42a5f5' },
  ]

  const CircleProgress = ({ percentage, color }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="circle-progress">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e0e0e0"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={percentage > 0 ? color : 'transparent'}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="circle-text">
          <span className="percentage">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="hsk-container">
      <div className="hsk-header">
        <h2>Select Your Level</h2>
        <p>Choose your HSK proficiency level to start learning.</p>
      </div>

      <div className="hsk-grid">
        {hskLevels.map((item) => (
          <div 
            key={item.level} 
            className="hsk-card"
            onClick={() => onSelectLevel(item.level)}
          >
            <div className="hsk-level-badge">HSK {item.level}</div>
            
            <div className="hsk-progress-wrapper">
                <CircleProgress percentage={item.progress} color={item.color} />
            </div>

            <button className="hsk-btn">
                {item.progress > 0 ? 'Continue' : 'Start'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HSK
