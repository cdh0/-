import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const ModernFooter: React.FC = () => {
  return (
    <footer className="relative mt-16 pb-8">
      {/* Decorative line */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent max-w-xs"></div>
        <Sparkles className="mx-4 text-pink-400 animate-pulse" size={20} />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent max-w-xs"></div>
      </div>

      {/* Main footer content */}
      <div className="text-center">
        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-gray-400 mt-4 px-4">
          أنت زهرة نادرة في حديقة الحياة 🌹
        </p>
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${Math.random() * 100}%`,
              fontSize: '12px',
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <span className="animate-pulse">💕</span>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default ModernFooter;
