import React from 'react';
import { skillCategories, SKILL_PROJECT_MAP } from '../data/skills';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SkillsProps {
  activeTech: string | null;
  onHoverTech: (tech: string | null) => void;
}

export const Skills: React.FC<SkillsProps> = ({ activeTech, onHoverTech }) => {
  const activeProjects = activeTech ? SKILL_PROJECT_MAP[activeTech] || [] : [];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="skills-header-block">
          <div className="skills-section-tag">WHAT I WORK WITH</div>
          <h2 className="skills-main-title">What I work with</h2>
          <p className="skills-subtitle">
            The tools I use to turn ideas into working things.
          </p>

          {/* Interactive Project Connection Strip */}
          <div className="skills-connection-bar" aria-live="polite">
            {activeTech ? (
              <div className="connection-active">
                <span className="connection-tech">{activeTech}</span>
                <ArrowRight size={14} className="connection-arrow" />
                <span className="connection-label">used in:</span>
                <div className="connection-project-tags">
                  {activeProjects.length > 0 ? (
                    activeProjects.map((proj) => (
                      <span key={proj} className="connection-project-pill">
                        {proj}
                      </span>
                    ))
                  ) : (
                    <span className="connection-project-pill">Featured Work</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="connection-idle">
                <Sparkles size={13} className="connection-idle-icon" />
                <span>Hover any skill to see connected projects</span>
              </div>
            )}
          </div>
        </div>

        {/* Bordered Category Containers Layout */}
        <div className="skills-editorial-grid">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className={`skills-category-card ${category.name === 'WEB' ? 'web-category' : ''}`}
            >
              <div className="skills-category-header">
                <span className="skills-category-title">{category.name}</span>
              </div>

              <div className="skills-items-flow">
                {category.skills.map((skill) => {
                  const isHovered = activeTech?.toLowerCase() === skill.toLowerCase();
                  const connectedProjects = SKILL_PROJECT_MAP[skill] || [];

                  return (
                    <button
                      key={skill}
                      type="button"
                      className={`skill-interactive-item ${isHovered ? 'active' : ''}`}
                      onMouseEnter={() => onHoverTech(skill)}
                      onMouseLeave={() => onHoverTech(null)}
                      onClick={() => onHoverTech(isHovered ? null : skill)}
                      aria-label={`${skill} — used in ${connectedProjects.join(', ') || 'projects'}`}
                    >
                      <span className="skill-item-text">{skill}</span>
                      <span className="skill-active-indicator" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
