import React, { useEffect } from 'react';

const CustomCursor = ({ mousePosition, darkMode }) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);

  const cursorStyle = {
    position: 'fixed',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: darkMode 
      ? 'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(147,51,234,0.4) 100%)'
      : 'radial-gradient(circle, rgba(147,51,234,0.8) 0%, rgba(59,130,246,0.4) 100%)',
    pointerEvents: 'none',
    left: mousePosition.x - 10,
    top: mousePosition.y - 10,
    zIndex: 9999,
    transition: 'all 0.1s ease',
    filter: 'blur(1px)'
  };

  return <div style={cursorStyle}></div>;
};

export default CustomCursor;