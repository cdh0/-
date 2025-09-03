import React, { useState, useCallback } from 'react';
import { Plus, Heart, Sparkles, Star } from 'lucide-react';
import { qualities } from '../data/qualities';
import PetalBurst from './PetalBurst';

const ModernQualityButton: React.FC = () => {
  const [shownQualities, setShownQualities] = useState<string[]>([]);
  const [triggerBurst, setTriggerBurst] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const addQuality = useCallback(() => {
    if (isAnimating) return;
    
    const availableQualities = qualities.filter(
      quality => !shownQualities.includes(quality)
    );
    
    if (availableQualities.length === 0) {
      setShownQualities([]);
      return;
    }

    const randomQuality = availableQualities[
      Math.floor(Math.random() * availableQualities.length)
    ];

    setIsAnimating(true);
    setButtonPressed(true);
    setTriggerBurst(true);
    
    // Haptic feedback for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setTimeout(() => {
      setShownQualities(prev => [...prev, randomQuality]);
      setButtonPressed(false);
    }, 400);
  }, [shownQualities, isAnimating]);

  const handleBurstComplete = useCallback(() => {
    setTriggerBurst(false);
    setIsAnimating(false);
  }, []);

  return (
    <div className="text-center px-4">
      {/* Main Button */}
      <div className="relative mb-8">
        <button
          onClick={addQuality}
          disabled={isAnimating}
          className={`
            group relative overflow-hidden
            bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500
            hover:from-pink-400 hover:via-rose-400 hover:to-purple-400
            text-white px-6 py-4 sm:px-8 sm:py-5 
            rounded-full text-base sm:text-lg font-bold
            shadow-2xl hover:shadow-pink-500/25
            transform transition-all duration-300
            ${buttonPressed ? 'scale-95' : 'hover:scale-105'}
            disabled:opacity-70 disabled:cursor-not-allowed
            active:scale-95
            min-h-[60px] sm:min-h-[70px]
          `}
        >
          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
            <Plus 
              size={20} 
              className={`transition-transform duration-300 ${
                isAnimating ? 'rotate-180 scale-110' : 'group-hover:rotate-90'
              }`} 
            />
            <span className="text-sm sm:text-lg whitespace-nowrap">زِيدي زهرة من صفاتك</span>
            <Heart 
              size={18} 
              className={`transition-all duration-300 ${
                isAnimating ? 'scale-125 text-yellow-300' : 'animate-pulse'
              }`} 
            />
          </span>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/50 to-purple-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        </button>

        {/* Floating icons around button */}
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute top-2 right-2 text-yellow-400 animate-pulse" size={16} />
          <Star className="absolute bottom-2 left-2 text-pink-400 animate-bounce" size={14} />
          <Heart className="absolute top-1/2 -right-8 text-rose-400 animate-pulse" size={12} />
        </div>
      </div>

      {/* Quality Cards Container */}
      <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar px-2">
        {shownQualities.map((quality, index) => (
          <div
            key={index}
            className="quality-card group relative"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Card background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-pink-50 to-rose-50 rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Card border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
            
            {/* Card content */}
            <div className="relative z-10 p-4 sm:p-6 rounded-2xl border border-pink-200/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-transparent"></div>
                <span className="text-2xl animate-bounce">
                  {index % 4 === 0 ? '🍪' : index % 4 === 1 ? '🌸' : index % 4 === 2 ? '🧁' : '🌺'}
                </span>
              </div>
              
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium text-right">
                {quality}
              </p>
              
              {/* Floating number */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state message */}
      {shownQualities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4 animate-bounce">🌸</div>
          <p className="text-lg">اضغطي الزر لتكتشفي صفاتك الجميلة</p>
        </div>
      )}

      <PetalBurst trigger={triggerBurst} onComplete={handleBurstComplete} />

      <style jsx>{`
        .quality-card {
          animation: slideInRight 0.6s ease-out forwards;
          transform: translateX(100px);
          opacity: 0;
        }

        .quality-card:hover {
          transform: translateY(-4px) scale(1.02);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 192, 203, 0.1);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #ec4899, #f97316);
          border-radius: 3px;
        }

        @keyframes slideInRight {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernQualityButton;
