import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemorialMethod {
  method: string;
  ratio: number;
  scene: string;
  description: string;
}

const memorialMethods: MemorialMethod[] = [
  { method: "种一棵树", ratio: 0.36, scene: "tree", description: "让生命以另一种形式延续" },
  { method: "墓碑", ratio: 0.30, scene: "stone", description: "一块石头，刻下名字与岁月" },
  { method: "聚会", ratio: 0.29, scene: "gathering", description: "围坐在一起，让记忆在笑声中延续" },
  { method: "纪念长椅", ratio: 0.27, scene: "bench", description: "放一把长椅，让故事有了回响" },
  { method: "为慈善筹款", ratio: 0.26, scene: "charity", description: "把爱转化为行动" },
  { method: "纪念花园", ratio: 0.23, scene: "garden", description: "一片花香，这里住着未曾走远的人" },
  { method: "铭牌", ratio: 0.22, scene: "plaque", description: "一句话，让后人驻足凝望" },
  { method: "成立慈善机构", ratio: 0.13, scene: "institution", description: "用制度延续善意" },
  { method: "赞助动物", ratio: 0.11, scene: "animal", description: "毛茸茸的陪伴也是长久的纪念" },
  { method: "给星星命名", ratio: 0.11, scene: "star", description: "独属于你的坐标与光亮" }
];

const wrap = "rounded-xl border border-amber-400/40 bg-amber-500/15 px-4 py-2 text-amber-200 text-sm flex items-center gap-2 hover:bg-amber-500/25 active:scale-95 transition-all";

/* ============================================================
 * 种一棵树
 *   工具：🪏 铲子（挖坑） → 🌱 种子（放入） → 🪣 水桶（浇水）
 *   树的阶段：土地 → 种子 → 嫩芽 → 树苗 → 大树
 * ============================================================ */
const TreeScene = () => {
  const [dug, setDug] = useState(false);
  const [planted, setPlanted] = useState(false);
  const [waterCount, setWaterCount] = useState(0);
  const [signText, setSignText] = useState('');

  const growth = planted ? Math.min(4, 1 + waterCount) : 0;

  const treeEmoji = ['🕳️', '🌰', '🌱', '🌿', '🌳'][growth];

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full flex items-end justify-center">
        <div className="absolute bottom-0 w-64 h-6 bg-gradient-to-t from-amber-900/60 to-transparent rounded" />
        <motion.div
          key={growth}
          initial={{ scale: 0.6, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-8xl origin-bottom"
        >
          {treeEmoji}
        </motion.div>
        {growth >= 3 && signText && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-16 right-1/3 bg-amber-100 border-2 border-amber-700 text-amber-900 text-xs px-3 py-1 rounded shadow-md"
          >
            {signText}
          </motion.div>
        )}
        {planted && waterCount > 0 && (
          <>
            {[...Array(Math.min(waterCount, 6))].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-blue-300/70 text-xl"
                style={{ left: `${30 + i * 10}%`, top: '20%' }}
                animate={{ y: [0, 80], opacity: [1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              >
                💧
              </motion.div>
            ))}
          </>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => setDug(true)} disabled={dug} className={`${wrap} ${dug ? 'opacity-40' : ''}`}>
          <span className="text-lg">🪏</span> 挖一个坑
        </button>
        <button onClick={() => setPlanted(true)} disabled={!dug || planted} className={`${wrap} ${!dug || planted ? 'opacity-40' : ''}`}>
          <span className="text-lg">🌰</span> 放入种子
        </button>
        <button onClick={() => setWaterCount((n) => n + 1)} disabled={!planted} className={`${wrap} ${!planted ? 'opacity-40' : ''}`}>
          <span className="text-lg">🪣</span> 浇水
        </button>
      </div>

      {growth >= 3 && (
        <div className="w-full max-w-md flex gap-2">
          <input
            value={signText}
            onChange={(e) => setSignText(e.target.value)}
            placeholder="给木牌题字..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40"
          />
          <button onClick={() => setSignText((t) => t)} className={wrap}>
            <span className="text-lg">🪧</span> 挂上
          </button>
        </div>
      )}

      <p className="text-white/60 text-xs">
        {growth === 0 && '等待你开始'}
        {growth === 1 && '种子已经入土'}
        {growth === 2 && '冒出了一点嫩芽'}
        {growth === 3 && '小树苗在长大'}
        {growth === 4 && '🌳 它成了一棵树'}
      </p>
    </div>
  );
};

/* ============================================================
 * 墓碑
 *   工具：🔨 凿子（刻字） 🕯️ 点蜡烛 🌸 献花
 *   状态：基座 → 刻上墓志铭 → 烛光 → 鲜花
 * ============================================================ */
const StoneScene = () => {
  const [engraved, setEngraved] = useState('');
  const [candle, setCandle] = useState(false);
  const [flowers, setFlowers] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full flex items-end justify-center">
        <div className="relative flex flex-col items-center">
          <div className="w-44 bg-gradient-to-b from-stone-300 to-stone-500 rounded-t-3xl border border-stone-700 px-4 py-8 shadow-lg">
            <div className="text-center text-stone-800 font-serif">
              <div className="text-3xl mb-2">✝</div>
              <p className="text-sm whitespace-pre-line leading-relaxed">
                {engraved || '此处长眠着\n一位被深爱过的人'}
              </p>
            </div>
          </div>
          <div className="w-52 h-4 bg-gradient-to-t from-stone-700 to-stone-500 rounded-b" />
          {candle && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl"
            >
              🕯️
            </motion.div>
          )}
          {[...Array(flowers)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute text-2xl"
              style={{ left: `${-20 + i * 15}px`, bottom: -8 }}
            >
              🌸
            </motion.div>
          ))}
          <motion.div
            className="absolute -inset-6 rounded-full bg-amber-500/10 blur-2xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </div>

      <div className="w-full max-w-md">
        <textarea
          value={engraved}
          onChange={(e) => setEngraved(e.target.value)}
          placeholder="刻下一段墓志铭..."
          rows={2}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 resize-none"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => setCandle(!candle)} className={wrap}>
          <span className="text-lg">{candle ? '🕯️' : '🕯️'}</span> {candle ? '熄灭蜡烛' : '点亮蜡烛'}
        </button>
        <button onClick={() => setFlowers((n) => Math.min(n + 1, 6))} className={wrap}>
          <span className="text-lg">🌸</span> 献一束花
        </button>
      </div>
    </div>
  );
};

