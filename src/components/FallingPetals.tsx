import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 8 + Math.random() * 12,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 10,
        rotation: Math.random() * 360
      }));
      setPetals(newPetals);
    };

    generatePetals();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-20px',
            animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 20 20"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              animation: `petalFloat 3s ease-in-out infinite`
            }}
          >
            <ellipse
              cx="10"
              cy="10"
              rx="4"
              ry="8"
              fill="#F59E0B"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
      
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
            opacity: 0.7;
          }
          25% {
            transform: translateY(25vh) rotate(90deg) translateX(30px);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(-20px);
          }
          75% {
            transform: translateY(75vh) rotate(270deg) translateX(40px);
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(0);
            opacity: 0;
          }
        }
        
        @keyframes petalFloat {
          0%, 100% {
            transform: translateX(0) scale(1);
          }
          50% {
            transform: translateX(10px) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
