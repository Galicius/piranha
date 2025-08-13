import React, { useEffect, useState, useCallback } from 'react';

export default function Watermark({ 
  enabled = true, 
  opacity = 0.03, 
  text = "DEMO STRAN/NEAKTIVNA",
  fontSize = { mobile: "1.5rem", desktop: "2rem" }
}) {
  const [lines, setLines] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Debounced resize handler for better performance
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  const generateWatermarkLines = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const mobile = viewportWidth < 768;
    setIsMobile(mobile);
    
    // Responsive line spacing
    const lineHeight = mobile ? 80 : 120;
    const numberOfLines = Math.ceil((viewportHeight + viewportWidth) / lineHeight) + 8; // Extra coverage
    
    const newLines = [];
    for (let i = 0; i < numberOfLines; i++) {
      newLines.push({
        id: i,
        top: (i * lineHeight) - (viewportHeight * 0.3), // Better coverage
        left: -viewportWidth * 0.4, // More left offset for better diagonal coverage
      });
    }
    setLines(newLines);
  }, []);

  const debouncedGenerateLines = useCallback(
    debounce(generateWatermarkLines, 150),
    [generateWatermarkLines, debounce]
  );

  useEffect(() => {
    if (!enabled) return;
    
    generateWatermarkLines();
    window.addEventListener('resize', debouncedGenerateLines);
    
    return () => window.removeEventListener('resize', debouncedGenerateLines);
  }, [enabled, generateWatermarkLines, debouncedGenerateLines]);

  // Don't render if disabled
  if (!enabled) return null;

  // Create repeated text pattern
  const repeatedText = Array(10).fill(text).join(' • ');

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {lines.map((line) => (
        <div
          key={line.id}
          style={{
            position: 'absolute',
            top: `${line.top}px`,
            left: `${line.left}px`,
            width: '200%',
            fontFamily: 'Playfair Display, serif',
            fontSize: isMobile ? fontSize.mobile : fontSize.desktop,
            fontWeight: 600,
            color: `rgba(255, 255, 255, ${opacity})`,
            whiteSpace: 'nowrap',
            transform: 'rotate(-30deg)',
            userSelect: 'none',
          }}
        >
          {repeatedText}
        </div>
      ))}
    </div>
  );
}