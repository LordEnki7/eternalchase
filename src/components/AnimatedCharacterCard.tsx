import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  character: any;
  index: number;
  delay?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedCharacterCard({ character, index, delay = 0 }: Props) {
  const navigation = useNavigation<NavigationProp>();
  
  // Animation values
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const rotation = useSharedValue(-5);
  const glowOpacity = useSharedValue(0);
  
  const gradientColors = [
    ['#1e3a8a', '#3b82f6', '#1e40af'] as const, // Kael - Blue
    ['#7c2d12', '#dc2626', '#991b1b'] as const, // Lyra - Red  
    ['#4c1d95', '#8b5cf6', '#7c3aed'] as const, // Magnus - Purple
    ['#365314', '#16a34a', '#15803d'] as const, // Vera - Green
    ['#f59e0b', '#d97706', '#b45309'] as const  // Grandma - Amber
  ];

  useEffect(() => {
    // Entrance animation sequence
    const startAnimation = () => {
      scale.value = withDelay(
        delay,
        withSpring(1, { damping: 15, stiffness: 150 })
      );
      
      opacity.value = withDelay(
        delay,
        withTiming(1, { duration: 800 })
      );
      
      translateY.value = withDelay(
        delay,
        withSpring(0, { damping: 12, stiffness: 100 })
      );
      
      rotation.value = withDelay(
        delay + 200,
        withSpring(0, { damping: 10, stiffness: 80 })
      );
      
      // Subtle glow effect
      glowOpacity.value = withDelay(
        delay + 400,
        withSequence(
          withTiming(0.3, { duration: 1000 }),
          withTiming(0.1, { duration: 1000 })
        )
      );
    };

    startAnimation();
  }, [delay]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handlePress = () => {
    // Press animation
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    
    // Navigate after animation
    setTimeout(() => {
      navigation.navigate('CharacterDetail', { characterId: character.id });
    }, 150);
  };

  return (
    <AnimatedPressable
      style={[cardStyle, { marginBottom: 24 }]}
      onPress={handlePress}
    >
      {/* Glow Effect */}
      <Animated.View 
        style={[
          glowStyle,
          {
            position: 'absolute',
            top: -4,
            left: -4,
            right: -4,
            bottom: -4,
            borderRadius: 20,
            backgroundColor: gradientColors[index % gradientColors.length][1],
            opacity: 0.3,
            shadowColor: gradientColors[index % gradientColors.length][1],
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 10,
          }
        ]}
      />
      
      <LinearGradient
        colors={gradientColors[index % gradientColors.length]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-1"
      >
        <View className="bg-gray-900 rounded-2xl p-6">
          {/* Character Image with Parallax Effect */}
          <View className="bg-gray-800 rounded-xl h-48 mb-4 items-center justify-center overflow-hidden relative">
            {character.imageUrl && character.imageUrl.startsWith('http') ? (
              <>
                <Image
                  source={{ uri: character.imageUrl }}
                  style={{ 
                    width: '110%', 
                    height: '110%',
                    transform: [{ scale: 1.1 }]
                  }}
                  contentFit="cover"
                  className="rounded-xl"
                />
                {/* Image Overlay */}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.3)']}
                  className="absolute bottom-0 left-0 right-0 h-16"
                />
              </>
            ) : (
              <LinearGradient
                colors={gradientColors[index % gradientColors.length]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="w-24 h-24 rounded-full items-center justify-center"
              >
                <Text className="text-white text-3xl font-bold">
                  {character.name.charAt(0)}
                </Text>  
              </LinearGradient>
            )}
            
            {/* Power Level Indicator */}
            <View className="absolute top-3 right-3 bg-black/60 rounded-full px-2 py-1">
              <Text className="text-amber-400 text-xs font-bold">
                ⚡ {character.stats?.love || character.stats?.wisdom || 95}
              </Text>
            </View>
          </View>

          {/* Character Info with Animations */}
          <View className="space-y-3">
            <View>
              <Text className="text-white text-2xl font-bold mb-1">
                {character.name}
              </Text>
              <View className="flex-row items-center">
                <View className="bg-amber-500/20 border border-amber-500/30 rounded-full px-2 py-1 mr-2">
                  <Text className="text-amber-500 text-xs font-semibold">
                    {character.role}
                  </Text>
                </View>
                {character.stats && (
                  <View className="bg-cyan-500/20 border border-cyan-500/30 rounded-full px-2 py-1">
                    <Text className="text-cyan-400 text-xs font-semibold">
                      COSMIC
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <Text className="text-gray-300 text-base leading-6">
              {character.description}
            </Text>

            {/* Quick Stats Preview */}
            {character.stats && (
              <View className="flex-row space-x-2 mt-4">
                {Object.entries(character.stats).slice(0, 3).map(([key, value]) => (
                  <View key={key} className="flex-1">
                    <Text className="text-gray-400 text-xs uppercase">
                      {key.slice(0, 3)}
                    </Text>
                    <View className="bg-gray-700 rounded-full h-2 mt-1">
                      <View 
                        className="bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full h-2" 
                        style={{ width: `${value}%` }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Character Tags */}
            <View className="flex-row flex-wrap mt-4">
              <View className="bg-gray-800 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-gray-300 text-xs">📚 Full Biography</Text>
              </View>
              <View className="bg-gray-800 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-gray-300 text-xs">🎭 Character Arc</Text>
              </View>
              {index < 2 && (
                <View className="bg-amber-900/30 border border-amber-700/50 rounded-full px-3 py-1 mr-2 mb-2">
                  <Text className="text-amber-400 text-xs">💎 Exclusive Content</Text>
                </View>
              )}
            </View>

            {/* Action Button with Hover Effect */}
            <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-amber-400 font-semibold">
                  Explore Character
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={16} color="#f59e0b" />
                  <Ionicons name="chevron-forward" size={20} color="#f59e0b" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}