import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppStore } from '../state/app-store';

type ChapterDetailRouteProp = RouteProp<RootStackParamList, 'ChapterDetail'>;

export default function ChapterDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<ChapterDetailRouteProp>();
  const { chapterId } = route.params;
  const { chapters, setCurrentChapter, setPlaying, isPlaying, currentChapter } = useAppStore();
  const [showFullText, setShowFullText] = useState(false);

  const chapter = chapters.find(c => c.id === chapterId);
  
  if (!chapter) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white text-xl">Chapter not found</Text>
      </View>
    );
  }

  const bookColors = {
    1: ['#1e3a8a', '#3b82f6', '#1e40af'] as const,
    2: ['#7c2d12', '#dc2626', '#991b1b'] as const, 
    3: ['#365314', '#16a34a', '#15803d'] as const
  };

  const togglePlayback = () => {
    if (currentChapter === chapterId && isPlaying) {
      setPlaying(false);
    } else {
      setCurrentChapter(chapterId);
      setPlaying(true);
    }
  };

  const getChapterText = (chapterId: string) => {
    const chapterTexts: { [key: string]: string } = {
      'b1c1': `The stars above Earth's outer rim glittered like secrets waiting to be uncovered. Kael sat alone in the observation chamber of the Eclipse Vow, bathed in the low blue glow of the cosmos outside and the pulsing red light on his display screen. For weeks, he had been chasing a spectral frequency — not military, not mechanical, but...alive. It was almost musical, like a song meant only for him.

The AI voice hummed softly through the chamber. "Signal intensity rising. Source: Planet 187-K — code-named Isla Noctis. Region classified."

Kael leaned forward. Isla Noctis. The name tasted old, like it belonged in a forgotten legend. A place untouched by colonization, still beating with the heart of the ancient world. He keyed into his system and pulled up the live feed from his stealth satellite. The cloud layer over the island rippled as though it knew it was being watched.

Then the camera sharpened on a clearing along the coastline. There she was. Lyra. She stood barefoot in damp soil, face streaked with sea mist and sweat, locked in a heated argument with an elder. Her eyes burned with fire—no fear, no hesitation. Even through the haze, Kael felt her presence strike something deep in his chest. It wasn't just attraction. It was recognition.

"Zoom in. Stabilize feed," he whispered.

The signal pulsed again. Stronger. Rhythmic. Kael stepped back from the screen like he'd been struck. "That's her," he said, more to himself than anyone. "That's the source."

And somehow... he knew she was calling to him.`,
      default: `The cosmic winds carried whispers of ancient names as our heroes continued their eternal chase across dimensions of light and shadow. Each step forward revealed new truths about their intertwined destinies, while the universe itself seemed to hold its breath, waiting to see what choice they would make when faced with the ultimate test of love versus duty.`
    };
    
    return chapterTexts[chapterId] || chapterTexts.default;
  };

  const chapterText = getChapterText(chapterId);

  return (
    <View className="flex-1 bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Chapter Header */}
        <LinearGradient
          colors={bookColors[chapter.bookNumber]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-20 pb-8 px-6"
        >
          <Text className="text-white/80 text-sm font-semibold mb-2">
            BOOK {chapter.bookNumber} • CHAPTER
          </Text>
          <Text className="text-white text-3xl font-bold mb-4">
            {chapter.title}
          </Text>
          <Text className="text-white/90 text-lg leading-6">
            {chapter.description}
          </Text>
        </LinearGradient>

        {/* Audio Controls */}
        <View className="px-6 py-6">
          <View className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-white text-xl font-bold mb-1">
                  Audio Experience
                </Text>
                <Text className="text-gray-400 text-sm">
                  Duration: {chapter.duration || 'Unknown'}
                </Text>
              </View>
              
              <Pressable
                className="bg-amber-500 rounded-full p-4"
                onPress={togglePlayback}
              >
                <Ionicons 
                  name={currentChapter === chapterId && isPlaying ? 'pause' : 'play'} 
                  size={32} 
                  color="#000"
                />
              </Pressable>
            </View>
            
            {/* Progress Bar */}
            <View className="mb-4">
              <View className="bg-gray-700 rounded-full h-2 mb-2">
                <View className="bg-amber-500 rounded-full h-2 w-1/4" />
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400 text-xs">2:15</Text>
                <Text className="text-gray-400 text-xs">{chapter.duration}</Text>
              </View>
            </View>
            
            {/* Audio Controls */}
            <View className="flex-row items-center justify-center space-x-8">
              <Pressable>
                <Ionicons name="play-skip-back" size={24} color="#6b7280" />
              </Pressable>
              <Pressable>
                <Ionicons name="play-back" size={20} color="#6b7280" />
              </Pressable>
              <Pressable>
                <Ionicons name="play-forward" size={20} color="#6b7280" />
              </Pressable>
              <Pressable>
                <Ionicons name="play-skip-forward" size={24} color="#6b7280" />
              </Pressable>
            </View>
            
            {/* Now Playing */}
            {currentChapter === chapterId && isPlaying && (
              <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
                <Text className="text-amber-400 text-sm text-center">
                  🎵 Now Playing • Cinematic Soundtrack
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Chapter Text */}
        <View className="px-6 pb-6">
          <View className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white text-xl font-bold">
                Chapter Text
              </Text>
              <Pressable
                className="bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2"
                onPress={() => setShowFullText(!showFullText)}
              >
                <Text className="text-amber-400 text-sm font-semibold">
                  {showFullText ? 'Collapse' : 'Read Full'}
                </Text>
              </Pressable>
            </View>
            
            <Text className="text-gray-300 text-base leading-7">
              {showFullText ? chapterText : chapterText.substring(0, 200) + '...'}
            </Text>
          </View>
        </View>

        {/* Chapter Analytics */}
        <View className="px-6 pb-6">
          <View className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <Text className="text-white text-xl font-bold mb-4">
              Chapter Insights
            </Text>
            
            <View className="space-y-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-300">Reading Time</Text>
                <Text className="text-amber-500 font-semibold">~15 minutes</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-300">Audio Duration</Text>
                <Text className="text-amber-500 font-semibold">{chapter.duration}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-300">Key Characters</Text>
                <Text className="text-amber-500 font-semibold">Kael, Lyra</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-300">Theme</Text>
                <Text className="text-amber-500 font-semibold">Destiny & Choice</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Related Content */}
        <View className="px-6 pb-8">
          <Text className="text-white text-xl font-bold mb-4">
            Related Content
          </Text>
          
          <View className="space-y-3">
            <Pressable className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 mr-3">
                  <Text className="text-white font-semibold mb-1">
                    Character Analysis: Kael
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    Deep dive into the protagonist's journey
                  </Text>
                </View>
                <Ionicons name="person" size={20} color="#f59e0b" />
              </View>
            </Pressable>
            
            <Pressable className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 mr-3">
                  <Text className="text-white font-semibold mb-1">
                    Soundtrack: Eternal Dawn Theme
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    The orchestral piece that defines this moment
                  </Text>
                </View>
                <Ionicons name="musical-notes" size={20} color="#f59e0b" />
              </View>
            </Pressable>
            
            <Pressable className="bg-amber-900/30 border border-amber-700/50 rounded-xl p-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 mr-3">
                  <Text className="text-white font-semibold mb-1">
                    💎 Deleted Scene: The First Meeting
                  </Text>
                  <Text className="text-amber-400 text-sm">
                    Premium exclusive alternate version
                  </Text>
                </View>
                <Ionicons name="diamond" size={20} color="#f59e0b" />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}