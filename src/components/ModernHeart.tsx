import React, { useState, useEffect } from 'react';

const ModernHeart: React.FC = () => {
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(Math.random() * 0.3 + 0.8);
    }, 2000);

    return () => clearInterval(interval);
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
      
      {/* Main heart */}
      <div 
        className="heart-3d relative z-10"
        style={{ transform: `scale(${pulseIntensity})` }}
      >
        <div className="heart-shape"></div>
        
        {/* Sparkles around heart */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full sparkle"
            style={{
              top: `${20 + Math.sin(i * Math.PI / 4) * 60}px`,
              left: `${50 + Math.cos(i * Math.PI / 4) * 60}px`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .heart-3d {
          transition: transform 0.3s ease;
          filter: drop-shadow(0 10px 20px rgba(236, 72, 153, 0.3));
        }

        .heart-shape {
          position: relative;
          width: 80px;
          height: 72px;
          background: linear-gradient(135deg, #ff6b9d 0%, #f06292 50%, #ec407a 100%);
          transform: rotate(-45deg);
          border-radius: 40px 40px 0 0;
          animation: heartbeat 2s ease-in-out infinite;
        }

        .heart-shape:before {
          content: '';
          position: absolute;
          width: 80px;
          height: 72px;
          background: linear-gradient(135deg, #ff6b9d 0%, #f06292 50%, #ec407a 100%);
          border-radius: 40px 40px 0 0;
          transform: rotate(90deg);
          top: -40px;
          left: 0;
        }

        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { 
            transform: rotate(-45deg) scale(1);
            filter: brightness(1) saturate(1);
          }
          50% { 
            transform: rotate(-45deg) scale(1.1);
            filter: brightness(1.2) saturate(1.3);
          }
        }

        @keyframes sparkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg);
          }
          50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernHeart;