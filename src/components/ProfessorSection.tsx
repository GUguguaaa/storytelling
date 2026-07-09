import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const SCENE_CONTENT = [
  '过去5年，他和团队走访了全国各地多家医院、临终关怀机构、养老院，通过对逝者家属、朋友和医务人员的采访，收集了364份重症患者的临终叙事。',
  '"做临终叙事研究的这几年，经常有人会和我说，景军，你都这岁数了，研究这个话题不晦气吗？"从这样的问题里，不难看出，我们关于死亡是有一套话语禁忌的，很多人认为，公开谈论死亡是不吉利的。',
  '"到2022年，也许可以从里头创造出来一门相关话题的社会学课程。"开放选课后很快就满了。但一个学期上下来后，他发现有关死亡的讨论特别困难——如果我讲别的社会学问题，学生可以漫无边际地讨论；但有关死亡的讨论特别困难。',
  '人类普遍害怕死亡，因为它是单向的——无法重来，无法挽回。它带走了记忆、关系，和一切可能性。',
];

const groupItems = [
  { icon: '👨‍⚕️', label: '医生', color: '#8B5CF6' },
  { icon: '👩‍⚕️', label: '护士', color: '#F59E0B' },
  { icon: '🧓', label: '老人', color: '#FB923C' },
  { icon: '👨‍👩‍👧', label: '家属', color: '#F9A8D4' },
  { icon: '🧑‍⚕️', label: '社工', color: '#FCD34D' },
  { icon: '👴', label: '逝者', color: '#8B5CF6' },
  { icon: '👩‍🎓', label: '学生', color: '#F59E0B' },
  { icon: '👨‍🏫', label: '教授', color: '#FB923C' },
  { icon: '💊', label: '药物', color: '#F9A8D4' },
  { icon: '🩺', label: '病历', color: '#FCD34D' },
  { icon: '🛏️', label: '病床', color: '#8B5CF6' },
  { icon: '🤝', label: '陪伴', color: '#F59E0B' },
];

// ─── Canvas Drawing Functions ─────────────────────────────────────────────────

