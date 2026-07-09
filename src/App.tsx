import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProfessorSection from './components/ProfessorSection';
import CocoSection from './components/CocoSection';
import DataOverviewSection from './components/DataOverviewSection';
import MemorySection from './components/MemorySection';
import EmotionDataSection from './components/EmotionDataSection';
import CommemorationSection from './components/CommemorationSection';
import MemorialExperience from './components/MemorialExperience';
import ConclusionSection from './components/ConclusionSection';
import ScrollProgress from './components/ScrollProgress';
import FallingPetals from './components/FallingPetals';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Background gradient */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0f0f1a, #1a0a2e, #0f0f1a)',
        }}
      />
      
      {/* Stars background */}
      <StarsBackground />
      
      {/* Falling petals effect */}
      <FallingPetals />
      
      {/* Scroll progress indicator */}
      <ScrollProgress progress={scrollProgress} />
      
      {/* Main content */}
      <main>
        <HeroSection />
        <ProfessorSection />
        <CocoSection />
        <DataOverviewSection />
        <MemorySection />
        <EmotionDataSection />
        <CommemorationSection />
        <MemorialExperience />
        <ConclusionSection />
      </main>
    </div>
  );
}

// Stars background component
function StarsBackground() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([]);
  
  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="stars-bg">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            backgroundColor: '#fff',
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
