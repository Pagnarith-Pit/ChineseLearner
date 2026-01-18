import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FloatingContent = ({ items = [], renderItem, title, cardClassName = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) setCurrentIndex(currentIndex + 1);
  };

  if (!items || items.length === 0) {
      return (
          <div className="floating-content-wrapper">
              <div className="floating-card empty-state">
                  <p>No content available.</p>
              </div>
          </div>
      );
  }

  return (
    <div className="floating-content-wrapper">
       <button 
         className="nav-arrow left" 
         onClick={handlePrev}
         disabled={currentIndex === 0}
         aria-label="Previous Item"
       >
         <ChevronLeft size={48} />
       </button>

       <div className={`floating-card ${cardClassName}`}>
          {title && (
              <div className="floating-header">
                  <h2 className="floating-title">{title}</h2>
                  <span className="floating-pagination">{currentIndex + 1} / {items.length}</span>
              </div>
          )}
          <div className="floating-scroll-area">
             {renderItem(items[currentIndex], currentIndex)}
          </div>
       </div>

       <button 
         className="nav-arrow right" 
         onClick={handleNext}
         disabled={currentIndex === items.length - 1}
         aria-label="Next Item"
       >
         <ChevronRight size={48} />
       </button>
    </div>
  );
};

export default FloatingContent;
