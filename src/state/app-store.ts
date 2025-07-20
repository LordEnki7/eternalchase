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
  stats?: {
    energy?: number;
    intelligence?: number;
    combat?: number;
    love?: number;
    wisdom?: number;
    spirituality?: number;
    manipulation?: number;
    corruption?: number;
    psychic_power?: number;
    shadow_energy?: number;
  };
}

interface DeletedScene {
  id: string;
  title: string;
  description: string;
  chapterRelated: string;
  content: string;
  isPremium: boolean;
}

interface FusionCard {
  id: string;
  title: string;
  characters: string[];
  tagline: string;
  description: string;
  imageUrl: string;
  type: 'bond' | 'conflict' | 'alliance';
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
  fusionCards: FusionCard[];
  
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
      fusionCards: [],

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
          { id: 'b1c17', title: 'Echoes of the First Light', description: 'The explosive finale as the Seed of the First Light reveals the Second Hunger and sets up the cosmic war to come.', bookNumber: 1, duration: '27:15' },

          // Book 2 - Eternal Chase: The Spiral War
          { id: 'b2c1', title: 'Fractured Light', description: 'Riven awakens in the Broken Spiral, a realm where time folds back on itself and realities overlap like shattered glass.', bookNumber: 2, duration: '16:20' },
          { id: 'b2c2', title: 'The Heart of the Source', description: 'Kael and Lyra enter the City of Light and Code, encountering the Source\'s consciousness and exiled Choir members.', bookNumber: 2, duration: '18:45' },
          { id: 'b2c3', title: 'Shadows and Echoes', description: 'Riven\'s journey darkens as corrupted Judicars hunt him through folding realities and collapsing time loops.', bookNumber: 2, duration: '20:15' },
          { id: 'b2c4', title: 'The Judicars\' Wrath', description: 'Kael and Lyra face the Judicars in the City of Light, battling spectral enforcers while the city itself reacts to their conflict.', bookNumber: 2, duration: '19:30' },
          { id: 'b2c5', title: 'Threads of Fate', description: 'Riven encounters the Weaver\'s shadow and learns of a prophecy binding three souls: the lost, the light, and the shadow.', bookNumber: 2, duration: '15:40' },
          { id: 'b2c6', title: 'Embers of Trust', description: 'In a quiet moment, Kael and Lyra deepen their bond while hidden forces sow doubt and test their resolve.', bookNumber: 2, duration: '14:25' },
          { id: 'b2c7', title: 'Spiral\'s Edge', description: 'Riven stands at the edge of crumbling reality, using the cosmic thread to bind fractured time and space together.', bookNumber: 2, duration: '17:55' },
          { id: 'b2c8', title: 'Crossroads of Fate', description: 'Kael and Lyra seek the Codex of Echoes while the Spiral\'s hunger distorts distant worlds and frays timelines.', bookNumber: 2, duration: '16:10' },
          { id: 'b2c9', title: 'The Lost Connection', description: 'The Codex reveals their forgotten past as cosmic guardians, agents of the Divine Source bound by purpose across worlds.', bookNumber: 2, duration: '22:35' },
          { id: 'b2c10', title: 'Threads of Fate — The Reckoning', description: 'The Grandmother reveals the truth about their separation while cosmic forces align and the Spiral tightens its grip.', bookNumber: 2, duration: '21:20' },
          { id: 'b2c11', title: 'Quiet Before the Storm', description: 'In a fragile sanctuary, the trio confronts their fears while the Spiral\'s hunger pulses through the cracked earth.', bookNumber: 2, duration: '18:45' },
          { id: 'b2c12', title: 'The Reckoning Chase', description: 'The sanctuary shatters as Judicars and Choir loyalists attack, plunging our heroes into a chaotic maelstrom across dimensions.', bookNumber: 2, duration: '25:10' },
          { id: 'b2c13', title: 'Inferno and Reflection', description: 'A massive fireball erupts from Lyra\'s hands as the trio battles in a fractured cathedral of smoke and ash.', bookNumber: 2, duration: '20:45' },
          { id: 'b2c14', title: 'Embers of Destiny', description: 'The battlefield quiets, but tensions simmer as the trio grapples with their power and the weight of their cosmic destiny.', bookNumber: 2, duration: '17:30' }
        ];

        const characters: Character[] = [
          {
            id: 'kael',
            name: 'Kael',
            role: 'The Starborn Seeker',
            description: 'Confessing but fearless, a protector in love and deathly peril. A space-faring warrior who follows mysterious signals across the galaxy.',
            background: 'Kael sits alone in the observation chamber of the Eclipse Vow, drawn by a spectral frequency that leads him to Isla Noctis. His memories of being Auron, the Starborn Blade, slowly return as he reconnects with his cosmic purpose. His attributes shine through: high energy, intelligence, combat prowess, and boundless love.',
            imageUrl: 'https://images.composerapi.com/D42E3070-4A07-4276-973C-6CD54ECDBF9F.jpg',
            stats: {
              energy: 95,
              intelligence: 88,
              combat: 92,
              love: 98
            }
          },
          {
            id: 'lyra',
            name: 'Lyra',
            role: 'Starborne Seeker',
            description: 'A mysterious island dweller who awakens to her cosmic heritage, wielding both blade and heart in perfect balance.',
            background: 'Living on Isla Noctis with her grandmother, Lyra awakens to her true heritage as Zahra (Solis), one of the Aethari bloodline. Her power can either heal or destroy, making her both salvation and target. With maximum Heart rating and powerful Cosmic Bond, she represents the perfect balance of wisdom, compassion, and power.',
            imageUrl: 'https://images.composerapi.com/DEC12D9F-05CD-4A41-ABDE-9EB2B6F15744.jpg',
            stats: {
              intelligence: 90,
              love: 100,
              combat: 70,
              spirituality: 90
            }
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
            imageUrl: 'https://images.composerapi.com/E79CDFBE-179E-43D5-96BD-DDEAF9CBDC42.jpg',
            stats: {
              wisdom: 98,
              spirituality: 95,
              love: 92,
              energy: 85
            }
          },
          {
            id: 'velo_entity',
            name: 'The Velo Entity',
            role: 'Cosmic Antagonist',
            description: 'The shadow that feasts on love and betrayal. A malevolent force that feeds on the strongest emotions and deepest connections.',
            background: 'Born from the darkest corners of the cosmos, the Velo Entity represents the corruption of love itself. It seeks out the bonds between the Starborn, feeding on their connections and growing stronger with each betrayal it orchestrates. Its very presence warps reality and turns devotion into destruction.',
            imageUrl: 'https://images.composerapi.com/1E78A878-35AE-4150-9136-E192C1B054F1.jpg',
            stats: {
              manipulation: 99,
              corruption: 95,
              psychic_power: 92,
              shadow_energy: 98
            }
          },
          {
            id: 'source',
            name: 'The Source',
            role: 'Origin of All',
            description: 'Origin of All. Memory of What Was. Destiny Yet To Be. The cosmic entity that exists as the fundamental balance of the multiverse.',
            background: 'Not a being, but a reaction - a balance woven into the fabric of existence itself. The Source was never meant to rule, only to respond. It is the memory of what was and the architect of what will be, transcending individual consciousness to embody the eternal cosmic order.',
            imageUrl: 'https://images.composerapi.com/25ECB801-1A55-4B45-A2D5-28E9AA088565.jpg',
            stats: {
              wisdom: 100,
              spirituality: 100,
              energy: 100,
              intelligence: 100
            }
          },
          {
            id: 'herald',
            name: 'The Herald',
            role: 'Time Echo / Judgment',
            description: 'First to fall, last to forget. A mysterious cosmic entity who appears to deliver warnings and prophecies from the Divine Source.',
            background: 'The Herald of the Source emerges from dimensional rifts to deliver cosmic judgment and warnings. Cloaked in time itself, this enigmatic figure carries the weight of forgotten futures and the echoes of choices yet unmade. Neither fully divine nor mortal, The Herald exists between moments, watching the eternal dance of fate unfold.',
            imageUrl: 'https://images.composerapi.com/BFA76FD8-7BC9-4C83-BF7B-8181C5643021.jpg',
            stats: {
              energy: 85,
              intelligence: 96,
              combat: 78,
              love: 45,
              wisdom: 99,
              spirituality: 94
            }
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
          },
          {
            id: 'ds6',
            title: 'The Weaver\'s True Form',
            description: 'Extended scene revealing The Weaver\'s connection to the cosmic threads.',
            chapterRelated: 'Fractured Light',
            content: 'This scene shows The Weaver\'s full ethereal form and explains how they manipulate the threads of time and space, revealing their ancient role as guardians of reality\'s fabric...',
            isPremium: true
          },
          {
            id: 'ds7',
            title: 'Lyra\'s Storm Unleashed',
            description: 'Alternate version of the massive fireball scene with extended dialogue.',
            chapterRelated: 'Inferno and Reflection',
            content: 'In this extended version, Lyra\'s internal monologue during the fireball creation reveals her struggle with the storm within and her fear of losing control completely...',
            isPremium: false
          },
          {
            id: 'ds8',
            title: 'The Source\'s Consciousness Speaks',
            description: 'Extended philosophical dialogue with the Source\'s core entity.',
            chapterRelated: 'The Heart of the Source',
            content: 'A longer conversation where the Source questions its own existence and reveals doubts about the Choir\'s interpretation of its purpose, showing its trapped, uncertain nature...',
            isPremium: true
          }
        ];

        const fusionCards: FusionCard[] = [
          {
            id: 'lyra-kael-bond',
            title: 'Lyra + Kael',
            characters: ['lyra', 'kael'],
            tagline: 'Two Souls, One Destiny - Reborn in Love',
            description: 'The cosmic bond between Zahra and Auron transcends time and space. Their connection burns with the fire of creation itself, intertwining their destinies across the stars.',
            imageUrl: 'https://images.composerapi.com/0BD48D40-CBBB-44B9-899D-B0EDFAF730DB.jpg',
            type: 'bond'
          }
        ];

        set({ chapters, characters, deletedScenes, fusionCards });
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