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

  const mockChapterText = `The morning air carried the scent of eternity—a contradiction that Kael had learned to recognize over countless centuries. It was neither sweet nor bitter, but something that spoke to the deepest parts of his immortal soul, reminding him of all the mornings he had witnessed, and all those still to come.

Standing at the edge of the precipice, he watched the sun rise over a world that seemed perpetually caught between endings and beginnings. The Eternal Chase, as the ancient ones called it, was more than just a pursuit—it was the very fabric of existence for beings like him.

Lyra appeared beside him as she always did, without sound or warning, as if she had stepped through the very air itself. Her presence brought both comfort and unease, for with her came the weight of prophecies and the shadow of choices yet unmade.

"The convergence approaches," she said, her voice carrying harmonics that spoke to powers beyond mortal understanding. "The threads of fate are pulling tighter, Kael. Soon, there will be no more running, no more hiding from what you are."

He knew she spoke the truth. The chase that had defined his existence for millennia was reaching its crescendo. Ancient forces stirred in the depths of reality itself, and the price of immortality was finally coming due.

The question that haunted him wasn't whether he could escape his destiny—it was whether he wanted to.`;

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
              {showFullText ? mockChapterText : mockChapterText.substring(0, 200) + '...'}
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