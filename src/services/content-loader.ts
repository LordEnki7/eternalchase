import { 
  ExternalChapter, 
  ExternalCharacter, 
  ExternalDeletedScene, 
  ExternalBook, 
  ExternalMetadata, 
  ContentManifest,
  ContentValidation,
  ContentLoadingState 
} from '../types/content';

class ContentLoaderService {
  private baseUrl = '/content'; // Relative to app root
  private cache = new Map<string, any>();
  private loadingState: ContentLoadingState = {
    isLoading: false,
    progress: 0,
    currentItem: '',
    error: null,
    lastLoaded: null
  };

  // Get loading state
  getLoadingState(): ContentLoadingState {
    return { ...this.loadingState };
  }

  // Subscribe to loading state changes
  onLoadingStateChange(callback: (state: ContentLoadingState) => void) {
    // Simple state change notification
    const originalSetState = this.setLoadingState.bind(this);
    this.setLoadingState = (newState: Partial<ContentLoadingState>) => {
      originalSetState(newState);
      callback(this.loadingState);
    };
  }

  private setLoadingState(newState: Partial<ContentLoadingState>) {
    this.loadingState = { ...this.loadingState, ...newState };
  }

  // Load and validate JSON file
  private async loadJsonFile<T>(filePath: string): Promise<T> {
    const cacheKey = filePath;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${filePath}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      }
      
      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      throw error;
    }
  }

  // Load content manifest
  async loadManifest(): Promise<ContentManifest> {
    this.setLoadingState({ isLoading: true, currentItem: 'manifest.json', progress: 0 });
    
    try {
      const manifest = await this.loadJsonFile<ContentManifest>('manifest.json');
      this.setLoadingState({ progress: 10 });
      return manifest;
    } catch (error) {
      this.setLoadingState({ 
        error: `Failed to load content manifest: ${error}`,
        isLoading: false 
      });
      throw error;
    }
  }

  // Load all books
  async loadBooks(): Promise<ExternalBook[]> {
    this.setLoadingState({ currentItem: 'books', progress: 20 });
    
    try {
      const manifest = await this.loadManifest();
      const books: ExternalBook[] = [];
      
      for (let i = 0; i < manifest.books.length; i++) {
        const bookFile = manifest.books[i];
        this.setLoadingState({ 
          currentItem: `books/${bookFile}`,
          progress: 20 + (i / manifest.books.length) * 20 
        });
        
        const book = await this.loadJsonFile<ExternalBook>(`books/${bookFile}`);
        books.push(book);
      }
      
      return books.sort((a, b) => a.bookNumber - b.bookNumber);
    } catch (error) {
      this.setLoadingState({ error: `Failed to load books: ${error}` });
      throw error;
    }
  }

  // Load all chapters for all books
  async loadAllChapters(): Promise<ExternalChapter[]> {
    this.setLoadingState({ currentItem: 'chapters', progress: 40 });
    
    try {
      const books = await this.loadBooks();
      const allChapters: ExternalChapter[] = [];
      
      for (let bookIndex = 0; bookIndex < books.length; bookIndex++) {
        const book = books[bookIndex];
        
        for (let chapterIndex = 0; chapterIndex < book.chapters.length; chapterIndex++) {
          const chapterId = book.chapters[chapterIndex];
          this.setLoadingState({ 
            currentItem: `chapters/${chapterId}.json`,
            progress: 40 + ((bookIndex * book.chapters.length + chapterIndex) / 
              books.reduce((total, b) => total + b.chapters.length, 0)) * 25
          });
          
          try {
            const chapter = await this.loadJsonFile<ExternalChapter>(`chapters/${chapterId}.json`);
            allChapters.push(chapter);
          } catch (error) {
            console.warn(`Failed to load chapter ${chapterId}:`, error);
            // Continue loading other chapters
          }
        }
      }
      
      return allChapters.sort((a, b) => {
        if (a.bookNumber !== b.bookNumber) {
          return a.bookNumber - b.bookNumber;
        }
        return a.chapterNumber - b.chapterNumber;
      });
    } catch (error) {
      this.setLoadingState({ error: `Failed to load chapters: ${error}` });
      throw error;
    }
  }

  // Load all characters
  async loadCharacters(): Promise<ExternalCharacter[]> {
    this.setLoadingState({ currentItem: 'characters', progress: 65 });
    
    try {
      const manifest = await this.loadManifest();
      const characters: ExternalCharacter[] = [];
      
      for (let i = 0; i < manifest.characters.length; i++) {
        const characterFile = manifest.characters[i];
        this.setLoadingState({ 
          currentItem: `characters/${characterFile}`,
          progress: 65 + (i / manifest.characters.length) * 15 
        });
        
        try {
          const character = await this.loadJsonFile<ExternalCharacter>(`characters/${characterFile}`);
          characters.push(character);
        } catch (error) {
          console.warn(`Failed to load character ${characterFile}:`, error);
        }
      }
      
      return characters;
    } catch (error) {
      this.setLoadingState({ error: `Failed to load characters: ${error}` });
      throw error;
    }
  }

  // Load deleted scenes
  async loadDeletedScenes(): Promise<ExternalDeletedScene[]> {
    this.setLoadingState({ currentItem: 'deleted scenes', progress: 80 });
    
    try {
      const manifest = await this.loadManifest();
      const scenes: ExternalDeletedScene[] = [];
      
      for (let i = 0; i < manifest.deletedScenes.length; i++) {
        const sceneFile = manifest.deletedScenes[i];
        this.setLoadingState({ 
          currentItem: `scenes/${sceneFile}`,
          progress: 80 + (i / manifest.deletedScenes.length) * 10 
        });
        
        try {
          const scene = await this.loadJsonFile<ExternalDeletedScene>(`scenes/${sceneFile}`);
          scenes.push(scene);
        } catch (error) {
          console.warn(`Failed to load deleted scene ${sceneFile}:`, error);
        }
      }
      
      return scenes;
    } catch (error) {
      this.setLoadingState({ error: `Failed to load deleted scenes: ${error}` });
      throw error;
    }
  }

  // Load metadata
  async loadMetadata(): Promise<ExternalMetadata> {
    this.setLoadingState({ currentItem: 'metadata', progress: 90 });
    
    try {
      const manifest = await this.loadManifest();
      const metadata = await this.loadJsonFile<ExternalMetadata>(`metadata/${manifest.metadata}`);
      return metadata;
    } catch (error) {
      this.setLoadingState({ error: `Failed to load metadata: ${error}` });
      throw error;
    }
  }

  // Load all content at once
  async loadAllContent() {
    this.setLoadingState({ 
      isLoading: true, 
      progress: 0, 
      error: null,
      currentItem: 'Starting content load...' 
    });
    
    try {
      const [books, chapters, characters, deletedScenes, metadata] = await Promise.all([
        this.loadBooks(),
        this.loadAllChapters(),
        this.loadCharacters(),
        this.loadDeletedScenes(),
        this.loadMetadata()
      ]);
      
      this.setLoadingState({ 
        isLoading: false, 
        progress: 100, 
        currentItem: 'Content loaded successfully',
        lastLoaded: new Date().toISOString()
      });
      
      return {
        books,
        chapters,
        characters,
        deletedScenes,
        metadata
      };
    } catch (error) {
      this.setLoadingState({ 
        isLoading: false, 
        error: `Failed to load content: ${error}`,
        progress: 0
      });
      throw error;
    }
  }

  // Validate content structure
  validateContent(content: any): ContentValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate books
    if (!content.books || !Array.isArray(content.books)) {
      errors.push('Books data is missing or invalid');
    } else {
      content.books.forEach((book: any, index: number) => {
        if (!book.id || !book.title || !book.bookNumber) {
          errors.push(`Book ${index + 1} is missing required fields (id, title, bookNumber)`);
        }
      });
    }

    // Validate chapters
    if (!content.chapters || !Array.isArray(content.chapters)) {
      errors.push('Chapters data is missing or invalid');
    } else {
      content.chapters.forEach((chapter: any, index: number) => {
        if (!chapter.id || !chapter.title || !chapter.bookNumber) {
          errors.push(`Chapter ${index + 1} is missing required fields (id, title, bookNumber)`);
        }
        if (!chapter.description) {
          warnings.push(`Chapter "${chapter.title}" is missing description`);
        }
      });
    }

    // Validate characters
    if (!content.characters || !Array.isArray(content.characters)) {
      warnings.push('Characters data is missing or invalid');
    } else {
      content.characters.forEach((character: any, index: number) => {
        if (!character.id || !character.name) {
          errors.push(`Character ${index + 1} is missing required fields (id, name)`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Refresh content (clear cache and reload)
  async refreshContent() {
    this.clearCache();
    return this.loadAllContent();
  }
}

export const contentLoader = new ContentLoaderService();