import { useEffect, useMemo, useState } from 'react'
import { Bot, Mic, Square, UserCircle } from 'lucide-react'
import Timer from './Timer'
import { useMainLearning } from '../context/MainLearningContext'

export default function SpeakingPractice() {
  const { vocabItems } = useMainLearning()

  const vocabList = useMemo(() => {
    const fromContext = (vocabItems || []).map((item) => ({
      character: item.character,
      pinyin: item.pinyin,
      definition: item.definition,
    })).filter((item) => item.character)

    if (fromContext.length > 0) return fromContext

    return [
      { character: '你好', pinyin: 'Nǐ hǎo', definition: 'Hello' },
      { character: '谢谢', pinyin: 'Xièxiè', definition: 'Thank you' },
      { character: '再见', pinyin: 'Zàijiàn', definition: 'Goodbye' },
      { character: '对不起', pinyin: 'Duìbùqǐ', definition: 'Sorry' },
      { character: '没关系', pinyin: 'Méiguānxi', definition: "It's okay / No problem" },
            { character: '你好', pinyin: 'Nǐ hǎo', definition: 'Hello' },
      { character: '谢谢', pinyin: 'Xièxiè', definition: 'Thank you' },
      { character: '再见', pinyin: 'Zàijiàn', definition: 'Goodbye' },
      { character: '对不起', pinyin: 'Duìbùqǐ', definition: 'Sorry' },
      { character: '没关系', pinyin: 'Méiguānxi', definition: "It's okay / No problem" },

    ]
  }, [vocabItems])

  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [usedWords, setUsedWords] = useState(() => vocabList.map(() => false))
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    setUsedWords(vocabList.map(() => false))
  }, [vocabList])

  const assessWordUse = (spokenText) => {
    if (!spokenText) return
    const normalized = spokenText.toLowerCase()
    setUsedWords((prev) =>
      vocabList.map((item, index) => {
        const alreadyUsed = prev[index]
        if (alreadyUsed) return true
        return normalized.includes(item.character)
      })
    )
  }

  const handleStartStop = () => {
    setIsRecording((prev) => {
      if (prev) {
        assessWordUse(transcription)
      }
      return !prev
    })
  }

  const handleTranscriptionChange = (event) => {
    setTranscription(event.target.value)
  }

  const handleOpenWord = (index) => {
    setSelectedIndex(index)
  }

  const chatMessages = [
    { id: 1, role: 'user', text: '你好！我今天在学习中文。' },
    { id: 2, role: 'ai', text: '太棒了！今天你想练习哪些词？' },
    { id: 3, role: 'user', text: '谢谢，我想练习问候语。' },
    { id: 4, role: 'ai', text: '好的！请再说一遍“你好”。' },
        { id: 1, role: 'user', text: '你好！我今天在学习中文。' },
    { id: 2, role: 'ai', text: '太棒了！今天你想练习哪些词？' },
    { id: 3, role: 'user', text: '谢谢，我想练习问候语。' },
    { id: 4, role: 'ai', text: '好的！请再说一遍“你好”。' },
        { id: 1, role: 'user', text: '你好！我今天在学习中文。' },
    { id: 2, role: 'ai', text: '太棒了！今天你想练习哪些词？' },
    { id: 3, role: 'user', text: '谢谢，我想练习问候语。' },
    { id: 4, role: 'ai', text: '好的！请再说一遍“你好”。' },
        { id: 1, role: 'user', text: '你好！我今天在学习中文。' },
    { id: 2, role: 'ai', text: '太棒了！今天你想练习哪些词？' },
    { id: 3, role: 'user', text: '谢谢，我想练习问候语。' },
    { id: 4, role: 'ai', text: '好的！请再说一遍“你好”。' },
        { id: 1, role: 'user', text: '你好！我今天在学习中文。' },
    { id: 2, role: 'ai', text: '太棒了！今天你想练习哪些词？' },
    { id: 3, role: 'user', text: '谢谢，我想练习问候语。' },
    { id: 4, role: 'ai', text: '好的！请再说一遍“你好”。' },
        { id: 1, role: 'user', text: '你好！我今天在学习中文。' },
    { id: 2, role: 'ai', text: '太棒了！今天你想练习哪些词？' },
    { id: 3, role: 'user', text: '谢谢，我想练习问候语。' },
    { id: 4, role: 'ai', text: '好的！请再说一遍“你好”。' },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Speaking Practice</h2>
        <Timer initialMinutes={20} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {vocabList.length > 0 ? (
          vocabList.map((word, index) => (
            <button
              key={`${word.character}-${index}`}
              type="button"
              onClick={() => handleOpenWord(index)}
              style={{
                background: usedWords[index] ? '#f6c453' : '#ffffff',
                borderRadius: '999px',
                padding: '0.6rem 1.1rem',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: usedWords[index]
                  ? '0 10px 20px rgba(246, 196, 83, 0.35)'
                  : '0 6px 14px rgba(15, 23, 42, 0.08)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: usedWords[index] ? '#1f2937' : '#0f172a',
                cursor: 'pointer',
              }}
            >
              {word.character}
            </button>
          ))
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              padding: '1.5rem',
              borderRadius: '16px',
              background: '#f8fafc',
              textAlign: 'center',
              color: '#79828e',
            }}
          >
            No vocabulary loaded yet.
          </div>
        )}
      </div>

      <div
        style={{
          flex: 1,
          background: '#ebedf4',
          borderRadius: '18px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          minHeight: 0,
        }}
      >
        <div style={{ fontWeight: 700, color: '#334155' }}>Conversation Transcript</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            overflowY: 'auto',
            paddingRight: '0.25rem',
          }}
        >
          {chatMessages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-start' : 'flex-end',
                alignItems: 'flex-end',
                gap: '0.6rem',
              }}
            >
              {message.role === 'user' && (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#475569',
                  }}
                >
                  <UserCircle size={22} />
                </div>
              )}
              <div
                style={{
                  maxWidth: '70%',
                  padding: '0.75rem 1rem',
                  borderRadius: '16px',
                  background: message.role === 'user' ? '#ffffff' : '#2563eb',
                  color: message.role === 'user' ? '#0f172a' : '#ffffff',
                  boxShadow: '0 6px 16px rgba(15, 23, 42, 0.08)',
                  lineHeight: 1.5,
                }}
              >
                {message.text}
              </div>
              {message.role === 'ai' && (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563eb',
                  }}
                >
                  <Bot size={22} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={handleStartStop}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: isRecording ? '#ef4444' : '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '0.9rem 1.5rem',
            borderRadius: '999px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 12px 24px rgba(37, 99, 235, 0.3)',
          }}
        >
          {isRecording ? <Square size={20} /> : <Mic size={20} />}
          {isRecording ? 'Stop Speaking' : 'Start Speaking'}
        </button>
      </div>

      {selectedIndex != null && vocabList[selectedIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 50,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              padding: '1.5rem',
              width: '100%',
              maxWidth: '420px',
              boxShadow: '0 24px 48px rgba(15, 23, 42, 0.2)',
            }}
          >
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>
              {vocabList[selectedIndex].character}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '1.1rem', color: '#2563eb' }}>
              {vocabList[selectedIndex].pinyin || '—'}
            </div>
            <div style={{ marginTop: '1rem', fontSize: '1rem', color: '#334155' }}>
              {vocabList[selectedIndex].definition || 'No definition available.'}
            </div>
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              style={{
                marginTop: '1.5rem',
                background: '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '999px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
