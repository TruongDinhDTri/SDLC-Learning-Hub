// Original Ghibli-adjacent SVG decorations
// Simple shapes only — sakura petals, leaves, branches, clouds, hills.
// No characters. Used at low opacity as "seasoning".

// ─── Bell-flower (coral pink, like the reference meadow) ────────────────────
const BellFlower = ({ size = 16, hue = '#FF8FA3', stemHue = '#6FAF54', opacity = 1, rotate = 0, style = {} }) => (
  <svg viewBox="0 0 30 50" width={size * 0.6} height={size}
    style={{ transform: `rotate(${rotate}deg)`, opacity, transformOrigin: 'bottom center', ...style }}>
    {/* stem */}
    <path d="M15 50 Q 13 30 16 14" stroke={stemHue} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* tiny leaf */}
    <path d="M14 30 Q 8 28 7 24 Q 12 24 14 30 Z" fill={stemHue} />
    {/* bell-shaped flower head */}
    <path d="M16 14 Q 8 12 7 6 Q 16 -2 25 6 Q 24 12 16 14 Z" fill={hue}
      stroke="rgba(180,60,80,.4)" strokeWidth=".5" />
    {/* highlight */}
    <ellipse cx="13" cy="6" rx="2.5" ry="1.5" fill="rgba(255,255,255,.5)" />
  </svg>
);

// ─── Daisy (small 5-petal white flower) ─────────────────────────────────────
const Daisy = ({ size = 14, opacity = 1, rotate = 0, style = {} }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}
    style={{ transform: `rotate(${rotate}deg)`, opacity, ...style }}>
    {[0, 72, 144, 216, 288].map(deg => (
      <g key={deg} transform={`rotate(${deg} 12 12)`}>
        <ellipse cx="12" cy="6" rx="2.6" ry="4" fill="#FFFCF7"
          stroke="rgba(180,160,120,.35)" strokeWidth=".4" />
      </g>
    ))}
    <circle cx="12" cy="12" r="2.4" fill="#FFC93A" />
    <circle cx="12" cy="12" r=".9" fill="#D49826" />
  </svg>
);

// ─── Grass blade ────────────────────────────────────────────────────────────
const GrassBlade = ({ height = 30, hue = '#7BC15A', rotate = 0, opacity = 1, style = {} }) => (
  <svg viewBox="0 0 10 40" width={height * 0.25} height={height}
    style={{ transform: `rotate(${rotate}deg)`, opacity, transformOrigin: 'bottom center', ...style }}>
    <path d="M5 40 Q 4 22 7 4 Q 8 12 5 40 Z" fill={hue} />
  </svg>
);

