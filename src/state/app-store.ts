import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      
      initializeContent: () => {
        const chapters: Chapter[] = [
          // Book 1 - The Eternal Chase
          { id: 'b1c1', title: 'The Awakening', description: 'Kael discovers his immortal nature in a world torn by endless conflict.', bookNumber: 1, duration: '12:45' },
          { id: 'b1c2', title: 'First Blood', description: 'The initial confrontation that sets everything in motion.', bookNumber: 1, duration: '15:30' },
          { id: 'b1c3', title: 'The Hunt Begins', description: 'Ancient forces stir as the chase commences.', bookNumber: 1, duration: '18:20' },
          { id: 'b1c4', title: 'Lyra\'s Revelation', description: 'A mysterious ally emerges from the shadows.', bookNumber: 1, duration: '14:15' },
          { id: 'b1c5', title: 'Betrayal\'s Edge', description: 'Trust becomes a luxury in a world of deception.', bookNumber: 1, duration: '16:45' },
          { id: 'b1c6', title: 'The Price of Power', description: 'Every gift comes with a cost beyond imagination.', bookNumber: 1, duration: '19:30' },
          
          // Book 2 - Shadows of Eternity  
          { id: 'b2c1', title: 'Echoes of the Past', description: 'The consequences of immortality begin to surface.', bookNumber: 2, duration: '17:25' },
          { id: 'b2c2', title: 'The Alliance', description: 'Unlikely partnerships form in desperate times.', bookNumber: 2, duration: '20:10' },
          { id: 'b2c3', title: 'Fractured Bonds', description: 'Relationships strain under the weight of eternity.', bookNumber: 2, duration: '16:35' },
          { id: 'b2c4', title: 'The Darkening', description: 'An ancient evil begins to wake from its slumber.', bookNumber: 2, duration: '21:45' },
          { id: 'b2c5', title: 'Sacrifice', description: 'Some prices can only be paid with everything.', bookNumber: 2, duration: '18:50' },
          
          // Book 3 - Dawn of Reckoning
          { id: 'b3c1', title: 'The Gathering Storm', description: 'All forces converge for the final confrontation.', bookNumber: 3, duration: '22:15' },
          { id: 'b3c2', title: 'Redemption\'s Call', description: 'The chance for salvation appears at the darkest hour.', bookNumber: 3, duration: '19:40' },
          { id: 'b3c3', title: 'The Final Chase', description: 'Everything leads to this moment of ultimate truth.', bookNumber: 3, duration: '25:30' },
          { id: 'b3c4', title: 'Legacy of Eternity', description: 'The price of immortality is finally revealed.', bookNumber: 3, duration: '20:25' },
          { id: 'b3c5', title: 'Beyond the Veil', description: 'Some endings are just new beginnings.', bookNumber: 3, duration: '23:45' },
          { id: 'b3c6', title: 'Eternal Dawn', description: 'The ultimate resolution of all things.', bookNumber: 3, duration: '27:20' }
        ];

        const characters: Character[] = [
          {
            id: 'kael',
            name: 'Kael Thorne',
            role: 'The Immortal Protagonist',
            description: 'A warrior cursed with immortality, forever bound to an endless cycle of conflict and rebirth.',
            background: 'Once a mortal soldier, Kael was transformed by ancient magic during a battle that should have claimed his life. Now he walks between worlds, neither fully alive nor dead, carrying the weight of countless lifetimes.',
            imageUrl: 'kael-profile.jpg'
          },
          {
            id: 'lyra',
            name: 'Lyra Shadowheart',
            role: 'The Enigmatic Ally',
            description: 'A mysterious figure with her own connection to the forces that bind Kael to his fate.',
            background: 'Lyra appears when least expected and disappears just as quickly. Her knowledge of ancient secrets and hidden truths makes her both invaluable and dangerous.',
            imageUrl: 'lyra-profile.jpg'
          },
          {
            id: 'magnus',
            name: 'Magnus the Eternal',
            role: 'The Ancient Adversary',
            description: 'The original immortal, whose corruption spans millennia and threatens to consume all existence.',
            background: 'Once a guardian of balance, Magnus fell to the temptations of eternal power. Now he seeks to remake the world in his own twisted image.',
            imageUrl: 'magnus-profile.jpg'
          },
          {
            id: 'vera',
            name: 'Vera Lightbringer',
            role: 'The Mortal Champion',
            description: 'A human warrior who refuses to accept the inevitability of eternal conflict.',
            background: 'Despite her mortality, Vera possesses a strength of spirit that rivals even the immortals. She represents hope for breaking the endless cycle.',
            imageUrl: 'vera-profile.jpg'
          }
        ];

        const deletedScenes: DeletedScene[] = [
          {
            id: 'ds1',
            title: 'The First Transformation',
            description: 'Kael\'s original transformation scene with extended dialogue.',
            chapterRelated: 'The Awakening',
            content: 'In this deleted scene, we see the full ritual that bound Kael to immortality, including the warnings he chose to ignore...',
            isPremium: true
          },
          {
            id: 'ds2',
            title: 'Lyra\'s Past',
            description: 'A glimpse into Lyra\'s mysterious origins.',
            chapterRelated: 'Lyra\'s Revelation',
            content: 'This scene reveals more about Lyra\'s connection to the ancient powers and her true purpose in Kael\'s journey...',
            isPremium: true
          },
          {
            id: 'ds3',
            title: 'The Lost Alliance',
            description: 'An alternate version of the alliance formation.',
            chapterRelated: 'The Alliance',
            content: 'Originally, the alliance included a fifth member whose betrayal would have changed everything...',
            isPremium: false
          }
        ];

        set({ chapters, characters, deletedScenes });
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