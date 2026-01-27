import { useEffect, useMemo, useState } from 'react'
import './css/App.css'
import { useSupabase } from './context/SupabaseProvider'

const COLOR = '#42a5f5'
const LEVELS = [1, 2, 3, 4, 5, 6]
// Table name HSK_Progress with columns: level (int), progress (int), userID (uuid)
function HSK({ onSelectLevel }) {
  const { supabase, user } = useSupabase()
  const baseLevels = useMemo(
    () => LEVELS.map((level) => ({ level, progress: 0 })),
    []
  )
  const [hskLevels, setHskLevels] = useState(baseLevels)
  const [debugRows, setDebugRows] = useState([])
  const [debugError, setDebugError] = useState('')

  useEffect(() => {
    let isMounted = true

    const clampProgress = (value) => {
      if (Number.isNaN(value)) return 0
      return Math.min(100, Math.max(0, Math.round(value)))
    }

    const loadProgress = async () => {
      if (!user?.id) {
        setHskLevels(baseLevels)
        setDebugRows([])
        setDebugError('')
        return
      }

      const { data, error } = await supabase
        .from('HSK_Progress')
        .select('level, progress, userID')
        .eq('userID', user.id)

      if (!isMounted) return
      if (error) {
        console.error('Failed to load HSK progress', error)
        setHskLevels(baseLevels)
        setDebugRows([])
        setDebugError(error.message || 'Unknown error')
        return
      }

      setDebugRows(data || [])
      setDebugError('')

      const progressByLevel = new Map()
      ;(data || []).forEach((row) => {
        const levelNumber = Number(row.level)
        if (!Number.isNaN(levelNumber)) {
          progressByLevel.set(levelNumber, clampProgress(Number(row.progress ?? 0)))
        }
      })

      setHskLevels(
        LEVELS.map((level) => ({
          level,
          progress: progressByLevel.get(level) ?? 0,
        }))
      )
    }

    loadProgress()

    return () => {
      isMounted = false
    }
  }, [supabase, user, baseLevels])

  const CircleProgress = ({ percentage }) => {
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
            stroke={percentage > 0 ? COLOR : 'transparent'}
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
              <CircleProgress percentage={item.progress} />
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
