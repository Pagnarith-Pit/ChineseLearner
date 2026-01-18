import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause } from 'lucide-react';

const WaveformPlayer = ({ audioUrl }) => {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#ddd',
      progressColor: '#4a90e2',
      cursorColor: '#4a90e2',
      barWidth: 2,
      barGap: 3,
      responsive: true,
      height: 80,
      normalize: true,
    });

    wavesurferRef.current.load(audioUrl);

    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
    });

    // Cleanup on unmount
    return () => {
        if(wavesurferRef.current) {
            wavesurferRef.current.destroy();
        }
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(wavesurferRef.current.isPlaying());
    }
  };

  return (
    <div className="waveform-player" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem',
      backgroundColor: '#fff',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <button 
        onClick={togglePlayPause}
        style={{
          background: '#4a90e2',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          flexShrink: 0
        }}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      
      <div ref={containerRef} style={{ width: '100%' }} />
    </div>
  );
};

export default WaveformPlayer;
