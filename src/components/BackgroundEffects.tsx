import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 via-purple-50 to-indigo-50 animate-gradient-shift"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          >
            <div className="geometric-shape"></div>
          </div>
        ))}
      </div>

      {/* Subtle light rays */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-200/30 to-transparent transform rotate-12 animate-pulse"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-rose-200/30 to-transparent transform -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <style jsx>{`
        .geometric-shape {
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(249, 115, 22, 0.1));
          border-radius: 50% 20% 50% 20%;
          animation: float 20s linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f3e8ff 50%, #e0e7ff 100%);
          }
          25% {
            background: linear-gradient(135deg, #fce7f3 0%, #f3e8ff 25%, #e0e7ff 50%, #fdf2f8 100%);
          }
          50% {
            background: linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 25%, #fdf2f8 50%, #fce7f3 100%);
          }
          75% {
            background: linear-gradient(135deg, #e0e7ff 0%, #fdf2f8 25%, #fce7f3 50%, #f3e8ff 100%);
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundEffects;