// External content type definitions for file-based loading

export interface ExternalChapter {
  id: string;
  title: string;
  description: string;
  bookNumber: 1 | 2 | 3;
  chapterNumber: number;
  duration?: string;
  audioUrl?: string;
  fullText?: string;
  summary?: string;
  themes?: string[];
  keyCharacters?: string[];
  readingTime?: string;
  wordCount?: number;
}

export interface ExternalCharacter {
  id: string;
  name: string;
  role: string;
  description: string;
  background: string;
  imageUrl?: string;
  aliases?: string[];
  powers?: string[];
  affiliations?: string[];
  firstAppearance?: {
    bookNumber: number;
    chapterNumber: number;
  };
  characterArc?: {
    phase: string;
    description: string;
  }[];
  relationships?: {
    characterId: string;
    type: string;
    description: string;
  }[];
}

export interface ExternalDeletedScene {
  id: string;
  title: string;
  description: string;
  content: string;
  chapterRelated: string;
  bookNumber: number;
  isPremium: boolean;
  wordCount?: number;
  reason?: string; // Why it was deleted
  alternateVersion?: boolean;
}

export interface ExternalBook {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  bookNumber: 1 | 2 | 3;
  publishDate?: string;
  isbn?: string;
  pages?: number;
  wordCount?: number;
  genre: string[];
  themes: string[];
  coverImageUrl?: string;
  chapters: string[]; // Array of chapter IDs
}

export interface ExternalMetadata {
  series: {
    title: string;
    description: string;
    totalBooks: number;
    author: {
      name: string;
      bio: string;
      website?: string;
      social?: {
        twitter?: string;
        instagram?: string;
        goodreads?: string;
      };
    };
    universe: {
      name: string;
      description: string;
      timeline?: string;
      setting?: string;
    };
  };
  production: {
    creationStartDate: string;
    lastUpdated: string;
    version: string;
    soundtrack?: {
      composer?: string;
      totalTracks?: number;
      duration?: string;
    };
    adaptations?: {
      films?: {
        status: string;
        releaseWindow?: string;
        studio?: string;
      }[];
      series?: {
        status: string;
        platform?: string;
        seasons?: number;
      }[];
    };
  };
}

export interface ContentManifest {
  version: string;
  lastUpdated: string;
  books: string[]; // Filenames of book JSON files
  characters: string[]; // Filenames of character JSON files
  deletedScenes: string[]; // Filenames of deleted scene JSON files
  metadata: string; // Filename of metadata JSON file
  assets?: {
    audio?: string[]; // Audio file paths
    images?: string[]; // Image file paths
    videos?: string[]; // Video file paths
  };
}

// Validation schemas
export interface ContentValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Content loading states
export interface ContentLoadingState {
  isLoading: boolean;
  progress: number;
  currentItem: string;
  error: string | null;
  lastLoaded: string | null;
}