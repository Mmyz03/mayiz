import { ProjectDetail } from '../types';

export const projectDetailsMap: Record<string, ProjectDetail> = {
  'i-heart': {
    id: 'i-heart',
    name: 'I-HEART',
    tagline: 'predict today. protect tomorrow.',
    status: 'Currently In Progress',
    isInProgress: true,
    type: 'Final-Year Major Project',
    githubUrl: 'https://github.com/Mmyz03/I-HEART',
    logoSrc: '/iheart-logo.png',
    whatItIs:
      'I-HEART is an AI-based health risk prediction system focused on diabetes and cardiovascular disease risk assessment. It combines machine learning algorithms, standardized health datasets, and Explainable AI (XAI) to deliver transparent, understandable risk evaluations rather than black-box outputs.',
    purpose:
      'Early detection of cardiovascular diseases and diabetes significantly improves clinical outcomes. Traditional assessment tools can be rigid, while standard AI models often lack transparency. I-HEART was built to explore how machine learning can provide proactive, multi-factor risk estimation while clearly attributing predictions to specific biometric indicators.',
    howItWorks: [
      'Patient health parameters (blood glucose, blood pressure, cholesterol levels, BMI, age, and lifestyle factors) are entered via the web interface.',
      'The data passes through preprocessing pipelines for validation, missing value imputation, and feature standardization.',
      'Trained supervised machine learning models compute comprehensive risk probabilities for cardiovascular conditions and diabetes.',
      'An explainability layer evaluates feature contributions to present an intuitive breakdown of which biometric indicators most influenced the predicted risk score.',
    ],
    keyComponents: [
      {
        title: 'Frontend Web Interface',
        description:
          'Responsive interface for entering patient biometrics, viewing risk scores, and exploring explainable AI insight breakdowns.',
      },
      {
        title: 'Python / Flask Backend',
        description:
          'Lightweight REST API handling data validation, feature preprocessing, and orchestrating model inference pipelines.',
      },
      {
        title: 'Machine Learning Pipelines',
        description:
          'Supervised classification models trained to evaluate complex non-linear risk correlations across medical indicators.',
      },
      {
        title: 'Health Datasets & Preprocessing',
        description:
          'Standardized diabetes and cardiovascular clinical datasets processed with feature selection and statistical normalization.',
      },
      {
        title: 'Explainability & Feature Attribution',
        description:
          'Explainable AI (XAI) layer that explains prediction rationale by highlighting the highest-impact patient risk factors.',
      },
      {
        title: 'Testing & Verification',
        description:
          'Validation routines ensuring reproducible model inference and consistent API contract responses.',
      },
    ],
    technologies: [
      'Python',
      'Machine Learning',
      'Explainable AI',
      'Health Datasets',
      'Flask',
      'Scikit-learn',
      'Web Interface',
    ],
  },

  fixit: {
    id: 'fixit',
    name: 'Fixit',
    tagline: 'report. track. resolve.',
    status: 'Active / Implemented Frontend',
    isInProgress: false,
    type: 'Web Application',
    githubUrl: 'https://github.com/Mmyz03/fixitt',
    logoSrc: '/fixit-logo.png',
    whatItIs:
      'Fixit is a smart campus issue management platform designed to help students, faculty, and staff easily report, organize, and track college facility and maintenance issues in real time.',
    purpose:
      'Campus infrastructure problems—such as damaged lab fixtures, electrical faults, or plumbing issues—are frequently delayed due to fragmented communication. Fixit provides a centralized, modern interface that streamlines reporting and enhances resolution tracking for college communities.',
    howItWorks: [
      'Users report an issue by selecting the facility category (e.g., Electrical, Lab, Infrastructure), adding details, and submitting a ticket.',
      'The application logs the request with state management, categorizing it by severity and location.',
      'Users track ticket lifecycle statuses through responsive cards and filterable status dashboards.',
    ],
    keyComponents: [
      {
        title: 'React Frontend',
        description:
          'Clean, component-driven user interface built with modern React principles and interactive state management.',
      },
      {
        title: 'TypeScript Type Safety',
        description:
          'Strict static typing across domain models (tickets, categories, priority levels) and component props to ensure runtime reliability.',
      },
      {
        title: 'Vite Build Tooling',
        description:
          'High-performance development environment with instant hot module replacement and optimized production builds.',
      },
      {
        title: 'Responsive & Accessible UI',
        description:
          'Custom CSS styling tailored for desktop, tablet, and mobile displays with clear visual feedback.',
      },
      {
        title: 'Reusable UI Components',
        description:
          'Modular component library including issue cards, form inputs, status chips, and filter bars.',
      },
      {
        title: 'Feature-Based Organization',
        description:
          'Clean architectural folder layout cleanly separating UI components, custom hooks, service utilities, and domain types.',
      },
      {
        title: 'Service Utilities & Custom Hooks',
        description:
          'Modular helper functions and state management hooks for filtering, sorting, and manipulating issue collections.',
      },
      {
        title: 'Domain Models & Interfaces',
        description:
          'Well-structured TypeScript interfaces defining issue lifecycles, user interactions, and category metadata.',
      },
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'CSS',
      'Custom Hooks',
      'Reusable Components',
      'Responsive Design',
    ],
  },

  lore: {
    id: 'lore',
    name: 'LORE',
    tagline: 'stories worth getting lost in.',
    status: 'Completed / Active',
    isInProgress: false,
    type: 'AI / NLP System',
    githubUrl: 'https://github.com/Mmyz03/LORE',
    logoSrc: '/lore-logo.png',
    whatItIs:
      'LORE is an AI-based story recommendation and retrieval system that analyzes user narrative preferences to discover and retrieve relevant stories from a rich collection of 520+ stories using Natural Language Processing.',
    purpose:
      'Traditional search systems often rely on exact keyword matches, failing to capture subtle narrative arcs, mood, and atmospheric themes. LORE was built to understand narrative context and provide explainable story recommendations that clearly highlight why each story was suggested.',
    howItWorks: [
      'The user inputs a query or narrative prompt describing desired story elements, themes, or moods.',
      'The NLP preprocessing pipeline tokenizes, normalizes, and removes stop words from the query string.',
      'The processed prompt is transformed into a TF-IDF (Term Frequency-Inverse Document Frequency) vector representation.',
      'Cosine similarity algorithms compute mathematical similarity scores between the query vector and the indexed vectors of 520+ stories.',
      'Stories are ranked with metadata weighting, and a "Why this story?" explanation is generated to illuminate matching narrative attributes.',
    ],
    keyComponents: [
      {
        title: 'Story Ingestion & Corpus (520+ Stories)',
        description:
          'Curated collection of over 520 stories annotated with rich genre tags, themes, and narrative metadata.',
      },
      {
        title: 'Text Preprocessing Pipeline',
        description:
          'Tokenization, text normalization, and stop-word filtering routines preparing raw text for semantic analysis.',
      },
      {
        title: 'TF-IDF Vector Space Modeling',
        description:
          'Term Frequency-Inverse Document Frequency vectorization capturing term importance across the entire story corpus.',
      },
      {
        title: 'Cosine Similarity Retrieval Engine',
        description:
          'High-efficiency vector similarity matching ranking the closest narrative matches to the user prompt.',
      },
      {
        title: 'Metadata-Based Ranking',
        description:
          'Weighted ranking combining semantic similarity scores with thematic attributes and story metadata.',
      },
      {
        title: 'Explainable "Why this story?" Insights',
        description:
          'Transparent recommendation explanations detailing the specific thematic overlaps between the user query and retrieved stories.',
      },
      {
        title: 'Flask API Backend',
        description:
          'Lightweight Python backend serving story retrieval endpoints and returning structured recommendation payloads.',
      },
    ],
    technologies: [
      'Python',
      'NLP',
      'TF-IDF',
      'Cosine Similarity',
      'Flask',
      'Scikit-learn',
      '520+ Stories Corpus',
    ],
  },
};
