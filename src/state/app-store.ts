import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { contentLoader } from '../services/content-loader';
import { ExternalChapter, ExternalCharacter, ExternalDeletedScene } from '../types/content';

interface Chapter {
  id: string;
  title: string;
  description: string;
  audioUrl?: string;
  duration?: string;
  bookNumber: 1 | 2 | 3;
}

interface Character {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  background: string;
  role: string;
}

interface DeletedScene {
  id: string;
  title: string;
  description: string;
  chapterRelated: string;
  content: string;
  isPremium: boolean;
}

interface AppState {
  // User state
  isPremiumUser: boolean;
  currentBook: 1 | 2 | 3;
  currentChapter: string | null;
  isPlaying: boolean;
  
  // Content
  chapters: Chapter[];
  characters: Character[];
  deletedScenes: DeletedScene[];
  
  // Actions
  setPremiumUser: (isPremium: boolean) => void;
  setCurrentBook: (book: 1 | 2 | 3) => void;
  setCurrentChapter: (chapterId: string | null) => void;
  setPlaying: (playing: boolean) => void;
  initializeContent: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isPremiumUser: false,
      currentBook: 1,
      currentChapter: null,
      isPlaying: false,
      chapters: [],
      characters: [],
      deletedScenes: [],

      // Actions
      setPremiumUser: (isPremium) => set({ isPremiumUser: isPremium }),
      setCurrentBook: (book) => set({ currentBook: book }),
      setCurrentChapter: (chapterId) => set({ currentChapter: chapterId }),
      setPlaying: (playing) => set({ isPlaying: playing }),
      
      initializeContent: async () => {
        try {
          console.log('Loading content from external files...');
          const externalContent = await contentLoader.loadAllContent();
          
          // Transform external content to internal format
          const chapters: Chapter[] = externalContent.chapters.map((ch: ExternalChapter) => ({
            id: ch.id,
            title: ch.title,
            description: ch.description,
            bookNumber: ch.bookNumber,
            duration: ch.duration
          }));

          const characters: Character[] = externalContent.characters.map((char: ExternalCharacter) => ({
            id: char.id,
            name: char.name,
            role: char.role,
            description: char.description,
            background: char.background,
            imageUrl: char.imageUrl
          }));

          const deletedScenes: DeletedScene[] = externalContent.deletedScenes.map((scene: ExternalDeletedScene) => ({
            id: scene.id,
            title: scene.title,
            description: scene.description,
            chapterRelated: scene.chapterRelated,
            content: scene.content,
            isPremium: scene.isPremium
          }));

          set({ chapters, characters, deletedScenes });
          console.log('Content loaded successfully from external files');
        } catch (error) {
          console.warn('Failed to load external content, using fallback data:', error);
          
          // Fallback to minimal mock data if external loading fails
          const chapters: Chapter[] = [
            { id: 'b1c1', title: 'The Awakening', description: 'Kael discovers his immortal nature.', bookNumber: 1, duration: '12:45' }
          ];
          const characters: Character[] = [
            { id: 'kael', name: 'Kael Thorne', role: 'Protagonist', description: 'An immortal warrior.', background: 'A cursed soldier.' }
          ];
          const deletedScenes: DeletedScene[] = [];
          
          set({ chapters, characters, deletedScenes });
        }
      }
    }),
    {
      name: 'eternal-chase-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isPremiumUser: state.isPremiumUser,
        currentBook: state.currentBook,
        currentChapter: state.currentChapter
      })
    }
  )
);