// ─── Flower field — masses of grass, daisies, and bell-flowers ──────────────
// Pulls together a dense bottom band like the reference images.
const FlowerField = ({ height = 200, density = 1 }) => {
  // deterministic per-position
  const rng = (n) => {
    const x = Math.sin(n * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  const count = Math.floor(80 * density);
  const items = [];
  for (let i = 0; i < count; i++) {
    const x = rng(i + 1) * 100;
    const y = 30 + rng(i + 2) * 60; // 30%..90% of field height
    const kind = rng(i + 3);
    const scale = 0.6 + rng(i + 4) * 0.8;
    // Background flowers smaller and dimmer
    const depth = 0.5 + (1 - y / 90) * 0.5;
    items.push({ i, x, y, kind, scale, depth });
  }
  // sort by y so back ones render first
  items.sort((a, b) => a.y - b.y);

  return (
    <div className="hb-flowerfield" style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height, pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
    }}>
      {/* grass base gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(140,200,110,.0) 20%, rgba(120,190,90,.45) 70%, rgba(100,170,80,.75) 100%)',
      }} />
      {items.map(({ i, x, y, kind, scale, depth }) => {
        const left = `${x}%`;
        const bottom = `${y - 30}%`;
        // entry stagger for sway anim
        const delay = (i % 7) * 0.3;
        const grassHue = depth > 0.85 ? '#6FAF54' : depth > 0.7 ? '#7BC15A' : '#8FCB6F';
        const flowerHues = ['#FF8FA3', '#FFA8B8', '#FFB3C1', '#FF7A95'];
        if (kind < 0.4) {
          return (
            <div key={i} className="hb-sway"
              style={{
                position: 'absolute', left, bottom,
                animationDelay: `${delay}s`, transformOrigin: 'bottom center',
                opacity: depth,
              }}>
              <GrassBlade height={20 + scale * 18} hue={grassHue} />
            </div>
          );
        } else if (kind < 0.78) {
          return (
            <div key={i} className="hb-sway"
              style={{
                position: 'absolute', left, bottom,
                animationDelay: `${delay + 0.2}s`,
                transformOrigin: 'bottom center',
                opacity: depth,
              }}>
              <BellFlower size={18 + scale * 14}
                hue={flowerHues[i % flowerHues.length]} stemHue={grassHue} />
            </div>
          );
        } else {
          return (
            <div key={i} className="hb-sway hb-sway--slow"
              style={{
                position: 'absolute', left, bottom: `calc(${bottom} + 8px)`,
                animationDelay: `${delay + 0.5}s`,
                transformOrigin: 'bottom center',
                opacity: depth,
              }}>
              <Daisy size={10 + scale * 6} />
            </div>
          );
        }
      })}
    </div>
  );
};

// ─── Sun with soft rays ─────────────────────────────────────────────────────
const Sun = ({ size = 90, opacity = 0.85, style = {} }) => (
  <div className="hb-sun" style={{ width: size, height: size, position: 'relative', opacity, ...style }}>
    <div style={{
      position: 'absolute', inset: -size * 0.45,
      background: 'radial-gradient(circle, rgba(255,230,150,.55) 0%, rgba(255,230,150,0) 60%)',
      borderRadius: '50%',
    }} />
    <svg viewBox="0 0 100 100" width={size} height={size}
      style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <radialGradient id="sunG" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFF4C8" />
          <stop offset="60%" stopColor="#FFE38B" />
          <stop offset="100%" stopColor="#FFC93A" />
        </radialGradient>
      </defs>
      <g className="hb-sun-rays" style={{ transformOrigin: '50px 50px' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="49" y="6" width="2" height="10"
            fill="#FFE38B" opacity=".75"
            transform={`rotate(${i * 30} 50 50)`} rx="1" />
        ))}
      </g>
      <circle cx="50" cy="50" r="22" fill="url(#sunG)"
        stroke="rgba(220,150,30,.3)" strokeWidth=".6" />
    </svg>
  </div>
);

// ─── Big puffy painterly cloud ──────────────────────────────────────────────
const PuffyCloud = ({ size = 220, opacity = 1, style = {} }) => (
  <svg viewBox="0 0 240 110" width={size} height={size * 110 / 240}
    style={{ opacity, ...style }}>
    <defs>
      <linearGradient id={`puffy${size}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFEFB" />
        <stop offset=".5" stopColor="#F8F4EC" />
        <stop offset="1" stopColor="#E3DFD3" />
      </linearGradient>
    </defs>
    {/* underbelly shadow */}
    <path d="M28 90 Q 12 82 18 70 Q 8 56 22 52 Q 22 38 38 36 Q 44 22 60 24 Q 70 12 88 18 Q 100 8 122 16 Q 138 6 158 18 Q 178 14 188 32 Q 210 32 214 50 Q 226 56 218 72 Q 226 88 208 92 Q 196 100 178 96 L 60 96 Q 36 100 28 90 Z"
      fill={`url(#puffy${size})`} stroke="rgba(140,160,180,.35)" strokeWidth=".6" />
    {/* inner highlights */}
    <path d="M50 70 Q 60 60 76 64 M 100 56 Q 116 48 134 56 M 152 62 Q 168 54 186 60 M 70 80 Q 86 74 102 80"
      stroke="rgba(255,255,255,.85)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    {/* shadow underside */}
    <path d="M40 88 Q 80 96 130 94 Q 180 92 200 86"
      stroke="rgba(140,160,180,.18)" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

// ─── Sparkle dot (small twinkle) ────────────────────────────────────────────
const Sparkle = ({ size = 10, hue = '#FFE38B', opacity = 1, style = {} }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} style={{ opacity, ...style }}>
    <path d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z"
      fill={hue} />
  </svg>
);

// ─── Hand-drawn arrow (squiggly, marker-style) ──────────────────────────────
const HandArrow = ({ length = 80, color = '#D45A75', rotate = 0, style = {} }) => (
  <svg viewBox="0 0 120 60" width={length} height={length * 0.5}
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M6 30 Q 30 20 56 32 Q 80 44 108 26"
      stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeDasharray="0" />
    <path d="M100 18 L 110 26 L 100 36"
      stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Hand-drawn highlight circle ────────────────────────────────────────────
const HandCircle = ({ size = 60, color = '#FFC93A', strokeWidth = 2.5, style = {} }) => (
  <svg viewBox="0 0 100 60" width={size} height={size * 0.6} style={style}>
    <path d="M14 30 Q 10 14 30 10 Q 60 4 82 14 Q 96 24 88 40 Q 76 54 50 54 Q 22 56 14 40 Q 10 32 14 30 Z"
      stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
      strokeDasharray="3 1" opacity=".85" />
  </svg>
);

// ─── Hand-drawn underline ───────────────────────────────────────────────────
const HandUnderline = ({ length = 120, color = '#FFC93A', style = {} }) => (
  <svg viewBox="0 0 200 16" width={length} height={length * 0.08} style={style}
    preserveAspectRatio="none">
    <path d="M4 10 Q 50 4 100 8 Q 150 12 196 6"
      stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" opacity=".6" />
  </svg>
);

const Petal = ({ size = 14, hue = '#E8B4B0', rotate = 0, opacity = 1, style = {} }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}
    style={{ transform: `rotate(${rotate}deg)`, opacity, ...style }}>
    <path d="M12 2 C 8 6, 8 12, 12 16 C 16 12, 16 6, 12 2 Z"
      fill={hue} />
    <path d="M12 4 C 10 7, 10 12, 12 15"
      stroke="rgba(170,90,90,.35)" strokeWidth=".6" fill="none" />
  </svg>
);

const Sakura5 = ({ size = 28, opacity = 1, rotate = 0, style = {} }) => (
  <svg viewBox="0 0 60 60" width={size} height={size}
    style={{ transform: `rotate(${rotate}deg)`, opacity, ...style }}>
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <g key={i} transform={`rotate(${deg} 30 30)`}>
        <path d="M30 30 C 24 22, 24 12, 30 8 C 36 12, 36 22, 30 30 Z"
          fill="#F5D6D2" stroke="#E8B4B0" strokeWidth=".5" />
      </g>
    ))}
    <circle cx="30" cy="30" r="3" fill="#F2C2A0" />
    <circle cx="30" cy="30" r="1.2" fill="#C4827E" />
  </svg>
);

