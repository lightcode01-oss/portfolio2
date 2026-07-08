import { createCanvas } from "canvas";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOTAL = 192;
const W = 1920;
const H = 1080;
const OUT = path.resolve(__dirname, "../public/scroll-animation");

fs.mkdirSync(OUT, { recursive: true });

const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

function smoothstep(t, e0, e1) {
  const x = Math.max(0, Math.min(1, (t - e0) / (e1 - e0)));
  return x * x * (3 - 2 * x);
}

function render(t) {
  const cx = W / 2;
  const cy = H / 2;
  const maxDim = Math.max(W, H);

  // clear
  ctx.fillStyle = "#05070A";
  ctx.fillRect(0, 0, W, H);

  // 1. Background glow
  const g1 = smoothstep(t, 0, 0.15);
  if (g1 > 0) {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxDim * 0.45);
    g.addColorStop(0, `rgba(0,191,255,${0.04 * g1})`);
    g.addColorStop(1, "#05070A");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  // 2. Grid
  const g2 = smoothstep(t, 0.1, 0.35);
  if (g2 > 0) {
    ctx.strokeStyle = `rgba(0,191,255,${0.04 * g2})`;
    ctx.lineWidth = 0.5;
    const gs = 64;
    const off = gs * (1 - g2);
    const cols = Math.ceil(W / gs) + 2;
    const rows = Math.ceil(H / gs) + 2;
    for (let i = -1; i < cols; i++) {
      const x = i * gs - off * 0.3;
      if (x > W + gs) break;
      ctx.beginPath();
      ctx.moveTo(x, -gs);
      ctx.lineTo(x, H + gs);
      ctx.stroke();
    }
    for (let j = -1; j < rows; j++) {
      const y = j * gs - off * 0.15;
      if (y > H + gs) break;
      ctx.beginPath();
      ctx.moveTo(-gs, y);
      ctx.lineTo(W + gs, y);
      ctx.stroke();
    }
  }

  // 3. Central orbit
  const g3 = smoothstep(t, 0.2, 0.55);
  if (g3 > 0) {
    const R = maxDim * 0.14 * g3;
    const rotation = t * Math.PI * 2;

    const og = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.8);
    og.addColorStop(0, `rgba(0,191,255,${0.06 * g3})`);
    og.addColorStop(1, "transparent");
    ctx.fillStyle = og;
    ctx.fillRect(cx - R * 2.8, cy - R * 2.8, R * 5.6, R * 5.6);

    // main ring
    ctx.beginPath();
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI * 2 + rotation;
      const x = cx + R * Math.cos(a);
      const y = cy + R * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(0,191,255,${0.18 * g3})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // inner ring
    ctx.beginPath();
    for (let i = 0; i <= 54; i++) {
      const a = (i / 54) * Math.PI * 2 - rotation * 0.6;
      const r = R * 0.55;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(55,213,255,${0.1 * g3})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 2 * g3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,191,255,${0.3 * g3})`;
    ctx.fill();
  }

  // 4. Particles
  const g4 = smoothstep(t, 0.35, 0.7);
  if (g4 > 0) {
    const count = Math.floor(50 * g4);
    for (let i = 0; i < count; i++) {
      const s = i * 0.618033988749895;
      const px = (Math.sin(s * 403.7 + t * 0.2) * 0.5 + 0.5) * W;
      const py = (Math.cos(s * 211.3 + t * 0.35) * 0.5 + 0.5) * H;
      const r = 0.8 + Math.sin(s * 61.1 + t * 1.8) * 0.4;
      const a = 0.08 + Math.sin(s * 83.7 + t * 1.2) * 0.04;
      ctx.beginPath();
      ctx.arc(px, py, r * g4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,191,255,${a * g4})`;
      ctx.fill();
    }

    if (g4 > 0.4) {
      const strandT = (g4 - 0.4) / 0.6;
      ctx.strokeStyle = `rgba(0,191,255,${0.015 * strandT})`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 8; i++) {
        const sa = i * 0.618033988749895;
        const ax = (Math.sin(sa * 403.7 + t * 0.2) * 0.5 + 0.5) * W;
        const ay = (Math.cos(sa * 211.3 + t * 0.35) * 0.5 + 0.5) * H;
        for (let j = i + 1; j < 8; j++) {
          const sb = j * 0.618033988749895;
          const bx = (Math.sin(sb * 403.7 + t * 0.2) * 0.5 + 0.5) * W;
          const by = (Math.cos(sb * 211.3 + t * 0.35) * 0.5 + 0.5) * H;
          const dx = ax - bx;
          const dy = ay - by;
          if (dx * dx + dy * dy < 25000) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }
    }
  }

  // 5. Gold accent + data viz
  const g5 = smoothstep(t, 0.55, 0.85);
  if (g5 > 0) {
    const baseY = cy + maxDim * 0.1;
    const leftX = cx - maxDim * 0.22;
    const rightX = cx + maxDim * 0.22;

    ctx.strokeStyle = `rgba(212,175,55,${0.2 * g5})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(leftX, baseY);
    ctx.lineTo(rightX, baseY);
    ctx.stroke();

    const dotN = Math.floor(9 * g5);
    for (let i = 0; i < dotN; i++) {
      const frac = dotN > 1 ? i / (dotN - 1) : 0.5;
      const dx = leftX + frac * (rightX - leftX);
      const dy =
        baseY -
        (0.1 + Math.sin(i * 2.7 + t * 5) * 0.06 + 0.04) * maxDim * 0.12;
      ctx.beginPath();
      ctx.arc(dx, dy, 1.8 * g5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${0.35 * g5})`;
      ctx.fill();
    }

    const barX = cx + maxDim * 0.24;
    const barBase = cy + maxDim * 0.12;
    for (let i = 0; i < 6; i++) {
      const bh =
        (0.12 + Math.sin(i * 1.9 + t * 2.5) * 0.06) * maxDim * 0.18 * g5;
      const bx = barX + i * maxDim * 0.018;
      ctx.fillStyle = `rgba(0,191,255,${0.12 * g5})`;
      ctx.fillRect(bx, barBase - bh, maxDim * 0.012, bh);
    }
  }

  // 6. Final bloom
  const g6 = smoothstep(t, 0.8, 1);
  if (g6 > 0) {
    const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxDim * 0.35);
    bloom.addColorStop(0, `rgba(212,175,55,${0.02 * g6})`);
    bloom.addColorStop(0.6, `rgba(0,191,255,${0.025 * g6})`);
    bloom.addColorStop(1, "transparent");
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = `rgba(212,175,55,${0.05 * g6})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(cx, cy, maxDim * 0.18 * g6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(55,213,255,${0.025 * g6})`;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + t * 0.2;
      const inner = maxDim * 0.1;
      const outer = maxDim * (0.22 + 0.08 * Math.sin(i * 4.1 + t * 1.5));
      ctx.beginPath();
      ctx.moveTo(cx + inner * Math.cos(a), cy + inner * Math.sin(a));
      ctx.lineTo(cx + outer * Math.cos(a), cy + outer * Math.sin(a));
      ctx.stroke();
    }
  }
}

// Generate all frames
console.log("Generating 192 frames at 1920x1080...");
const start = Date.now();

for (let i = 0; i < TOTAL; i++) {
  const t = i / (TOTAL - 1);
  render(t);
  const filename = `ezgif-frame-${String(i + 1).padStart(3, "0")}.png`;
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(OUT, filename), buffer);

  if ((i + 1) % 10 === 0 || i === 0) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`[${elapsed}s] Generated ${i + 1}/${TOTAL}`);
  }
}

const totalTime = ((Date.now() - start) / 1000).toFixed(1);
console.log(`Done! ${TOTAL} frames in ${totalTime}s`);
console.log(`Output: ${OUT}`);
