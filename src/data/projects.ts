import { Project } from '../types';

export const otherProjects: Project[] = [
  {
    id: 'fixit',
    name: 'Fixit',
    tagline: 'report. track. resolve.',
    description:
      'A web application designed to help users report and track issues around a college campus.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
    githubUrl: 'https://github.com/Mmyz03/fixitt',
  },
  {
    id: 'lore',
    name: 'LORE',
    tagline: 'stories worth getting lost in.',
    description:
      'An NLP-based system that helps users discover relevant stories from a collection of 520+ stories.',
    technologies: ['Python', 'NLP', 'Flask', 'Scikit-learn'],
    githubUrl: 'https://github.com/Mmyz03/LORE',
  },
];

// For backward compatibility or general list
export const projects: Project[] = otherProjects;