const Leaf = ({ size = 16, hue = '#B5C9A6', rotate = 0, opacity = 1, style = {} }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}
    style={{ transform: `rotate(${rotate}deg)`, opacity, ...style }}>
    <path d="M2 12 C 6 4, 18 4, 22 12 C 18 20, 6 20, 2 12 Z" fill={hue} />
    <path d="M2 12 L 22 12" stroke="rgba(80,110,70,.4)" strokeWidth=".7" />
  </svg>
);

// A sakura branch — diagonal stem with petals along it. Place in corner.
const SakuraBranch = ({ flip = false, opacity = 0.85 }) => (
  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet"
    style={{ opacity, transform: flip ? 'scaleX(-1)' : 'none' }}>
    <defs>
      <linearGradient id="branchG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8a6650" />
        <stop offset="1" stopColor="#5a4030" />
      </linearGradient>
    </defs>
    {/* Branch */}
    <path d="M-10 30 Q 60 50 110 70 Q 170 95 240 110 Q 290 122 330 130"
      stroke="url(#branchG)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
    <path d="M110 70 Q 130 55 150 40"
      stroke="url(#branchG)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <path d="M200 102 Q 215 130 230 155"
      stroke="url(#branchG)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M55 48 Q 50 28 40 18"
      stroke="url(#branchG)" strokeWidth="1.8" fill="none" strokeLinecap="round" />

    {/* Five-petal blossoms */}
    {[
      { x: 38, y: 16, s: 1.0, r: -10 },
      { x: 110, y: 70, s: 1.2, r: 18 },
      { x: 152, y: 38, s: 0.9, r: 35 },
      { x: 200, y: 100, s: 1.1, r: -5 },
      { x: 232, y: 155, s: 0.85, r: 22 },
      { x: 270, y: 118, s: 1.0, r: 50 },
      { x: 78, y: 60, s: 0.7, r: 0 },
      { x: 175, y: 80, s: 0.7, r: 60 },
    ].map((b, i) => (
      <g key={i} transform={`translate(${b.x} ${b.y}) scale(${b.s})`}>
        {[0, 72, 144, 216, 288].map(d => (
          <g key={d} transform={`rotate(${d + b.r})`}>
            <ellipse cx="0" cy="-7" rx="4.5" ry="7"
              fill="#F5D6D2" stroke="#E8B4B0" strokeWidth=".5" />
          </g>
        ))}
        <circle cx="0" cy="0" r="2.2" fill="#F2C2A0" />
        <circle cx="0" cy="0" r=".9" fill="#C4827E" />
      </g>
    ))}

    {/* Falling petals */}
    {[
      { x: 90, y: 130 }, { x: 280, y: 60 }, { x: 50, y: 110 },
      { x: 250, y: 30 }, { x: 160, y: 150 }, { x: 300, y: 90 },
    ].map((p, i) => (
      <g key={'p' + i} transform={`translate(${p.x} ${p.y}) rotate(${i * 47})`}>
        <path d="M0 -5 C -3 -2, -3 3, 0 5 C 3 3, 3 -2, 0 -5 Z" fill="#F5D6D2" opacity=".85" />
      </g>
    ))}
  </svg>
);

