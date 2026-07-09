import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemoryItem {
  id: number;
  icon: string;
  item: string;
  author: string;
  content: string;
  color: string;
  x?: number;
  y?: number;
  rotation?: number;
  delay?: number;
}

const memoryItems: MemoryItem[] = [
  {
    id: 1,
    icon: '📦',
    item: '小盒子',
    author: '@Skylar',
    content: '他是我的同事，大学毕业之后，我和他一起共事了 15 年。他在 2024 年的那个夏天意外离开了。他曾经工作的办公室在我的办公室旁边，现在已经换了主人。我拿走了一个他每天点香的小盒子，放在我的办公室里。我偶尔工作时会想起他，想着要是他，会如何处理这件事。但我不想这么快忘记，因为我觉得和他认识的这15年，是值得被记住的。',
    color: '#8B5CF6'
  },
  {
    id: 2,
    icon: '🧶',
    item: '羊毛衫',
    author: '@二萌',
    content: '我在冬天会想起奶奶，特别是在穿上一件羊毛打底衫的时候。小时候父母外出务工，我跟着奶奶一起生活。有一年姑姑回家，送了奶奶一件牌子的羊毛打底衫，她转头就拿给了我，说自己穿不下。那件打底衫特别柔软，质量很好，我到现在偶尔还会拿出来穿，虽然起球变形了，但是穿在身上非常温暖，就像奶奶紧紧地抱着我。',
    color: '#F59E0B'
  },
  {
    id: 3,
    icon: '🌰',
    item: '拐枣',
    author: '@大维',
    content: '每次看见拐枣时都会想起我的姑婆。姑婆和我们家隔了一条街，小时候父母出去干活我就经常待在姑婆家。每年到了冬天霜冻之后，拐枣变甜了，姑婆都会摘下一把拐枣给我们吃。她生病去世后的一年冬天，我先生下班回家带回来一小把拐枣。我一下子就想到了她。',
    color: '#FB923C'
  },
  {
    id: 4,
    icon: '🫙',
    item: '猪油',
    author: '@何大白白🥂',
    content: '妈妈去世前给我熬了一盆猪油，她走了快七年了，那盆猪油就放在我冰箱的角落里，没动过。',
    color: '#F9A8D4'
  },
  {
    id: 5,
    icon: '💡',
    item: '白炽灯',
    author: '@秋山',
    content: '我的外公外婆去世在 2018 年的头和尾。外公家存了一盒子白炽灯泡，总也没机会换上LED的。现在那种灯很少了，偶尔才能看到一次，而每次看到，我都仿佛又回到那个巷子那个楼道，好像我穿过那片昏黄的灯光一路走上去，还能推开那扇门，门里还是摇着蒲扇的他们。',
    color: '#FCD34D'
  },
  {
    id: 6,
    icon: '✂️',
    item: '理发推子',
    author: '@倾欢',
    content: '狗狗生病离开几年了，在给它剪毛的推子上，发现它遗落的毛。',
    color: '#FB923C'
  },
  {
    id: 7,
    icon: '🧿',
    item: '护身符',
    author: '@bubu',
    content: '看到护身符和老式日历盘时，就会想起爷爷。最近几年，每次出差或旅游，总会给他求个安康、平安、健康相关的挂件，回去迫不及待给他讲我的经历和感受，然后把东西挂在他日历前。在这个迟来的新年前，他离开了。春节假期结束离家前，去他屋子又看到了未被收走的"安康"和"最后一天"，无比想念他。',
    color: '#8B5CF6'
  },
  {
    id: 8,
    icon: '🎠',
    item: '秋千',
    author: '@Lancy',
    content: '奶奶在三年前的正月初十离开，当时再过五天就是她的生日。暑假的时候，我经常在清晨跟奶奶去买菜，我们走到村子里的健身广场，一起荡秋千。现在一荡秋千就会想起她，她留下的最后一段视频里，我们一起坐在秋千上，她穿着紫色的袜子。',
    color: '#F59E0B'
  },
  {
    id: 9,
    icon: '🥟',
    item: '奶香酥脆卷',
    author: '@初拾墨点',
    content: '她是我朋友，刚过完 16 岁生日的女孩子。她出事前一周，我们还一起去广州玩。那时我们连着吃了四天的点都德，她每天都点流心奶香酥脆卷。昨天中午我点外卖时，又看到点都德了，下意识点进去，看到奶香卷，却没敢买。我宁愿难过也不想忘记她。',
    color: '#FB923C'
  },
  {
    id: 10,
    icon: '🌸',
    item: '油桐花',
    author: '@小雨',
    content: '奶奶家门口有油桐树，屋后有桂花树、柿子树。每次闻到桂花香、花生香，我总会想起奶奶。有次在奶奶家住，我要洗头，奶奶家没有洗发水，她就步行去了镇子上，买了一瓶海飞丝。我看到她把剩下的钱仔仔细细用手绢一层一层包好，那一刻我觉得，奶奶一定是爱我的。',
    color: '#F9A8D4'
  },
  {
    id: 11,
    icon: '🛒',
    item: '购物车',
    author: '@超凡·赫斯特家具 李侠',
    content: '淘宝购物车里有各种牌子的蛋白粉、石斛粉、补血药，是之前给父亲买的，现在不需要了。刚刚过去的冬天，他离我们而去。购物车可以清空，思念一直清不空。',
    color: '#8B5CF6'
  },
  {
    id: 12,
    icon: '🌵',
    item: '仙人掌',
    author: '@徐果',
    content: '我奶奶生前很喜欢种仙人掌，她离开之后，我们就用她留下的仙人掌繁殖出更多小仙人掌，小仙人掌长大后，再继续繁殖。就这样，我们用仙人掌留住了她。',
    color: '#F59E0B'
  },
  {
    id: 13,
    icon: '🍓',
    item: '草莓味感冒药',
    author: '@Kd',
    content: '每当过年别人或者我家放烟花时，填个人简历时，当我和石头合照或者我看到有人和石头合照时，当我开心难过时，去买他以前给我吃的拉肚子药、草莓味感冒药时，都会想起他。他好像无处不在，不关乎有没有离开过我身边。',
    color: '#FB923C'
  },
  {
    id: 14,
    icon: '🍋',
    item: '榴莲',
    author: '@NPC-U',
    content: '我的舅舅，2023 年离开我们。以前一直好奇榴莲究竟是什么味道，舅舅觉得浪费钱，强忍恶心把一整个榴莲全吃完了，还因此流了鼻血。我们会和身边所有人分享这个故事：一个因为吃榴莲而狂流鼻血的人。任何有形的物件都可以被清理掉，但味道不会，只要榴莲还存在于这个世界，舅舅就会被我们长久地留恋。',
    color: '#F9A8D4'
  },
  {
    id: 15,
    icon: '🍃',
    item: '拐枣',
    author: '@大维',
    content: '姑婆知道我爱吃拐枣。长大之后，我也只是每次回家的时候，去姑婆家遛一圈看看她，又或者是还没等我去看，她就已经提着个鼓鼓囊囊的袋子进了我家。到冬天的时候就经常是一大把曲里拐弯的拐枣，她知道我爱吃。她生病去世后的一年冬天，我先生下班回家带回来一小把拐枣。我一下子就想到了她。',
    color: '#FB923C'
  },
  {
    id: 16,
    icon: '🪞',
    item: '身份证',
    author: '@祁红梅',
    content: '爸爸的身份证，我一直带在身边，上大学、工作、租房子，到现在自己的家。',
    color: '#8B5CF6'
  },
  {
    id: 17,
    icon: '🗣️',
    item: '声音',
    author: '@张立平',
    content: '我说话的声音跟我爸爸一模一样。',
    color: '#F59E0B'
  },
  {
    id: 18,
    icon: '🪑',
    item: '木匠工具',
    author: '@松月',
    content: '我爷爷是老家很厉害的木匠，我的小板凳、书桌，都是爷爷给我做的。最想念的时候，其实是每年的冬天，刚到家门口就能看到爷爷，紧接着就会把我的手放进他的胳肢窝，一边放一边说冻着了吧。',
    color: '#FB923C'
  },
  {
    id: 19,
    icon: '🛵',
    item: '小电驴',
    author: '@松月',
    content: '2019 年 1 月末，有天晚上我突然梦到爷爷骑着他的小电驴来苏州看我。一周后我接到了父亲电话。爷爷走后的第 40 天，我又梦到一次，爷爷还是骑着他的小电驴找我，他带我又一起吃了顿饭，然后吃完骑着小电驴晃晃悠悠地走了。从那以后我就再也没有梦到过了，7 年啦。',
    color: '#8B5CF6'
  },
  {
    id: 20,
    icon: '🖐️',
    item: '小拇指',
    author: '@AAA',
    content: '我的爸爸在 2010 年离开了。我的小拇指是微微向内弯的，只有爸爸的手指是这样。看手的时候，我就常常想起他。后来我生了儿子，他的小拇指竟然也是弯的，甚至比我的弯得更厉害。基因好神奇，爸爸不在了，却陪伴我终生。我的儿子没见过姥爷，却有着跟姥爷同样的小拇指。',
    color: '#F59E0B'
  },
  {
    id: 21,
    icon: '👟',
    item: '39码的脚',
    author: '@正方体',
    content: '我的外婆，她不是什么大家闺秀，12 岁的时候偷偷把裹小脚的布撕碎，80 岁的时候，喝着雪碧，炫耀她的脚有39码。现在我的鞋码也是39码。挑鞋的时候看着我的大脚就会想起她。是的，我感谢我的大脚，我感谢我的外婆。',
    color: '#FB923C'
  },
  {
    id: 22,
    icon: '🍳',
    item: '芥蓝炒饭',
    author: '@小林',
    content: '我的外公，在 2020 年因为生病离开了我们。福州人爱吃糖酒芥蓝，我记得外公总是喜欢把芥蓝切得细细的。还有他做的蛋炒饭，总是喜欢在蛋加一点盐，再把蛋和饭混合均匀，再入锅翻炒，每一粒米饭都沾上蛋液，金黄金黄的。因为我在想念他，他活在我三餐四季的日常里，所以他从来没有离开过我。',
    color: '#8B5CF6'
  },
  {
    id: 23,
    icon: '🥬',
    item: '菠菜',
    author: '@速冻饺子',
    content: '我的姥姥在春天吃到菠菜时，我会想起她。她去世前，家里人把她接来城里过年，她一直惦记着自己小院里种的那一小片菠菜。结果她没等到开春，就去世了。在她葬礼结束后，我回到她的小屋子，在门前的院子里，见到了那一片菠菜，它们被塑料膜用心地盖着，熬过了那个冬天。绿油油的、生机勃勃的，就像她的爱一样。我很想她，一直都很想她。',
    color: '#F59E0B'
  },
  {
    id: 24,
    icon: '🪞',
    item: '蝴蝶',
    author: '@何大白白🥂',
    content: '我有很多习惯像她，也越长越像她。我经常在边做饭边收拾边拖地时想起她，因为她就是边做边拖。做饭会溅油出来，厨房地板就会脏，如果不边拖边做，就会把油踩到拖鞋上。厨房门口总是靠着个海绵拖把，这场景就会让我想起她。',
    color: '#FB923C'
  }
];

