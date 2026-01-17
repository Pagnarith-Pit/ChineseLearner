import { useState, useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';
import '../css/Timer.css';

export default function Timer({ initialMinutes = 15, onComplete }) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    setSeconds(initialMinutes * 60);
  }, [initialMinutes]);

  useEffect(() => {
    if (seconds <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onComplete]);

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Determine color based on time left (e.g., turn green in last minute)
  const isLowTime = seconds < 60;

  return (
    <div className={`practice-timer ${isLowTime ? 'timer-warning' : ''}`}>
      <TimerIcon size={18} />
      <span className="timer-display">{formatTime(seconds)}</span>
    </div>
  );
}
