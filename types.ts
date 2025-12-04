
export type TagType = 'diet' | 'flavor';

export interface Tag {
  id: string;
  label: string;
  type: TagType;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Starter' | 'Main' | 'Dessert' | 'Side' | 'Special';
  image?: string;
  allergens: string[];
  tags: Tag[];
  pairingIds: string[]; // References to wines
}

export type WineColor = 'Red' | 'White' | 'Rosé' | 'Sparkling';
export type WineStyle = 'Light' | 'Bold' | 'Fruity' | 'Dry' | 'Sweet' | 'Mineral';

export interface Wine {
  id: string;
  name: string;
  producer: string;
  producerDescription?: string;
  producerImage?: string; // New field for winery image
  region: string;
  country: string;
  grapes: string[];
  vintage: string;
  color: WineColor;
  style: WineStyle;
  priceGlass?: number;
  priceBottle: number;
  description: string;
  pairingPitch: string;
  image?: string;
  tags: string[]; 
  pairingRole?: 'Safe' | 'Upsell' | 'Sommelier Choice';
}

// --- NEW USER TYPE ---
export interface User {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  restaurant: string;
  level: string;
}

// --- NEW LEARNING TYPES ---

export type ModuleType = 'video' | 'article' | 'quiz';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LearningModule {
  id: string;
  title: string;
  description?: string; // Added description for video context
  type: ModuleType;
  duration: string; // e.g. "2 min"
  xp: number;
  isLocked?: boolean;
  content?: string[]; // For articles
  videoUrl?: string; // For mock video thumbnail
  quizData?: QuizQuestion;
}

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number; // 0-100
  totalModules: number;
  modules: LearningModule[];
}
