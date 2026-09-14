import { useState, useEffect } from 'react';

type WindStream = 'stream-a' | 'stream-b' | 'stream-c' | 'stream-d';
type DepthLayer = 'bg' | 'mid' | 'fg';

interface PetalData {
  id: number;
  variant: 1 | 2 | 3 | 4 | 5;
  stream: WindStream;
  layer: DepthLayer;
  startY: number; // in vh (vertical position spanning full 100vh screen)
  size: number; // in px
  delay: number; // entry delay in seconds
  duration: number; // flight duration in seconds
  opacity: number;
  rotSpeed: number; // 3D tumble speed in seconds
  rotDir: 1 | -1;
  driftY: number; // additional vertical fluctuation offset in px
  scale: number;
  hideOnMobile?: boolean;
}

// 22 Curated Petals on Desktop (12 on Mobile) for a Full-Screen Left-to-Right Wind Gust
const PETALS: PetalData[] = [
  // 1. Lead Scout Petals (0.00s - 0.25s) - Full-screen entry from left
  { id: 1, variant: 1, stream: 'stream-a', layer: 'mid', startY: 14, size: 26, delay: 0.04, duration: 4.10, opacity: 0.92, rotSpeed: 2.8, rotDir: 1, driftY: -15, scale: 1.0 },
  { id: 2, variant: 2, stream: 'stream-b', layer: 'fg',  startY: 42, size: 36, delay: 0.10, duration: 3.90, opacity: 0.96, rotSpeed: 3.2, rotDir: -1, driftY: 10, scale: 1.2 },
  { id: 3, variant: 4, stream: 'stream-c', layer: 'bg',  startY: 76, size: 20, delay: 0.16, duration: 4.30, opacity: 0.65, rotSpeed: 3.6, rotDir: 1, driftY: 20, scale: 0.8, hideOnMobile: true },
  { id: 4, variant: 1, stream: 'stream-d', layer: 'mid', startY: 28, size: 28, delay: 0.22, duration: 4.05, opacity: 0.88, rotSpeed: 3.0, rotDir: 1, driftY: -10, scale: 0.95 },

  // 2. Main Wind Gust Wave (0.28s - 0.65s) - Broad group sweeping into vortex
  { id: 5, variant: 3, stream: 'stream-b', layer: 'fg',  startY: 48, size: 40, delay: 0.30, duration: 4.00, opacity: 0.98, rotSpeed: 2.6, rotDir: 1, driftY: 5, scale: 1.3 },
  { id: 6, variant: 2, stream: 'stream-a', layer: 'mid', startY: 20, size: 28, delay: 0.36, duration: 4.15, opacity: 0.90, rotSpeed: 3.4, rotDir: -1, driftY: -25, scale: 1.05 },
  { id: 7, variant: 5, stream: 'stream-c', layer: 'mid', startY: 66, size: 32, delay: 0.42, duration: 3.95, opacity: 0.92, rotSpeed: 3.1, rotDir: 1, driftY: 15, scale: 1.1 },
  { id: 8, variant: 1, stream: 'stream-b', layer: 'bg',  startY: 36, size: 22, delay: 0.46, duration: 4.25, opacity: 0.62, rotSpeed: 3.8, rotDir: -1, driftY: -12, scale: 0.75, hideOnMobile: true },
  { id: 9, variant: 4, stream: 'stream-d', layer: 'mid', startY: 58, size: 30, delay: 0.52, duration: 4.10, opacity: 0.88, rotSpeed: 2.9, rotDir: 1, driftY: 8, scale: 1.0 },
  { id: 10, variant: 2, stream: 'stream-a', layer: 'fg',  startY: 10, size: 38, delay: 0.58, duration: 3.85, opacity: 0.96, rotSpeed: 2.7, rotDir: -1, driftY: -18, scale: 1.25 },
  { id: 11, variant: 1, stream: 'stream-c', layer: 'bg',  startY: 84, size: 21, delay: 0.64, duration: 4.35, opacity: 0.60, rotSpeed: 3.9, rotDir: 1, driftY: 22, scale: 0.75, hideOnMobile: true },

  // 3. Heart of the Swirl (0.68s - 0.95s) - Rich full-screen spiral vortex
  { id: 12, variant: 3, stream: 'stream-b', layer: 'mid', startY: 44, size: 32, delay: 0.70, duration: 3.95, opacity: 0.90, rotSpeed: 3.3, rotDir: 1, driftY: 0, scale: 1.1 },
  { id: 13, variant: 1, stream: 'stream-a', layer: 'bg',  startY: 16, size: 19, delay: 0.76, duration: 4.40, opacity: 0.58, rotSpeed: 4.0, rotDir: -1, driftY: -30, scale: 0.7, hideOnMobile: true },
  { id: 14, variant: 4, stream: 'stream-c', layer: 'mid', startY: 62, size: 28, delay: 0.82, duration: 4.05, opacity: 0.86, rotSpeed: 3.0, rotDir: 1, driftY: 12, scale: 0.95 },
  { id: 15, variant: 2, stream: 'stream-d', layer: 'fg',  startY: 34, size: 38, delay: 0.86, duration: 3.80, opacity: 0.95, rotSpeed: 2.5, rotDir: -1, driftY: -5, scale: 1.25 },
  { id: 16, variant: 5, stream: 'stream-b', layer: 'bg',  startY: 52, size: 23, delay: 0.92, duration: 4.30, opacity: 0.64, rotSpeed: 3.7, rotDir: 1, driftY: 14, scale: 0.8, hideOnMobile: true },

  // 4. Trailing Stream & Exit Stream (0.98s - 1.25s)
  { id: 17, variant: 1, stream: 'stream-a', layer: 'mid', startY: 24, size: 27, delay: 1.00, duration: 3.90, opacity: 0.88, rotSpeed: 3.2, rotDir: -1, driftY: -16, scale: 1.0 },
  { id: 18, variant: 2, stream: 'stream-c', layer: 'fg',  startY: 72, size: 36, delay: 1.06, duration: 3.75, opacity: 0.94, rotSpeed: 2.8, rotDir: 1, driftY: 18, scale: 1.2, hideOnMobile: true },
  { id: 19, variant: 4, stream: 'stream-b', layer: 'bg',  startY: 40, size: 18, delay: 1.12, duration: 4.40, opacity: 0.55, rotSpeed: 4.1, rotDir: -1, driftY: -8, scale: 0.7, hideOnMobile: true },
  { id: 20, variant: 3, stream: 'stream-d', layer: 'mid', startY: 30, size: 30, delay: 1.16, duration: 3.85, opacity: 0.86, rotSpeed: 3.1, rotDir: 1, driftY: -2, scale: 1.0 },
  { id: 21, variant: 1, stream: 'stream-c', layer: 'bg',  startY: 80, size: 20, delay: 1.22, duration: 4.35, opacity: 0.60, rotSpeed: 3.8, rotDir: 1, driftY: 25, scale: 0.75, hideOnMobile: true },
  { id: 22, variant: 2, stream: 'stream-b', layer: 'mid', startY: 46, size: 29, delay: 1.26, duration: 3.80, opacity: 0.88, rotSpeed: 2.9, rotDir: -1, driftY: 6, scale: 1.05 }
];

