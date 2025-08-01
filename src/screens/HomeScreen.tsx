import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppStore } from '../state/app-store';
import ParticleField from '../components/ParticleField';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { currentBook, isPremiumUser, initializeContent } = useAppStore();

  useEffect(() => {
    initializeContent();
  }, [initializeContent]);

  const handleNavigateToSection = (section: 'BehindScenes' | 'FutureFilms' | 'Mysteries') => {
    navigation.navigate(section);
  };

  return (
    <ScrollView 
      className="flex-1 bg-black"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
    >
      {/* Hero Section */}
      <View style={{ height: height * 0.6 }} className="relative">
        <LinearGradient
          colors={['#000000', '#1a1a2e', '#0f0f23', '#000000']}
          style={{ height: '100%', width: '100%' }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Particle Effects */}
        <ParticleField count={80} color="#f59e0b" opacity={0.4} />
        
        {/* Overlay Content */}
        <View 
          className="absolute inset-0 justify-center items-center px-6"
          style={{ paddingTop: insets.top + 20 }}
        >
          <View className="items-center">
            {/* Main Title */}
            <Text className="text-white text-4xl font-bold text-center mb-1 tracking-wider">
              ETERNAL CHASE
            </Text>
            <Text className="text-amber-500 text-2xl font-bold text-center mb-2 tracking-wide">
              The Pursuit for Love
            </Text>
            
            {/* Author */}
            <Text className="text-gray-400 text-base text-center mb-6">
              by Shawn Rulz
            </Text>
            
            {/* Subtitle */}
            <Text className="text-gray-300 text-lg text-center mb-8 leading-6 max-w-sm">
              A Cinematic Universe of Starborn Guardians
            </Text>
            
            {/* Book Status */}
            <View className="bg-amber-500/20 border border-amber-500/30 rounded-full px-6 py-3 mb-8">
              <Text className="text-amber-500 font-semibold">
                Currently Reading: Book {currentBook}
              </Text>
            </View>
            
            {/* Main CTA */}
            <Pressable 
              className="bg-amber-500 rounded-full px-8 py-4 shadow-lg"
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text className="text-black font-bold text-lg">
                Continue Your Journey
              </Text>
            </Pressable>
          </View>
        </View>
        
        {/* Decorative Elements */}
        <View className="absolute top-20 left-4 opacity-30">
          <Ionicons name="star" size={24} color="#f59e0b" />
        </View>
        <View className="absolute top-32 right-8 opacity-20">
          <Ionicons name="star" size={16} color="#f59e0b" />
        </View>
        <View className="absolute bottom-32 left-8 opacity-25">
          <Ionicons name="star" size={20} color="#f59e0b" />
        </View>
      </View>

      {/* Quick Access Section */}
      <View className="px-6 py-8">
        <Text className="text-white text-2xl font-bold mb-6">
          Explore the Universe
        </Text>
        
        <View className="space-y-4">
          {/* Trilogy Hub */}
          <Pressable 
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            onPress={() => navigation.navigate('MainTabs')}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-xl font-bold mb-2">
                  The Trilogy Hub
                </Text>
                <Text className="text-gray-400 text-base">
                  Access all 17 chapters across three epic books
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#f59e0b" />
            </View>
          </Pressable>

          {/* Character Universe */}
          <Pressable 
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            onPress={() => navigation.navigate('MainTabs')}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-xl font-bold mb-2">
                  Character Universe
                </Text>
                <Text className="text-gray-400 text-base">
                  Meet Kael, Lyra, and the immortal cast
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#f59e0b" />
            </View>
          </Pressable>

          {/* Premium Content */}
          <Pressable 
            className="bg-gradient-to-r from-amber-900/30 to-amber-800/30 border border-amber-700/50 rounded-xl p-6"
            onPress={() => navigation.navigate('MainTabs')}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="diamond" size={20} color="#f59e0b" />
                  <Text className="text-white text-xl font-bold ml-2">
                    Premium Vault
                  </Text>
                  {!isPremiumUser && (
                    <View className="bg-amber-500 rounded-full px-2 py-1 ml-2">
                      <Text className="text-black text-xs font-bold">NEW</Text>
                    </View>
                  )}
                </View>
                <Text className="text-gray-300 text-base">
                  Deleted scenes, behind-the-scenes content
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#f59e0b" />
            </View>
          </Pressable>
        </View>
      </View>

      {/* Behind the Scenes Preview */}
      <View className="px-6 py-4">
        <Text className="text-white text-2xl font-bold mb-6">
          From the Author
        </Text>
        
        <View className="space-y-4">
          <Pressable 
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            onPress={() => handleNavigateToSection('BehindScenes')}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-2">
                  Behind the Scenes
                </Text>
                <Text className="text-gray-400 text-sm">
                  Discover the creative process and inspirations
                </Text>
              </View>
              <Ionicons name="camera" size={24} color="#f59e0b" />
            </View>
          </Pressable>

          <Pressable 
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            onPress={() => handleNavigateToSection('FutureFilms')}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-2">
                  Future Films
                </Text>
                <Text className="text-gray-400 text-sm">
                  Get a glimpse of the upcoming adaptations
                </Text>
              </View>
              <Ionicons name="film" size={24} color="#f59e0b" />
            </View>
          </Pressable>

          <Pressable 
            className="bg-gradient-to-r from-purple-900/30 to-amber-900/30 border border-purple-700/50 rounded-xl p-6"
            onPress={() => handleNavigateToSection('Mysteries')}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="eye" size={18} color="#f59e0b" />
                  <Text className="text-white text-lg font-semibold ml-2">
                    Decode the Source
                  </Text>
                  <View className="bg-purple-500 rounded-full px-2 py-1 ml-2">
                    <Text className="text-white text-xs font-bold">MYSTERY</Text>
                  </View>
                </View>
                <Text className="text-purple-300 text-sm">
                  "XVII. The dawn conceals the dusk..."
                </Text>
              </View>
              <Ionicons name="key" size={24} color="#f59e0b" />
            </View>
          </Pressable>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}