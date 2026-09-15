import React, { useState, useCallback } from 'react';
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

export const About: React.FC = () => {
  const [isHolding, setIsHolding] = useState(false);

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
        <h2 className="section-title">
          <span>About</span>
        </h2>

        {/* ABOUT Content Grid / Card */}
        <div 
          className={`about-grid ${isHolding ? 'is-touch-holding' : ''}`}
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
          <div className="dashboard-panel">
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
              {DASHBOARD_ROWS.map((row) => (
                <div key={row.label} className="dashboard-row">
                  <div className="dashboard-row-label">
                    {row.label}
                  </div>
                  <div className="dashboard-row-value">
                    <span>{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
