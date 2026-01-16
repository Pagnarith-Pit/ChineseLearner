import { ArrowLeft, PlayCircle } from 'lucide-react'
import './App.css'

// Each of these levels corresponds to HSK levels 1-6
const lessonsData = {
  1: [],
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

function LessonPage({ level, onBack }) {
  const currentLessons = lessonsData[level] || []

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
            <div key={lesson.number} className="lesson-card">
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
