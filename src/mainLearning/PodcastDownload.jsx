import { Download } from 'lucide-react'
import WaveformPlayer from './WaveformPlayer'
import sampleAudio from '../assets/sample.mp3'

export default function PodcastDownload() {
  const transcriptText = `主持人：欢迎来到今天的中文播客！
嘉宾：谢谢邀请，我很高兴分享我的学习经验。
主持人：你通常如何练习听力？
嘉宾：我每天都会听短对话，然后复述重点内容。
主持人：太棒了！这对口语也很有帮助。`

  const handleDownloadTranscript = () => {
    const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'podcast-transcript.txt'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const handleDownloadAudio = () => {
    const link = document.createElement('a')
    link.href = sampleAudio
    link.download = 'podcast-audio.mp3'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Enjoy Your Podcast!</h2>
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '1rem 1.25rem',
          boxShadow: '0 8px 18px rgba(15, 23, 42, 0.06)',
        }}
      >
        <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
          What’s on for today?
        </div>
        <div style={{ color: '#475569', lineHeight: 1.6 }}>
          A quick dialogue about daily listening habits and how shadowing short conversations can
          boost speaking confidence.
        </div>
      </div>

      <WaveformPlayer audioUrl={sampleAudio} />

      <div
        style={{
          flex: 1,
          background: '#f1f5f9',
          borderRadius: '16px',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          minHeight: 0,
        }}
      >
        <div style={{ fontWeight: 700, color: '#0f172a' }}>Conversation Transcript</div>
        <div
          style={{
            whiteSpace: 'pre-line',
            overflowY: 'auto',
            paddingRight: '0.25rem',
            color: '#334155',
            lineHeight: 1.6,
          }}
        >
          {transcriptText}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={handleDownloadAudio}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1rem',
            borderRadius: '999px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Download size={18} />
          Download Audio
        </button>
        <button
          type="button"
          onClick={handleDownloadTranscript}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#0f172a',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1rem',
            borderRadius: '999px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Download size={18} />
          Download Transcript
        </button>
      </div>
    </div>
  )
}
