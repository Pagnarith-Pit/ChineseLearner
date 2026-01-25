import { ArrowLeft, PlayCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
// Supabase-ready imports (uncomment when Supabase is configured)
// import { useEffect, useState } from 'react'
// import { useSupabase } from './context/SupabaseProvider'
import './css/App.css'

// Each of these levels corresponds to HSK levels 1-6
const lessonsData = {
  1: [
    { number: 1, title: 'Greetings (问候)', duration: '10 min', words: 15 },
  ],
  2: [
    { number: 1, title: 'Daily Routine (日常作息)', duration: '15 min', words: 25 },
    { number: 2, title: 'Weather (天气)', duration: '10 min', words: 18 },
    { number: 3, title: 'Shopping (购物)', duration: '20 min', words: 30 },
  ],
  3: [],
  4: [],
  5: [],
  6: [],
}

// Supabase-ready async helper (uncomment when Supabase is configured)
// const fetchLessons = async (level, supabase) => {
//   const { data, error } = await supabase
//     .from('Lesson')
//     .select('*')
//     .eq('level', level)
//     .order('number', { ascending: true })
//
//   if (error) throw error
//
//   return (data || []).map((lesson) => ({
//     number: lesson.number ?? lesson.lesson_number ?? lesson.lessonNumber,
//     title: lesson.title ?? lesson.lesson_title ?? lesson.lessonTitle,
//     duration: lesson.duration ?? lesson.duration_text ?? lesson.durationText ?? '—',
//     words: lesson.words ?? lesson.word_count ?? lesson.wordCount ?? 0,
//   }))
// }

function LessonPage({ level, onBack }) {
  const navigate = useNavigate()
  const currentLessons = lessonsData[level] || []

  // Supabase-ready state + fetch (uncomment when Supabase is configured)
  // const { supabase, loading: authLoading } = useSupabase()
  // const [currentLessons, setCurrentLessons] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')
  //
  // useEffect(() => {
  //   let isMounted = true
  //
  //   const loadLessons = async () => {
  //     setLoading(true)
  //     setError('')
  //
  //     try {
  //       const normalized = await fetchLessons(level, supabase)
  //       if (!isMounted) return
  //       setCurrentLessons(normalized)
  //     } catch (fetchError) {
  //       if (!isMounted) return
  //       console.error('Failed to load lessons', fetchError)
  //       setError('Unable to load lessons right now.')
  //       setCurrentLessons([])
  //     }
  //
  //     setLoading(false)
  //   }
  //
  //   if (!authLoading) {
  //     loadLessons()
  //   }
  //
  //   return () => {
  //     isMounted = false
  //   }
  // }, [level, supabase, authLoading])

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
                <span>{lesson.duration}</span>
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
