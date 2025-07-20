import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay,
  withSpring,
  interpolate
} from 'react-native-reanimated';
import { useAppStore } from '../state/app-store';

const { width } = Dimensions.get('window');

interface InteractiveTimelineProps {
  onChapterPress: (chapterId: string) => void;
}

export default function InteractiveTimeline({ onChapterPress }: InteractiveTimelineProps) {
  const { chapters, currentChapter, isPlaying } = useAppStore();
  const [selectedBook, setSelectedBook] = useState<1 | 2 | 3>(1);

  const bookColors = {
    1: ['#1e3a8a', '#3b82f6', '#1e40af'] as const,
    2: ['#7c2d12', '#dc2626', '#991b1b'] as const, 
    3: ['#365314', '#16a34a', '#15803d'] as const
  };

  const filteredChapters = chapters.filter(chapter => chapter.bookNumber === selectedBook);

  const TimelineNode = ({ chapter, index, isLast }: { chapter: any, index: number, isLast: boolean }) => {
    const nodeScale = useSharedValue(0);
    const lineProgress = useSharedValue(0);
    const contentOpacity = useSharedValue(0);

    useEffect(() => {
      const delay = index * 150;
      nodeScale.value = withDelay(delay, withSpring(1, { damping: 12 }));
      lineProgress.value = withDelay(delay + 200, withTiming(1, { duration: 600 }));
      contentOpacity.value = withDelay(delay + 100, withTiming(1, { duration: 500 }));
    }, [selectedBook]);

    const nodeStyle = useAnimatedStyle(() => ({
      transform: [{ scale: nodeScale.value }],
    }));

    const lineStyle = useAnimatedStyle(() => ({
      height: `${lineProgress.value * 100}%`,
    }));

    const contentStyle = useAnimatedStyle(() => ({
      opacity: contentOpacity.value,
      transform: [
        { translateX: interpolate(contentOpacity.value, [0, 1], [20, 0]) }
      ],
    }));

    const isCurrentChapter = currentChapter === chapter.id;
    const nodeColor = isCurrentChapter ? '#f59e0b' : bookColors[selectedBook][1];

    return (
      <View className="flex-row mb-6">
        {/* Timeline Line */}
        <View className="items-center mr-4">
          <Animated.View 
            style={[nodeStyle]}
            className="relative z-10"
          >
            <Pressable
              onPress={() => onChapterPress(chapter.id)}
              className="items-center justify-center"
            >
              <LinearGradient
                colors={isCurrentChapter ? ['#f59e0b', '#d97706'] : bookColors[selectedBook]}
                className="w-12 h-12 rounded-full items-center justify-center"
              >
                <Text className="text-white font-bold text-sm">
                  {index + 1}
                </Text>
                {isCurrentChapter && isPlaying && (
                  <View className="absolute -inset-1 rounded-full border-2 border-amber-400 animate-pulse" />
                )}
              </LinearGradient>
            </Pressable>
          </Animated.View>
          
          {/* Connecting Line */}
          {!isLast && (
            <View className="w-1 h-16 bg-gray-700 relative overflow-hidden mt-2">
              <Animated.View
                style={[
                  lineStyle,
                  { backgroundColor: bookColors[selectedBook][1] }
                ]}
                className="w-full absolute top-0"
              />
            </View>
          )}
        </View>

        {/* Chapter Content */}
        <Animated.View style={contentStyle} className="flex-1">
          <Pressable
            onPress={() => onChapterPress(chapter.id)}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-amber-500/50"
          >
            <View className="flex-row items-start justify-between mb-2">
              <View className="flex-1 mr-3">
                <Text className="text-amber-500 text-xs font-bold uppercase tracking-wide mb-1">
                  Chapter {index + 1}
                </Text>
                <Text className="text-white text-lg font-bold mb-2">
                  {chapter.title}
                </Text>
                <Text className="text-gray-300 text-sm leading-5">
                  {chapter.description}
                </Text>
              </View>
              
              <View className="items-center">
                {chapter.duration && (
                  <View className="bg-gray-800 rounded-full px-2 py-1 mb-2">
                    <Text className="text-gray-400 text-xs">
                      {chapter.duration}
                    </Text>
                  </View>
                )}
                
                <Pressable className="bg-amber-500/20 rounded-full p-2">
                  <Ionicons 
                    name={isCurrentChapter && isPlaying ? 'pause' : 'play'} 
                    size={16} 
                    color="#f59e0b" 
                  />
                </Pressable>
              </View>
            </View>

            {/* Chapter Tags */}
            <View className="flex-row flex-wrap mt-3">
              <View className="bg-gray-800 rounded-full px-2 py-1 mr-2">
                <Text className="text-cyan-400 text-xs">🎵 Soundtrack</Text>
              </View>
              <View className="bg-gray-800 rounded-full px-2 py-1 mr-2">
                <Text className="text-cyan-400 text-xs">📖 Full Text</Text>
              </View>
              {index < 3 && (
                <View className="bg-amber-900/30 border border-amber-700/50 rounded-full px-2 py-1">
                  <Text className="text-amber-400 text-xs">💎 Exclusive</Text>
                </View>
              )}
            </View>
          </Pressable>
        </Animated.View>
      </View>
    );
  };

  return (
    <View className="flex-1">
      {/* Book Selector */}
      <View className="flex-row justify-center mb-6 bg-gray-900 rounded-full p-1 mx-6">
        {[1, 2, 3].map((bookNum) => (
          <Pressable
            key={bookNum}
            className={`flex-1 py-3 px-4 rounded-full ${
              selectedBook === bookNum ? 'bg-amber-500' : ''
            }`}
            onPress={() => setSelectedBook(bookNum as 1 | 2 | 3)}
          >
            <Text className={`text-center font-semibold ${
              selectedBook === bookNum ? 'text-black' : 'text-white'
            }`}>
              Book {bookNum}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Timeline Header */}
      <View className="px-6 mb-6">
        <LinearGradient
          colors={bookColors[selectedBook]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="rounded-xl p-6"
        >
          <Text className="text-white text-xl font-bold text-center mb-2">
            {selectedBook === 1 ? 'The Pursuit for Love' : 
             selectedBook === 2 ? 'The Spiral War' : 
             'Ascension\'s Edge'}
          </Text>
          <Text className="text-white/80 text-center">
            {filteredChapters.length} Chapters • Interactive Timeline
          </Text>
        </LinearGradient>
      </View>

      {/* Timeline Content */}
      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        {filteredChapters.map((chapter, index) => (
          <TimelineNode 
            key={chapter.id} 
            chapter={chapter} 
            index={index}
            isLast={index === filteredChapters.length - 1}
          />
        ))}
        
        {/* Timeline End */}
        <View className="items-center py-8">
          <LinearGradient
            colors={bookColors[selectedBook]}
            className="w-8 h-8 rounded-full items-center justify-center"
          >
            <Ionicons name="checkmark" size={20} color="white" />
          </LinearGradient>
          <Text className="text-gray-400 text-center mt-4 max-w-xs">
            {selectedBook === 3 ? 'The saga concludes...' : 'Journey continues in the next book'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}