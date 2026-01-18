import React, { useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';

const CharacterWriter = ({ char }) => {
  const writerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (writerRef.current) {
        // Clear previous content if any (handling strict mode double mount)
        writerRef.current.innerHTML = '';

        try {
            instanceRef.current = HanziWriter.create(writerRef.current, char, {
                width: 120,
                height: 120,
                padding: 10,
                strokeColor: '#333',
                radicalColor: '#4a90e2', 
                delayBetweenStrokes: 200,
                showOutline: true,
                outlineColor: '#ddd'
            });
            
            instanceRef.current.loopCharacterAnimation();
        } catch (e) {
            console.error("HanziWriter error:", e);
        }
    }

    /* 
       Note: HanziWriter doesn't require explicit cleanup for the DOM node interaction 
       as React handles unmounting, but we stop any active animation loop.
    */
    return () => {
       /* 
          No explicit destroy method in simple usage, 
          but clearing ref logic handles re-renders.
       */
    };
  }, [char]);

  return (
    <div 
        ref={writerRef} 
        style={{ 
            width: '120px', 
            height: '120px', 
            border: '1px solid #eee', 
            borderRadius: '12px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }} 
    />
  );
};

const StrokeOrderAnimation = ({ text }) => {
  // Filter out non-Chinese characters if necessary, or just render all (HanziWriter might fail on non-hanzi)
  // Simple check: most common Hanzi ranges. 
  // For now, let's assume the input 'character' field in data contains mainly Hanzi.
  // We can just iterate the string.
  const chars = text ? text.split('') : [];

  return (
    <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        marginTop: '1rem' 
    }}>
      {chars.map((char, index) => {
          // Basic filter to skip punctuation/spaces if mixed
          if (!char.match(/[\u4e00-\u9fa5]/)) return null;
          return <CharacterWriter key={`${char}-${index}`} char={char} />;
      })}
    </div>
  );
};

export default StrokeOrderAnimation;
