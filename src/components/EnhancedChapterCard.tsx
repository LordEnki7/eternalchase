import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  chapter: any;
  index: number;
  bookNumber: 1 | 2 | 3;
  onPress: () => void;
  onPlayPress: () => void;
  isCurrentChapter?: boolean;
  isPlaying?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function EnhancedChapterCard({ 
  chapter, 
  index, 
  bookNumber, 
  onPress, 
  onPlayPress,
  isCurrentChapter = false,
  isPlaying = false 
}: Props) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Animation values
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-50);
  const glowIntensity = useSharedValue(0);
  const progressAnimation = useSharedValue(0);

  const bookColors = {
    1: ['#1e3a8a', '#3b82f6', '#1e40af'] as const,
    2: ['#7c2d12', '#dc2626', '#991b1b'] as const, 
    3: ['#365314', '#16a34a', '#15803d'] as const
  };

  useEffect(() => {
    // Load progress from storage
    loadChapterProgress();
    
    // Entrance animation with stagger
    const delay = index * 100;
    
    scale.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 150 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
    translateX.value = withDelay(delay, withSpring(0, { damping: 12, stiffness: 100 }));
    
    // Progress bar animation
    progressAnimation.value = withDelay(
      delay + 300,
      withTiming(readingProgress / 100, { duration: 1000 })
    );

    // Glow effect for current chapter
    if (isCurrentChapter) {
      glowIntensity.value = withTiming(0.6, { duration: 1000 });
    }
  }, [index, readingProgress, isCurrentChapter]);

  const loadChapterProgress = async () => {
    try {
      const progress = await AsyncStorage.getItem(`chapter_progress_${chapter.id}`);
      const completed = await AsyncStorage.getItem(`chapter_completed_${chapter.id}`);
      const bookmarked = await AsyncStorage.getItem(`chapter_bookmarked_${chapter.id}`);
      
      if (progress) setReadingProgress(parseInt(progress));
      if (completed) setIsCompleted(JSON.parse(completed));
      if (bookmarked) setIsBookmarked(JSON.parse(bookmarked));
    } catch (error) {
      console.log('Error loading chapter progress:', error);
    }
  };

  const toggleBookmark = async () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    try {
      await AsyncStorage.setItem(
        `chapter_bookmarked_${chapter.id}`, 
        JSON.stringify(newBookmarkState)
      );
    } catch (error) {
      console.log('Error saving bookmark:', error);
    }
  };

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value }
    ],
    opacity: opacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowIntensity.value,
    shadowOpacity: glowIntensity.value * 0.8,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progressAnimation.value, [0, 1], [0, 100])}%`,
  }));

  const getChapterIcon = () => {
    if (isCompleted) return 'checkmark-circle';
    if (readingProgress > 0) return 'play-circle';
    return 'radio-button-off';
  };

  const getChapterIconColor = () => {
    if (isCompleted) return '#22c55e';
    if (readingProgress > 0) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <AnimatedPressable style={[cardStyle, { marginBottom: 16 }]} onPress={onPress}>
      {/* Glow Effect for Current Chapter */}
      {isCurrentChapter && (
        <Animated.View 
          style={[
            glowStyle,
            {
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              borderRadius: 16,
              backgroundColor: bookColors[bookNumber][1],
              shadowColor: bookColors[bookNumber][1],
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 20,
              elevation: 10,
            }
          ]}
        />
      )}

      <LinearGradient
        colors={bookColors[bookNumber]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="rounded-xl p-1"
      >
        <View className="bg-gray-900 rounded-xl p-6">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              {/* Chapter Header */}
              <View className="flex-row items-center mb-2">
                <View className="bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-1 mr-3">
                  <Text className="text-amber-500 text-xs font-bold">
                    CHAPTER {index + 1}
                  </Text>
                </View>
                {chapter.duration && (
                  <View className="bg-gray-800 rounded-full px-2 py-1 mr-2">
                    <Text className="text-gray-300 text-xs">
                      🎵 {chapter.duration}
                    </Text>
                  </View>
                )}
                {isCompleted && (
                  <View className="bg-green-500/20 border border-green-500/30 rounded-full px-2 py-1">
                    <Text className="text-green-400 text-xs font-bold">
                      ✓ COMPLETED
                    </Text>
                  </View>
                )}
              </View>
              
              <Text className="text-white text-xl font-bold mb-2">
                {chapter.title}
              </Text>
              <Text className="text-gray-300 text-base leading-6">
                {chapter.description}
              </Text>
            </View>
            
            {/* Action Buttons */}
            <View className="items-center space-y-3">
              {/* Bookmark Button */}
              <Pressable onPress={toggleBookmark}>
                <Ionicons 
                  name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
                  size={20} 
                  color={isBookmarked ? '#f59e0b' : '#6b7280'}
                />
              </Pressable>
              
              {/* Play/Pause Button */}
              <Pressable
                className="bg-amber-500 rounded-full p-3 relative"
                onPress={onPlayPress}
              >
                <Ionicons 
                  name={isCurrentChapter && isPlaying ? 'pause' : 'play'} 
                  size={20} 
                  color="#000"
                />
                
                {/* Pulse effect when playing */}
                {isCurrentChapter && isPlaying && (
                  <View className="absolute -inset-2 border-2 border-amber-500 rounded-full opacity-30" />
                )}
              </Pressable>
              
              {/* Chapter Status Icon */}
              <Ionicons 
                name={getChapterIcon() as any} 
                size={20} 
                color={getChapterIconColor()}
              />
            </View>
          </View>
          
          {/* Reading Progress Bar */}
          {readingProgress > 0 && (
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-400 text-sm">Reading Progress</Text>
                <Text className="text-amber-400 text-sm font-semibold">
                  {readingProgress}%
                </Text>
              </View>
              <View className="bg-gray-700 rounded-full h-2 overflow-hidden">
                <Animated.View 
                  style={[
                    progressStyle,
                    {
                      height: '100%',
                      backgroundColor: isCompleted ? '#22c55e' : '#f59e0b',
                      borderRadius: 4,
                    }
                  ]}
                />
              </View>
            </View>
          )}

          {/* Currently Playing Indicator */}
          {isCurrentChapter && isPlaying && (
            <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
              <View className="flex-row items-center justify-center">
                <View className="flex-row space-x-1 mr-3">
                  {[1, 2, 3, 4].map((i) => (
                    <View
                      key={i}
                      className="w-1 h-4 bg-amber-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </View>
                <Text className="text-amber-400 text-sm text-center">
                  Now Playing • Cinematic Soundtrack
                </Text>
              </View>
            </View>
          )}
          
          {/* Chapter Features */}
          <View className="flex-row flex-wrap">
            <View className="bg-gray-800 rounded-full px-3 py-1 mr-2 mb-2">
              <Text className="text-gray-300 text-xs">🎵 Soundtrack</Text>
            </View>
            <View className="bg-gray-800 rounded-full px-3 py-1 mr-2 mb-2">
              <Text className="text-gray-300 text-xs">📖 Full Text</Text>
            </View>
            {index < 3 && (
              <View className="bg-amber-900/30 border border-amber-700/50 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-amber-400 text-xs">💎 Bonus Content</Text>
              </View>
            )}
            {readingProgress === 100 && (
              <View className="bg-green-900/30 border border-green-700/50 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-green-400 text-xs">✨ Achievement</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}