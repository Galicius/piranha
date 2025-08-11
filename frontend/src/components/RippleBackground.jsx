import React, { useEffect, useState, useCallback } from 'react';

export default function RippleBackground() {
  const [ripples, setRipples] = useState([]);
  const [clickRipples, setClickRipples] = useState([]);

  useEffect(() => {
    // Create initial ripples
    const initialRipples = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 400 + 300, // 300-700px
    }));
    
    setRipples(initialRipples);

    // Update ripple positions periodically
    const interval = setInterval(() => {
      setRipples(prev => prev.map(ripple => ({
        ...ripple,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 400 + 300,
      })));
    }, 5000); // Every 5 seconds for slower, more elegant movement

    // Handle click ripples
    const handleClick = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: 200,
      };
      
      setClickRipples(prev => [...prev, newRipple]);
      
      // Remove click ripple after animation
      setTimeout(() => {
        setClickRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 800);
    };

    // Handle window resize
    const handleResize = () => {
      setRipples(prev => prev.map(ripple => ({
        ...ripple,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      })));
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="ripple-container">
      {/* Ambient ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      
      {/* Click ripples */}
      {clickRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="click-ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
}