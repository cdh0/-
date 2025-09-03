import React, { useState, useEffect } from 'react';

const ModernHeart: React.FC = () => {
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [drawProgress, setDrawProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(Math.random() * 0.3 + 0.8);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Animate heart drawing
  useEffect(() => {
    const drawInterval = setInterval(() => {
      setDrawProgress(prev => {
        if (prev >= 100) return 0; // Reset animation
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(drawInterval);
  }, []);

  return (
    <div className="relative flex justify-center items-center mb-8 h-32">
      {/* Outer glow rings */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-pink-300/20 to-rose-300/20 animate-ping"></div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-400/30 to-rose-400/30 animate-pulse"></div>
      </div>
      
      {/* SVG Heart Drawing */}
      <div 
        className="relative z-10"
        style={{ transform: `scale(${pulseIntensity})` }}
      >
        <svg 
          width="100" 
          height="90" 
          viewBox="0 0 100 90" 
          className="drop-shadow-lg"
        >
          {/* Heart path */}
          <path
            d="M50,85 C50,85 15,55 15,35 C15,20 25,10 40,15 C45,17 50,25 50,25 C50,25 55,17 60,15 C75,10 85,20 85,35 C85,55 50,85 50,85 Z"
            fill="none"
            stroke="url(#heartGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="300"
            strokeDashoffset={300 - (drawProgress * 3)}
            className="transition-all duration-100"
          />
          
          {/* Heart fill (appears after drawing) */}
          <path
            d="M50,85 C50,85 15,55 15,35 C15,20 25,10 40,15 C45,17 50,25 50,25 C50,25 55,17 60,15 C75,10 85,20 85,35 C85,55 50,85 50,85 Z"
            fill="url(#heartFillGradient)"
            opacity={drawProgress > 80 ? (drawProgress - 80) / 20 : 0}
            className="transition-opacity duration-500"
          />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="heartFillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="50%" stopColor="#fed7d7" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Cookie sparkles around heart */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-lg sparkle"
            style={{
              top: `${20 + Math.sin(i * Math.PI / 4) * 60}px`,
              left: `${50 + Math.cos(i * Math.PI / 4) * 60}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {i % 2 === 0 ? '🍪' : '✨'}
          </div>
        ))}
      </div>

      <style jsx>{`
        .sparkle {
          animation: cookieSparkle 3s ease-in-out infinite;
        }

        @keyframes cookieSparkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernHeart;