/* ============================================================
 * 聚会
 *   工具：🕯️ 点蜡烛 🥂 举杯 📷 添加回忆
 *   状态：把每条用户回忆变成贴在桌上的卡片
 * ============================================================ */
const GatheringScene = () => {
  const [candles, setCandles] = useState(0);
  const [cheers, setCheers] = useState(0);
  const [memories, setMemories] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addMemory = () => {
    if (input.trim()) {
      setMemories((m) => [...m, input.trim()]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full flex items-end justify-center">
        <div className="absolute bottom-2 w-72 h-12 bg-gradient-to-t from-amber-700 to-amber-800 rounded-md border border-amber-900/50" />
        <div className="absolute bottom-12 w-60 h-2 bg-amber-900/30 rounded" />
        <div className="flex items-end gap-4 z-10 pb-4">
          {['👨', '👩', '🧑', '👵', '👴'].map((e, i) => (
            <motion.div
              key={i}
              className="text-5xl"
              animate={cheers > 0 ? { y: [0, -20, 0], rotate: [0, -10, 0] } : { y: [0, -3, 0] }}
              transition={{ duration: cheers > 0 ? 0.8 : 2 + i * 0.2, repeat: Infinity }}
            >
              {e}
            </motion.div>
          ))}
        </div>
        {/* 桌上的小卡片 */}
        {memories.slice(-3).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, rotate: -8 + i * 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bg-pink-100 text-pink-900 text-xs px-2 py-1 rounded shadow max-w-[100px] truncate"
            style={{ left: `${20 + i * 25}%`, bottom: 70 }}
          >
            📷 {m}
          </motion.div>
        ))}
        {/* 桌上的蜡烛 */}
        {[...Array(Math.min(candles, 3))].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute text-xl"
            style={{ left: `${30 + i * 20}%`, bottom: 50 }}
          >
            🕯️
          </motion.div>
        ))}
        <motion.div
          className="absolute -inset-6 rounded-full bg-pink-500/10 blur-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="w-full max-w-md flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addMemory()}
          placeholder="一段想让聚会讲的回忆..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40"
        />
        <button onClick={addMemory} className={wrap}>
          <span className="text-lg">📷</span> 添加
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => setCandles((n) => Math.min(n + 1, 3))} className={wrap}>
          <span className="text-lg">🕯️</span> 添一支蜡烛
        </button>
        <button onClick={() => setCheers((n) => n + 1)} className={wrap}>
          <span className="text-lg">🥂</span> 举杯
        </button>
      </div>
    </div>
  );
};

