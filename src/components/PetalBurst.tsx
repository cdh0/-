import React, { useState, useEffect } from 'react';

interface PetalBurstProps {
  trigger: boolean;
  onComplete: () => void;
}

interface Petal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  emoji: string;
  scale: number;
}

const PetalBurst: React.FC<PetalBurstProps> = ({ trigger, onComplete }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (trigger) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const newPetals: Petal[] = Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const speed = 3 + Math.random() * 4;
        
        return {
          id: Date.now() + i,
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          emoji: ['🌸', '🌺', '🌷', '🌹', '💮'][Math.floor(Math.random() * 5)],
          emoji: ['🌸', '🌺', '🌷', '🌹', '💮', '🍪', '🧁'][Math.floor(Math.random() * 7)],
          scale: 0.8 + Math.random() * 0.6,
        };
      });
      
      setPetals(newPetals);

      // Animate petals
      const animationInterval = setInterval(() => {
        setPetals(prev => 
          prev.map(petal => ({
            ...petal,
            x: petal.x + petal.vx,
            y: petal.y + petal.vy,
            vy: petal.vy + 0.2, // gravity
            rotation: petal.rotation + petal.rotationSpeed,
            scale: petal.scale * 0.98, // shrink over time
          }))
        );
      }, 16);

      setTimeout(() => {
        clearInterval(animationInterval);
        setPetals([]);
        onComplete();
      }, 2500);

      return () => clearInterval(animationInterval);
    }
  }, [trigger, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute text-2xl"
          style={{
            left: petal.x,
            top: petal.y,
            transform: `rotate(${petal.rotation}deg) scale(${petal.scale})`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            transition: 'none',
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  );
};

export default PetalBurst;
