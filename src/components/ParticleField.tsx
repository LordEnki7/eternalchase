import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  interpolate,
  withDelay
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  opacity?: number;
}

export default function ParticleField({ 
  count = 50, 
  color = '#f59e0b', 
  opacity = 0.6 
}: ParticleFieldProps) {
  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2000,
    duration: Math.random() * 3000 + 2000,
  }));

  return (
    <View className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <AnimatedParticle
          key={particle.id}
          particle={particle}
          color={color}
          opacity={opacity}
        />
      ))}
    </View>
  );
}

function AnimatedParticle({ 
  particle, 
  color, 
  opacity 
}: { 
  particle: Particle; 
  color: string; 
  opacity: number; 
}) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withDelay(
      particle.delay,
      withRepeat(
        withTiming(1, { duration: particle.duration }),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedValue.value, [0, 1], [0, -50]);
    const scale = interpolate(animatedValue.value, [0, 0.5, 1], [0.8, 1.2, 0.8]);
    const particleOpacity = interpolate(animatedValue.value, [0, 0.5, 1], [0.3, 1, 0.3]);

    return {
      transform: [
        { translateY },
        { scale }
      ],
      opacity: particleOpacity * opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: particle.x,
          top: particle.y,
          width: particle.size,
          height: particle.size,
          backgroundColor: color,
          borderRadius: particle.size / 2,
        },
        animatedStyle,
      ]}
    />
  );
}