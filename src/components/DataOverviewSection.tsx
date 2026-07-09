import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { internationalSurveys } from '../data/internationalSurveys';

export default function DataOverviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative min-h-screen py-20">
      {/* Warm parchment background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1f14] via-[#3d2b1f] to-[#2a1f14]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-[#d4a373]">
            越来越多人愿意谈论死亡
          </h2>
          <p className="text-[#e8d4bc]/70 text-lg">
            从对死亡的逃避与缄默中挣脱，越来越多的人们开始感受思念
          </p>
        </motion.div>

        {/* Survey cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {internationalSurveys.map((survey, index) => (
            <SurveyCard key={survey.id} survey={survey} index={index} />
          ))}
        </div>

        {/* Transition quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="font-heading text-xl md:text-2xl text-[#d4a373] italic leading-relaxed max-w-3xl mx-auto">
            "死亡不是一个我们能够解决的问题，真正的问题不是'我们会不会死'，而是'我们会以什么方式被记住'——关于故事、记忆，以及'重返生命'。"
          </p>
          
          <p className="text-[#e8d4bc]/70 mt-6 max-w-2xl mx-auto">
            当我们谈论死亡，我们不仅仅要谈论死亡本身，更要讨论人们如何面对死亡之后的空缺，并把这空缺转化为记忆。
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SurveyCard({ survey, index }: { 
  survey: typeof internationalSurveys[0]; 
  index: number;
}) {
  const [count, setCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInCardView = useInView(cardRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInCardView) return;
    
    const targetValue = parseFloat(survey.keyStat.replace('%', ''));
    const duration = 2000;
    const startTime = Date.now();
    const delay = 400;
    
    const timeout = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - delay;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(targetValue * eased);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isInCardView, survey.keyStat]);

  return (
    <motion.div
      ref={cardRef}
      className="p-6 md:p-8 relative overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInCardView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Paper texture background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6d3] via-[#e8d4bc] to-[#d4c4a8] shadow-lg" />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Decorative corner */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#8b5e3c]/30" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#8b5e3c]/30" />

      {/* Content */}
      <div className="relative z-10">
        {/* Country flag and name */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-5xl drop-shadow-sm">{survey.flag}</span>
          <div>
            <p className="text-[#8b5e3c]/60 text-xs font-medium uppercase tracking-wider">{survey.name}</p>
            <h3 className="font-heading text-xl text-[#4a3728] font-semibold">
              {survey.region}
            </h3>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl text-[#4a3728] mb-6 leading-snug">
          {survey.title}
        </h3>

        {/* Key stat with ink-style */}
        <div className="mb-5">
          <div className="inline-block">
            <span className="font-display text-5xl md:text-6xl text-[#8b5e3c] font-bold tracking-tight">
              {count.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Short description */}
        <p className="text-[#6b5344] text-sm mb-5 leading-relaxed">
          {survey.description}
        </p>

        {/* Expanded details on hover */}
        <motion.div
          initial={false}
          animate={{ height: showDetails ? 'auto' : 0, opacity: showDetails ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-[#8b5e3c]/20">
            <p className="text-[#6b5344] text-xs leading-relaxed mb-3">
              {survey.detail}
            </p>
            <p className="text-[#8b5e3c]/60 text-xs italic">
              数据来源: {survey.source}
            </p>
          </div>
        </motion.div>

        {!showDetails && (
          <p className="text-[#8b5e3c]/40 text-xs italic">
            悬停查看更多
          </p>
        )}
      </div>
    </motion.div>
  );
}
