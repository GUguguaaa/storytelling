import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { epitaphs, categoryInfo, categories } from '../data/memorialData';

export default function CommemorationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEpitaphs = selectedCategory
    ? epitaphs.filter(epitaph => epitaph.category === selectedCategory)
    : [];

  return (
    <section ref={ref} className="section-container relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-coco-orange-gold mb-4">
            PART 2
          </h2>
          <h3 className="font-heading text-3xl md:text-4xl text-coco-cream-light mb-6">
            悼念 — TA们的故事
          </h3>
          <p className="text-coco-yellow-bright text-xl font-heading italic">
            "寻梦环游记中最令人印象深刻的音乐毫无疑问是Remember Me"
          </p>
        </motion.div>

        {/* Memory quote */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-heading text-xl md:text-2xl text-coco-cream-light/90 leading-relaxed max-w-3xl mx-auto">
            只要有人仍然讲起他们的名字，记得他们的声音、习惯、选择与故事，他们便仍以某种方式停留在人间。
          </p>
        </motion.div>

        {/* Epitaphs section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h4 className="font-heading text-2xl text-coco-orange-gold mb-8 text-center">
            墓志铭：如何被记住
          </h4>

          {/* Category buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-coco-orange-gold text-coco-purple-deep'
                    : 'bg-coco-purple-deep/50 text-coco-cream-light/80 border border-coco-orange-gold/30 hover:border-coco-orange-gold'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Default tombstone */}
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              <motion.div
                key="default-tombstone"
                className="flex justify-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative max-w-2xl w-full">
                  {/* Top arch */}
                  <div className="tombstone-arch" />
                  
                  {/* Stone body */}
                  <div className="tombstone-body">
                    {/* Stone texture */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-white/20 via-transparent to-black/20" />
                      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/20" />
                      <div className="absolute top-8 right-6 w-1 h-1 rounded-full bg-white/15" />
                      <div className="absolute bottom-12 left-8 w-1.5 h-1.5 rounded-full bg-white/10" />
                    </div>

                    {/* Cross symbol */}
                    <div className="flex justify-center mb-4">
                      <div className="relative w-8 h-12">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-coco-orange-gold/60 rounded-full" />
                        <div className="absolute top-3 left-0 right-0 h-1.5 bg-coco-orange-gold/60 rounded-full" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <p className="font-accent text-coco-cream-light leading-loose whitespace-pre-line text-base md:text-lg text-center">
                        {`铭记并没有唯一形式。有人被记住，是因为他做过什么；有人被记住，是因为他是怎样的人；有人被记住，是因为他爱过谁、被谁爱过；也有人只需要一个名字，就足以让后来者停步。

墓志铭既写给死者，也写给生者。它提醒我们回答一个问题：如果有一天，我们只能用有限的文字概括自己的一生，我们希望那几行字里留下什么？`}
                      </p>
                    </div>

                    {/* Bottom decoration */}
                    <div className="mt-6 flex justify-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-coco-orange-gold/40" />
                      <div className="w-1 h-1 rounded-full bg-coco-orange-gold/30" />
                      <div className="w-1 h-1 rounded-full bg-coco-orange-gold/20" />
                    </div>
                  </div>

                  {/* Bottom base */}
                  <div className="h-4 bg-gradient-to-t from-gray-700 to-gray-600 rounded-b-lg mx-2" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="category-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Category description */}
                <motion.div
                  className="mb-8 p-6 bg-coco-purple-deep/30 rounded-xl border border-coco-orange-gold/20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <p className="text-coco-cream-light/90 text-center leading-relaxed">
                    {categoryInfo[selectedCategory as keyof typeof categoryInfo]}
                  </p>
                </motion.div>

                {/* Epitaph count */}
                <p className="text-center text-white/50 text-sm mb-8">
                  共 {filteredEpitaphs.length} 则墓志铭
                </p>

                {/* Epitaph cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEpitaphs.map((epitaph, index) => (
                    <motion.div
                      key={epitaph.id}
                      className="tombstone-card group"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      whileHover={{ y: -5 }}
                    >
                      {/* Tombstone shape */}
                      <div className="relative">
                        {/* Top arch */}
                        <div className="tombstone-arch" />
                        
                        {/* Stone body */}
                        <div className="tombstone-body">
                          {/* Stone texture */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-white/20 via-transparent to-black/20" />
                            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/20" />
                            <div className="absolute top-8 right-6 w-1 h-1 rounded-full bg-white/15" />
                            <div className="absolute bottom-12 left-8 w-1.5 h-1.5 rounded-full bg-white/10" />
                          </div>

                          {/* Cross symbol */}
                          <div className="flex justify-center mb-4">
                            <div className="relative w-8 h-12">
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-coco-orange-gold/60 rounded-full" />
                              <div className="absolute top-3 left-0 right-0 h-1.5 bg-coco-orange-gold/60 rounded-full" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            <p className="font-accent text-coco-cream-light leading-relaxed whitespace-pre-line text-sm text-center">
                              {epitaph.content}
                            </p>
                            
                            {/* Location and year */}
                            {epitaph.location && (
                              <div className="mt-4 pt-3 border-t border-white/10">
                                <p className="text-coco-cream-light/50 text-xs text-center">
                                  {epitaph.location}
                                </p>
                                {epitaph.year && (
                                  <p className="text-coco-orange-gold/60 text-xs text-center mt-1">
                                    {epitaph.year}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Bottom decoration */}
                          <div className="mt-4 flex justify-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-coco-orange-gold/40" />
                            <div className="w-1 h-1 rounded-full bg-coco-orange-gold/30" />
                            <div className="w-1 h-1 rounded-full bg-coco-orange-gold/20" />
                          </div>
                        </div>

                        {/* Bottom base */}
                        <div className="h-4 bg-gradient-to-t from-gray-700 to-gray-600 rounded-b-lg mx-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Memorial methods visualization */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h4 className="font-heading text-2xl text-coco-orange-gold mb-8 text-center">
            纪念的方式
          </h4>
          
          <p className="text-center text-coco-cream-light/80 text-lg max-w-2xl mx-auto">
            数据显示，种一棵树和墓碑是最受欢迎的纪念方式
          </p>
        </motion.div>

        {/* Final quote */}
        <motion.div
          className="text-center bg-coco-purple-deep/30 rounded-2xl p-8 border border-coco-orange-gold/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <p className="font-accent text-3xl text-coco-orange-gold mb-4">
            "首先是善良，然后是正直，最后，彼此永不相忘"
          </p>
          <p className="text-coco-cream-light/70">
            破碎禁忌，迈过悲伤，最好的悼念在于，永远记住逝者的故事。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
