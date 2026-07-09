# -*- coding: utf-8 -*-
import re
import json
import math
from collections import Counter

INPUT = r"D:\cursor\WhenWeTalkAboutDeath_v1.0\data\data\投稿文本-无评论.txt"
OUTPUT = r"D:\cursor\WhenWeTalkAboutDeath_v1.0\src\data\wordcloud.json"

DOMAIN_WORDS = [
    # death / mourning
    "去世", "离开", "死亡", "死去", "离世", "告别", "再见", "最后",
    # emotions
    "思念", "想念", "怀念", "回忆", "记忆", "忘记", "难过", "悲伤", "痛苦",
    "眼泪", "愧疚", "自责", "遗憾", "后悔", "害怕", "恐惧", "孤独", "无助",
    "愤怒", "怨恨", "感激", "感恩", "爱意", "释然", "祝福",
    "希望", "幸福",
    # memories / scenes
    "梦里", "梦境", "梦见", "梦到", "照片", "日记", "电话", "消息",
    "生日", "医院", "坟墓", "墓碑", "烧纸", "祭拜", "悼念", "纪念",
    # family
    "妈妈", "爸爸", "爷爷", "奶奶", "姥姥", "姥爷", "外婆", "外公",
    "姐姐", "哥哥", "弟弟", "妹妹", "孩子", "儿子", "女儿",
    # relationships
    "朋友", "同学", "老师", "室友", "舍友", "邻居", "叔叔", "阿姨",
    # pets
    "小狗", "猫咪", "猫猫", "仓鼠", "狗狗", "宠物", "金毛",
    # common objects / scenes
    "味道", "声音", "礼物", "家里", "学校", "医院", "病房",
    "童年", "青春", "校园", "课堂",
    # verbs / states
    "记得", "想起", "好想", "看到", "看见", "告诉", "回来",
    "永远", "消失", "不见", "长大", "小时候", "以前", "以后",
    "喜欢",
]

def main():
    with open(INPUT, 'r', encoding='utf-8') as f:
        text = f.read()

    lines = text.split('\n')
    content_lines = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        if re.match(r'^\d{4}/\d{2}/\d{2}', stripped):
            continue
        if re.match(r'^发布\s*于', stripped):
            continue
        if re.match(r'^\d{1,4}\s*$', stripped):
            continue
        content_lines.append(stripped)

    corpus = ' '.join(content_lines)
    total_docs = len(content_lines)

    freq = Counter()
    doc_freq = Counter()
    for word in DOMAIN_WORDS:
        count = corpus.count(word)
        if count > 0:
            freq[word] = count

    for line in content_lines:
        for word in DOMAIN_WORDS:
            if word in line:
                doc_freq[word] += 1

    scored = []
    for word, count in freq.items():
        idf = math.log((total_docs + 1) / (doc_freq[word] or 1))
        scored.append((word, count, count * idf))

    scored.sort(key=lambda x: x[2], reverse=True)
    top = scored[:100]

    data = [{"name": word, "value": round(count, 1)} for word, count, _ in top]

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Generated {OUTPUT}")
    print(f"Words: {len(data)}")
    print("Top 25:", ", ".join(f"{d['name']}({d['value']})" for d in data[:25]))

if __name__ == '__main__':
    main()
