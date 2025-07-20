import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface Props {
  fusion: {
    id: string;
    title: string;
    characters: string[];
    tagline: string;
    description: string;
    imageUrl: string;
    type: 'bond' | 'conflict' | 'alliance';
  };
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function EnhancedFusionCard({ fusion, onPress }: Props) {
  const [isPressed, setIsPressed] = useState(false);
  
  // Animation values
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(-2);
  const glowIntensity = useSharedValue(0);
  const particleAnimation = useSharedValue(0);
  const heartbeatScale = useSharedValue(1);

  useEffect(() => {
    // Entrance animation
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 1000 });
    rotation.value = withSpring(0, { damping: 12, stiffness: 80 });
    
    // Continuous glow effect
    glowIntensity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 2000 }),
        withTiming(0.8, { duration: 2000 }),
        withTiming(0.3, { duration: 2000 })
      ),
      -1,
      false
    );

    // Particle animation for bond type
    if (fusion.type === 'bond') {
      particleAnimation.value = withRepeat(
        withTiming(1, { duration: 4000 }),
        -1,
        false
      );
    }

    // Heartbeat effect for love bond
    heartbeatScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      false
    );
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value * (isPressed ? 0.98 : 1) },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowIntensity.value,
    shadowOpacity: glowIntensity.value,
  }));

  const heartbeatStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartbeatScale.value }]
  }));

  const particleStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      particleAnimation.value,
      [0, 1],
      [0, -100]
    );
    const particleOpacity = interpolate(
      particleAnimation.value,
      [0, 0.5, 1],
      [1, 0.5, 0]
    );
    
    return {
      transform: [{ translateY }],
      opacity: particleOpacity,
    };
  });

  const getTypeGradient = () => {
    switch (fusion.type) {
      case 'bond':
        return ['#ff6b6b', '#ffd93d', '#6bcf7f'] as const;
      case 'conflict':
        return ['#ff4757', '#ff3838', '#c44569'] as const;
      case 'alliance':
        return ['#3742fa', '#2f3542', '#70a1ff'] as const;
      default:
        return ['#f59e0b', '#d97706', '#b45309'] as const;
    }
  };

  const getTypeEmoji = () => {
    switch (fusion.type) {
      case 'bond': return '💖';
      case 'conflict': return '⚔️';
      case 'alliance': return '🤝';
      default: return '⭐';
    }
  };

  const handlePress = () => {
    setIsPressed(true);
    
    // Press animation
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    
    setTimeout(() => {
      setIsPressed(false);
      onPress?.();
    }, 200);
  };

  return (
    <AnimatedPressable
      style={[cardStyle, { marginBottom: 24 }]}
      onPress={handlePress}
    >
      {/* Animated Glow Effects */}
      <Animated.View 
        style={[
          glowStyle,
          {
            position: 'absolute',
            top: -8,
            left: -8,
            right: -8,
            bottom: -8,
            borderRadius: 24,
            shadowColor: getTypeGradient()[1],
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 30,
            elevation: 20,
          }
        ]}
      >
        <LinearGradient
          colors={[getTypeGradient()[1] + '40', 'transparent']}
          className="flex-1 rounded-2xl"
        />
      </Animated.View>

      {/* Floating Particles for Bond Type */}
      {fusion.type === 'bond' && (
        <View className="absolute inset-0 overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <Animated.View
              key={i}
              style={[
                particleStyle,
                {
                  position: 'absolute',
                  left: `${15 + i * 12}%`,
                  top: '80%',
                  width: 4,
                  height: 4,
                  backgroundColor: '#ffd93d',
                  borderRadius: 2,
                }
              ]}
            />
          ))}
        </View>
      )}

      <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        className="rounded-2xl p-1"
      >
        <View className="bg-gray-900 rounded-2xl overflow-hidden relative">
          {/* Main Image */}
          <View className="h-96 relative">
            <Image
              source={{ uri: fusion.imageUrl }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
            
            {/* Dynamic Overlay based on type */}
            <LinearGradient
              colors={
                fusion.type === 'bond' 
                  ? ['transparent', 'rgba(255,107,107,0.3)', 'rgba(0,0,0,0.9)']
                  : ['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="absolute inset-0"
            />

            {/* Type Badge */}
            <View className="absolute top-4 right-4">
              <LinearGradient
                colors={getTypeGradient()}
                className="rounded-full px-3 py-2"
              >
                <Text className="text-white text-xs font-bold">
                  {getTypeEmoji()} {fusion.type.toUpperCase()}
                </Text>
              </LinearGradient>
            </View>

            {/* Content Overlay */}
            <View className="absolute bottom-0 left-0 right-0 p-6">
              <Animated.View style={heartbeatStyle}>
                <Text className="text-amber-500 text-sm font-bold mb-2 tracking-wide">
                  ✨ FUSION CARD
                </Text>
                <Text className="text-white text-3xl font-bold mb-3">
                  {fusion.title}
                </Text>
                <Text className="text-amber-400 text-xl font-semibold mb-4 leading-7">
                  {fusion.tagline}
                </Text>
                <Text className="text-gray-200 text-base leading-6 mb-4">
                  {fusion.description}
                </Text>
              </Animated.View>

              {/* Character Tags */}
              <View className="flex-row flex-wrap mb-4">
                {fusion.characters.map((charId, index) => (
                  <View 
                    key={charId}
                    className="bg-white/10 border border-white/20 rounded-full px-3 py-1 mr-2 mb-2"
                  >
                    <Text className="text-white text-xs font-semibold uppercase">
                      {charId}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Power Level Indicator */}
              {fusion.type === 'bond' && (
                <View className="bg-gradient-to-r from-pink-500/20 to-amber-500/20 border border-pink-500/30 rounded-xl p-4">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-pink-400 text-sm font-bold mb-1">
                        💫 COSMIC BOND LEVEL
                      </Text>
                      <Text className="text-white text-lg font-bold">
                        Infinite ∞
                      </Text>
                    </View>
                    <View className="flex-row space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <View 
                          key={i}
                          className="w-2 h-8 bg-gradient-to-t from-pink-500 to-amber-400 rounded-full"
                        />
                      ))}
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}