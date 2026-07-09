import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const TimeCapsuleLetter = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(['', '', '']);

  const questions = [
    {
      label: '如果有一天，我们只能用有限的文字概括自己的一生，我们希望那几行字里留下什么？',
      placeholder: '写下你想被记住的一句话...',
    },
    {
      label: '如果只能留下一段回忆，那会是什么？',
      placeholder: '描述那段最珍贵的回忆...',
    },
    {
      label: '如果时光邮局能把信送到未来，你想对未来的自己说什么？',
      placeholder: '给未来的自己写一封信...',
    },
  ];

  const progress = ((step + 1) / questions.length) * 100;

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers(['', '', '']);
  };

  const handleSend = () => {
    if (answers[step].trim()) {
      setStep(3);
    }
  };

  const updateAnswer = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = value;
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {step < 3 ? (
        <>
          {/* Progress bar */}
          <div className="w-full h-1 bg-coco-cream-light/10 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-coco-orange-gold to-coco-yellow-bright"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Question */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="font-heading text-lg md:text-xl text-coco-cream-light leading-relaxed">
              {questions[step].label}
            </p>

            <textarea
              value={answers[step]}
              onChange={(e) => updateAnswer(e.target.value)}
              placeholder={questions[step].placeholder}
              rows={4}
              className="w-full bg-coco-purple-deep/50 border border-coco-orange-gold/20 rounded-xl px-5 py-4 text-coco-cream-light text-base placeholder-coco-cream-light/30 resize-none focus:outline-none focus:border-coco-orange-gold/40 transition-colors"
            />

            <div className="flex items-center justify-between">
              <p className="text-coco-cream-light/40 text-sm">
                {step + 1} / {questions.length}
              </p>
              <div className="flex gap-3">
                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-5 py-2 rounded-lg border border-coco-cream-light/20 text-coco-cream-light/70 text-sm hover:bg-coco-cream-light/10 transition-colors"
                  >
                    上一题
                  </button>
                )}
                <button
                  onClick={step < questions.length - 1 ? handleNext : handleSend}
                  disabled={!answers[step].trim()}
                  className="px-6 py-2 rounded-lg bg-coco-orange-gold text-coco-purple-deep font-medium text-sm hover:bg-coco-yellow-bright transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {step < questions.length - 1 ? '下一题' : '寄出信件'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 py-8"
        >
          <div className="text-6xl mb-4">📮</div>
          <p className="font-heading text-2xl text-coco-orange-gold mb-4">
            信件已寄出
          </p>
          <p className="text-coco-cream-light/80 leading-relaxed max-w-md mx-auto">
            这封信会穿越时光，到达未来的某个时刻。
            <br />
            也许有一天，当有人打开它，会看到此刻你在这里留下的痕迹。
          </p>
          <div className="pt-4">
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-lg border border-coco-orange-gold/30 text-coco-cream-light/80 text-sm hover:bg-coco-orange-gold/10 transition-colors"
            >
              再写一封信
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function ConclusionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-container relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="font-display text-4xl md:text-6xl gradient-text mb-8">
            记住便是永恒
          </h2>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-transparent via-coco-orange-gold to-transparent mx-auto mb-12"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Core message */}
        <motion.div
          className="space-y-8 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-heading text-xl md:text-2xl text-coco-cream-light/90 leading-relaxed">
            死亡并不是终点，遗忘才是。
          </p>
          
          <p className="font-body text-lg text-coco-cream-light/70 leading-relaxed max-w-2xl mx-auto">
            "在死的那一刻，不仅一个人的知识和智慧，而且他全部的真实生活——而这正是构成故事的材料，才首次呈现出可传达的形式。"
          </p>

          <p className="text-coco-purple-light italic">
            —— 瓦尔特·本雅明
          </p>
        </motion.div>

        {/* Visual element - Marigold */}
        <motion.div
          className="mb-16"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, delay: 0.7, type: "spring" }}
        >
          <svg className="w-32 h-32 mx-auto text-coco-orange-gold" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="10" fill="currentColor" />
            {[...Array(12)].map((_, i) => (
              <ellipse
                key={i}
                cx="50"
                cy="50"
                rx="20"
                ry="8"
                fill="currentColor"
                transform={`rotate(${i * 30} 50 50) translate(0 -18)`}
                opacity={0.7 + (i % 2) * 0.3}
              />
            ))}
            {[...Array(12)].map((_, i) => (
              <ellipse
                key={`inner-${i}`}
                cx="50"
                cy="50"
                rx="14"
                ry="5"
                fill="currentColor"
                transform={`rotate(${i * 30 + 15} 50 50) translate(0 -10)`}
                opacity={0.5}
              />
            ))}
          </svg>
        </motion.div>

        {/* Final reflection - Interactive Time Capsule Letter */}
        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-coco-purple-deep/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-coco-orange-gold/20 shadow-2xl">
            {/* Letter header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coco-orange-gold/20 flex items-center justify-center text-xl">
                  ✉️
                </div>
                <div>
                  <p className="text-coco-cream-light font-medium text-sm">时光邮局</p>
                  <p className="text-coco-cream-light/50 text-xs">Time Capsule Post Office</p>
                </div>
              </div>
              <div className="text-coco-cream-light/40 text-xs">
                {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {/* Decorative line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coco-orange-gold/40 to-transparent mb-6" />

            {/* Letter content */}
            <TimeCapsuleLetter />
          </div>
        </motion.div>

        {/* Credits */}
        <motion.div
          className="pt-8 border-t border-coco-cream-light/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <p className="text-coco-cream-light/50 text-sm mb-4">
            数据来源
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-coco-cream-light/40">
            <span>微博评论数据 (8588条)</span>
            <span>•</span>
            <span>YouGov Death Study (2021)</span>
            <span>•</span>
            <span>香港生死看法调查 (2022)</span>
            <span>•</span>
            <span>新加坡 Death Literacy Index (2025)</span>
            <span>•</span>
            <span>墓志铭图书馆</span>
          </div>
          
          <p className="text-coco-cream-light/30 text-xs mt-8">
            © 2026 当我们谈论死亡 | When We Talk About Death
          </p>
        </motion.div>
      </div>
    </section>
  );
}