// SVG Petal Graphics - High Definition, Delicate, Translucent with Soft Pink Gradients
function PetalGraphic({ variant }: { variant: 1 | 2 | 3 | 4 | 5 }) {
  if (variant === 1) {
    // Single Classic Sakura Petal with Delicate Tip Notch & Subtle Translucency
    return (
      <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="petal-svg">
        <defs>
          <linearGradient id="petal-g1" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#E5738F" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F8ADC0" stopOpacity="0.88" />
            <stop offset="85%" stopColor="#FFDEE8" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#FFF2F6" stopOpacity="0.80" />
          </linearGradient>
          <linearGradient id="petal-h1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#F9A8BC" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Soft back shadow */}
        <path
          d="M30 65 C18 52 8 38 12 20 C14 12 22 7 27 10 C29 11 31 11 33 10 C38 7 46 12 48 20 C52 38 42 52 30 65 Z"
          fill="url(#petal-g1)"
        />
        {/* Highlight sheen */}
        <path
          d="M30 63 C20 51 12 38 15 22 C17 15 23 10 27 12 C28 17 26 36 30 58 Z"
          fill="url(#petal-h1)"
        />
        {/* Subtle center spine vein */}
        <path
          d="M30 62 Q30.5 35 30 11"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === 2) {
    // Curved Fluttering Petal with 3D Fold Crease
    return (
      <svg viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="petal-svg">
        <defs>
          <linearGradient id="petal-g2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DB5E7C" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#F69BB1" stopOpacity="0.90" />
            <stop offset="85%" stopColor="#FDCED9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFF5F8" stopOpacity="0.80" />
          </linearGradient>
          <linearGradient id="petal-fold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(205,75,105,0.2)" />
          </linearGradient>
        </defs>
        {/* Main curved petal body */}
        <path
          d="M12 55 C16 40 10 24 22 12 C32 2 48 8 54 22 C60 36 50 48 38 56 C26 62 16 60 12 55 Z"
          fill="url(#petal-g2)"
        />
        {/* Fold crease highlight */}
        <path
          d="M12 55 C18 42 22 28 35 18 C44 11 50 14 54 22 C44 32 30 46 12 55 Z"
          fill="url(#petal-fold)"
        />
      </svg>
    );
  }

  if (variant === 3) {
    // Twin Sakura Petals swirling together
    return (
      <svg viewBox="0 0 75 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="petal-svg">
        <defs>
          <linearGradient id="petal-g3a" x1="30%" y1="100%" x2="70%" y2="0%">
            <stop offset="0%" stopColor="#E26584" stopOpacity="0.92" />
            <stop offset="50%" stopColor="#F7A7BA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFF0F4" stopOpacity="0.78" />
          </linearGradient>
          <linearGradient id="petal-g3b" x1="80%" y1="100%" x2="20%" y2="0%">
            <stop offset="0%" stopColor="#D65172" stopOpacity="0.94" />
            <stop offset="55%" stopColor="#F495AC" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#FEE4EC" stopOpacity="0.82" />
          </linearGradient>
        </defs>
        {/* Background smaller petal */}
        <g transform="translate(18, 5) rotate(22)">
          <path
            d="M20 45 C12 36 6 26 9 14 C11 8 16 5 20 7 C21 8 22 8 23 7 C27 5 32 8 34 14 C37 26 30 36 20 45 Z"
            fill="url(#petal-g3a)"
          />
        </g>
        {/* Foreground main petal */}
        <g transform="translate(0, 12) rotate(-15)">
          <path
            d="M25 52 C15 41 7 30 10 16 C12 9 18 5 22 7 C24 8 25 8 27 7 C31 5 37 9 39 16 C42 30 35 41 25 52 Z"
            fill="url(#petal-g3b)"
          />
          <path
            d="M25 50 Q26 28 25 8"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="0.7"
          />
        </g>
      </svg>
    );
  }

  if (variant === 4) {
    // Soft Peach Blossom Petal (Silky rounded teardrop)
    return (
      <svg viewBox="0 0 55 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="petal-svg">
        <defs>
          <radialGradient id="petal-g4" cx="50%" cy="75%" r="70%">
            <stop offset="0%" stopColor="#E87693" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F8B4C4" stopOpacity="0.90" />
            <stop offset="85%" stopColor="#FDE3EA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFF7F9" stopOpacity="0.80" />
          </radialGradient>
        </defs>
        <path
          d="M27 60 C14 50 6 36 9 20 C12 6 22 3 27 3 C32 3 42 6 45 20 C48 36 40 50 27 60 Z"
          fill="url(#petal-g4)"
        />
        {/* Soft ambient highlight */}
        <ellipse cx="27" cy="18" rx="8" ry="12" fill="rgba(255, 255, 255, 0.35)" />
      </svg>
    );
  }

  // Variant 5: Miniature 3-Petal Blossom Bud caught in the breeze
  return (
    <svg viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="petal-svg">
      <defs>
        <linearGradient id="petal-g5" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DC5E7D" />
          <stop offset="50%" stopColor="#F6A3B6" />
          <stop offset="100%" stopColor="#FFEBF0" />
        </linearGradient>
      </defs>
      <g transform="translate(32.5, 32.5)">
        {/* 3 Radiating micro-petals */}
        <path d="M0,0 C-10,-12 -12,-25 0,-28 C12,-25 10,-12 0,0" fill="url(#petal-g5)" transform="rotate(0)" />
        <path d="M0,0 C-10,-12 -12,-25 0,-28 C12,-25 10,-12 0,0" fill="url(#petal-g5)" transform="rotate(120)" />
        <path d="M0,0 C-10,-12 -12,-25 0,-28 C12,-25 10,-12 0,0" fill="url(#petal-g5)" transform="rotate(240)" />
        {/* Tiny golden core */}
        <circle cx="0" cy="0" r="3.5" fill="#C85A74" />
        <circle cx="0" cy="0" r="2" fill="#F4A261" />
      </g>
    </svg>
  );
}

