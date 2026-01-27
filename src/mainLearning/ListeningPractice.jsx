import React, { useState } from 'react';
import FloatingContent from './FloatingContent';
import sampleAudio from '../assets/sample.mp3';
import WaveformPlayer from './WaveformPlayer';

const listeningData = [
    {
        id: 1,
        title: "At the Coffee Shop",
        summary: "Listen to the customer ordering a drink.",
        transcript: "你好，我要一杯美式咖啡.",
        pinyin: "Nǐ hǎo, wǒ yào yī bēi měishì kāfēi.",
        translation: "Hello, I would like an Americano.",
        audioPlaceholder: <WaveformPlayer audioUrl={sampleAudio} />
    },
    {
        id: 2,
        title: "Asking for Directions",
        summary: "Listen to someone asking for the subway station.",
        transcript: "请问，地铁站在哪里？",
        pinyin: "Qǐngwèn, dìtiě zhàn zài nǎlǐ?",
        translation: "Excuse me, where is the subway station?",
        audioPlaceholder: "Audio Component Here"
    },
    {
        id: 3,
        title: "Self Introduction",
        summary: "Listen to a basic introduction.",
        transcript: "我叫李华，我是学生。",
        pinyin: "Wǒ jiào Lǐ Huá, wǒ shì xuéshēng.",
        translation: "My name is Li Hua, I am a student.",
        audioPlaceholder: "Audio Component Here"
    },
    // Add more items as needed (up to 10)
    { id: 4, title: "Booking a Ticket", summary: "Booking a train ticket.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 5, title: "Phone Call", summary: "Calling a friend.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 6, title: "At the Restaurant", summary: "Ordering food.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 7, title: "Shopping", summary: "Bargaining for a price.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 8, title: "Weather Forecast", summary: "Listening to the weather.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 9, title: "Doctor Appointment", summary: "Describing symptoms.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 10, title: "Taxi Ride", summary: "Giving directions to driver.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
];

const PracticeItem = ({ item }) => {
    const [submitted, setSubmitted] = useState(false);
    const [userInput, setUserInput] = useState("");

    return (
        <div className="practice-item">
            <h3>{item.title}</h3>
            <p className="summary">{item.summary}</p>
            
            <div className="audio-control-placeholder" style={{ 
                marginBottom: '2rem'
            }}>
                {item.audioPlaceholder}
            </div>

            <div className="user-input-section" style={{ marginTop: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Type what you hear:</label>
                <textarea 
                    rows="4" 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
                    placeholder="Enter Pinyin or Characters..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-start'}}>
                     <button 
                        onClick={() => setSubmitted(true)}
                        disabled={submitted}
                        style={{
                            padding: '0.6rem 1.5rem',
                            backgroundColor: submitted ? '#ccc' : '#4a90e2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: submitted ? 'default' : 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {submitted ? 'Submitted' : 'Submit'}
                    </button>
                </div>
            </div>

            {submitted && (
                <>
                    <div className="transcript-section" style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', animation: 'fadeIn 0.5s ease-in' }}>
                      <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2c3e50', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Your Input</p>
                        <p style={{ fontSize: '1.5rem', margin: '0 0 0.25rem 0', color: '#333' }}>{userInput || 'No input provided'}</p>
                        <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic', margin: 0 }}>(Pin yin displayed here)</p>     
                      </div>  
                        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2c3e50', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>CORRECT ANSWER</p>
                        <p className="chinese-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>{item.transcript}</p>
                        <p className="pinyin-text" style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#555' }}>{item.pinyin}</p>
                        <p className="translation-text" style={{ color: '#666', margin: 0 }}>{item.translation}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default function ListeningPractice({ topic }) {
  const renderItem = (item) => (
      <PracticeItem key={item.id} item={item} />
  );

  return (
    <div style={{ height: '100%' }}>
        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `}</style>
        <FloatingContent 
            title={`Listening Practice`}
            items={listeningData}
            renderItem={renderItem}
        />
    </div>
  );
}
