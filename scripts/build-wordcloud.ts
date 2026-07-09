import * as fs from 'fs';
import * as path from 'path';

const INPUT = path.resolve('data/data/投稿文本-无评论.txt');
const OUTPUT = path.resolve('src/data/wordcloud.ts');

const STOP = new Set([
  // pronouns
  '我', '你', '他', '她', '它', '们', '咱', '俺', '自己', '本人',
  // particles
  '的', '了', '在', '和', '与', '及', '也', '又', '都', '就', '要', '让', '被', '从', '把',
  '比', '更', '很', '最', '会', '能', '可', '没', '不', '人', '那', '这', '什么', '怎么',
  '吗', '呢', '吧', '啊', '呀', '哦', '嗯', '哈', '嘛', '啦', '哎', '唉', '喂', '咦', '喔',
  // common verbs / adjectives
  '知道', '觉得', '认为', '感觉', '想', '应该', '已经', '还是', '只是', '不是', '就是',
  '这样', '那样', '一样', '一直', '一下', '一定', '一些', '这些', '那些',
  '时候', '现在', '以后', '以前', '后来', '当时', '今天', '昨天', '明天',
  '因为', '所以', '但是', '而且', '或者', '如果', '虽然', '不过', '然而', '并且',
  '开始', '继续', '结束', '完成', '实现', '发现', '相信', '希望', '需要', '必须', '可以', '可能',
  // numerals
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿',
  '个', '只', '条', '次', '回', '遍', '场', '段', '期', '年', '月', '日', '天', '小时', '分钟', '秒', '点', '第', '几', '每',
  // locations / directions
  '上', '下', '中', '里', '后', '前', '外', '内', '旁', '边', '间', '处',
  // common nouns (too generic)
  '东西', '事情', '时间', '地方', '样子', '感觉', '方面', '问题', '原因', '结果', '方式', '方法',
]);

const DOMAIN_TERMS = new Set([
  '思念', '想念', '怀念', '去世', '离开', '死亡', '死去', '离世',
  '妈妈', '爸爸', '爷爷', '奶奶', '姥姥', '姥爷', '外婆', '外公',
  '朋友', '同学', '老师', '室友',
  '梦里', '梦境', '再见',
  '记得', '忘记', '回忆', '记忆',
  '眼泪', '哭泣', '难过', '悲伤', '痛苦',
  '生日', '照片', '电话', '消息',
  '最后', '告别',
  '长大', '小时候',
  '再也', '不见', '消失',
  '小狗', '姐姐', '孩子', '猫猫', '医院',
  '希望', '后来', '家里', '喜欢', '时间', '看到', '想起', '好想', '告诉', '回来', '永远',
  '害怕', '幸福', '世界', '一切',
]);

function tokenize(line: string): string[] {
  const chars = line.replace(/[^\u4e00-\u9fa5]/g, '').split('');
  const tokens: string[] = [];

  for (let i = 0; i < chars.length - 1; i++) {
    const a = chars[i], b = chars[i + 1];
    if (!STOP.has(a) && !STOP.has(b)) {
      tokens.push(a + b);
    }
  }

  for (let i = 0; i < chars.length - 2; i++) {
    const a = chars[i], b = chars[i + 1], c = chars[i + 2];
    if (!STOP.has(a) && !STOP.has(b) && !STOP.has(c)) {
      tokens.push(a + b + c);
    }
  }

  return tokens;
}

function main() {
  const raw = fs.readFileSync(INPUT, 'utf-8');
  const lines = raw.split(/\n/);

  const contentLines = lines.filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    if (/^\d{4}\/\d{2}\//.test(trimmed)) return false;
    if (/^发布\s*于/.test(trimmed)) return false;
    if (/^\d{1,4}\s*$/.test(trimmed)) return false;
    return true;
  });

  const freq = new Map<string, number>();
  const docFreq = new Map<string, number>();

  for (const line of contentLines) {
    const tokens = tokenize(line);
    const seen = new Set<string>();
    for (const t of tokens) {
      freq.set(t, (freq.get(t) || 0) + 1);
      if (!seen.has(t)) {
        seen.add(t);
        docFreq.set(t, (docFreq.get(t) || 0) + 1);
      }
    }
  }

  const totalDocs = contentLines.length;

  const scored = Array.from(freq.entries()).map(([term, count]) => {
    const idf = Math.log((totalDocs + 1) / (docFreq.get(term) || 1));
    const boost = DOMAIN_TERMS.has(term) ? 3.0 : 1.0;
    return { term, count, score: count * idf * boost };
  });

  const data = scored
    .filter((s) => s.count >= 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 80)
    .map((s) => ({ name: s.term, value: Math.round(s.count * 10) / 10 }));

  const output = `export const wordCloudData = ${JSON.stringify(data, null, 2)} as const;\n`;
  fs.writeFileSync(OUTPUT, output, 'utf-8');
  console.log(`Generated ${OUTPUT}`);
  console.log(`Words: ${data.length}`);
  console.log('Top 30:', data.slice(0, 30).map((d) => `${d.name}(${d.value})`).join(', '));
}

main();
