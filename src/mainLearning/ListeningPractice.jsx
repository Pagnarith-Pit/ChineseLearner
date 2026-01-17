import React from 'react';
import FloatingContent from './FloatingContent';

const listeningData = [
    {
        id: 1,
        title: "At the Coffee Shop",
        instruction: "Listen to the customer ordering a drink.",
        transcript: "你好，我要一杯美式咖啡 (Nǐ hǎo, wǒ yào yī bēi měishì kāfēi).",
        translation: "Hello, I would like an Americano.",
        audioPlaceholder: "Audio Component Here" 
    },
    {
        id: 2,
        title: "Asking for Directions",
        instruction: "Listen to someone asking for the subway station.",
        transcript: "请问，地铁站在哪里？ (Qǐngwèn, dìtiě zhàn zài nǎlǐ?)",
        translation: "Excuse me, where is the subway station?",
        audioPlaceholder: "Audio Component Here"
    },
    {
        id: 3,
        title: "Self Introduction",
        instruction: "Listen to a basic introduction.",
        transcript: "我叫李华，我是学生。 (Wǒ jiào Lǐ Huá, wǒ shì xuéshēng.)",
        translation: "My name is Li Hua, I am a student.",
        audioPlaceholder: "Audio Component Here"
    },
    // Add more items as needed (up to 10)
    { id: 4, title: "Booking a Ticket", instruction: "Booking a train ticket.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 5, title: "Phone Call", instruction: "Calling a friend.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 6, title: "At the Restaurant", instruction: "Ordering food.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 7, title: "Shopping", instruction: "Bargaining for a price.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 8, title: "Weather Forecast", instruction: "Listening to the weather.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 9, title: "Doctor Appointment", instruction: "Describing symptoms.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
    { id: 10, title: "Taxi Ride", instruction: "Giving directions to driver.", transcript: "Wait for audio...", translation: "...", audioPlaceholder: "..." },
];

export default function ListeningPractice({ topic }) {
  const renderItem = (item) => (
      <div className="practice-item">
          <h3>{item.title}</h3>
          <p className="instruction">{item.instruction}</p>
          
          <div className="audio-control-placeholder" style={{ 
              background: '#f0f0f0', 
              padding: '2rem', 
              borderRadius: '8px', 
              textAlign: 'center',
              marginBottom: '2rem'
          }}>
              Play Button / Audio Waveform would go here
          </div>

          <div className="transcript-section">
              <h4>Transcript (Hidden by default?)</h4>
              <p className="chinese-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.transcript}</p>
              <p className="translation-text" style={{ color: '#666' }}>{item.translation}</p>
          </div>
          
          <div className="user-input-section" style={{ marginTop: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Type what you hear:</label>
              <textarea 
                  rows="4" 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
                  placeholder="Enter Pinyin or Characters..."
              />
          </div>
      </div>
  );

  return (
    <div style={{ height: '100%' }}>
        <FloatingContent 
            title={`Listening: ${topic || 'General Practice'}`}
            items={listeningData}
            renderItem={renderItem}
        />
    </div>
  );
}
