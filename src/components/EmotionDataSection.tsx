import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

// ─── Data ───────────────────────────────────────────────────────────────────

const objectData = [
  { name: '母亲', mentions: 5595, textCount: 1789, category: 'family' },
  { name: '父亲', mentions: 3158, textCount: 1234, category: 'family' },
  { name: '兄弟姐妹', mentions: 2867, textCount: 1018, category: 'family' },
  { name: '爷爷', mentions: 2737, textCount: 830, category: 'family' },
  { name: '奶奶', mentions: 2719, textCount: 870, category: 'family' },
  { name: '宠物-狗', mentions: 2607, textCount: 550, category: 'pet' },
  { name: '宠物-猫', mentions: 2418, textCount: 592, category: 'pet' },
  { name: '外婆/姥姥', mentions: 2149, textCount: 650, category: 'family' },
  { name: '孩子/子女', mentions: 2019, textCount: 984, category: 'family' },
  { name: '外公/姥爷', mentions: 1939, textCount: 569, category: 'family' },
  { name: '朋友/网友', mentions: 1687, textCount: 948, category: 'friend' },
  { name: '宠物-其他', mentions: 1001, textCount: 450, category: 'pet' },
  { name: '叔伯舅姨姑', mentions: 953, textCount: 437, category: 'family' },
  { name: '恋人/伴侣', mentions: 819, textCount: 467, category: 'family' },
  { name: '同学/同桌', mentions: 652, textCount: 393, category: 'friend' },
  { name: '老师', mentions: 651, textCount: 352, category: 'friend' },
];

const emotionData = [
  { name: '悲伤/思念', value: 28.3, count: 2427, color: '#8B5CF6' },
  { name: '怀念/叙述', value: 21.3, count: 1825, color: '#A78BFA' },
  { name: '情绪不明/叙事', value: 15.9, count: 1367, color: '#6B7280' },
  { name: '希望/祝福/释然', value: 15.7, count: 1350, color: '#F59E0B' },
  { name: '愤怒/怨恨', value: 3.8, count: 326, color: '#EF4444' },
  { name: '感恩/爱意', value: 3.7, count: 316, color: '#F9A8D4' },
  { name: '遗憾/未竟', value: 3.4, count: 292, color: '#FB923C' },
  { name: '孤独/无助', value: 2.7, count: 231, color: '#9CA3AF' },
  { name: '愧疚/自责', value: 2.4, count: 210, color: '#FCD34D' },
  { name: '恐惧/焦虑', value: 1.9, count: 161, color: '#DC2626' },
  { name: '震惊/难以接受', value: 0.7, count: 61, color: '#EC4899' },
  { name: '麻木/压抑', value: 0.3, count: 22, color: '#374151' },
];

// 对象 × 情感交叉数据（标准化：每行归一化为百分比）
const heatmapRaw = [
  { name: '母亲',    sadness: 707, recall: 608, hope: 175, anger: 63,  love: 40,  regret: 44, lonely: 20, guilt: 43, fear: 35 },
  { name: '父亲',    sadness: 480, recall: 439, hope: 110, anger: 55,  love: 23,  regret: 31, lonely: 12, guilt: 34, fear: 19 },
  { name: '兄弟姐妹', sadness: 370, recall: 364, hope: 109, anger: 33,  love: 36,  regret: 26, lonely: 19, guilt: 18, fear: 18 },
  { name: '孩子/子女',sadness: 364, recall: 348, hope: 115, anger: 39,  love: 39,  regret: 21, lonely: 15, guilt: 16, fear: 12 },
  { name: '朋友/网友',sadness: 336, recall: 294, hope: 124, anger: 29,  love: 44,  regret: 36, lonely: 17, guilt: 19, fear: 14 },
  { name: '奶奶',    sadness: 349, recall: 335, hope: 64,  anger: 20,  love: 25,  regret: 23, lonely: 11, guilt: 17, fear: 10 },
  { name: '爷爷',    sadness: 320, recall: 325, hope: 51,  anger: 22,  love: 16,  regret: 28, lonely: 12, guilt: 15, fear: 14 },
  { name: '宠物-狗', sadness: 182, recall: 162, hope: 84,  anger: 18,  love: 23,  regret: 18, lonely: 8,  guilt: 18, fear: 4  },
  { name: '宠物-猫', sadness: 185, recall: 148, hope: 105, anger: 22,  love: 37,  regret: 23, lonely: 12, guilt: 26, fear: 11 },
];

