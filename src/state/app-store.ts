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
          // Book 1 - Eternal Chase: The Pursuit for Love
          { id: 'b1c1', title: 'The Signal Calls', description: 'Kael sits alone in the observation chamber, chasing a spectral frequency that leads him to discover Lyra on the mysterious planet Isla Noctis.', bookNumber: 1, duration: '15:45' },
          { id: 'b1c2', title: 'The Stranger on the Shore', description: 'Lyra wakes to strange tides and discovers a crashed stranger whose face she has seen in dreams.', bookNumber: 1, duration: '12:30' },
          { id: 'b1c3', title: 'Across the Veil (Finalized with Ship Crash)', description: 'Kael\'s ship crashes through the island\'s spiritual storms as he follows the mysterious signal calling to him.', bookNumber: 1, duration: '18:20' },
          { id: 'b1c4', title: 'Shadows and Bloodlines', description: 'Ancient ruins reveal Lyra\'s true heritage as Riven Elari emerges from the shadows with dangerous revelations.', bookNumber: 1, duration: '16:15' },
          { id: 'b1c5', title: 'Echoes of Power', description: 'The truth about the Aethari bloodline unfolds as Lyra discovers her cosmic inheritance and the power that marks her as a target.', bookNumber: 1, duration: '19:45' },
          { id: 'b1c6', title: 'New Frontiers, New Foes', description: 'The Veil arrives on Isla Noctis as Commander Solenne Vire leads the hunt for Lyra and her awakening powers.', bookNumber: 1, duration: '14:30' },
          { id: 'b1c7', title: 'Into the Fire', description: 'Raw power surges through Lyra as chaos erupts and the fragile bonds between allies are tested in battle.', bookNumber: 1, duration: '17:50' },
          { id: 'b1c8', title: 'Fractures and Flames', description: 'The aftermath of battle reveals new fractures in their alliance as a mysterious mark appears on Lyra\'s palm.', bookNumber: 1, duration: '13:25' },
          { id: 'b1c9', title: 'Echoes of the Infinite', description: 'Grandma reveals the shocking truth: Kael, Lyra, and Riven were once cosmic guardians whose memories were erased.', bookNumber: 1, duration: '21:15' },
          { id: 'b1c10', title: 'The Starborn Reawakening', description: 'The Herald of the Source appears with warnings as the trio begin to remember their true names: Auron, Zahra, and their divine mission.', bookNumber: 1, duration: '20:40' },
          { id: 'b1c11', title: 'Veil of Memory, Voice of the Deep', description: 'Lyra experiences profound visions of their past as cosmic guardians while the Primordial begins to stir from its ancient slumber.', bookNumber: 1, duration: '18:35' },
          { id: 'b1c12', title: 'The Union Forbidden', description: 'Astrael, the Source\'s Blade, descends to prevent their reunion as the cosmic chase begins in earnest across dimensions.', bookNumber: 1, duration: '22:10' },
          { id: 'b1c13', title: 'The Path of Betrayal', description: 'Riven faces the ultimate choice between mission and loyalty while Grandma makes her final stand against divine judgment.', bookNumber: 1, duration: '19:55' },
          { id: 'b1c14', title: 'Ashes of the Choir', description: 'The Celestial Council fractures as Grandma\'s sacrifice ripples across the cosmos and the Primordial takes its first true form.', bookNumber: 1, duration: '24:20' },
          { id: 'b1c15', title: 'The Place of Their Fall', description: 'The trio returns to the site of their original cosmic fall, where the Seed of the First Whisper reveals the truth about their punishment.', bookNumber: 1, duration: '23:45' },
          { id: 'b1c16', title: 'The Broken Throne', description: 'In the ruins of memory, they discover the Divine Source has abandoned its throne, leaving creation without a ruler.', bookNumber: 1, duration: '20:30' },
          { id: 'b1c17', title: 'Echoes of the First Light', description: 'The explosive finale as the Seed of the First Light reveals the Second Hunger and sets up the cosmic war to come.', bookNumber: 1, duration: '27:15' }
        ];

        const characters: Character[] = [
          {
            id: 'kael',
            name: 'Kael (Auron)',
            role: 'The Starborn Seeker',
            description: 'A space-faring warrior who follows mysterious signals across the galaxy, discovering his true identity as Auron - one of the original Starborn guardians.',
            background: 'Kael sits alone in the observation chamber of the Eclipse Vow, drawn by a spectral frequency that leads him to Isla Noctis. His memories of being Auron, the Starborn Blade, slowly return as he reconnects with his cosmic purpose.',
            imageUrl: 'kael-profile.jpg'
          },
          {
            id: 'lyra',
            name: 'Lyra',
            role: 'Starborne Seeker',
            description: 'A mysterious island dweller who discovers she is the last key to an ancient weapon, descended from the cosmic Worldweavers.',
            background: 'Living on Isla Noctis with her grandmother, Lyra awakens to her true heritage as Zahra (Solis), one of the Aethari bloodline. Her power can either heal or destroy, making her both salvation and target. With Intellect 9, Heart 10, Combat 7, and Cosmic Bond 9, she represents the perfect balance of wisdom, compassion, and power.',
            imageUrl: 'https://images.composerapi.com/267A1AC7-5700-471D-A4C3-0F1694F0FCBD.jpg'
          },
          {
            id: 'riven',
            name: 'Riven Elari',
            role: 'The Defected Tactician',
            description: 'A former Veil strategist who carries dangerous knowledge about the trio\'s cosmic origins and the ancient powers they once wielded.',
            background: 'Once a cold-blooded Veil tactician, Riven defected when he learned the truth about the Starborn. He holds fragments of their shared past and faces the ultimate choice between mission and loyalty.',
            imageUrl: 'riven-profile.jpg'
          },
          {
            id: 'maya',
            name: 'Maya',
            role: 'The Divine Watcher',
            description: 'A guardian sent to watch over the Starborn, whose true nature is revealed as events unfold.',
            background: 'More than human, Maya serves as a guide and protector, sent by higher powers to watch over Kael, Lyra, and Riven as they rediscover their cosmic identities.',
            imageUrl: 'maya-profile.jpg'
          },
          {
            id: 'grandma',
            name: 'Grandma Ama',
            role: 'Spirit Flame / Wisdom',
            description: 'Lyra\'s grandmother who hides a profound secret - she was once a member of the Divine Source\'s Inner Choir and a Keyholder.',
            background: 'She burned for truth, and lit the path behind her. A former Keyholder with the power to lock and unlock Starborn bonds, Grandma Ama helped separate the trio to protect the cosmos, ultimately sacrificing herself to give them a chance at redemption.',
            imageUrl: 'https://images.composerapi.com/E79CDFBE-179E-43D5-96BD-DDEAF9CBDC42.jpg'
          }
        ];

        const deletedScenes: DeletedScene[] = [
          {
            id: 'ds1',
            title: 'The Eclipse Vow Bridge Scene',
            description: 'Extended sequence of Kael receiving the mysterious signal with Maya\'s full dialogue.',
            chapterRelated: 'The Signal Calls',
            content: 'In this deleted scene, Maya provides more context about the signal\'s origins and warns Kael about the spiritual storms of Isla Noctis. The conversation reveals more about their shared history aboard the Eclipse Vow...',
            isPremium: true
          },
          {
            id: 'ds2',
            title: 'Grandma\'s Keyholder Memories',
            description: 'Extended flashback to Grandma\'s time as a member of the Inner Choir.',
            chapterRelated: 'Echoes of the Infinite',
            content: 'This scene shows Grandma\'s original role in separating the Starborn trio, including her emotional struggle with the decision and her secret meetings with the Divine Source...',
            isPremium: true
          },
          {
            id: 'ds3',
            title: 'Riven\'s Defection from the Veil',
            description: 'The full story of how Riven discovered the truth and chose to betray his commanders.',
            chapterRelated: 'Shadows and Bloodlines',
            content: 'Originally, this scene showed Riven\'s confrontation with Commander Solenne Vire and his discovery of the Starborn files, leading to his decision to protect rather than hunt them...',
            isPremium: false
          },
          {
            id: 'ds4',
            title: 'The Primordial\'s First Words',
            description: 'Extended dialogue between the awakening Primordial and Lyra.',
            chapterRelated: 'Veil of Memory, Voice of the Deep',
            content: 'In this scene, the Primordial reveals more about its true nature and its connection to the Starborn\'s original mission, challenging Lyra\'s understanding of good and evil...',
            isPremium: true
          },
          {
            id: 'ds5',
            title: 'Astrael\'s Hesitation',
            description: 'A moment where the Source\'s Blade questions his orders.',
            chapterRelated: 'The Union Forbidden',
            content: 'This deleted scene shows Astrael\'s internal conflict as he prepares to hunt his former brother-in-arms, revealing their shared history and his doubt about the Source\'s judgment...',
            isPremium: true
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