import React, { useState } from 'react';
import { Project } from '../types';
import { IHeartFlagship } from './IHeartFlagship';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { projectDetailsMap } from '../data/projectDetails';

interface ProjectsProps {
  projects: Project[];
  activeTech: string | null;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  activeTech,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const selectedProject = selectedProjectId
    ? projectDetailsMap[selectedProjectId] || null
    : null;

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title reveal-item">
          <span>Projects</span>
        </h2>

        {/* Flagship Major Final-Year Project: I-HEART */}
        <div className="flagship-project-wrapper reveal-item reveal-delay-1">
          <IHeartFlagship
            activeTech={activeTech}
            onOpenDetails={() => setSelectedProjectId('i-heart')}
          />
        </div>

        {/* Other Supporting Projects */}
        <div className="other-projects-section">
          <div className="other-projects-header reveal-item">
            <span className="other-projects-label">OTHER PROJECTS</span>
            <span className="other-projects-line" aria-hidden="true" />
          </div>

          <div className="projects-list">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                activeTech={activeTech}
                onOpenDetails={() => setSelectedProjectId(project.id)}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </section>
  );
};
