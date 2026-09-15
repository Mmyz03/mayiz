import React, { useState, useCallback, useRef, useEffect } from 'react';

export interface CardPetal {
  id: number;
  left: string;
  top: string;
  driftX: string;
  fallY: string;
  rotStart: number;
  rotEnd: number;
  size: number;
  duration: number;
  delay: number;
}

// 7 petals distributed across the perimeter of card targets (Skills, Projects, Resume):
// top border (3), left border (1), right border (1), bottom border (2)
const CARD_BORDER_PRESETS = [
  // Top border
  { left: '18%', top: '-4px', driftX: '12px', fallY: '48px', rotStart: -15, rotEnd: 75, size: 13, duration: 1.0, delay: 0 },
  { left: '52%', top: '-4px', driftX: '-10px', fallY: '54px', rotStart: 10, rotEnd: 110, size: 15, duration: 1.1, delay: 0.03 },
  { left: '84%', top: '-4px', driftX: '14px', fallY: '50px', rotStart: -25, rotEnd: 85, size: 12, duration: 0.95, delay: 0.06 },
  // Left border
  { left: '-4px', top: '40%', driftX: '16px', fallY: '44px', rotStart: 20, rotEnd: 120, size: 14, duration: 1.15, delay: 0.02 },
  // Right border
  { left: 'calc(100% - 10px)', top: '45%', driftX: '-14px', fallY: '46px', rotStart: -10, rotEnd: 95, size: 13, duration: 1.05, delay: 0.05 },
  // Bottom border
  { left: '28%', top: 'calc(100% - 6px)', driftX: '10px', fallY: '38px', rotStart: -12, rotEnd: 70, size: 13, duration: 1.0, delay: 0.04 },
  { left: '72%', top: 'calc(100% - 6px)', driftX: '-8px', fallY: '40px', rotStart: 16, rotEnd: 100, size: 14, duration: 1.08, delay: 0.07 },
];

// 7 petals distributed across the perimeter of slim row targets (Status & Focus items):
const ROW_BORDER_PRESETS = [
  // Top border
  { left: '18%', top: '-3px', driftX: '8px', fallY: '34px', rotStart: -10, rotEnd: 70, size: 12, duration: 0.95, delay: 0 },
  { left: '50%', top: '-3px', driftX: '-6px', fallY: '38px', rotStart: 12, rotEnd: 95, size: 13, duration: 1.0, delay: 0.03 },
  { left: '82%', top: '-3px', driftX: '10px', fallY: '36px', rotStart: -18, rotEnd: 80, size: 12, duration: 0.92, delay: 0.06 },
  // Left border
  { left: '-3px', top: '30%', driftX: '12px', fallY: '30px', rotStart: 15, rotEnd: 100, size: 13, duration: 1.05, delay: 0.02 },
  // Right border
  { left: 'calc(100% - 8px)', top: '35%', driftX: '-10px', fallY: '32px', rotStart: -12, rotEnd: 85, size: 12, duration: 0.98, delay: 0.05 },
  // Bottom border
  { left: '32%', top: 'calc(100% - 5px)', driftX: '8px', fallY: '28px', rotStart: -10, rotEnd: 65, size: 12, duration: 0.95, delay: 0.04 },
  { left: '68%', top: 'calc(100% - 5px)', driftX: '-6px', fallY: '30px', rotStart: 14, rotEnd: 90, size: 13, duration: 1.02, delay: 0.07 },
];

interface TargetPetalsOptions {
  fallDistance?: 'compact' | 'standard';
}

export function useTargetPetals(options?: TargetPetalsOptions) {
  const [activePetals, setActivePetals] = useState<CardPetal[]>([]);
  const timerRef = useRef<number | null>(null);
  const counterRef = useRef(0);
  const touchStateRef = useRef<{
    startX: number;
    startY: number;
    startTime: number;
    isCancelled: boolean;
  }>({
    startX: 0,
    startY: 0,
    startTime: 0,
    isCancelled: true,
  });

  const triggerPetals = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const batchId = ++counterRef.current;
    const presets = options?.fallDistance === 'compact' ? ROW_BORDER_PRESETS : CARD_BORDER_PRESETS;
    const newPetals: CardPetal[] = presets.map((preset, index) => ({
      ...preset,
      id: batchId * 100 + index,
    }));

    setActivePetals(newPetals);

    timerRef.current = window.setTimeout(() => {
      setActivePetals([]);
      timerRef.current = null;
    }, 1300);
  }, [options?.fallDistance]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    touchStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startTime: performance.now(),
      isCancelled: false,
    };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (touchStateRef.current.isCancelled) return;
    const dist = Math.hypot(
      e.clientX - touchStateRef.current.startX,
      e.clientY - touchStateRef.current.startY
    );
    // If pointer moves more than 8px, it is a scroll/swipe: cancel activation immediately
    if (dist > 8) {
      touchStateRef.current.isCancelled = true;
    }
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (touchStateRef.current.isCancelled) return;
    const dist = Math.hypot(
      e.clientX - touchStateRef.current.startX,
      e.clientY - touchStateRef.current.startY
    );
    const duration = performance.now() - touchStateRef.current.startTime;
    // Strictly verify intentional direct tap (< 8px movement and < 800ms duration)
    if (dist <= 8 && duration < 800) {
      triggerPetals();
    }
    touchStateRef.current.isCancelled = true;
  }, [triggerPetals]);

  const onPointerCancel = useCallback(() => {
    touchStateRef.current.isCancelled = true;
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    activePetals,
    triggerPetals,
    touchProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}

// Aliases for backwards compatibility
export { useTargetPetals as useLocalCardPetals };
export { useTargetPetals as useSectionPetals };

export const CardPetalsLayer: React.FC<{ petals: CardPetal[] }> = ({ petals }) => {
  if (!petals || petals.length === 0) return null;

  return (
    <div className="section-petals-layer" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="section-touch-petal"
          style={
            {
              left: petal.left,
              top: petal.top,
              width: `${petal.size}px`,
              height: `${petal.size * 1.25}px`,
              '--drift-x': petal.driftX,
              '--fall-y': petal.fallY,
              '--rot-start': `${petal.rotStart}deg`,
              '--rot-end': `${petal.rotEnd}deg`,
              '--petal-duration': `${petal.duration}s`,
              '--petal-delay': `${petal.delay}s`,
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="section-petal-svg">
            <defs>
              <linearGradient id={`cardPetalGrad-${petal.id}`} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DB5E7C" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#F79BB1" stopOpacity="0.90" />
                <stop offset="90%" stopColor="#FDDFE6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFF5F8" stopOpacity="0.80" />
              </linearGradient>
            </defs>
            <path
              d="M20 48 C11 37 4 25 8 12 C10 6 16 3 20 5 C24 3 30 6 32 12 C36 25 29 37 20 48 Z"
              fill={`url(#cardPetalGrad-${petal.id})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

// Aliases for backwards compatibility
export { CardPetalsLayer as SectionPetalsLayer };