function drawScene0(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.clearRect(0, 0, W, H);
  const CX = W / 2;
  const CY = H / 2;

  // Background ambient
  const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, W * 0.55);
  bg.addColorStop(0, '#1a1035');
  bg.addColorStop(1, '#0d0a1e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Floor shadow ellipse
  const floorY = H * 0.82;
  const shadow = ctx.createRadialGradient(CX, floorY, 0, CX, floorY, W * 0.28);
  shadow.addColorStop(0, 'rgba(251,191,36,0.15)');
  shadow.addColorStop(1, 'rgba(251,191,36,0)');
  ctx.fillStyle = shadow;
  ctx.fillRect(0, 0, W, H);

  // Outer decorative rings
  for (let r = 1; r >= 0; r--) {
    const rr = Math.min(W, H) * (r === 0 ? 0.44 : 0.47);
    ctx.beginPath();
    ctx.arc(CX, CY - 8, rr, 0, Math.PI * 2);
    ctx.strokeStyle = r === 0 ? 'rgba(251,191,36,0.12)' : 'rgba(251,191,36,0.22)';
    ctx.lineWidth = r === 0 ? 1 : 2;
    ctx.setLineDash(r === 0 ? [4, 6] : []);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Main circle portrait
  const R = Math.min(W, H) * 0.38;
  ctx.beginPath();
  ctx.arc(CX, CY - 8, R, 0, Math.PI * 2);
  ctx.fillStyle = '#1c1235';
  ctx.fill();
  ctx.strokeStyle = 'rgba(251,191,36,0.45)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(CX, CY - 8, R, 0, Math.PI * 2);
  ctx.clip();

  // Background inside circle
  const circBg = ctx.createRadialGradient(CX, CY - 30, 0, CX, CY - 8, R);
  circBg.addColorStop(0, '#251845');
  circBg.addColorStop(1, '#0f0a20');
  ctx.fillStyle = circBg;
  ctx.fillRect(CX - R, CY - 8 - R, R * 2, R * 2);

  // Body (scholar robe)
  ctx.beginPath();
  ctx.arc(CX, CY + 38, 42, 0, Math.PI * 2);
  ctx.fillStyle = '#160e2e';
  ctx.fill();

  // Robe collar V
  ctx.beginPath();
  ctx.moveTo(CX - 22, CY + 28);
  ctx.lineTo(CX, CY + 58);
  ctx.lineTo(CX + 22, CY + 28);
  ctx.strokeStyle = 'rgba(251,191,36,0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Neck
  ctx.beginPath();
  ctx.arc(CX, CY + 16, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#2d1f50';
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(CX, CY - 22, 34, 0, Math.PI * 2);
  ctx.fillStyle = '#2d1f50';
  ctx.fill();

  // Hair
  ctx.beginPath();
  ctx.arc(CX, CY - 36, 30, Math.PI * 1.1, Math.PI * 1.9);
  ctx.fillStyle = '#1a1030';
  ctx.fill();

  // Glasses frames
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(251,191,36,0.8)';
  // Left lens
  ctx.beginPath();
  ctx.ellipse(CX - 14, CY - 24, 13, 9, 0, 0, Math.PI * 2);
  ctx.stroke();
  // Right lens
  ctx.beginPath();
  ctx.ellipse(CX + 14, CY - 24, 13, 9, 0, 0, Math.PI * 2);
  ctx.stroke();
  // Bridge
  ctx.beginPath();
  ctx.moveTo(CX - 1, CY - 24);
  ctx.lineTo(CX + 1, CY - 24);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // Temples
  ctx.beginPath();
  ctx.moveTo(CX - 27, CY - 26);
  ctx.lineTo(CX - 34, CY - 30);
  ctx.moveTo(CX + 27, CY - 26);
  ctx.lineTo(CX + 34, CY - 30);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // Lens tint
  ctx.beginPath();
  ctx.ellipse(CX - 14, CY - 24, 11, 7, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(251,191,36,0.06)';
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(CX + 14, CY - 24, 11, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = 'rgba(251,191,36,0.85)';
  ctx.beginPath();
  ctx.arc(CX - 14, CY - 24, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(CX + 14, CY - 24, 3, 0, Math.PI * 2);
  ctx.fill();

  // Graduation cap
  const capBaseY = CY - 62;
  const capMidX = CX;
  // Cap board
  ctx.fillStyle = '#120c28';
  ctx.fillRect(capMidX - 30, capBaseY + 10, 60, 8);
  // Cap top (rhombus)
  ctx.beginPath();
  ctx.moveTo(capMidX, capBaseY - 8);
  ctx.lineTo(capMidX + 30, capBaseY + 14);
  ctx.lineTo(capMidX, capBaseY + 22);
  ctx.lineTo(capMidX - 30, capBaseY + 14);
  ctx.closePath();
  ctx.fillStyle = '#120c28';
  ctx.fill();
  ctx.strokeStyle = 'rgba(251,191,36,0.25)';
  ctx.lineWidth = 1;
  ctx.stroke();
  // Tassel
  ctx.beginPath();
  ctx.moveTo(capMidX + 30, capBaseY + 14);
  ctx.lineTo(capMidX + 40, capBaseY + 40);
  ctx.strokeStyle = 'rgba(251,191,36,0.7)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(capMidX + 40, capBaseY + 44, 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(251,191,36,0.9)';
  ctx.fill();

  // Medal
  ctx.beginPath();
  ctx.arc(CX - 22, CY + 10, 6, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(251,191,36,0.25)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(251,191,36,0.7)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(CX - 22, CY + 10, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(251,191,36,0.9)';
  ctx.fill();

  ctx.restore();

  // Name plate
  ctx.font = `bold ${Math.round(W * 0.04)}px "Noto Sans SC", sans-serif`;
  ctx.fillStyle = 'rgba(251,191,36,0.95)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('景军教授', CX, CY + R + 28);

  ctx.font = `${Math.round(W * 0.025)}px "Noto Sans SC", sans-serif`;
  ctx.fillStyle = 'rgba(251,191,36,0.5)';
  ctx.fillText('清华大学社会学系', CX, CY + R + 52);

  // Corner decorations
  const dotPositions = [
    [W * 0.06, H * 0.08],
    [W * 0.94, H * 0.08],
    [W * 0.06, H * 0.92],
    [W * 0.94, H * 0.92],
  ];
  dotPositions.forEach(([dx, dy]) => {
    const d = ctx.createRadialGradient(dx, dy, 0, dx, dy, 16);
    d.addColorStop(0, 'rgba(251,191,36,0.15)');
    d.addColorStop(1, 'rgba(251,191,36,0)');
    ctx.fillStyle = d;
    ctx.fillRect(dx - 16, dy - 16, 32, 32);
    ctx.beginPath();
    ctx.arc(dx, dy, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(251,191,36,0.4)';
    ctx.fill();
  });
}

function drawScene1(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.clearRect(0, 0, W, H);
  const CX = W / 2;
  const CY = H / 2;

  // Background
  const bg = ctx.createRadialGradient(CX, CY * 0.6, 0, CX, CY, W * 0.6);
  bg.addColorStop(0, '#1a1035');
  bg.addColorStop(1, '#0d0a1e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Floating particles (static for now, animated in CSS)
  const particles = [
    { px: W * 0.15, py: H * 0.2, s: 4, o: 0.25 },
    { px: W * 0.82, py: H * 0.18, s: 3, o: 0.2 },
    { px: W * 0.1, py: H * 0.7, s: 5, o: 0.18 },
    { px: W * 0.88, py: H * 0.75, s: 4, o: 0.22 },
    { px: W * 0.2, py: H * 0.88, s: 3, o: 0.15 },
    { px: W * 0.75, py: H * 0.12, s: 3, o: 0.18 },
    { px: W * 0.35, py: H * 0.15, s: 2, o: 0.12 },
    { px: W * 0.65, py: H * 0.85, s: 2, o: 0.1 },
  ];
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.px, p.py, p.s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(251,191,36,${p.o})`;
    ctx.fill();
  });

  // Glow behind big question mark
  const glow = ctx.createRadialGradient(CX, CY - 20, 10, CX, CY - 20, W * 0.38);
  glow.addColorStop(0, 'rgba(251,191,36,0.12)');
  glow.addColorStop(1, 'rgba(251,191,36,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Shadow text
  ctx.font = `bold ${Math.round(W * 0.55)}px Georgia, "Times New Roman", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(20,12,40,0.7)';
  ctx.fillText('?', CX + 5, CY - 15);

  // Main big ?
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('?', CX, CY - 20);

  // Dot below ?
  ctx.beginPath();
  ctx.arc(CX, CY + Math.round(W * 0.22), Math.round(W * 0.045), 0, Math.PI * 2);
  ctx.fillStyle = '#fbbf24';
  ctx.fill();

  // Decorative arcs around center
  ctx.strokeStyle = 'rgba(251,191,36,0.08)';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    ctx.arc(CX, CY - 20, W * 0.3 + i * 18, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Speech bubble
  const bx = CX;
  const by = H * 0.82;
  const bw = Math.round(W * 0.62);
  const bh = 58;
  const br = 12;

  // Bubble glow
  ctx.shadowColor = 'rgba(251,191,36,0.15)';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(bx - bw / 2 + br, by - bh / 2);
  ctx.lineTo(bx + bw / 2 - br, by - bh / 2);
  ctx.quadraticCurveTo(bx + bw / 2, by - bh / 2, bx + bw / 2, by - bh / 2 + br);
  ctx.lineTo(bx + bw / 2, by + bh / 2 - br);
  ctx.quadraticCurveTo(bx + bw / 2, by + bh / 2, bx + bw / 2 - br, by + bh / 2);
  ctx.lineTo(bx - bw / 2 + br, by + bh / 2);
  ctx.quadraticCurveTo(bx - bw / 2, by + bh / 2, bx - bw / 2, by + bh / 2 - br);
  ctx.lineTo(bx - bw / 2, by - bh / 2 + br);
  ctx.quadraticCurveTo(bx - bw / 2, by - bh / 2, bx - bw / 2 + br, by - bh / 2);
  ctx.closePath();
  ctx.fillStyle = 'rgba(22,14,46,0.92)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(251,191,36,0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Bubble tail
  ctx.beginPath();
  ctx.moveTo(bx - 20, by - bh / 2);
  ctx.lineTo(bx - 36, by - bh / 2 - 18);
  ctx.lineTo(bx + 4, by - bh / 2);
  ctx.fillStyle = 'rgba(22,14,46,0.92)';
  ctx.fill();

  // Bubble text
  ctx.font = `${Math.round(W * 0.032)}px "Noto Sans SC", sans-serif`;
  ctx.fillStyle = 'rgba(251,191,36,0.95)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('"研究死亡，不晦气吗？"', bx, by);
}

function drawScene2(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.clearRect(0, 0, W, H);
  const CX = W / 2;
  const CY = H / 2;

  // Background
  const bg = ctx.createRadialGradient(CX, CY * 0.5, 0, CX, CY, W * 0.6);
  bg.addColorStop(0, '#112218');
  bg.addColorStop(1, '#0a1510');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Blackboard
  const bw = Math.round(W * 0.78);
  const bh = Math.round(H * 0.48);
  const bx = CX - bw / 2;
  const by = CY - bh / 2 - 15;

  // Wood frame
  ctx.fillStyle = '#3b2415';
  ctx.fillRect(bx - 12, by - 12, bw + 24, bh + 24);
  // Frame highlight
  ctx.fillStyle = '#4e3020';
  ctx.fillRect(bx - 12, by - 12, bw + 24, 4);
  ctx.fillRect(bx - 12, by - 12, 4, bh + 24);
  ctx.fillStyle = '#2a1a0e';
  ctx.fillRect(bx - 12, by + bh + 8, bw + 24, 4);
  ctx.fillRect(bx + bw + 8, by - 12, 4, bh + 24);

  // Board surface
  ctx.fillStyle = '#162e20';
  ctx.fillRect(bx, by, bw, bh);

  // Chalk texture
  for (let i = 0; i < 120; i++) {
    const tx = bx + Math.random() * bw;
    const ty = by + Math.random() * bh;
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.025})`;
    ctx.fillRect(tx, ty, Math.random() > 0.5 ? 1 : 2, 1);
  }

  // Chalk text: main title
  ctx.font = `bold ${Math.round(W * 0.07)}px "Noto Sans SC", sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('死亡社会学', CX, CY - 28);

  // Chalk subtitle
  ctx.font = `${Math.round(W * 0.03)}px "Noto Sans SC", sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('清华大学 · 2022', CX, CY + 8);

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(CX - bw * 0.25, CY + 26);
  ctx.lineTo(CX + bw * 0.25, CY + 26);
  ctx.stroke();

  // Quote line
  ctx.font = `${Math.round(W * 0.025)}px "Noto Sans SC", sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillText('有关死亡的讨论特别困难', CX, CY + 50);

  // Chalk dust
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.18})`;
    ctx.fillRect(bx + 15 + Math.random() * (bw - 30), by + bh - 14 + Math.random() * 10, 2, 1);
  }

  // Students
  const stY = CY + bh / 2 + 38;
  const stPositions = [CX - 88, CX - 30, CX + 28, CX + 86];
  stPositions.forEach((sx, i) => {
    const sy = stY + (i % 2 === 1 ? -4 : 0);
    // Body
    ctx.beginPath();
    ctx.arc(sx, sy + 16, 11, 0, Math.PI * 2);
    ctx.fillStyle = '#162030';
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.arc(sx, sy - 4, 11, 0, Math.PI * 2);
    ctx.fillStyle = '#1e2a3a';
    ctx.fill();
    // Hair top
    ctx.beginPath();
    ctx.arc(sx, sy - 10, 9, Math.PI, Math.PI * 2);
    ctx.fillStyle = '#3a2a1a';
    ctx.fill();
    // Desk hint
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(sx - 14, sy + 30, 28, 3);
  });

  // Label
  ctx.font = `${Math.round(W * 0.028)}px "Noto Sans SC", sans-serif`;
  ctx.fillStyle = 'rgba(251,191,36,0.6)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('课堂讨论', CX, stY + 58);
}

function drawScene3(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.clearRect(0, 0, W, H);
  const CX = W / 2;
  const CY = H / 2;

  // Dark void background
  const bg = ctx.createRadialGradient(CX, CY * 0.5, 0, CX, CY, W * 0.6);
  bg.addColorStop(0, '#100c20');
  bg.addColorStop(1, '#06040f');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle star-like dots
  for (let i = 0; i < 30; i++) {
    const sx = Math.random() * W;
    const sy = Math.random() * H;
    ctx.beginPath();
    ctx.arc(sx, sy, Math.random() * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(120,90,180,${Math.random() * 0.3})`;
    ctx.fill();
  }

  // Dissolving figure silhouette
  ctx.save();
  ctx.globalAlpha = 0.88;

  const figCX = CX;
  const figCY = CY - 5;

  // Head
  ctx.beginPath();
  ctx.arc(figCX, figCY - 48, 24, 0, Math.PI * 2);
  ctx.fillStyle = '#2d1f55';
  ctx.fill();

  // Torso
  ctx.beginPath();
  ctx.moveTo(figCX - 32, figCY - 24);
  ctx.lineTo(figCX + 32, figCY - 24);
  ctx.lineTo(figCX + 26, figCY + 55);
  ctx.lineTo(figCX - 26, figCY + 55);
  ctx.closePath();
  ctx.fill();

  // Left arm (reaching up/out)
  ctx.beginPath();
  ctx.moveTo(figCX - 32, figCY - 16);
  ctx.lineTo(figCX - 70, figCY - 40);
  ctx.lineTo(figCX - 60, figCY - 30);
  ctx.lineTo(figCX - 32, figCY - 6);
  ctx.closePath();
  ctx.fill();

  // Right arm
  ctx.beginPath();
  ctx.moveTo(figCX + 32, figCY - 16);
  ctx.lineTo(figCX + 70, figCY - 40);
  ctx.lineTo(figCX + 60, figCY - 30);
  ctx.lineTo(figCX + 32, figCY - 6);
  ctx.closePath();
  ctx.fill();

  // Left leg
  ctx.beginPath();
  ctx.moveTo(figCX - 18, figCY + 55);
  ctx.lineTo(figCX - 24, figCY + 90);
  ctx.lineTo(figCX - 8, figCY + 90);
  ctx.lineTo(figCX - 2, figCY + 55);
  ctx.closePath();
  ctx.fill();

  // Right leg
  ctx.beginPath();
  ctx.moveTo(figCX + 2, figCY + 55);
  ctx.lineTo(figCX + 8, figCY + 90);
  ctx.lineTo(figCX + 24, figCY + 90);
  ctx.lineTo(figCX + 18, figCY + 55);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // Dissolving particles (floating outward)
  const particles = [
    { x: figCX - 55, y: figCY - 38, s: 5, a: 0.55 },
    { x: figCX + 52, y: figCY - 36, s: 4, a: 0.5 },
    { x: figCX - 22, y: figCY - 68, s: 6, a: 0.45 },
    { x: figCX + 12, y: figCY - 72, s: 4, a: 0.5 },
    { x: figCX, y: figCY - 55, s: 5, a: 0.6 },
    { x: figCX - 38, y: figCY + 8, s: 4, a: 0.4 },
    { x: figCX + 32, y: figCY + 12, s: 5, a: 0.45 },
    { x: figCX - 62, y: figCY + 38, s: 3, a: 0.35 },
    { x: figCX + 58, y: figCY + 32, s: 4, a: 0.4 },
    { x: figCX - 4, y: figCY + 50, s: 3, a: 0.3 },
    { x: figCX - 48, y: figCY - 18, s: 3, a: 0.38 },
    { x: figCX + 42, y: figCY - 22, s: 3, a: 0.42 },
    { x: figCX - 28, y: figCY + 70, s: 4, a: 0.3 },
    { x: figCX + 22, y: figCY + 72, s: 3, a: 0.28 },
  ];
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(100,75,160,${p.a})`;
    ctx.fill();
  });

  // Fade to void
  const fadeTop = ctx.createLinearGradient(0, figCY - 80, 0, figCY + 90);
  fadeTop.addColorStop(0, 'rgba(16,12,32,0.8)');
  fadeTop.addColorStop(1, 'rgba(16,12,32,0)');
  ctx.fillStyle = fadeTop;
  ctx.fillRect(CX - 100, figCY - 80, 200, 170);

  const fadeBot = ctx.createLinearGradient(0, figCY + 90, 0, H * 0.92);
  fadeBot.addColorStop(0, 'rgba(6,4,15,0)');
  fadeBot.addColorStop(1, 'rgba(6,4,15,0.75)');
  ctx.fillStyle = fadeBot;
  ctx.fillRect(0, figCY + 90, W, H * 0.92 - (figCY + 90));

  // Label
  ctx.font = `${Math.round(W * 0.03)}px "Noto Sans SC", sans-serif`;
  ctx.fillStyle = 'rgba(139,92,246,0.65)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('消失 · 不可逆的分离', CX, H * 0.88);
}

// ─── Scene Canvas Component ───────────────────────────────────────────────────

interface SceneCanvasProps {
  sceneIndex: number;
}

function SceneCanvas({ sceneIndex }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    if (sceneIndex === 0) drawScene0(ctx, W, H);
    else if (sceneIndex === 1) drawScene1(ctx, W, H);
    else if (sceneIndex === 2) drawScene2(ctx, W, H);
    else if (sceneIndex === 3) drawScene3(ctx, W, H);
  }, [sceneIndex]);

  useEffect(() => { draw(); }, [draw]);

  useEffect(() => {
    const ro = new ResizeObserver(() => draw());
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ProfessorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showGroup, setShowGroup] = useState(false);
  const [grayscaleValue, setGrayscaleValue] = useState(0);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    const scrolledInto = -rect.top;
    const totalScrollable = sectionHeight - windowHeight;
    const progress = Math.max(0, Math.min(1, scrolledInto / totalScrollable));

    setGrayscaleValue(Math.max(0, (progress - 0.7) * 333));
    const stepIndex = Math.min(Math.floor(progress * 4), 3);
    setActiveStep(stepIndex);
    setShowGroup(progress > 0.75);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ minHeight: '400vh' }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-[#1a0a2e] to-[#0f0f1a]" />

        {/* Ambient glows */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '45vw',
            height: '45vw',
            left: '-12vw',
            top: '-12vw',
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '40vw',
            height: '40vw',
            right: '-10vw',
            bottom: '-10vw',
            background: 'radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <AnimatePresence mode="wait">
            {!showGroup ? (
              <motion.div
                key="scenes"
                className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Canvas — much larger */}
                <div
                  className="w-full"
                  style={{ height: '52vh', minHeight: 280 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      className="w-full h-full"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <SceneCanvas sceneIndex={activeStep} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Single step's text only */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    className="text-center max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="font-heading text-xl md:text-2xl text-amber-300 mb-3 leading-snug">
                      {activeStep === 0 && '67岁的景军是清华大学社会学系的教授。'}
                      {activeStep === 1 && '"研究死亡，不晦气吗？"'}
                      {activeStep === 2 && '2022年，清华开设了"死亡社会学"课程。'}
                      {activeStep === 3 && '死亡意味着消失，和不可逆的分离。'}
                    </h3>
                    <p className="font-body text-base text-white/65 leading-relaxed">
                      {SCENE_CONTENT[activeStep]}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Step dots */}
                <div className="flex gap-2 mt-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-full transition-all duration-400"
                      style={{
                        width: i === activeStep ? 24 : 8,
                        height: 8,
                        backgroundColor:
                          i === activeStep
                            ? 'rgba(251,191,36,0.85)'
                            : 'rgba(255,255,255,0.2)',
                      }}
                    />
                  ))}
                </div>

                {/* Scroll hint */}
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <span className="text-white/25 text-xs">向下滚动</span>
                  <svg
                    className="w-4 h-4 text-white/25"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            ) : (
              // Group portrait — keep unchanged
              <motion.div
                key="group"
                className="w-full max-w-5xl mx-auto text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h3
                  className="font-heading text-3xl md:text-4xl mb-3 text-white/90"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  364份临终叙事
                </motion.h3>
                <motion.p
                  className="font-heading text-2xl md:text-3xl text-amber-400 mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  汇聚成群的记忆
                </motion.p>

                <div className="grid grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
                  {groupItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0, y: 50 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        filter: `grayscale(${grayscaleValue}%)`,
                      }}
                      transition={{ delay: index * 0.07, duration: 0.6 }}
                    >
                      <motion.div
                        className="text-4xl md:text-5xl mb-2"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-white/60 text-xs md:text-sm">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  className="font-heading text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  人类普遍害怕死亡，因为它意味着消失和不可逆的分离。
                </motion.p>

                <motion.div
                  className="mt-8 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: grayscaleValue > 50 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-px w-16 bg-white/30" />
                  <span className="text-white/40 text-sm">记忆化为黑白</span>
                  <div className="h-px w-16 bg-white/30" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