/* ============================================================
 * 纪念长椅
 *   工具：🪑 摆放长椅 🔧 装铭牌 🌷 摆放鲜花
 * ============================================================ */
const BenchVisual = ({ size = 7 }: { size?: number }) => {
  const s = size === 7 ? 160 : 32;
  const base = `text-transparent`;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 36 36"
      className={base}
      style={size === 7 ? { width: '7rem', height: '7rem' } : undefined}
    >
      {/* 地面阴影 */}
      <ellipse cx="18" cy="32" rx="14" ry="2" fill="#000" opacity="0.15" />
      {/* 左腿 */}
      <path d="M9 24 L9 30" stroke="#8b5e3c" strokeWidth="2.5" strokeLinecap="round" />
      {/* 右腿 */}
      <path d="M27 24 L27 30" stroke="#8b5e3c" strokeWidth="2.5" strokeLinecap="round" />
      {/* 座板 */}
      <rect x="7" y="20" width="22" height="3.5" rx="1" fill="#d4a373" />
      {/* 靠背 */}
      <rect x="8" y="12" width="20" height="3" rx="1" fill="#d4a373" />
      <path d="M9 12 L9 17" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 12 L27 17" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
      {/* 扶手 */}
      <path d="M7 20 L7 17 L9 17" stroke="#8b5e3c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 20 L29 17 L27 17" stroke="#8b5e3c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const BenchScene = () => {
  const [placed, setPlaced] = useState(false);
  const [inscription, setInscription] = useState('');
  const [flowers, setFlowers] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full flex items-end justify-center">
        <div className="relative">
          {!placed ? (
            <div className="opacity-30">
              <BenchVisual />
            </div>
          ) : (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <BenchVisual />
                {inscription && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 left-1/2 -translate-x-1/2 bg-amber-200 border border-amber-700 text-amber-900 text-[10px] px-1 py-0.5 rounded whitespace-nowrap"
                  >
                    {inscription}
                  </motion.div>
                )}
              </div>
              <div className="w-56 h-2 bg-green-900/30 rounded mt-1" />
            </motion.div>
          )}
          {/* 鲜花在脚下 */}
          {[...Array(Math.min(flowers, 4))].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              className="absolute text-3xl"
              style={{ left: `${-30 + i * 25}px`, bottom: -10 }}
            >
              🌷
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => setPlaced(true)} disabled={placed} className={`${wrap} ${placed ? 'opacity-40' : ''}`}>
          <span className="text-lg">🪑</span> 摆放长椅
        </button>
        <button onClick={() => setFlowers((n) => Math.min(n + 1, 4))} disabled={!placed} className={`${wrap} ${!placed ? 'opacity-40' : ''}`}>
          <span className="text-lg">🌷</span> 摆一束花
        </button>
      </div>

      {placed && (
        <div className="w-full max-w-md flex gap-2">
          <input
            value={inscription}
            onChange={(e) => setInscription(e.target.value)}
            placeholder="给长椅题字..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40"
          />
          <button onClick={() => setInscription((t) => t)} className={wrap}>
            <span className="text-lg">🔧</span> 装上
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================
 * 为慈善筹款
 *   工具：💵 投入钞票 📝 写下募捐说明
 *   状态：筹款金额增长 → 心形升起
 * ============================================================ */
const CharityScene = () => {
  const [amount, setAmount] = useState(0);
  const [purpose, setPurpose] = useState('');
  const goal = 1000;

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full flex items-end justify-center">
        <div className="relative flex flex-col items-center">
          <motion.div
            className="text-7xl"
            animate={{ scale: amount > 0 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💝
          </motion.div>
          <div className="mt-3 w-44 h-3 bg-pink-900/40 rounded-full overflow-hidden border border-pink-300/30">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
              animate={{ width: `${Math.min(amount / goal * 100, 100)}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <p className="text-pink-200 text-sm mt-2">¥ {amount} / {goal}</p>
          {purpose && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -right-44 top-2 bg-white/90 text-pink-900 text-xs px-3 py-2 rounded shadow-md max-w-[160px]"
            >
              📝 {purpose}
            </motion.div>
          )}
          {[...Array(Math.min(amount / 200, 8))].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400 text-xl"
              style={{ left: `${-40 + i * 12}px`, top: 0 }}
              animate={{ y: [-20, -120], opacity: [1, 0], scale: [1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            >
              ♥
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md">
        <input
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="这次筹款想帮助谁..."
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => setAmount((n) => n + 100)} className={wrap}>
          <span className="text-lg">💵</span> 投入 ¥100
        </button>
        <button onClick={() => setAmount((n) => n + 500)} className={wrap}>
          <span className="text-lg">💴</span> 投入 ¥500
        </button>
        <button onClick={() => setAmount(0)} className={wrap}>
          清零
        </button>
      </div>
    </div>
  );
};

/* ============================================================
 * 纪念花园
 *   工具：🌼 种一棵菊花 🪣 浇花 🪧 木牌
 *   状态：每棵菊花有名字
 * ============================================================ */
const GardenScene = () => {
  const [flowers, setFlowers] = useState<{ id: number; name: string; watered: number }[]>([
    { id: 1, name: '', watered: 1 },
    { id: 2, name: '', watered: 0 }
  ]);
  const [newName, setNewName] = useState('');
  const idRef = useRef(3);

  const addFlower = () => {
    setFlowers((f) => [...f, { id: idRef.current++, name: newName || '思念', watered: 0 }]);
    setNewName('');
  };

  const water = (id: number) =>
    setFlowers((f) => f.map((x) => (x.id === id ? { ...x, watered: Math.min(x.watered + 1, 3) } : x)));

  const rename = (id: number, n: string) =>
    setFlowers((f) => f.map((x) => (x.id === id ? { ...x, name: n } : x)));

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full">
        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-green-900/60 to-transparent rounded" />
        <div className="absolute bottom-2 left-0 right-0 flex items-end justify-around px-6">
          {flowers.map((f) => {
            const size = ['🌱', '🌼', '🌻', '🌻'][f.watered];
            return (
              <motion.div
                key={f.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="text-5xl">{size}</div>
                {f.watered > 0 && (
                  <input
                    value={f.name}
                    onChange={(e) => rename(f.id, e.target.value)}
                    placeholder="名字..."
                    className="mt-1 w-20 bg-transparent border-b border-amber-300/50 text-amber-200 text-xs text-center placeholder-white/30 focus:outline-none"
                  />
                )}
                <button onClick={() => water(f.id)} className="text-xs text-blue-300 hover:text-blue-200 mt-1">
                  💧 水
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-md flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="给下一朵菊花起个名..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40"
        />
        <button onClick={addFlower} className={wrap}>
          <span className="text-lg">🌼</span> 栽种
        </button>
      </div>

      <p className="text-white/60 text-xs">黄菊数：{flowers.length} · 点击 💧 给花浇水，它会慢慢长大</p>
    </div>
  );
};

/* ============================================================
 * 铭牌 —— 方形银色 SVG 牌子
 *   工具：🪞 抛光 ✏️ 刻字
 * ============================================================ */
const PlaqueScene = () => {
  const [text, setText] = useState('');
  const [polished, setPolished] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: polished ? [0, -2, 2, 0] : 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <svg width="180" height="180" viewBox="0 0 180 180" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f3f4f6" />
                <stop offset="40%" stopColor="#cbd5e1" />
                <stop offset="60%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="silverRim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
            {/* 外框 */}
            <rect x="6" y="6" width="168" height="168" rx="8" fill="url(#silverRim)" />
            {/* 铭牌主体 */}
            <rect x="14" y="14" width="152" height="152" rx="4" fill="url(#silver)" />
            {/* 装饰内框 */}
            <rect
              x="22"
              y="22"
              width="136"
              height="136"
              rx="2"
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
              strokeDasharray="2 2"
            />
            {/* 顶部装饰条 */}
            <rect x="40" y="32" width="100" height="2" fill="#475569" opacity="0.6" />
            <rect x="40" y="146" width="100" height="2" fill="#475569" opacity="0.6" />
            {/* 中间高光 */}
            <rect x="0" y="0" width="180" height="180" rx="8" fill="white" opacity="0.05" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <p className="text-slate-800 text-sm font-serif text-center leading-relaxed">
              {text || '铭 待 刻'}
            </p>
          </div>
          {polished && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent via-white to-transparent"
            />
          )}
        </motion.div>
      </div>

      <div className="w-full max-w-md">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="刻下你想被记住的一句话..."
          rows={2}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 resize-none"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => setPolished(true)} className={wrap}>
          <span className="text-lg">🪞</span> 抛光铭牌
        </button>
      </div>
    </div>
  );
};

/* ============================================================
 * 成立慈善机构
 *   工具：📜 拟定章程 ✍️ 签字
 * ============================================================ */
const InstitutionScene = () => {
  const [name, setName] = useState('');
  const [signed, setSigned] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-56 bg-gradient-to-b from-amber-50 to-amber-100 p-4 rounded shadow-xl border-l-4 border-amber-700"
          >
            <div className="flex items-center justify-center mb-2 text-2xl">📜</div>
            <p className="text-center text-amber-900 text-xs font-serif mb-2">
              慈善机构章程
            </p>
            <p className="text-amber-800 text-xs leading-relaxed">
              名称：{name || '暂未命名'}
            </p>
            <p className="text-amber-800 text-xs leading-relaxed">
              使命：延续那份爱
            </p>
            {signed && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                className="mt-3 text-center"
              >
                <span className="inline-block px-3 py-1 border-2 border-red-700 text-red-700 rounded font-serif text-sm">
                  ✍ 已签署
                </span>
              </motion.div>
            )}
          </motion.div>
          <div className="absolute -top-8 left-4 right-4 h-2 bg-amber-300/30 rounded" />
        </div>
      </div>

      <div className="w-full max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="为机构起个名字..."
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => setSigned(true)} disabled={!name} className={`${wrap} ${!name ? 'opacity-40' : ''}`}>
          <span className="text-lg">✍️</span> 签署章程
        </button>
      </div>
    </div>
  );
};

/* ============================================================
 * 赞助动物
 *   工具：🦴 喂食 🎀 取名 🐾 抚摸
 * ============================================================ */
const AnimalScene = () => {
  const [fed, setFed] = useState(0);
  const [petted, setPetted] = useState(0);
  const [name, setName] = useState('');

  const mood = Math.min(fed + petted, 6);
  const petEmoji = ['😿', '🙀', '😺', '😸', '😻', '🥰'][Math.min(mood, 5)];

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full flex items-end justify-center">
        <div className="absolute bottom-0 w-64 h-3 bg-green-900/30 rounded" />
        <div className="relative flex flex-col items-center">
          <motion.div
            key={petEmoji + mood}
            initial={{ scale: 0.6, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-8xl"
          >
            {petEmoji}
          </motion.div>
          {name && (
            <div className="mt-1 px-3 py-1 bg-pink-100 text-pink-900 text-sm rounded-full">
              {name}
            </div>
          )}
          {mood > 3 && (
            <motion.div
              className="absolute -top-4 text-2xl"
              animate={{ y: [0, -20], opacity: [1, 0], rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.div>
          )}
        </div>
      </div>

      <div className="w-full max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="给它起个名字..."
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => setFed((n) => n + 1)} className={wrap}>
          <span className="text-lg">🦴</span> 喂食
        </button>
        <button onClick={() => setPetted((n) => n + 1)} className={wrap}>
          <span className="text-lg">🐾</span> 抚摸
        </button>
      </div>
      <p className="text-white/60 text-xs">心情指数：{mood}/6 · 多陪陪它</p>
    </div>
  );
};

/* ============================================================
 * 给星星命名
 *   工具：🔭 望远镜寻找 ✍️ 命名 🌠 许愿
 * ============================================================ */
const StarScene = () => {
  const [found, setFound] = useState(false);
  const [name, setName] = useState('');
  const [wished, setWished] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {found ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="text-7xl">⭐</div>
              {name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-amber-300 text-amber-900 text-xs px-2 py-1 rounded whitespace-nowrap font-medium"
                >
                  {name}
                </motion.div>
              )}
              {wished && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-pink-200 text-xs whitespace-nowrap"
                >
                  🌠 许愿：愿你一切安好
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div className="text-6xl opacity-30">🔭</div>
          )}
        </div>
      </div>

      <div className="w-full max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="为这颗星起个名字..."
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => setFound(true)} disabled={found} className={`${wrap} ${found ? 'opacity-40' : ''}`}>
          <span className="text-lg">🔭</span> 寻找那颗星
        </button>
        <button onClick={() => setWished(true)} disabled={!found} className={`${wrap} ${!found ? 'opacity-40' : ''}`}>
          <span className="text-lg">🌠</span> 许愿
        </button>
      </div>
    </div>
  );
};

const SceneRenderer = ({ scene }: { scene: string }) => {
  switch (scene) {
    case 'tree': return <TreeScene />;
    case 'stone': return <StoneScene />;
    case 'gathering': return <GatheringScene />;
    case 'bench': return <BenchScene />;
    case 'charity': return <CharityScene />;
    case 'garden': return <GardenScene />;
    case 'plaque': return <PlaqueScene />;
    case 'institution': return <InstitutionScene />;
    case 'animal': return <AnimalScene />;
    case 'star': return <StarScene />;
    default: return null;
  }
};

export default function MemorialExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeMethod = memorialMethods[activeIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % memorialMethods.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  }, []);

  const icons = ['🌱', '🪦', '🧑‍🤝‍🧑', null, '💝', '🌼', null, '🏛️', '🐾', '⭐'];

  const BenchIcon = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" className="mx-auto">
      <rect x="4" y="12" width="28" height="3" rx="1" fill="#d4a373" />
      <rect x="4" y="18" width="28" height="3" rx="1" fill="#d4a373" />
      <rect x="6" y="21" width="2" height="6" rx="0.5" fill="#8b5e3c" />
      <rect x="28" y="21" width="2" height="6" rx="0.5" fill="#8b5e3c" />
      <rect x="10" y="21" width="2" height="6" rx="0.5" fill="#8b5e3c" />
      <rect x="24" y="21" width="2" height="6" rx="0.5" fill="#8b5e3c" />
    </svg>
  );

  const SilverPlaqueIcon = ({ active }: { active: boolean }) => (
    <svg width="36" height="36" viewBox="0 0 36 36" className="mx-auto">
      <defs>
        <linearGradient id={`silver-${active}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="40%" stopColor="#cbd5e1" />
          <stop offset="60%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id={`silverRim-${active}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="30" height="30" rx="3" fill={`url(#silverRim-${active})`} />
      <rect x="5" y="5" width="26" height="26" rx="2" fill={`url(#silver-${active})`} />
      <rect x="8" y="8" width="20" height="20" rx="1" fill="none" stroke="#64748b" strokeWidth="0.3" strokeDasharray="1 1" />
    </svg>
  );

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-950/30 to-gray-900" />

      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
            initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: [null, `${Math.random() * 100}%`] }}
            transition={{ duration: 4 + Math.random() * 4, delay: Math.random() * 4, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl text-amber-400 mb-4">
            纪念的方式
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            选一个场景，动手布置它，写下你想说的话
          </p>
        </motion.div>

        <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-12 mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMethod.scene}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <SceneRenderer scene={activeMethod.scene} />
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 text-center">
            <h3 className="font-heading text-2xl md:text-3xl text-white/90 mb-2">
              {activeMethod.method}
            </h3>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-amber-400 font-display text-3xl md:text-4xl">
                {(activeMethod.ratio * 100).toFixed(0)}%
              </span>
              <span className="text-white/60 text-sm">的人选择这种方式</span>
            </div>
            <p className="text-white/70 text-base italic">"{activeMethod.description}"</p>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {memorialMethods.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === activeIndex ? 'w-10 bg-amber-400' : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {memorialMethods.map((m, index) => (
            <motion.button
              key={m.method}
              onClick={() => handleSelect(index)}
              className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-amber-500/20 border-2 border-amber-400/50 scale-105'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              {index === 3 ? (
                <BenchIcon />
              ) : index === 6 ? (
                <SilverPlaqueIcon active={index === activeIndex} />
              ) : (
                <div className="text-3xl md:text-4xl mb-1">{icons[index]}</div>
              )}
              <p className={`text-xs md:text-sm font-medium ${index === activeIndex ? 'text-amber-400' : 'text-white/80'}`}>
                {m.method}
              </p>
              <p className="text-white/50 text-xs mt-1">{(m.ratio * 100).toFixed(0)}%</p>
            </motion.button>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-heading text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            每一种纪念方式，都是生者与逝者之间的一座桥。<br />
            桥的这一端是思念，桥的那一端是记忆。<br />
            只要你还在布置，他们就还在。
          </p>
        </motion.div>
      </div>
    </div>
  );
}
