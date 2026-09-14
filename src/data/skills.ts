import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'LANGUAGES',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    name: 'AI & DATA',
    skills: [
      'Machine Learning',
      'Natural Language Processing',
      'Pandas',
      'NumPy',
      'Scikit-learn',
    ],
  },
  {
    name: 'WEB',
    skills: ['React', 'Vite', 'Flask', 'REST APIs', 'Responsive Web Design'],
  },
  {
    name: 'DATABASES',
    skills: ['MySQL', 'MongoDB'],
  },
  {
    name: 'TOOLS',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
];

export const SKILL_PROJECT_MAP: Record<string, string[]> = {
  'Python': ['I-HEART', 'LORE'],
  'JavaScript': ['Fixit'],
  'TypeScript': ['Fixit'],
  'SQL': ['I-HEART', 'Fixit'],
  'HTML': ['Fixit', 'LORE'],
  'CSS': ['Fixit', 'LORE'],
  'Machine Learning': ['I-HEART'],
  'Natural Language Processing': ['LORE'],
  'Pandas': ['I-HEART'],
  'NumPy': ['I-HEART'],
  'Scikit-learn': ['I-HEART', 'LORE'],
  'React': ['Fixit'],
  'Vite': ['Fixit'],
  'Flask': ['I-HEART', 'LORE'],
  'REST APIs': ['I-HEART', 'Fixit'],
  'Responsive Web Design': ['Fixit', 'LORE'],
  'MySQL': ['Fixit'],
  'MongoDB': ['Fixit'],
  'Git': ['I-HEART', 'Fixit', 'LORE'],
  'GitHub': ['I-HEART', 'Fixit', 'LORE'],
  'VS Code': ['I-HEART', 'Fixit', 'LORE'],
};
