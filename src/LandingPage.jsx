import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import './css/App.css'
import { useSupabase } from './context/SupabaseProvider'

function LandingPage({ onLogin }) {
  const { supabase } = useSupabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) {
      setErrorMessage('Please enter your email and password.')
      setInfoMessage('')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      setInfoMessage('')
      return
    }

    setErrorMessage('')
    setInfoMessage('')
    setIsSubmitting(true)

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    })

    if (!signInError && signInData?.session) {
      onLogin(trimmedEmail)
      setIsSubmitting(false)
      return
    }

    const isInvalidLogin = signInError?.message?.toLowerCase().includes('invalid')
      || signInError?.message?.toLowerCase().includes('credentials')

    if (isInvalidLogin) {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
      })

      if (signUpError) {
        const alreadyRegistered = signUpError.message?.toLowerCase().includes('already')
        if (!alreadyRegistered) {
          setErrorMessage(signUpError.message)
          setIsSubmitting(false)
          return
        }
      }

      if (signUpData?.session) {
        onLogin(trimmedEmail)
        setIsSubmitting(false)
        return
      }

      if (signUpData?.user && !signUpData?.session) {
        setInfoMessage('Check your email to confirm your account, then sign in again.')
        setIsSubmitting(false)
        return
      }
    } else if (signInError) {
      setErrorMessage(signInError.message)
      setIsSubmitting(false)
      return
    }

    const { error: retryError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    })

    if (retryError) {
      setErrorMessage(retryError.message)
      setIsSubmitting(false)
      return
    }

    onLogin(trimmedEmail)
    setIsSubmitting(false)
  }

  return (
    <div className="landing-container landing-redesign">
      <div className="landing-glow"></div>
      <div className="landing-grid"></div>

      <header className="landing-nav">
        <div className="landing-logo">
          <div className="landing-icon">中</div>
          <div>
            <h1 className="landing-title">ChineseMaster</h1>
            <span className="landing-tag">Daily Chinese, simplified</span>
          </div>
        </div>
        <span className="landing-pill">Beta Access</span>
      </header>

      <main className="landing-hero">
        <section className="hero-copy">
          <h2>Build fluent habits in minutes a day.</h2>
          <p>
            Learn vocabulary, listening, and speaking with structured lessons, streaks, and
            focused practice. All in one calm, distraction-free place.
          </p>

          <div className="hero-highlights">
            <div>
              <span className="highlight-title">Personalized flow</span>
              <span className="highlight-text">Adaptive drills and guided lesson paths.</span>
            </div>
            <div>
              <span className="highlight-title">Built-in streaks</span>
              <span className="highlight-text">Stay consistent with daily goals.</span>
            </div>
            <div>
              <span className="highlight-title">Audio-first practice</span>
              <span className="highlight-text">Shadow native pronunciation naturally.</span>
            </div>
          </div>
        </section>

        <section className="hero-auth">
          <div className="auth-card">
            <h3>Start learning now</h3>
            <p>One account. Instant sign in or sign up.</p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                className="auth-input"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email address"
                autoComplete="email"
                autoFocus
              />
              <input 
                type="password" 
                className="auth-input"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
                autoComplete="current-password"
              />
              <button type="submit" className="auth-button" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Working...' : 'Continue'}</span>
                <ArrowRight size={18} />
              </button>
            </form>
            {errorMessage && <p className="auth-error">{errorMessage}</p>}
            {infoMessage && <p className="auth-info">{infoMessage}</p>}
            <p className="landing-footer">Secure email sign-in. No separate signup step.</p>
          </div>

          <div className="auth-stats">
            <div>
              <span className="stat-value">15+</span>
              <span className="stat-label">HSK lessons</span>
            </div>
            <div>
              <span className="stat-value">5 min</span>
              <span className="stat-label">Daily routine</span>
            </div>
            <div>
              <span className="stat-value">Audio</span>
              <span className="stat-label">Practice built-in</span>
            </div>
          </div>
        </section>
      </main>

      <div className="landing-trust">
        <span>Designed for focused study</span>
        <span>📚 Vocabulary</span>
        <span>🎧 Listening</span>
        <span>🗣️ Speaking</span>
        <span>✍️ Writing</span>
      </div>
    </div>
  )
}

export default LandingPage
