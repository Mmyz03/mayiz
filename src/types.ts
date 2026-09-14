export interface Project {
  id: string;
  number?: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
}

export interface KeyComponent {
  title: string;
  description: string;
}

export interface ProjectDetail {
  id: string;
  name: string;
  tagline: string;
  status: string;
  isInProgress?: boolean;
  type: string;
  githubUrl: string;
  logoSrc: string;
  whatItIs: string;
  purpose: string;
  howItWorks: string[];
  keyComponents: KeyComponent[];
  technologies: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}
