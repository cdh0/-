import React, { useState, useEffect, useCallback } from 'react';

interface Flower {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  speed: number;
  rotation: number;
}

const InteractiveFlowers: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [touchFlowers, setTouchFlowers] = useState<{ id: number; x: number; y: number }[]>([]);

  const flowerEmojis = ['🌸', '🌺', '🌷', '🌹', '🥀', '💮', '🏵️', '🌻', '🌼', '🌿', '🍀', '🌱', '🍪'];

  const createFlower = useCallback((x?: number, y?: number): Flower => ({
    id: Date.now() + Math.random(),
    x: x ?? Math.random() * window.innerWidth,
    y: y ?? window.innerHeight + 50,
    emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
    size: 0.8 + Math.random() * 0.7,
    speed: 1 + Math.random() * 2,
    rotation: Math.random() * 360,
  }), []);

  // Auto-generate flowers
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowers(prev => {
        const newFlower = createFlower();
        const activeFlowers = prev.filter(f => f.y > -100);
        return [...activeFlowers, newFlower].slice(-25);
      });
    }, 800);

    return () => clearInterval(interval);
  }, [createFlower]);

  // Update flower positions
  useEffect(() => {
    const animationFrame = setInterval(() => {
      setFlowers(prev => 
        prev.map(flower => ({
          ...flower,
          y: flower.y - flower.speed,
          rotation: flower.rotation + 1,
        })).filter(flower => flower.y > -100)
      );
    }, 50);

    return () => clearInterval(animationFrame);
  }, []);

  // Handle touch/click interactions
  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    
    if (clientX && clientY) {
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Create burst of flowers at touch point
      const burstFlowers = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
      }));

      setTouchFlowers(prev => [...prev, ...burstFlowers]);

      // Remove touch flowers after animation
      setTimeout(() => {
        setTouchFlowers(prev => 
          prev.filter(tf => !burstFlowers.some(bf => bf.id === tf.id))
        );
      }, 1500);
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Floating flowers */}
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute transition-all duration-100 ease-linear"
          style={{
            left: flower.x,
            top: flower.y,
            transform: `scale(${flower.size}) rotate(${flower.rotation}deg)`,
            fontSize: '24px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        >
          {flower.emoji}
        </div>
      ))}

      {/* Touch interaction flowers */}
      {touchFlowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute text-2xl animate-ping"
          style={{
            left: flower.x,
            top: flower.y,
            animation: 'touchBurst 1.5s ease-out forwards',
          }}
        >
          🌸
        </div>
      ))}

      <style jsx>{`
        @keyframes touchBurst {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(2) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveFlowers;
