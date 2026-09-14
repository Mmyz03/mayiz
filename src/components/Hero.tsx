import React from 'react';
import { ArrowDown } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: id === 'footer' ? document.documentElement.scrollHeight : offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="hero-editorial-section">
      <div className="container">
        {/* Top Eyebrow Tag */}
        <div className="hero-eyebrow-row">
          <span className="hero-eyebrow-text">AI · DATA SCIENCE · DEVELOPMENT</span>
          <span className="hero-eyebrow-line" aria-hidden="true" />
        </div>

        {/* Top 2-Column Row: Text on Left, Medium-Small Portrait on Right */}
        <div className="hero-top-row">
          {/* Left Column: Headline, Bio Paragraph, Action Buttons */}
          <div className="hero-main-column">
            <h1 className="hero-editorial-heading">
              Turning curiosity into{' '}
              <span className="headline-serif-italic">code.</span>
            </h1>

            <p className="hero-editorial-bio">
              I build practical software across AI, machine learning, data, and the web — learning by turning ideas into working projects.
            </p>

            <div className="hero-editorial-actions">
              <MagneticButton
                href="#footer"
                onClick={(e) => scrollToSection('footer', e)}
                className="hero-btn-filled"
              >
                <span>REACH OUT</span>
              </MagneticButton>

              <MagneticButton
                href="#projects"
                onClick={(e) => scrollToSection('projects', e)}
                className="hero-btn-outlined"
              >
                <span>TAKE A LOOK</span>
                <ArrowDown size={15} className="btn-icon" />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Medium-Small Portrait in Clean Modern Frame */}
          <div className="hero-portrait-companion">
            <div className="portrait-modern-frame">
              {/* Subtle Minimal Corner Accent */}
              <div className="portrait-frame-accent" aria-hidden="true">
                <span className="portrait-frame-sparkle">✦</span>
              </div>

              {/* Photo Container */}
              <div className="portrait-photo-container">
                <img
                  src="/mayiz-portrait.jpg"
                  alt="Mohammed Mayiz Mohtesham"
                  className="hero-portrait-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