const emotionKeys = ['sadness', 'recall', 'hope', 'anger', 'love', 'regret', 'lonely', 'guilt', 'fear'] as const;
const emotionLabelMap: Record<string, string> = {
  sadness: '悲伤', recall: '怀念', hope: '希望', anger: '愤怒',
  love: '感恩', regret: '遗憾', lonely: '孤独', guilt: '愧疚', fear: '恐惧',
};

const emotionHeatmapColors = ['#1e1b4b', '#312e81', '#4338ca', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#eef2ff'];

// Raw text word cloud data (generated from 投稿文本-无评论.txt)
import wordCloudRaw from '../data/wordcloud.json';

// ─── Helpers ────────────────────────────────────────────────────────────────

function getCategoryColor(cat: string) {
  if (cat === 'pet') return '#F59E0B';
  if (cat === 'friend') return '#8B5CF6';
  return '#A78BFA';
}

function normalizeRow(row: typeof heatmapRaw[0]) {
  const total = emotionKeys.reduce((s, k) => s + (row[k] as number), 0);
  return { ...row, total, norm: Object.fromEntries(emotionKeys.map(k => [k, total > 0 ? (row[k] as number) / total : 0])) };
}

const normalizedHeatmap = heatmapRaw.map(normalizeRow);

// ─── Custom Tooltip ─────────────────────────────────────────────────────────

const tooltipStyle = {
  backgroundColor: 'rgba(26, 16, 37, 0.95)',
  border: '1px solid rgba(167, 139, 250, 0.3)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: '#E2D9F3',
  fontSize: '13px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
};

// ─── Section ────────────────────────────────────────────────────────────────

export default function EmotionDataSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: '思念对象', sub: '谁在被记住' },
    { label: '情感分布', sub: '如何被感受' },
    { label: '主题标签', sub: '说了些什么' },
    { label: '对象×情感', sub: '谁承载什么' },
  ];

  return (
    <section ref={ref} className="relative min-h-screen py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1025] via-[#231630] to-[#1a1025]" />
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
                          radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)`,
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section header — match "思念起于何处" style */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
            思念说与何人
          </h2>
          <p className="text-amber-100/60 text-base max-w-xl mx-auto">
            每天约有15万人死去，但大多数的死亡悄无声息。社交媒体让普通人有了被看见的可能。
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex gap-1 bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 border border-white/10">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-amber-500/20 text-amber-300 shadow-inner'
                    : 'text-amber-100/50 hover:text-amber-100/80 hover:bg-white/5'
                }`}
              >
                <span className="block text-base font-heading">{tab.label}</span>
                <span className="block text-xs opacity-60">{tab.sub}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Tab 0: 思念对象 ─────────────────────────────── */}
        {activeTab === 0 && (
          <motion.div
            key="tab0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <ResponsiveContainer width="100%" height={520}>
                <BarChart
                  data={objectData}
                  layout="vertical"
                  margin={{ top: 0, right: 40, bottom: 0, left: 20 }}
                >
                  <XAxis type="number" stroke="#A78BFA" fontSize={11} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#A78BFA"
                    fontSize={13}
                    width={80}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar
                    dataKey="mentions"
                    radius={[0, 6, 6, 0]}
                    maxBarSize={28}
                    label={{
                      position: 'right',
                      content: (({ x, y, width, value }: { x: number; y: number; width: number; value: number }) => (
                        <text x={x + width + 4} y={y + 10} fill="#A78BFA" fontSize={11} textAnchor="start">
                          {(value as number).toLocaleString()}
                        </text>
                      )) as any,
                    }}
                  >
                    {objectData.map((entry) => (
                      <Cell key={entry.name} fill={getCategoryColor(entry.category)} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#A78BFA]" /> 家人
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" /> 宠物
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#8B5CF6]" /> 朋友/其他
                </span>
              </div>
            </div>

            <p className="text-center text-amber-100/40 text-sm mt-6">
              母亲（5595次）、父亲（3158次）、祖父母占据提及量前列；宠物（猫/狗）紧随其后，超越多数亲属类别
            </p>
          </motion.div>
        )}

        {/* ── Tab 1: 情感分布 ─────────────────────────────── */}
        {activeTab === 1 && (
          <motion.div
            key="tab1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Donut chart */}
                <div className="flex-shrink-0">
                  <ResponsiveContainer width={300} height={300}>
                    <PieChart>
                      <Pie
                        data={emotionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {emotionData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ ...tooltipStyle, color: '#FAF3E0' }}
                        formatter={(v: number, name: string, props: { payload?: { count: number } }) => [
                          <span key="v" style={{ color: '#FAF3E0' }}>{v}%</span>,
                          <span key="n" style={{ color: '#FAF3E0' }}>{name}</span>,
                          <span key="c" style={{ color: '#FAF3E0', fontSize: '11px' }}>{props.payload?.count} 条文本</span>,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Emotion list */}
                <div className="flex-1 w-full space-y-2">
                  {emotionData.map((em) => (
                    <div key={em.name} className="flex items-center gap-3 group cursor-default">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: em.color }}
                      />
                      <span className="text-amber-100/80 text-sm w-36 flex-shrink-0">{em.name}</span>
                      <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: em.color }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${em.value * 2}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-amber-100/60 text-xs w-12 text-right">{em.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-amber-100/40 text-sm mt-6">
              悲伤与思念（28.3%）是绝对主导，但希望/祝福（15.7%）同样显著，哀悼是复合情感
            </p>
          </motion.div>
        )}

        {/* ── Tab 2: 主题标签词云 ───────────────────────── */}
        {activeTab === 2 && (
          <motion.div
            key="tab2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 min-h-[420px] flex items-center justify-center">
              <WordCloud data={wordCloudRaw} />
            </div>

            <p className="text-center text-amber-100/40 text-sm mt-6">
              基于原始投稿文本的词频分析，词越大表示在文本中出现越频繁
            </p>
          </motion.div>
        )}

        {/* ── Tab 3: 对象×情感热力图 ─────────────────────── */}
        {activeTab === 3 && (
          <motion.div
            key="tab3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{ minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th className="text-left text-amber-100/60 pb-3 pr-4 font-normal w-28">对象</th>
                      {emotionKeys.map((k) => (
                        <th key={k} className="text-center text-amber-100/60 pb-3 px-1 font-normal">
                          {emotionLabelMap[k]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {normalizedHeatmap.map((row) => (
                      <tr key={row.name} className="group">
                        <td className="py-1.5 pr-4 text-amber-100/80 font-medium">{row.name}</td>
                        {emotionKeys.map((k) => {
                          const norm = row.norm[k] as number;
                          const idx = Math.min(8, Math.floor(norm * 9));
                          return (
                            <td key={k} className="px-1 py-1.5 text-center">
                              <div
                                className="rounded-md px-1 py-1.5 transition-all duration-200 group-hover:ring-1 group-hover:ring-amber-500/40 cursor-default"
                                style={{ backgroundColor: emotionHeatmapColors[idx] }}
                                title={`${emotionLabelMap[k]}: ${row[k]} 条`}
                              >
                                <span className={norm > 0.3 ? 'text-white' : norm > 0.1 ? 'text-white/80' : 'text-white/40'}>
                                  {norm > 0.02 ? `${(norm * 100).toFixed(0)}%` : ''}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Color scale */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="text-amber-100/40 text-xs">低</span>
                <div className="flex gap-0.5">
                  {emotionHeatmapColors.map((c) => (
                    <div key={c} className="w-6 h-3 rounded-sm" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span className="text-amber-100/40 text-xs">高</span>
              </div>
            </div>

            <p className="text-center text-amber-100/40 text-sm mt-6">
              每行已归一化；颜色越深，该对象承载此类情感的文本比例越高
            </p>
          </motion.div>
        )}

        {/* Closing narrative */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-block max-w-2xl">
            <p className="text-amber-50/80 text-lg leading-relaxed font-heading">
              一种私人化的体验，借由讲述，变为公共记忆。
            </p>
            <p className="text-amber-100/50 text-sm mt-4">
              数据来源：微博账号 @腐爛的你听得见吗 投稿文本分析
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── WordCloud ───────────────────────────────────────────────────────────────

interface WordItem {
  name: string;
  value: number;
}

interface PlacedWord {
  word: WordItem;
  x: number;
  y: number;
  fontSize: number;
  color: string;
}

// Spiral collision-based layout — words pack around each other without overlap,
// spreading from the center outward in all directions.
function layoutCloud(
  words: WordItem[],
  canvasW: number,
  canvasH: number,
): PlacedWord[] {
  const max = Math.max(...words.map((w) => w.value));
  const min = Math.min(...words.map((w) => w.value));
  const palette = ['#FAF3E0', '#FCD34D', '#F59E0B', '#D97706', '#A78BFA'];

  // Sort largest first so they claim center positions first
  const sorted = [...words].sort((a, b) => b.value - a.value);

  const placed: PlacedWord[] = [];

  // Pixel-per-em lookup for Chinese font width estimation
  function estimateWidth(fontSize: number, name: string) {
    return name.length * fontSize * 0.9;
  }

  for (const word of sorted) {
    const norm = max === min ? 0.5 : (word.value - min) / (max - min);
    const fontSize = 12 + norm * 28;
    const w = estimateWidth(fontSize, word.name);
    const h = fontSize * 1.3;
    const color = palette[Math.min(palette.length - 1, Math.floor(norm * palette.length))];

    let placedFlag = false;

    // Spiral outward from center
    let angle = 0;
    let radius = 0;
    const STEP = 2;
    const MAX_ITER = 800;

    for (let iter = 0; iter < MAX_ITER; iter++) {
      const cx = canvasW / 2 + Math.cos(angle) * radius - w / 2;
      const cy = canvasH / 2 + Math.sin(angle) * radius - h / 2;

      // Clamp to canvas bounds
      const px = Math.max(0, Math.min(canvasW - w, cx));
      const py = Math.max(0, Math.min(canvasH - h, cy));

      // Check AABB collision with all placed words (with 1px padding)
      const collides = placed.some((p) => {
        const pw = estimateWidth(p.fontSize, p.word.name);
        const ph = p.fontSize * 1.3;
        const pad = 1;
        return px < p.x + pw + pad && px + w + pad > p.x && py < p.y + ph + pad && py + h + pad > p.y;
      });

      if (!collides) {
        placed.push({ word, x: px, y: py, fontSize, color });
        placedFlag = true;
        break;
      }

      angle += 0.25;
      radius += STEP * (0.5 + iter * 0.001);
    }

    // Fallback if no position found
    if (!placedFlag) {
      placed.push({
        word,
        x: canvasW / 2 - w / 2,
        y: canvasH / 2 - h / 2,
        fontSize,
        color,
      });
    }
  }

  return placed;
}

function WordCloud({ data }: { data: WordItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<PlacedWord[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const placed = layoutCloud(data, 820, 380);
    setLayout(placed);
  }, [data]);

  useEffect(() => {
    if (layout.length === 0) return;
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [layout]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: 380 }}
    >
      {layout.map((item, i) => (
        <motion.span
          key={item.word.name}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.018, ease: 'easeOut' }}
          className="absolute cursor-default select-none"
          style={{
            left: item.x,
            top: item.y,
            fontSize: item.fontSize,
            color: item.color,
            lineHeight: 1.3,
            whiteSpace: 'nowrap',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
          }}
          title={`${item.word.name}: ${item.word.value} 次`}
        >
          {item.word.name}
        </motion.span>
      ))}
    </div>
  );
}