// A pair of distant rolling hills in sage / sky
const DistantHills = ({ opacity = 0.5 }) => (
  <svg viewBox="0 0 600 200" preserveAspectRatio="none" style={{ opacity }}>
    <path d="M0 140 Q 100 80 200 110 T 400 100 T 600 120 L 600 200 L 0 200 Z"
      fill="#D6E3CB" />
    <path d="M0 160 Q 120 110 240 140 T 480 130 T 600 150 L 600 200 L 0 200 Z"
      fill="#B5C9A6" opacity=".7" />
  </svg>
);

// Soft cloud
const Cloud = ({ size = 80, opacity = 0.6, style = {} }) => (
  <svg viewBox="0 0 100 50" width={size} height={size * 0.5}
    style={{ opacity, ...style }}>
    <path d="M10 35 Q 5 25 15 22 Q 20 10 35 14 Q 45 4 58 12 Q 75 8 80 22 Q 92 24 88 35 Z"
      fill="white" stroke="rgba(120,140,160,.3)" strokeWidth=".8" />
  </svg>
);

// Floating petal at given absolute position
const FloatPetal = ({ left, top, size = 10, hue = '#F5D6D2', rotate = 0, opacity = 1 }) => (
  <div style={{ position: 'absolute', left, top, opacity, pointerEvents: 'none', zIndex: 0 }}>
    <Petal size={size} hue={hue} rotate={rotate} />
  </div>
);

// Scatter of petals across a region
const PetalScatter = ({ count = 14, seed = 1, style = {} }) => {
  // Deterministic pseudo-random
  const rng = (n) => {
    const x = Math.sin(n * 9301 + seed * 49297) * 233280;
    return x - Math.floor(x);
  };
  return (
    <div className="deco deco--petals" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }}>
      {Array.from({ length: count }).map((_, i) => {
        const left = rng(i + 1) * 100;
        const top = rng(i + 1.5) * 100;
        const r = rng(i + 2) * 360;
        const s = 6 + rng(i + 3) * 8;
        const hues = ['#F5D6D2', '#FADFC9', '#E8B4B0', '#F2C2A0'];
        return (
          <Petal
            key={i}
            size={s}
            hue={hues[i % hues.length]}
            rotate={r}
            opacity={0.45 + rng(i + 4) * 0.35}
            style={{ position: 'absolute', left: `${left}%`, top: `${top}%` }}
          />
        );
      })}
    </div>
  );
};

// ─── New: pond / summer motifs ──────────────────────────────────────────────

