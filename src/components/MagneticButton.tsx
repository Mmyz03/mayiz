import React, { useRef, useEffect } from 'react';

export interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
  strength?: 'strong' | 'medium' | 'weak';
  magneticRadius?: number;
  maxMovement?: number;
  scaleEffect?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  className = '',
  children,
  strength = 'strong',
  magneticRadius: customRadius,
  maxMovement: customMaxMovement,
  scaleEffect: customScaleEffect,
  ...props
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Accessibility & touch detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !canHover) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;
    let currentX = 0;
    let currentY = 0;
    let currentScale = 1;
    let isHovering = false;
    let isRunning = false;

    // Configure magnetic physics based on strength tier
    let maxMovement = 10; // 8-12px for strong (Hero)
    let magneticRadius = 75; // 50-80px for strong (Hero)
    let activeScale = 1.02;

    if (strength === 'weak') {
      maxMovement = 5.5; // 4–7px for weak (Social Icons)
      magneticRadius = 50; // 40–60px for weak (Social Icons)
      activeScale = 1.015; // 1.01–1.02
    } else if (strength === 'medium') {
      maxMovement = 8.5; // Medium (Resume buttons)
      magneticRadius = 70;
      activeScale = 1.02;
    }

    if (customMaxMovement !== undefined) maxMovement = customMaxMovement;
    if (customRadius !== undefined) magneticRadius = customRadius;
    if (customScaleEffect !== undefined) activeScale = customScaleEffect;

    const updatePhysics = () => {
      // Smooth interpolation / easing
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      currentScale += (targetScale - currentScale) * 0.16;

      if (el) {
        el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(${currentScale.toFixed(3)})`;
      }

      const diffX = Math.abs(targetX - currentX);
      const diffY = Math.abs(targetY - currentY);
      const diffScale = Math.abs(targetScale - currentScale);

      // Continue animating until settled
      if (diffX > 0.05 || diffY > 0.05 || diffScale > 0.001 || isHovering) {
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      } else {
        if (el && targetX === 0 && targetY === 0) {
          el.style.transform = 'none';
        }
        isRunning = false;
        animFrameRef.current = null;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      }
    };

    let cachedRect: DOMRect | null = null;
    let lastRectUpdate = 0;

    const getElementRect = () => {
      const now = performance.now();
      if (!cachedRect || now - lastRectUpdate > 400) {
        cachedRect = el.getBoundingClientRect();
        lastRectUpdate = now;
      }
      return cachedRect;
    };

    const handleScrollOrResize = () => {
      cachedRect = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!el) return;

      const rect = getElementRect();
      // Fast AABB pre-check to eliminate calculations if mouse is nowhere near
      const maxRange = magneticRadius + 80;
      if (
        e.clientX < rect.left - maxRange ||
        e.clientX > rect.right + maxRange ||
        e.clientY < rect.top - maxRange ||
        e.clientY > rect.bottom + maxRange
      ) {
        if (isHovering) {
          isHovering = false;
          targetX = 0;
          targetY = 0;
          targetScale = 1;
          startLoop();
        }
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      const buttonRadius = Math.max(rect.width, rect.height) / 2;
      const effectiveRadius = buttonRadius + magneticRadius;

      if (distance < effectiveRadius) {
        isHovering = true;
        const proximity = Math.max(0, 1 - distance / effectiveRadius);
        const pull = Math.pow(proximity, 1.2);

        targetX = Math.max(
          -maxMovement,
          Math.min(maxMovement, (distX / effectiveRadius) * maxMovement * (pull + 0.3) * 1.5)
        );
        targetY = Math.max(
          -maxMovement,
          Math.min(maxMovement, (distY / effectiveRadius) * maxMovement * (pull + 0.3) * 1.5)
        );
        targetScale = activeScale;
        startLoop();
      } else if (isHovering) {
        isHovering = false;
        targetX = 0;
        targetY = 0;
        targetScale = 1;
        startLoop();
      }
    };

    const handleMouseLeaveWindow = () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
      targetScale = 1;
      startLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeaveWindow, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [strength, customRadius, customMaxMovement, customScaleEffect]);

  return (
    <div ref={wrapRef} className="magnetic-btn-wrapper">
      <a className={className} {...props}>
        {children}
      </a>
    </div>
  );
};
