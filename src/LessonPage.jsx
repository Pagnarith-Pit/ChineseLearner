import { ArrowLeft, PlayCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSupabase } from './context/SupabaseProvider'
import './css/App.css'

const fetchLessons = async (level, supabase) => {
  const { data, error } = await supabase
    .from('Lessons')
    .select('*')
    .eq('hsk_level', level)
    .order('lesson_number', { ascending: true })

  if (error) throw error

  return (data || []).map((lesson) => ({
    number: lesson.lesson_number,
    title: lesson.title,
    duration: lesson.duration,
    words: lesson.new_word_count,
  }))
}

function LessonPage({ level, onBack }) {
  const navigate = useNavigate()
  const { supabase, loading: authLoading } = useSupabase()
  const [currentLessons, setCurrentLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    let isMounted = true
  
    const loadLessons = async () => {
      setLoading(true)
      setError('')
  
      try {
        const normalized = await fetchLessons(level, supabase)
        if (!isMounted) return
        setCurrentLessons(normalized)
      } catch (fetchError) {
        if (!isMounted) return
        console.error('Failed to load lessons', fetchError)
        setError('Unable to load lessons right now.')
        setCurrentLessons([])
      }
  
      setLoading(false)
    }
  
    if (!authLoading) {
      loadLessons()
    }
  
    return () => {
      isMounted = false
    }
  }, [level, supabase, authLoading])

  return (
    <div className="lesson-page-container">
      <div className="lesson-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <h2>HSK {level} Lessons</h2>
      </div>

      {currentLessons.length > 0 ? (
        <div className="lesson-grid">
          {currentLessons.map((lesson) => (
            <div 
              key={lesson.number} 
              className="lesson-card"
              // Pass both lesson and level to the MainLearning page
              onClick={() => navigate('/MainLearning', { state: { lessonNumber: lesson.number, level } })}
              style={{ cursor: 'pointer' }}
            >
              <div className="lesson-card-header">
                <span className="lesson-number">Lesson {lesson.number}</span>
                <PlayCircle className="play-icon" size={24} />
              </div>
              <h3 className="lesson-title">{lesson.title}</h3>
              <div className="lesson-meta">
                <span>{lesson.duration} hour</span>
                <span>•</span>
                <span>{lesson.words} words</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-lesson-state">
          <div className="empty-icon">📚</div>
          <h3>No lessons available yet</h3>
          <p>We are working hard to bring you the best HSK {level} content. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

export default LessonPage
