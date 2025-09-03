import React, { useState, useEffect } from 'react';
import { Heart, Flower } from 'lucide-react';

const MobileOptimizedHeader: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative text-center mb-8 sm:mb-12">
      {/* Main title with parallax effect */}
      <div 
        className="relative z-10"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
          <span className="inline-block bg-gradient-to-r from-pink-600 via-rose-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-text">
            كوثر
          </span>
        </h1>
        
        {/* Subtitle with icons */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Flower className="text-pink-500 animate-pulse" size={20} />
          <p className="text-lg sm:text-xl text-gray-600 font-medium">حديقة الصفات الجميلة</p>
          <Heart className="text-rose-500 animate-pulse" size={20} />
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-md mx-auto px-4">
          اكتشفي جمال صفاتك مع كل زهرة جديدة تتفتح في حديقة قلبك
        </p>
        
        {/* Beautiful quote with modern styling */}
        <div className="mt-8 relative">
          <div className="inline-block bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 backdrop-blur-sm px-6 py-4 rounded-2xl border border-pink-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-rose-200/20 to-purple-200/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <p className="relative z-10 text-lg sm:text-xl font-semibold text-gray-700 leading-relaxed">
              أنت زهرة نادرة في حديقة الحياة 🌹
            </p>
            
            {/* Decorative sparkles */}
            <div className="absolute -top-2 -right-2 text-yellow-400 animate-pulse">✨</div>
            <div className="absolute -bottom-2 -left-2 text-pink-400 animate-bounce">💫</div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
        <div className="flex gap-4">
          <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🍪</span>
          <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌺</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🍪</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-text {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 3s ease infinite;
        }
      `}</style>
    </header>
  );
};

export default MobileOptimizedHeader;
