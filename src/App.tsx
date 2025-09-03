import React from 'react';
import ModernHeart from './components/ModernHeart';
import InteractiveFlowers from './components/InteractiveFlowers';
import ModernQualityButton from './components/ModernQualityButton';
import BackgroundEffects from './components/BackgroundEffects';
import MobileOptimizedHeader from './components/MobileOptimizedHeader';
import ModernFooter from './components/ModernFooter';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffects />
      <InteractiveFlowers />
      
      <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10 max-w-4xl">
        <MobileOptimizedHeader />

        <div className="max-w-2xl mx-auto">
          <ModernHeart />
          <ModernQualityButton />
        </div>

        <ModernFooter />
      </div>
    </div>
  );
}

export default App;