// Koi silhouette — simple teardrop with eye and tail
const Koi = ({ size = 28, hue = '#E07A4A', rotate = 0, opacity = 1, style = {} }) => (
  <svg viewBox="0 0 40 22" width={size} height={size * 22 / 40}
    style={{ transform: `rotate(${rotate}deg)`, opacity, ...style }}>
    {/* body */}
    <path d="M2 11 Q 8 2 22 4 Q 32 6 34 11 Q 32 16 22 18 Q 8 20 2 11 Z"
      fill={hue} stroke="rgba(120,60,30,.35)" strokeWidth=".6" />
    {/* tail */}
    <path d="M32 11 Q 38 5 39 9 Q 38 11 36 11 Q 38 13 39 17 Q 38 19 32 11 Z"
      fill={hue} opacity=".9" />
    {/* spot */}
    <ellipse cx="14" cy="10" rx="4" ry="3" fill="white" opacity=".5" />
    {/* eye */}
    <circle cx="6" cy="10" r="1.1" fill="#3a2418" />
  </svg>
);

// Long pinnate leaf / frond — for grass tufts and reeds
const LeafFrond = ({ size = 80, hue = '#7E9968', rotate = 0, opacity = 1, style = {} }) => (
  <svg viewBox="0 0 30 100" width={size * 0.3} height={size}
    style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'bottom center', opacity, ...style }}>
    <defs>
      <linearGradient id={'fg' + rotate} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={hue} stopOpacity=".95" />
        <stop offset="1" stopColor={hue} stopOpacity="1" />
      </linearGradient>
    </defs>
    <path d="M15 100 Q 14 70 16 40 Q 18 18 15 2 Q 12 18 14 40 Q 16 70 15 100 Z"
      fill={'url(#fg' + rotate + ')'} />
    {/* veins */}
    <path d="M15 100 L 15 6" stroke="rgba(40,60,30,.35)" strokeWidth=".5" />
  </svg>
);

// Cluster of fronds rooted at a point
const FrondTuft = ({ count = 5, size = 90, hue = '#7E9968', opacity = 1, style = {} }) => (
  <div style={{ position: 'relative', width: size * 1.4, height: size, opacity, ...style }}>
    {Array.from({ length: count }).map((_, i) => {
      const a = -30 + (60 / (count - 1)) * i;
      const s = size * (0.7 + 0.3 * (1 - Math.abs(i - (count - 1) / 2) / ((count - 1) / 2 || 1)));
      return (
        <div key={i} style={{ position: 'absolute', left: '50%', bottom: 0,
          transform: 'translateX(-50%)' }}>
          <LeafFrond size={s} hue={hue} rotate={a}
            opacity={0.85 + (i % 2) * 0.15}
            style={{ filter: i % 2 ? 'brightness(.9)' : 'none' }} />
        </div>
      );
    })}
  </div>
);

// Water surface ripple — concentric soft circles
const WaterRipple = ({ size = 80, opacity = 1, style = {} }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ opacity, ...style }}>
    <ellipse cx="50" cy="50" rx="46" ry="14" fill="none"
      stroke="rgba(255,255,255,.55)" strokeWidth="1.2" />
    <ellipse cx="50" cy="50" rx="32" ry="9" fill="none"
      stroke="rgba(255,255,255,.4)" strokeWidth="1" />
    <ellipse cx="50" cy="50" rx="18" ry="5" fill="none"
      stroke="rgba(255,255,255,.3)" strokeWidth=".8" />
  </svg>
);

// Mossy stone — irregular pebble with green moss cap
const MossStone = ({ w = 80, h = 50, stone = '#a8a195', moss = '#7E9968', opacity = 1, style = {} }) => (
  <svg viewBox="0 0 100 60" width={w} height={h} style={{ opacity, ...style }}>
    <path d="M5 50 Q 0 30 15 22 Q 25 14 45 16 Q 65 12 80 22 Q 98 30 95 50 Z"
      fill={stone} stroke="rgba(60,50,40,.3)" strokeWidth=".8" />
    {/* shadow side */}
    <path d="M5 50 Q 0 30 15 22 Q 22 18 28 18 L 30 50 Z"
      fill="rgba(0,0,0,.1)" />
    {/* moss */}
    <path d="M14 24 Q 22 14 38 16 Q 50 12 64 14 Q 76 12 86 22 Q 78 22 70 20 Q 60 18 50 22 Q 40 19 30 22 Q 22 22 14 24 Z"
      fill={moss} />
    <circle cx="20" cy="20" r="2.2" fill={moss} />
    <circle cx="76" cy="20" r="1.8" fill={moss} />
    <circle cx="88" cy="24" r="1.6" fill={moss} />
  </svg>
);

