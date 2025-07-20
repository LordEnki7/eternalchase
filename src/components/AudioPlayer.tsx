import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
} from 'react-native-reanimated';

interface Props {
  chapterId: string;
  chapterTitle: string;
  duration?: string;
  isCurrentChapter?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export default function AudioPlayer({ 
  chapterId, 
  chapterTitle, 
  duration = "15:00", 
  isCurrentChapter = false,
  onPlayStateChange 
}: Props) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  
  // Animation values
  const waveAnimation = useSharedValue(0);
  const glowAnimation = useSharedValue(0);
  const progressAnimation = useSharedValue(0);

  // Mock audio URLs - in production, these would be real audio files
  const getAudioUrl = (chapterId: string) => {
    // This would map to real audio files in your assets or CDN
    const audioMap: { [key: string]: string } = {
      'b1c1': 'https://example.com/audio/signal-calls.mp3',
      'b1c2': 'https://example.com/audio/stranger-shore.mp3',
      // Add more mappings...
    };
    return audioMap[chapterId] || null;
  };

  useEffect(() => {
    // Start wave animation when playing
    if (isPlaying) {
      waveAnimation.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0, { duration: 1000 })
        ),
        -1,
        false
      );
      
      glowAnimation.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0.3, { duration: 2000 })
        ),
        -1,
        false
      );
    } else {
      waveAnimation.value = withTiming(0);
      glowAnimation.value = withTiming(0);
    }
  }, [isPlaying]);

  const loadAudio = async () => {
    try {
      setIsLoading(true);
      const audioUrl = getAudioUrl(chapterId);
      
      if (!audioUrl) {
        // Mock playback for demo
        setIsPlaying(true);
        setTotalDuration(parseFloat(duration.split(':')[0]) * 60 + parseFloat(duration.split(':')[1]));
        simulatePlayback();
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false }
      );
      
      setSound(sound);
      
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setTotalDuration(status.durationMillis || 0);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.log('Audio loading failed:', error);
      setIsLoading(false);
      // Fallback to mock playback
      simulatePlayback();
    }
  };

  const simulatePlayback = () => {
    // Mock audio playback for demo
    setIsPlaying(true);
    const interval = setInterval(() => {
      setPosition(prev => {
        const newPos = prev + 1000;
        const total = parseFloat(duration.split(':')[0]) * 60 + parseFloat(duration.split(':')[1]);
        if (newPos >= total * 1000) {
          clearInterval(interval);
          setIsPlaying(false);
          setPosition(0);
          return 0;
        }
        return newPos;
      });
    }, 1000);
  };

  const togglePlayback = async () => {
    if (!sound && !isPlaying) {
      await loadAudio();
      return;
    }

    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
      }
    }
    
    setIsPlaying(!isPlaying);
    onPlayStateChange?.(!isPlaying);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const waveStyle = useAnimatedStyle(() => ({
    transform: [
      { 
        scaleY: interpolate(
          waveAnimation.value,
          [0, 1],
          [0.3, 1.5]
        )
      }
    ],
    opacity: interpolate(
      waveAnimation.value,
      [0, 1],
      [0.3, 1]
    )
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowAnimation.value,
    shadowOpacity: glowAnimation.value * 0.8,
  }));

  const progressPercentage = totalDuration > 0 ? (position / totalDuration) * 100 : 0;

  return (
    <View className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Text className="text-white text-xl font-bold mb-1">
            Audio Experience
          </Text>
          <Text className="text-gray-400 text-sm">
            {chapterTitle} • {duration}
          </Text>
        </View>
        
        {/* Main Play Button */}
        <Animated.View style={[glowStyle]}>
          <Pressable
            className="bg-amber-500 rounded-full p-4 relative"
            onPress={togglePlayback}
            disabled={isLoading}
            style={{
              shadowColor: '#f59e0b',
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            {isLoading ? (
              <Ionicons name="hourglass" size={32} color="#000" />
            ) : (
              <Ionicons 
                name={isPlaying ? 'pause' : 'play'} 
                size={32} 
                color="#000"
              />
            )}
            
            {/* Pulse rings when playing */}
            {isPlaying && (
              <>
                <Animated.View 
                  style={[
                    waveStyle,
                    {
                      position: 'absolute',
                      top: -8,
                      left: -8,
                      right: -8,
                      bottom: -8,
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: '#f59e0b',
                    }
                  ]}
                />
                <Animated.View 
                  style={[
                    waveStyle,
                    {
                      position: 'absolute',
                      top: -16,
                      left: -16,
                      right: -16,
                      bottom: -16,
                      borderRadius: 58,
                      borderWidth: 1,
                      borderColor: '#f59e0b',
                      opacity: 0.5,
                    }
                  ]}
                />
              </>
            )}
          </Pressable>
        </Animated.View>
      </View>
      
      {/* Progress Bar */}
      <View className="mb-4">
        <View className="bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
          <LinearGradient
            colors={['#f59e0b', '#d97706']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ 
              height: '100%', 
              width: `${progressPercentage}%`,
              borderRadius: 12
            }}
          />
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400 text-xs">
            {formatTime(position)}
          </Text>
          <Text className="text-gray-400 text-xs">
            {duration}
          </Text>
        </View>
      </View>
      
      {/* Audio Controls */}
      <View className="flex-row items-center justify-center space-x-8">
        <Pressable className="p-2">
          <Ionicons name="play-skip-back" size={24} color="#6b7280" />
        </Pressable>
        <Pressable className="p-2">
          <Ionicons name="play-back" size={20} color="#6b7280" />
        </Pressable>
        <Pressable className="p-2">
          <Ionicons name="play-forward" size={20} color="#6b7280" />
        </Pressable>
        <Pressable className="p-2">
          <Ionicons name="play-skip-forward" size={24} color="#6b7280" />
        </Pressable>
      </View>
      
      {/* Now Playing Status */}
      {isPlaying && (
        <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
          <View className="flex-row items-center justify-center">
            <View className="flex-row space-x-1 mr-3">
              {[1, 2, 3, 4].map((i) => (
                <Animated.View
                  key={i}
                  style={[
                    waveStyle,
                    {
                      width: 3,
                      height: 12,
                      backgroundColor: '#f59e0b',
                      borderRadius: 1.5,
                    }
                  ]}
                />
              ))}
            </View>
            <Text className="text-amber-400 text-sm text-center">
              🎵 Now Playing • Cinematic Soundtrack
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}