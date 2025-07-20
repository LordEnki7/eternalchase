import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppStore } from '../state/app-store';
import EnhancedChapterCard from '../components/EnhancedChapterCard';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ChapterGuideScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { chapters, currentBook, setCurrentBook, currentChapter, isPlaying, setPlaying } = useAppStore();
  const [selectedBook, setSelectedBook] = useState<1 | 2 | 3>(currentBook);

  const bookTitles = {
    1: 'Eternal Chase: The Pursuit for Love',
    2: 'Eternal Chase: The Spiral War', 
    3: 'Eternal Chase: Ascension\'s Edge'
  };

  const bookColors = {
    1: ['#1e3a8a', '#3b82f6', '#1e40af'] as const,
    2: ['#7c2d12', '#dc2626', '#991b1b'] as const, 
    3: ['#365314', '#16a34a', '#15803d'] as const
  };

  const filteredChapters = chapters.filter(chapter => chapter.bookNumber === selectedBook);

  const handleChapterPress = (chapterId: string) => {
    navigation.navigate('ChapterDetail', { chapterId });
  };

  const togglePlayback = (chapterId: string) => {
    if (currentChapter === chapterId && isPlaying) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  const BookSelector = () => (
    <View className="flex-row justify-center mb-6">
      {[1, 2, 3].map((bookNum) => (
        <Pressable
          key={bookNum}
          className={`px-4 py-2 mx-1 rounded-full ${
            selectedBook === bookNum ? 'bg-amber-500' : 'bg-gray-800 border border-gray-600'
          }`}
          onPress={() => {
            setSelectedBook(bookNum as 1 | 2 | 3);
            setCurrentBook(bookNum as 1 | 2 | 3);
          }}
        >
          <Text className={`font-semibold ${
            selectedBook === bookNum ? 'text-black' : 'text-white'
          }`}>
            Book {bookNum}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const ChapterCard = ({ chapter, index }: { chapter: any, index: number }) => (
    <Pressable
      className="mb-4"
      onPress={() => handleChapterPress(chapter.id)}
    >
      <LinearGradient
        colors={bookColors[selectedBook]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="rounded-xl p-1"
      >
        <View className="bg-gray-900 rounded-xl p-6">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <View className="flex-row items-center mb-2">
                <Text className="text-amber-500 text-sm font-bold">
                  CHAPTER {index + 1}
                </Text>
                {chapter.duration && (
                  <View className="bg-gray-800 rounded-full px-2 py-1 ml-2">
                    <Text className="text-gray-300 text-xs">
                      {chapter.duration}
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
            
            <View className="items-center space-y-2">
              {/* Play/Pause Button */}
              <Pressable
                className="bg-amber-500 rounded-full p-3"
                onPress={() => togglePlayback(chapter.id)}
              >
                <Ionicons 
                  name={currentChapter === chapter.id && isPlaying ? 'pause' : 'play'} 
                  size={20} 
                  color="#000"
                />
              </Pressable>
              
              {/* Music Note Indicator */}
              <View className="bg-gray-800 rounded-full p-2">
                <Ionicons name="musical-notes" size={16} color="#f59e0b" />
              </View>
            </View>
          </View>
          
          {/* Progress Bar (if currently playing) */}
          {currentChapter === chapter.id && isPlaying && (
            <View className="mt-4">
              <View className="bg-gray-700 rounded-full h-2 mb-2">
                <View className="bg-amber-500 rounded-full h-2 w-1/3" />
              </View>
              <Text className="text-gray-400 text-xs text-center">
                Now Playing • Cinematic Soundtrack
              </Text>
            </View>
          )}
          
          {/* Chapter Tags */}
          <View className="flex-row flex-wrap mt-4">
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
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <LinearGradient
          colors={['#000000', '#1a1a2e']}
          className="pt-16 pb-8 px-6"
        >
          <Text className="text-white text-3xl font-bold text-center mb-2">
            Chapter Guide
          </Text>
          <Text className="text-gray-400 text-center mb-6">
            Experience the full trilogy with integrated soundtracks
          </Text>
          
          <BookSelector />
        </LinearGradient>

        {/* Book Title */}
        <View className="px-6 py-4">
          <LinearGradient
            colors={bookColors[selectedBook]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-xl p-6 mb-6"
          >
            <Text className="text-white text-2xl font-bold text-center">
              {bookTitles[selectedBook]}
            </Text>
            <Text className="text-white/80 text-center mt-2">
              {filteredChapters.length} Chapters Available
            </Text>
          </LinearGradient>
        </View>

        {/* Enhanced Chapters List */}
        <View className="px-6">
          {filteredChapters.map((chapter, index) => (
            <EnhancedChapterCard 
              key={chapter.id} 
              chapter={chapter} 
              index={index}
              bookNumber={selectedBook}
              onPress={() => handleChapterPress(chapter.id)}
              onPlayPress={() => togglePlayback(chapter.id)}
              isCurrentChapter={currentChapter === chapter.id}
              isPlaying={currentChapter === chapter.id && isPlaying}
            />
          ))}
        </View>

        {/* Soundtrack Info */}
        <View className="px-6 py-8">
          <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <View className="flex-row items-center mb-4">
              <Ionicons name="musical-notes" size={24} color="#f59e0b" />
              <Text className="text-white text-xl font-bold ml-3">
                Soundtrack Experience
              </Text>
            </View>
            <Text className="text-gray-300 text-base leading-6 mb-4">
              Each chapter features carefully curated music that enhances the emotional depth and cinematic feel of the story.
            </Text>
            <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <Text className="text-amber-400 text-sm font-semibold">
                🎼 Pro Tip: Use headphones for the full immersive experience
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}