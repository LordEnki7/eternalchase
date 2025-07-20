import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface Character {
  id: string;
  name: string;
  imageUrl?: string;
  position: { x: number; y: number };
  color: string;
}

interface Relationship {
  from: string;
  to: string;
  type: string;
  strength: number; // 1-10
  color: string;
}

interface Props {
  selectedCharacter?: string;
  onCharacterPress?: (characterId: string) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function CharacterRelationshipWeb({ selectedCharacter, onCharacterPress }: Props) {
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  
  // Animation values
  const pulseAnimation = useSharedValue(0);
  const connectionAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  // Character positions in a cosmic web layout
  const characters: Character[] = [
    {
      id: 'kael',
      name: 'Kael',
      position: { x: width * 0.3, y: height * 0.3 },
      color: '#3b82f6'
    },
    {
      id: 'lyra',
      name: 'Lyra',
      position: { x: width * 0.7, y: height * 0.3 },
      color: '#dc2626'
    },
    {
      id: 'riven',
      name: 'Riven',
      position: { x: width * 0.5, y: height * 0.6 },
      color: '#8b5cf6'
    },
    {
      id: 'grandma',
      name: 'Grandma Ama',
      position: { x: width * 0.5, y: height * 0.1 },
      color: '#f59e0b'
    },
    {
      id: 'maya',
      name: 'Maya',
      position: { x: width * 0.1, y: height * 0.5 },
      color: '#16a34a'
    }
  ];

  const relationships: Relationship[] = [
    {
      from: 'kael',
      to: 'lyra',
      type: 'Cosmic Bond',
      strength: 10,
      color: '#ff6b6b'
    },
    {
      from: 'kael',
      to: 'riven',
      type: 'Brotherhood',
      strength: 7,
      color: '#4ecdc4'
    },
    {
      from: 'lyra',
      to: 'grandma',
      type: 'Family',
      strength: 9,
      color: '#ffe66d'
    },
    {
      from: 'riven',
      to: 'maya',
      type: 'Alliance',
      strength: 6,
      color: '#a8e6cf'
    },
    {
      from: 'grandma',
      to: 'kael',
      type: 'Guidance',
      strength: 8,
      color: '#ffd93d'
    }
  ];

  useEffect(() => {
    // Continuous pulse animation
    pulseAnimation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      false
    );

    // Connection line animations
    connectionAnimation.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      false
    );

    // Scale animation for selection
    if (selectedCharacter) {
      scaleAnimation.value = withSpring(1.2, { damping: 15, stiffness: 150 });
    } else {
      scaleAnimation.value = withSpring(1, { damping: 15, stiffness: 150 });
    }
  }, [selectedCharacter]);

  const handleCharacterPress = (characterId: string) => {
    // Show connections for this character
    const connections = relationships
      .filter(rel => rel.from === characterId || rel.to === characterId)
      .map(rel => rel.from === characterId ? rel.to : rel.from);
    
    setActiveConnections(connections);
    onCharacterPress?.(characterId);
  };

  const CharacterNode = ({ character }: { character: Character }) => {
    const isSelected = selectedCharacter === character.id;
    const isConnected = activeConnections.includes(character.id);
    
    const nodeStyle = useAnimatedStyle(() => {
      const scale = isSelected ? scaleAnimation.value : 1;
      const glowOpacity = interpolate(
        pulseAnimation.value,
        [0, 1],
        [0.3, 1]
      );
      
      return {
        transform: [{ scale }],
        opacity: selectedCharacter && !isSelected && !isConnected ? 0.4 : 1,
        shadowOpacity: isSelected ? glowOpacity : 0.3,
      };
    });

    return (
      <AnimatedPressable
        style={[
          nodeStyle,
          {
            position: 'absolute',
            left: character.position.x - 40,
            top: character.position.y - 40,
            width: 80,
            height: 80,
            shadowColor: character.color,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 20,
            elevation: 10,
          }
        ]}
        onPress={() => handleCharacterPress(character.id)}
      >
        <View
          className="w-20 h-20 rounded-full items-center justify-center border-4"
          style={{ 
            backgroundColor: character.color + '20',
            borderColor: character.color
          }}
        >
          {character.imageUrl ? (
            <Image
              source={{ uri: character.imageUrl }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
              contentFit="cover"
            />
          ) : (
            <Text className="text-white text-2xl font-bold">
              {character.name.charAt(0)}
            </Text>
          )}
        </View>
        
        {/* Character Name */}
        <View className="absolute -bottom-8 left-0 right-0">
          <Text className="text-white text-sm font-semibold text-center">
            {character.name}
          </Text>
        </View>
        
        {/* Power Ring */}
        {isSelected && (
          <View
            className="absolute -inset-2 rounded-full border-2 opacity-50"
            style={{ borderColor: character.color }}
          />
        )}
      </AnimatedPressable>
    );
  };

  const ConnectionLine = ({ relationship }: { relationship: Relationship }) => {
    const fromChar = characters.find(c => c.id === relationship.from);
    const toChar = characters.find(c => c.id === relationship.to);
    
    if (!fromChar || !toChar) return null;

    const isActive = selectedCharacter === relationship.from || 
                    selectedCharacter === relationship.to ||
                    activeConnections.includes(relationship.from) ||
                    activeConnections.includes(relationship.to);

    const lineStyle = useAnimatedStyle(() => {
      const opacity = isActive ? 1 : 0.3;
      const strokeWidth = isActive ? relationship.strength : 2;
      
      return { opacity };
    });

    return (
      <Animated.View style={[lineStyle, { position: 'absolute', top: 0, left: 0 }]}>
        <Svg width={width} height={height}>
          <Line
            x1={fromChar.position.x}
            y1={fromChar.position.y}
            x2={toChar.position.x}
            y2={toChar.position.y}
            stroke={relationship.color}
            strokeWidth={isActive ? relationship.strength / 2 : 1}
            strokeOpacity={isActive ? 0.8 : 0.3}
            strokeDasharray={isActive ? "0" : "5,5"}
          />
          
          {/* Relationship Label */}
          <SvgText
            x={(fromChar.position.x + toChar.position.x) / 2}
            y={(fromChar.position.y + toChar.position.y) / 2}
            fill={relationship.color}
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            opacity={isActive ? 1 : 0}
          >
            {relationship.type}
          </SvgText>
        </Svg>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-black relative">
      {/* Cosmic Background */}
      <View className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <View
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: Math.random() * width,
              top: Math.random() * height,
            }}
          />
        ))}
      </View>

      {/* Connection Lines */}
      {relationships.map((relationship, index) => (
        <ConnectionLine key={index} relationship={relationship} />
      ))}

      {/* Character Nodes */}
      {characters.map((character) => (
        <CharacterNode key={character.id} character={character} />
      ))}

      {/* Legend */}
      <View className="absolute bottom-10 left-4 right-4 bg-gray-900/80 rounded-xl p-4">
        <Text className="text-white text-lg font-bold mb-3">
          Relationship Web
        </Text>
        <Text className="text-gray-300 text-sm leading-5">
          Tap any character to explore their cosmic connections. Line thickness represents bond strength.
        </Text>
        
        {selectedCharacter && (
          <View className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <Text className="text-amber-400 text-sm font-semibold">
              Exploring: {characters.find(c => c.id === selectedCharacter)?.name}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}