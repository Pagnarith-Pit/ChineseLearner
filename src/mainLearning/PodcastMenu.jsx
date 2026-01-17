import { useState } from 'react';
import '../css/PodcastMenu.css';

export default function PodcastMenu({ onStart }) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onStart(topic);
    }
  };

  return (
    <div className="podcast-menu-container">
      <div className="podcast-menu-content">
        <h1>What do you want to listen to today?</h1>
        <p className="podcast-instruction">
          Choose any topic, and we will generate a personal podcast that uses your learnt words 
          to practice listening to. Learn with enjoyable and relatable content.
        </p>
        
        <form onSubmit={handleSubmit} className="podcast-form">
          <input
            type="text"
            className="topic-input"
            placeholder="e.g., Technology trends in China, My favorite food..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            autoFocus
          />
          <button type="submit" className="start-button" disabled={!topic.trim()}>
            Start Learning
          </button>
        </form>
      </div>
    </div>
  );
}
