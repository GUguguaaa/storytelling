import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const deathImagery = [
  { icon: '⚰️', name: '棺材', delay: 0 },
  { icon: '🏥', name: '医院', delay: 0.3 },
  { icon: '🌸', name: '菊花', delay: 0.6 },
  { icon: '🕯️', name: '蜡烛', delay: 0.9 },
  { icon: '📿', name: '念珠', delay: 1.2 },
  { icon: '🪦', name: '墓碑', delay: 1.5 },
  { icon: '🏛️', name: '灵堂', delay: 1.8 },
  { icon: '📜', name: '讣告', delay: 2.1 },
];

export default function HeroSection() {
  const [showContent, setShowContent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-purple-950" />
      
      {/* Floating particles / dust effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [null, `${Math.random() * 100}%`],
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              delay: Math.random() * 3,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      {/* Death imagery icons - floating permanently */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {deathImagery.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: [0, 0.25, 0.25, 0.2],
              scale: [0, 1.2, 1],
              rotate: 0,
              y: [0, -10, 10, 0],
            }}
            transition={{ 
              duration: 4,
              delay: item.delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{
              left: `${15 + (index % 4) * 22}%`,
              top: `${20 + Math.floor(index / 4) * 30}%`,
              fontSize: '4rem',
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 text-center px-4">
        {/* Main title */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text text-transparent">
            当我们谈论死亡
          </span>
        </motion.h1>

        {/* English subtitle */}
        <motion.p
          className="font-heading text-2xl md:text-3xl text-white/80 mb-8 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          When We Talk About Death
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">向下滚动</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
