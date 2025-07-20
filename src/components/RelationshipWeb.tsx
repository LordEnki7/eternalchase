import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withDelay,
  interpolate
} from 'react-native-reanimated';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';
import { useAppStore } from '../state/app-store';

const { width, height } = Dimensions.get('window');

interface RelationshipNode {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  imageUrl?: string;
}

interface RelationshipEdge {
  from: string;
  to: string;
  type: string;
  strength: number;
  color: string;
}

export default function RelationshipWeb() {
  const { characters } = useAppStore();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const webScale = useSharedValue(0);
  const nodeAnimations = useSharedValue<Record<string, number>>({});

  const relationships: RelationshipEdge[] = [
    { from: 'kael', to: 'lyra', type: 'Cosmic Bond', strength: 95, color: '#f59e0b' },
    { from: 'lyra', to: 'grandma', type: 'Family Love', strength: 90, color: '#ef4444' },
    { from: 'kael', to: 'riven', type: 'Brotherhood', strength: 70, color: '#3b82f6' },
    { from: 'lyra', to: 'riven', type: 'Alliance', strength: 60, color: '#8b5cf6' },
    { from: 'grandma', to: 'kael', type: 'Guidance', strength: 85, color: '#10b981' },
    { from: 'grandma', to: 'riven', type: 'Forgiveness', strength: 55, color: '#f97316' },
  ];

  const nodes: RelationshipNode[] = [
    { id: 'kael', name: 'Kael', x: width * 0.3, y: height * 0.3, color: '#3b82f6' },
    { id: 'lyra', name: 'Lyra', x: width * 0.7, y: height * 0.3, color: '#8b5cf6' },
    { id: 'grandma', name: 'Grandma Ama', x: width * 0.5, y: height * 0.6, color: '#f59e0b' },
    { id: 'riven', name: 'Riven', x: width * 0.5, y: height * 0.15, color: '#ef4444' },
  ].map(node => {
    const character = characters.find(c => c.id === node.id);
    return {
      ...node,
      imageUrl: character?.imageUrl
    };
  });

  useEffect(() => {
    webScale.value = withDelay(300, withSpring(1, { damping: 15, stiffness: 100 }));
    
    // Animate nodes with staggered delays
    nodes.forEach((node, index) => {
      setTimeout(() => {
        nodeAnimations.value = {
          ...nodeAnimations.value,
          [node.id]: 1
        };
      }, index * 200);
    });
  }, []);

  const webStyle = useAnimatedStyle(() => ({
    transform: [{ scale: webScale.value }],
    opacity: webScale.value,
  }));

  const RelationshipLine = ({ edge }: { edge: RelationshipEdge }) => {
    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);
    
    if (!fromNode || !toNode) return null;

    const lineOpacity = selectedNode ? 
      (selectedNode === edge.from || selectedNode === edge.to ? 1 : 0.3) : 0.7;

    return (
      <Line
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        stroke={edge.color}
        strokeWidth={edge.strength / 15}
        strokeOpacity={lineOpacity}
        strokeDasharray={selectedNode === edge.from || selectedNode === edge.to ? "0" : "5,5"}
      />
    );
  };

  const CharacterNode = ({ node }: { node: RelationshipNode }) => {
    const character = characters.find(c => c.id === node.id);
    const isSelected = selectedNode === node.id;
    const nodeScale = useSharedValue(isSelected ? 1.2 : 1);

    useEffect(() => {
      nodeScale.value = withSpring(isSelected ? 1.2 : 1);
    }, [isSelected]);

    const nodeStyle = useAnimatedStyle(() => ({
      transform: [{ scale: nodeScale.value }],
    }));

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: node.x - 40,
            top: node.y - 40,
          },
          nodeStyle
        ]}
      >
        <Pressable
          onPress={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
          className="items-center"
        >
          <View className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 mb-2">
            {character?.imageUrl && character.imageUrl.startsWith('http') ? (
              <Image
                source={{ uri: character.imageUrl }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            ) : (
              <LinearGradient
                colors={[node.color, node.color + '80']}
                className="w-full h-full items-center justify-center"
              >
                <Text className="text-white text-2xl font-bold">
                  {node.name.charAt(0)}
                </Text>
              </LinearGradient>
            )}
          </View>
          
          <View className="bg-black/80 rounded-full px-3 py-1">
            <Text className="text-white text-xs font-semibold">
              {node.name}
            </Text>
          </View>

          {isSelected && (
            <View className="absolute -inset-2 rounded-full border-2 border-amber-500 animate-pulse" />
          )}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-black relative">
      {/* Background Pattern */}
      <View className="absolute inset-0 opacity-10">
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f0f23']}
          className="flex-1"
        />
      </View>

      {/* Header */}
      <View className="pt-16 pb-8 px-6 z-10">
        <Text className="text-white text-3xl font-bold text-center mb-2">
          Character Bonds
        </Text>
        <Text className="text-gray-400 text-center">
          Tap characters to explore their connections
        </Text>
      </View>

      {/* Relationship Web */}
      <Animated.View style={[webStyle, { flex: 1 }]}>
        <Svg width={width} height={height * 0.7} className="absolute">
          {relationships.map((edge, index) => (
            <RelationshipLine key={index} edge={edge} />
          ))}
        </Svg>

        {nodes.map((node) => (
          <CharacterNode key={node.id} node={node} />
        ))}
      </Animated.View>

      {/* Relationship Details */}
      {selectedNode && (
        <View className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-6">
          <Text className="text-white text-xl font-bold mb-4">
            {nodes.find(n => n.id === selectedNode)?.name} Connections
          </Text>
          
          <View className="space-y-3">
            {relationships
              .filter(r => r.from === selectedNode || r.to === selectedNode)
              .map((rel, index) => {
                const otherNode = rel.from === selectedNode ? rel.to : rel.from;
                const otherCharacter = nodes.find(n => n.id === otherNode);
                
                return (
                  <View key={index} className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-white font-semibold">
                        {otherCharacter?.name} • {rel.type}
                      </Text>
                      <View className="bg-gray-700 rounded-full h-2 mt-2">
                        <View 
                          className="rounded-full h-2"
                          style={{ 
                            width: `${rel.strength}%`,
                            backgroundColor: rel.color 
                          }}
                        />
                      </View>
                    </View>
                    <Text className="text-gray-400 text-sm ml-4">
                      {rel.strength}%
                    </Text>
                  </View>
                );
              })}
          </View>
        </View>
      )}
    </View>
  );
}