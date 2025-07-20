import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  runOnJS,
  withDelay
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ParticleField from './ParticleField';

const { width } = Dimensions.get('window');

interface EnhancedCharacterCardProps {
  character: any;
  index: number;
  onPress: (characterId: string) => void;
  gradientColors: readonly string[];
}

export default function EnhancedCharacterCard({
  character,
  index,
  onPress,
  gradientColors
}: EnhancedCharacterCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const elevation = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Staggered entrance animation
    const delay = index * 200;
    
    opacity.value = withDelay(delay, withTiming(1, { duration: 800 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 12, stiffness: 100 }));
  }, []);

  const pressGesture = Gesture.Tap()
    .onBegin(() => {
      runOnJS(setIsPressed)(true);
      scale.value = withSpring(0.95);
      elevation.value = withTiming(20);
    })
    .onFinalize(() => {
      runOnJS(setIsPressed)(false);
      scale.value = withSpring(1);
      elevation.value = withTiming(0);
      runOnJS(onPress)(character.id);
    });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const rotation = interpolate(
        event.translationX,
        [-width / 2, width / 2],
        [-15, 15]
      );
      rotateY.value = rotation;
    })
    .onEnd(() => {
      rotateY.value = withSpring(0);
    });

  const combinedGesture = Gesture.Simultaneous(pressGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { perspective: 1000 },
      { rotateY: `${rotateY.value}deg` },
      { translateZ: elevation.value }
    ],
  }));

  const shadowStyle = useAnimatedStyle(() => ({
    shadowOffset: { width: 0, height: elevation.value / 2 },
    shadowOpacity: elevation.value / 40,
    shadowRadius: elevation.value / 2,
    elevation: elevation.value,
  }));

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View style={[animatedStyle, shadowStyle]} className="mb-6 relative">
        {/* Particle Effects */}
        {isPressed && (
          <ParticleField 
            count={30} 
            color={gradientColors[1]} 
            opacity={0.8}
          />
        )}
        
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-1"
        >
          <View className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
            {/* Animated Background Pattern */}
            <View className="absolute inset-0 opacity-10">
              <LinearGradient
                colors={[gradientColors[0], 'transparent', gradientColors[2]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0"
              />
            </View>

            {/* Character Image with Enhanced Effects */}
            <View className="bg-gray-800 rounded-xl h-48 mb-4 items-center justify-center overflow-hidden relative">
              {character.imageUrl && character.imageUrl.startsWith('http') ? (
                <>
                  <Image
                    source={{ uri: character.imageUrl }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                    className="rounded-xl"
                  />
                  {/* Holographic Overlay */}
                  <LinearGradient
                    colors={['transparent', gradientColors[1] + '20', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="absolute inset-0"
                  />
                </>
              ) : (
                <LinearGradient
                  colors={gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="w-24 h-24 rounded-full items-center justify-center"
                >
                  <Text className="text-white text-3xl font-bold">
                    {character.name.charAt(0)}
                  </Text>  
                </LinearGradient>
              )}
            </View>

            {/* Enhanced Character Info */}
            <View className="space-y-3 relative z-10">
              <View>
                <Text className="text-white text-2xl font-bold mb-1">
                  {character.name}
                </Text>
                <Text className="text-amber-500 text-sm font-semibold">
                  {character.role}
                </Text>
              </View>

              <Text className="text-gray-300 text-base leading-6">
                {character.description}
              </Text>

              {/* Enhanced Stats Display */}
              {character.stats && (
                <View className="mt-4">
                  <Text className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">
                    Power Levels
                  </Text>
                  <View className="flex-row flex-wrap">
                    {Object.entries(character.stats).map(([stat, value], idx) => (
                      <View key={stat} className="mr-3 mb-2">
                        <View className="bg-gray-800 rounded-full px-3 py-1 border border-amber-500/30">
                          <Text className="text-amber-400 text-xs font-bold">
                            {stat.toUpperCase()}: {value}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Character Tags with Glow Effect */}
              <View className="flex-row flex-wrap mt-4">
                <View className="bg-gray-800 border border-amber-500/50 rounded-full px-3 py-1 mr-2 mb-2">
                  <Text className="text-amber-300 text-xs">📚 Full Biography</Text>
                </View>
                <View className="bg-gray-800 border border-amber-500/50 rounded-full px-3 py-1 mr-2 mb-2">
                  <Text className="text-amber-300 text-xs">🎭 Character Arc</Text>
                </View>
                {index < 2 && (
                  <View className="bg-amber-900/30 border border-amber-500 rounded-full px-3 py-1 mr-2 mb-2">
                    <Text className="text-amber-400 text-xs">💎 Exclusive Content</Text>
                  </View>
                )}
              </View>

              {/* Interactive Action Button */}
              <Pressable className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 mt-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-amber-400 font-semibold">
                    Explore Character
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#f59e0b" />
                </View>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
}