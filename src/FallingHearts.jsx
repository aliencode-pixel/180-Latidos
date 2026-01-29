import React from 'react';
import './FallingHearts.css';

const FallingHearts = () => {
  const hearts = Array.from({ length: 20 });
  const heartColors = ['#FFFFFF', '#FFB6A6']; // blanco y naranja pastel
    return (
        <div className="heart-container">
          {hearts.map((_, i) => (
            <div
                key={i}
                className="heart"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${10 + Math.random() * 10}s`,
                    fontSize: `${16 + Math.random() * 24}px`,
                    animationDelay: `${Math.random() * 10}s`,
                    color: heartColors[Math.floor(Math.random() * heartColors.length)],
                }}
            >   
              ❤
            </div>
          ))}
        </div>
    );
};

export default FallingHearts;