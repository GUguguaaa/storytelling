import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CocoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/coco.jpg')`,
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        {/* Purple accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto px-8 py-20">
          {/* Main message */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <p className="font-heading text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed">
              但在另一些文化里，死亡并不只意味着结束，也意味着被重新讲述。
            </p>
          </motion.div>

          {/* Pascoal quote */}
          <motion.div
            className="bg-black/30 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-amber-500/20 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-sm text-amber-400/80 mb-4">墨西哥作家帕斯在《孤独的迷宫》中写道：</p>
            
            <blockquote className="font-accent text-xl md:text-2xl text-white leading-relaxed mb-6">
              "对于纽约、巴黎或是伦敦人来说，死亡是他们绝不会提起的，因为这个词会灼伤他们的嘴唇。然而墨西哥人，恰恰相反，他们接近死亡，调侃死亡、爱抚死亡、与死亡同寝、庆祝死亡，死亡是墨西哥人最钟爱的玩具之一，是墨西哥人永恒的爱。"
            </blockquote>
            
            <p className="text-white/50 text-sm italic mt-4">
              Para el habitante de Nueva York, París o Londres, la muerte es la palabra que jamás se pronuncia porque quema sus labios. El mexicano, en cambio, la frecuenta, la burla, la acaricia, duerme con ella, la festeja, es uno de sus juguetes favoritos y su amor más permanente.
            </p>
          </motion.div>

          {/* Coco connection */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="font-body text-lg text-white/80 leading-relaxed mb-8">
              取材于墨西哥亡灵节的《寻梦环游记》成为了这段话最好的注解，这部温情的电影让我们在对幽暗冥界的恐惧和对生离死别的忌讳之外，看到了另一种态度——<span className="text-amber-400 font-semibold">接纳与铭记死亡</span>，在白驹过隙的生活中看见永恒的爱。
            </p>
          </motion.div>

          {/* Famous quote from Coco */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="inline-block bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20 rounded-full px-8 py-4">
              <p className="font-accent text-2xl md:text-3xl text-amber-400">
                "死亡并不是终点，遗忘才是"
              </p>
              <p className="text-white/60 text-sm mt-2">——《寻梦环游记》</p>
            </div>
          </motion.div>

          {/* Quote from Douban */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <p className="font-body text-base text-white/50 italic max-w-2xl mx-auto">
              "供奉的遗像是牵引家人回家的通道，驻留的记忆是保持亡灵存续的神力，热闹的音乐是唤醒思念启封的药引。"
            </p>
            <p className="text-white/40 text-xs mt-2">—— 豆瓣影评</p>
            
            {/* Transition text */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <p className="text-amber-400/80 text-lg font-heading">
                而近年来的调查也显示出一个新的趋势
              </p>
              <p className="text-white/70 text-base mt-2">
                人们越来越愿意谈论关于死亡的话题，而不再将其视为一种需要避讳的禁忌。
              </p>
              
              <motion.div
                className="mt-8 text-amber-400/50 animate-bounce"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 2 }}
              >
                <p className="text-sm">↓</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative marigolds at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
}
