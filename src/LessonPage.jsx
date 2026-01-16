import { ArrowLeft } from 'lucide-react'
import './App.css'

function LessonPage({ level, onBack }) {
  return (
    <div className="lesson-page-container">
      <div className="lesson-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <h2>HSK {level} Lessons</h2>
      </div>
      
      <div className="empty-lesson-state">
        <div className="empty-icon">📚</div>
        <h3>No lessons available yet</h3>
        <p>We are working hard to bring you the best HSK {level} content. Check back soon!</p>
      </div>
    </div>
  )
}

export default LessonPage