// Full-Screen Subtle Translucent Airflow Streams
function WindWisps() {
  return (
    <div className="wind-wisps-container" aria-hidden="true">
      <svg className="wind-wisp-svg wisp-1" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="none">
        <path
          d="M -150,380 C 400,240 750,620 1020,440 C 1280,280 1560,520 2100,320"
          stroke="url(#wisp-grad-1)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id="wisp-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E5738F" stopOpacity="0" />
            <stop offset="25%" stopColor="#F8ADC0" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#F9A8BC" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="wind-wisp-svg wisp-2" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="none">
        <path
          d="M -120,620 C 380,720 720,320 1060,560 C 1320,720 1680,420 2120,500"
          stroke="url(#wisp-grad-2)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="16 12"
          fill="none"
        />
        <defs>
          <linearGradient id="wisp-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="35%" stopColor="#F8ADC0" stopOpacity="0.16" />
            <stop offset="65%" stopColor="#E5738F" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function FlowerIntro() {
  const [shouldRender, setShouldRender] = useState(() => {
    // Initial check: if sessionStorage already has the flag or reduced-motion is requested, skip immediately
    try {
      if (typeof window !== 'undefined') {
        const hasShown = sessionStorage.getItem('portfolioIntroShown');
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (hasShown || prefersReduced) {
          return false;
        }
        // Mark session as shown
        sessionStorage.setItem('portfolioIntroShown', 'true');
        return true;
      }
    } catch {
      // If sessionStorage is unavailable/blocked, bypass safely
      return false;
    }
    return false;
  });

  useEffect(() => {
    if (!shouldRender) return;

    // Normal clean unmount after 4.9s
    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 4900);

    // Fail-safe guarantee timeout at 5.5s
    const failSafeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 5500);

    return () => {
      clearTimeout(timer);
      clearTimeout(failSafeTimer);
    };
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="wind-intro-overlay" aria-hidden="true">
      {/* Full-screen airflow wisps */}
      <WindWisps />

      {/* Full-screen wind-carried Petals */}
      {PETALS.map((p) => (
        <div
          key={p.id}
          className={`wind-petal-container ${p.stream} layer-${p.layer} ${
            p.hideOnMobile ? 'hide-mobile-petal' : ''
          }`}
          style={
            {
              top: `${p.startY}vh`,
              width: `${p.size}px`,
              height: `${p.size * 1.15}px`,
              '--entry-delay': `${p.delay}s`,
              '--flight-duration': `${p.duration}s`,
              '--target-opacity': p.opacity,
              '--drift-y': `${p.driftY}px`,
              '--petal-scale': p.scale,
              '--tumble-speed': `${p.rotSpeed}s`,
              '--rot-dir': p.rotDir,
            } as React.CSSProperties
          }
        >
          <div className="petal-tumble-wrapper">
            <PetalGraphic variant={p.variant} />
          </div>
        </div>
      ))}
    </div>
  );
}
