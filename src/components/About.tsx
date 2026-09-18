import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MascotIllustration } from './MascotIllustration';

interface DashboardItem {
  label: string;
  value: string;
}

const DASHBOARD_ROWS: DashboardItem[] = [
  {
    label: 'CURRENTLY',
    value: 'Building practical AI and web projects',
  },
  {
    label: 'FOCUS',
    value: 'AI-Based Health Risk Prediction',
  },
  {
    label: 'EXPLORING',
    value: 'Full-Stack Development',
  },
  {
    label: 'LEARNING',
    value: 'AI systems · NLP · Modern Web Development',
  },
  {
    label: 'OPEN TO',
    value: 'Projects · Collaboration · Opportunities',
  },
];

const DashboardRowItem: React.FC<{ row: DashboardItem; index: number }> = ({ row, index }) => {
  return (
    <div className={`dashboard-row reveal-item reveal-delay-${Math.min(index + 3, 8)}`}>
      <div className="dashboard-row-label">
        {row.label}
      </div>
      <div className="dashboard-row-value">
        <span>{row.value}</span>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const aboutGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const targetEl = aboutGridRef.current;
    if (!targetEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            entry.target.setAttribute('data-revealed', 'true');
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px 40px 0px',
      }
    );

    observer.observe(targetEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || e.pointerType === 'pen') {
      setIsHolding(true);
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsHolding(false);
  }, []);

  const handlePointerCancel = useCallback(() => {
    setIsHolding(false);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHolding(false);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* ABOUT Heading */}
        <h2 className="section-title reveal-item">
          <span>About</span>
        </h2>

        {/* ABOUT Content Grid / Card */}
        <div 
          ref={aboutGridRef}
          className={`about-grid reveal-item reveal-delay-1 ${isRevealed ? 'is-revealed' : ''} ${isHolding ? 'is-touch-holding' : ''}`}
          data-revealed={isRevealed ? 'true' : undefined}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerLeave}
          onContextMenu={handleContextMenu}
        >
          {/* Visual Content Layer */}
          <div className="about-text-content">
            <p className="about-paragraph">
              I'm <strong>Mohammed Mayiz Mohtesham</strong>, a Data Science undergraduate at <strong>Anjuman Institute of Technology and Management</strong>.
            </p>
            <p className="about-paragraph">
              I'm passionate about <strong>Data Science</strong>, <strong>Artificial Intelligence</strong>, <strong>Machine Learning</strong>, and <strong>Full-Stack Development</strong>. I enjoy learning by building practical projects, experimenting with new concepts, and turning ideas into clean, functional software.
            </p>
          </div>

          <div className="about-illustration-wrapper">
            <MascotIllustration pose="wave" />
          </div>
        </div>

        {/* STATUS & FOCUS Panel */}
        <div className="status-focus-section-wrapper">
          <div className="dashboard-panel reveal-item reveal-delay-2">
            <div className="dashboard-header">
              <div className="dashboard-title-group">
                <span className="dashboard-live-dot" />
                <span className="dashboard-header-label">STATUS & FOCUS</span>
              </div>
              <div className="dashboard-mascot-inline">
                <MascotIllustration pose="salute" />
              </div>
            </div>

            <div className="dashboard-rows">
              {DASHBOARD_ROWS.map((row, idx) => (
                <DashboardRowItem key={row.label} row={row} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
