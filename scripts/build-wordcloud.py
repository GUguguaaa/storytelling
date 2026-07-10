# -*- coding: utf-8 -*-
import re
import json
import math
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "data" / "data" / "投稿文本-无评论.txt"
OUTPUT = ROOT / "src" / "data" / "wordcloud.json"

DOMAIN_WORDS = [
    # death / mourning
    "去世", "离开", "死亡", "死去", "离世", "告别", "再见", "最后", "走了", "没了",
    "往生", "病逝", "过世", "逝世", "夭折", "离世", "撒手", "人走", "不在了",
    # emotions
    "思念", "想念", "怀念", "回忆", "记忆", "忘记", "难过", "悲伤", "痛苦", "伤心",
    "眼泪", "哭泣", "落泪", "泪流", "愧疚", "自责", "遗憾", "后悔", "害怕", "恐惧",
    "孤独", "无助", "愤怒", "怨恨", "感激", "感恩", "爱意", "释然", "祝福", "不舍",
    "挂念", "牵挂", "心痛", "心碎", "惋惜", "痛心", "想念", "惦念", "哀思", "哀悼",
    "希望", "幸福", "喜欢", "温暖", "温柔", "陪伴", "守护",
    # memories / scenes
    "梦里", "梦境", "梦见", "梦到", "照片", "日记", "电话", "消息", "语音", "视频",
    "生日", "医院", "病房", "坟墓", "墓碑", "烧纸", "祭拜", "悼念", "纪念", "灵堂",
    "骨灰", "墓地", "老家", "灵位", "蜡烛", "鲜花", "纸钱", "清明", "过年", "春节",
    # family
    "妈妈", "爸爸", "爷爷", "奶奶", "姥姥", "姥爷", "外婆", "外公", "老妈", "老爸",
    "爸妈", "父母", "亲人", "家人", "姐姐", "哥哥", "弟弟", "妹妹", "孩子", "儿子",
    "女儿", "宝贝", "宝宝", "孙女", "孙子", "外公", "外婆",
    # relationships
    "朋友", "同学", "老师", "室友", "舍友", "邻居", "叔叔", "阿姨", "舅舅", "姑姑",
    "伯伯", "姨妈", "爱人", "恋人", "伴侣", "老公", "老婆", "丈夫", "妻子",
    # pets
    "小狗", "猫咪", "猫猫", "仓鼠", "狗狗", "宠物", "金毛", "毛孩子", "兔子", "小鸟",
    # objects / scenes
    "味道", "声音", "礼物", "家里", "学校", "校园", "课堂", "童年", "青春", "往事",
    "从前", "曾经", "那时", "那天", "那年", "深夜", "凌晨", "冬天", "夏天", "秋天",
    "春天", "饭菜", "厨房", "客厅", "房间", "门口", "路边", "车站", "车上", "路上",
    # verbs / states
    "记得", "想起", "好想", "看到", "看见", "告诉", "回来", "回家", "永远", "消失",
    "不见", "长大", "小时候", "以前", "以后", "活着", "余生", "余生", "余生",
    "喊", "叫", "念", "祈祷", "祝愿", "守候", "等待", "陪伴", "拥抱", "握手",
    # abstract / narrative
    "世界", "一切", "人生", "生命", "岁月", "时光", "日子", "命运", "天堂", "人间",
    "来世", "下辈子", "轮回", "灵魂", "精神", "寄托", "牵挂",
]

MIN_COUNT = 2


def main():
    with open(INPUT, "r", encoding="utf-8") as f:
        text = f.read()

    lines = text.split("\n")
    content_lines = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        if re.match(r"^\d{4}/\d{2}/\d{2}", stripped):
            continue
        if re.match(r"^发布\s*于", stripped):
            continue
        if re.match(r"^\d{1,4}\s*$", stripped):
            continue
        content_lines.append(stripped)

    corpus = " ".join(content_lines)
    total_docs = len(content_lines)

    unique_words = list(dict.fromkeys(DOMAIN_WORDS))

    freq = Counter()
    doc_freq = Counter()
    for word in unique_words:
        count = corpus.count(word)
        if count >= MIN_COUNT:
            freq[word] = count

    for line in content_lines:
        for word in unique_words:
            if word in line:
                doc_freq[word] += 1

    scored = []
    for word, count in freq.items():
        idf = math.log((total_docs + 1) / (doc_freq[word] or 1))
        scored.append((word, count, count * idf))

    scored.sort(key=lambda x: x[2], reverse=True)

    data = [{"name": word, "value": round(count, 1)} for word, count, _ in scored]

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Generated {OUTPUT}")
    print(f"Words: {len(data)}")
    print("Top 25:", ", ".join(f"{d['name']}({d['value']})" for d in data[:25]))


if __name__ == "__main__":
    main()