// Bigger painterly cloud — multiple bumps
const BigCloud = ({ size = 200, opacity = 0.85, style = {} }) => (
  <svg viewBox="0 0 200 90" width={size} height={size * 90 / 200} style={{ opacity, ...style }}>
    <defs>
      <linearGradient id="cloudG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e8eef3" />
      </linearGradient>
    </defs>
    <path d="M10 70 Q 0 55 14 50 Q 18 30 40 32 Q 50 14 70 22 Q 88 8 110 22 Q 130 12 145 28 Q 170 24 178 44 Q 195 48 188 70 Q 180 78 160 76 L 30 76 Q 14 76 10 70 Z"
      fill="url(#cloudG)" stroke="rgba(120,140,160,.3)" strokeWidth=".8" />
    <path d="M30 64 Q 40 58 55 62 M 90 58 Q 105 52 120 58 M 140 62 Q 152 56 168 62"
      stroke="rgba(255,255,255,.65)" fill="none" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Painterly horizon band — sky + clouds + hills + water reflection
const HorizonBand = ({ height = 220, sky = '#B9D6E0', water = '#7BB8B4', hills = '#7E9968' }) => (
  <svg viewBox="0 0 800 220" preserveAspectRatio="xMidYMid slice" width="100%" height={height}
    style={{ display: 'block' }}>
    <defs>
      <linearGradient id="hzSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#cfe4ec" />
        <stop offset="1" stopColor={sky} />
      </linearGradient>
      <linearGradient id="hzWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={water} stopOpacity=".9" />
        <stop offset="1" stopColor={water} stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="800" height="140" fill="url(#hzSky)" />
    {/* sun */}
    <circle cx="600" cy="60" r="22" fill="#fbe7c7" opacity=".55" />
    <circle cx="600" cy="60" r="14" fill="#fad59c" opacity=".75" />
    {/* clouds */}
    <g opacity=".95">
      <path d="M40 60 Q 30 45 50 42 Q 58 30 75 35 Q 90 26 110 35 Q 130 30 138 50 Q 152 54 144 66 L 50 66 Q 35 66 40 60 Z" fill="#fff" />
      <path d="M260 40 Q 254 28 270 28 Q 280 18 295 24 Q 312 18 325 30 Q 340 30 336 44 L 270 44 Q 256 44 260 40 Z" fill="#fff" opacity=".9" />
      <path d="M460 70 Q 450 55 470 50 Q 480 38 500 44 Q 520 36 538 50 Q 558 50 552 66 L 470 66 Q 458 66 460 70 Z" fill="#fff" opacity=".95" />
    </g>
    {/* distant hills */}
    <path d="M0 140 Q 100 100 200 120 T 400 110 T 600 115 T 800 100 L 800 150 L 0 150 Z"
      fill={hills} opacity=".55" />
    <path d="M0 145 Q 120 120 240 130 T 480 125 T 800 130 L 800 160 L 0 160 Z"
      fill={hills} opacity=".75" />
    {/* water */}
    <rect x="0" y="145" width="800" height="75" fill="url(#hzWater)" />
    {/* water highlights */}
    <g stroke="rgba(255,255,255,.55)" strokeWidth="1.2" fill="none" strokeLinecap="round">
      <path d="M30 175 Q 60 173 90 175" />
      <path d="M120 190 Q 160 188 200 190" />
      <path d="M260 178 Q 290 176 320 178" />
      <path d="M400 195 Q 440 193 480 195" />
      <path d="M540 180 Q 570 178 600 180" />
      <path d="M650 200 Q 690 198 730 200" />
    </g>
  </svg>
);

// Paper grain — subtle noise overlay using SVG turbulence
const PaperGrain = ({ opacity = 0.05 }) => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', opacity, mixBlendMode: 'multiply', zIndex: 4 }}>
    <filter id="paperGrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" />
      <feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 .55 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#paperGrain)" />
  </svg>
);

Object.assign(window, {
  Petal, Sakura5, Leaf, SakuraBranch, DistantHills, Cloud, FloatPetal, PetalScatter,
  Koi, LeafFrond, FrondTuft, WaterRipple, MossStone, BigCloud, HorizonBand, PaperGrain,
  BellFlower, Daisy, GrassBlade, FlowerField, Sun, PuffyCloud, Sparkle, HandArrow, HandCircle, HandUnderline,
});