// Generate non-overlapping positions using a simple grid-based layout
const generateItemPositions = () => {
  const cols = 6;
  const rows = 4;
  const cellWidth = 80 / cols;
  const cellHeight = 80 / rows;
  
  return memoryItems.map((item, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    // Add small random offset within the cell to feel organic but not overlapping
    const offsetX = (Math.random() - 0.5) * 4;
    const offsetY = (Math.random() - 0.5) * 6;
    
    return {
      ...item,
      x: 10 + col * cellWidth + cellWidth / 2 + offsetX,
      y: 10 + row * cellHeight + cellHeight / 2 + offsetY,
      rotation: Math.random() * 20 - 10,
      delay: index * 0.05
    };
  });
};

export default function MemorySection() {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [itemPositions, setItemPositions] = useState<(MemoryItem & { x: number; y: number; rotation: number; delay: number })[]>([]);
  const [hoveredItem, setHoveredItem] = useState<(MemoryItem & { x: number; y: number }) | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isUnwrapped) {
      setItemPositions(generateItemPositions());
    }
  }, [isUnwrapped]);

  const handleItemHover = (item: MemoryItem & { x: number; y: number }) => {
    setHoveredItem(item);
  };

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-950/30 to-gray-900" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl mb-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
            PART 1
          </h2>
          <h3 className="font-heading text-3xl md:text-4xl text-white mb-6">
            思念 — TA的故事
          </h3>
          <p className="text-amber-400 text-xl font-heading italic">
            "当死亡能够被谈论，思念便获得语言。"
          </p>
        </div>

        {/* Story section */}
        <div className="mb-20">
          <h4 className="font-heading text-2xl text-amber-400 mb-8 text-center">
            思念起于何处
          </h4>
          
          {/* Interactive bundle */}
          <div className="relative min-h-[500px] flex items-center justify-center">
            {!isUnwrapped ? (
              /* Wrapped bundle */
              <motion.div
                className="cursor-pointer relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                onClick={() => setIsUnwrapped(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Bundle wrapper effect */}
                <motion.div
                  className="relative w-64 h-64"
                  animate={{ 
                    rotateY: [0, 10, -10, 0],
                    rotateX: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/30 via-purple-500/20 to-amber-500/30 blur-xl" />
                  
                  {/* Bundle */}
                  <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 shadow-2xl overflow-hidden">
                    {/* Wrapper pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                          <line x1="0" y1="0" x2="0" y2="10" stroke="#000" strokeWidth="2" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#stripes)" />
                      </svg>
                    </div>
                    
                    {/* Center ribbon */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-32 bg-amber-800 rounded-full shadow-lg" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amber-700 rounded-full shadow-lg flex items-center justify-center">
                        <span className="text-4xl">🎁</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Instruction */}
                <p className="text-center text-white/60 mt-8 text-sm animate-pulse">
                  点击打开记忆的包裹
                </p>
              </motion.div>
            ) : (
              /* Unwrapped items */
              <div 
                ref={containerRef}
                className="relative w-full min-h-[600px]"
              >
                {/* Scattered items with emergence animation */}
                <AnimatePresence>
                  {itemPositions.map((item) => (
                    <motion.div
                      key={item.id}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      initial={{ 
                        opacity: 0, 
                        scale: 0,
                        rotate: (item.rotation || 0) + 180,
                        y: -100
                      }}
                      animate={{ 
                        opacity: hoveredItem && hoveredItem.id !== item.id ? 0.3 : 1,
                        scale: hoveredItem && hoveredItem.id === item.id ? 1.3 : 1,
                        rotate: item.rotation || 0,
                        y: 0,
                        filter: hoveredItem && hoveredItem.id !== item.id ? 'blur(2px) brightness(0.5)' : 'blur(0) brightness(1)'
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        duration: 0.6,
                        delay: item.delay || 0,
                        type: "spring",
                        stiffness: 100
                      }}
                      onMouseEnter={() => handleItemHover(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleItemHover(item)}
                    >
                      {/* Item icon */}
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg backdrop-blur-sm border border-white/20 transition-shadow"
                        style={{ 
                          backgroundColor: `${item.color}40`,
                          boxShadow: hoveredItem && hoveredItem.id === item.id 
                            ? `0 0 30px ${item.color}, 0 0 60px ${item.color}80` 
                            : `0 0 10px ${item.color}40`
                        }}
                      >
                        {item.icon}
                      </div>
                      
                      {/* Item name */}
                      <p className="text-center text-white/80 text-xs mt-1 font-medium">
                        {item.item}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Floating note positioned near hovered item */}
                <AnimatePresence>
                  {hoveredItem && (
                    <motion.div
                      className="absolute z-50 pointer-events-none"
                      style={{
                        left: `${hoveredItem.x}%`,
                        top: `${hoveredItem.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Position the tooltip - if item is in right half, show tooltip on left; if in left half, show on right */}
                      <div 
                        className={`absolute ${
                          hoveredItem.x > 50 
                            ? 'right-full mr-4' 
                            : 'left-full ml-4'
                        } ${
                          hoveredItem.y > 60 
                            ? 'bottom-0' 
                            : hoveredItem.y < 40 
                            ? 'top-0' 
                            : 'top-1/2 -translate-y-1/2'
                        } w-72`}
                      >
                        <div 
                          className="p-5 rounded-2xl shadow-2xl"
                          style={{ 
                            backgroundColor: `${hoveredItem.color}30`,
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${hoveredItem.color}`,
                            boxShadow: `0 0 30px ${hoveredItem.color}80`
                          }}
                        >
                          {/* Author */}
                          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/20">
                            <span className="text-2xl">{hoveredItem.icon}</span>
                            <div>
                              <span className="text-white font-bold block">{hoveredItem.item}</span>
                              <span className="text-white/60 text-xs">{hoveredItem.author}</span>
                            </div>
                          </div>
                          <p className="text-white/95 text-sm leading-relaxed">
                            {hoveredItem.content}
                          </p>
                        </div>
                        
                        {/* Arrow pointing to item */}
                        <div 
                          className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent ${
                            hoveredItem.x > 50 
                              ? 'right-0 translate-x-full border-l-8' 
                              : 'left-0 -translate-x-full border-r-8'
                          }`}
                          style={{
                            borderLeftColor: hoveredItem.x > 50 ? hoveredItem.color : 'transparent',
                            borderRightColor: hoveredItem.x <= 50 ? hoveredItem.color : 'transparent',
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Instructions */}
                {itemPositions.length > 0 && !hoveredItem && (
                  <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <p className="text-white/50 text-sm">
                      悬停或点击物品查看故事
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reflection text */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-heading text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            私人的思念从一个人的味道、声音、习惯和陪伴开始，让我们看见死亡如何进入日常，凝结为记忆；
            当私人思念被说出，它便不再只属于一个人，擢升为一种公共的体验和记忆。
          </p>
        </motion.div>
      </div>
    </section>
  );
}