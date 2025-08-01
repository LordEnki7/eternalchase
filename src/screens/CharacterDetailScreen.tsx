import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppStore } from '../state/app-store';

type CharacterDetailRouteProp = RouteProp<RootStackParamList, 'CharacterDetail'>;

export default function CharacterDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<CharacterDetailRouteProp>();
  const { characterId } = route.params;
  const { characters } = useAppStore();
  const [activeTab, setActiveTab] = useState<'bio' | 'arc' | 'relationships'>('bio');

  const character = characters.find(c => c.id === characterId);
  
  if (!character) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white text-xl">Character not found</Text>
      </View>
    );
  }

  const gradientColors = {
    kael: ['#1e3a8a', '#3b82f6', '#1e40af'] as const,
    lyra: ['#7c2d12', '#dc2626', '#991b1b'] as const,
    magnus: ['#4c1d95', '#8b5cf6', '#7c3aed'] as const,
    vera: ['#365314', '#16a34a', '#15803d'] as const
  };

  const characterArcs = {
    kael: [
      { phase: 'Discovery', description: 'Awakening to immortal nature and the weight of eternity' },
      { phase: 'Resistance', description: 'Fighting against the inevitable cycle of conflict' },
      { phase: 'Acceptance', description: 'Understanding the true nature of the eternal chase' },
      { phase: 'Transcendence', description: 'Finding purpose beyond the endless struggle' }
    ],
    lyra: [
      { phase: 'Mystery', description: 'Appearing as an enigmatic guide with hidden motives' },
      { phase: 'Alliance', description: 'Revealing her connection to Kael\'s destiny' },
      { phase: 'Sacrifice', description: 'Making impossible choices for the greater good' },
      { phase: 'Revelation', description: 'Unveiling her true identity and purpose' }
    ],
    magnus: [
      { phase: 'Corruption', description: 'Fall from grace as guardian of balance' },
      { phase: 'Dominion', description: 'Building an empire of eternal suffering' },
      { phase: 'Obsession', description: 'Pursuit of ultimate power over existence' },
      { phase: 'Downfall', description: 'The price of abandoning all compassion' }
    ],
    vera: [
      { phase: 'Determination', description: 'Refusing to accept the inevitability of fate' },
      { phase: 'Growth', description: 'Developing strength to match immortal beings' },
      { phase: 'Leadership', description: 'Becoming a beacon of hope for mortals' },
      { phase: 'Legacy', description: 'Proving mortality can triumph over eternity' }
    ]
  };

  const relationships = {
    kael: [
      { with: 'Lyra', type: 'Destined Allies', description: 'Bound by prophecy and shared purpose' },
      { with: 'Riven', type: 'Complex Trust', description: 'Former allies with a complicated past' },
      { with: 'Velo Entity', type: 'Mortal Enemy', description: 'The shadow seeks to corrupt his love for Lyra' }
    ],
    lyra: [
      { with: 'Kael', type: 'Fated Connection', description: 'Their destinies are intertwined across time' },
      { with: 'Grandma Ama', type: 'Protective Bond', description: 'Her grandmother\'s wisdom guides her path' },
      { with: 'Velo Entity', type: 'Target of Corruption', description: 'The entity feeds on her powerful emotions' }
    ],
    riven: [
      { with: 'Kael', type: 'Redemptive Alliance', description: 'Seeking to make amends for past betrayals' },
      { with: 'Lyra', type: 'Protective Guardian', description: 'Defends her from the Veil\'s pursuit' },
      { with: 'Velo Entity', type: 'Ancient Knowledge', description: 'Understands the entity\'s true nature' }
    ],
    maya: [
      { with: 'Kael', type: 'Divine Guidance', description: 'Watches over his cosmic awakening' },
      { with: 'Lyra', type: 'Hidden Protector', description: 'Shields her from forces beyond understanding' },
      { with: 'Velo Entity', type: 'Opposing Force', description: 'Stands against the shadow\'s influence' }
    ],
    grandma: [
      { with: 'Lyra', type: 'Sacrificial Love', description: 'Gave everything to protect her granddaughter' },
      { with: 'The Starborn', type: 'Divine Keeper', description: 'Once held the keys to their cosmic bonds' },
      { with: 'Velo Entity', type: 'Ancient Ward', description: 'Her sacrifice weakened the entity\'s hold' }
    ],
    velo_entity: [
      { with: 'Kael & Lyra', type: 'Parasitic Hunger', description: 'Feeds on their love and seeks to corrupt their bond' },
      { with: 'The Starborn', type: 'Cosmic Predator', description: 'Hunts those with the strongest emotional connections' },
      { with: 'The Divine Source', type: 'Antithesis', description: 'Represents the corruption of all that is sacred' }
    ]
  };

  const TabButton = ({ tab, title }: { tab: typeof activeTab, title: string }) => (
    <Pressable
      className={`flex-1 py-3 px-4 ${
        activeTab === tab ? 'border-b-2 border-amber-500' : ''
      }`}
      onPress={() => setActiveTab(tab)}
    >
      <Text className={`text-center font-semibold ${
        activeTab === tab ? 'text-amber-500' : 'text-gray-400'
      }`}>
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Character Header */}
        <LinearGradient
          colors={gradientColors[character.id as keyof typeof gradientColors] || gradientColors.kael}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-20 pb-8 px-6"
        >
          {/* Character Avatar */}
          <View className="items-center mb-6">
            <View className="mb-4 overflow-hidden rounded-2xl border-4 border-white/20" style={{ width: 280, height: 400 }}>
              {character.imageUrl && character.imageUrl.startsWith('http') ? (
                <Image
                  source={{ uri: character.imageUrl }}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="contain"
                />
              ) : (
                <View className="bg-white/20 w-full h-full items-center justify-center">
                  <Text className="text-white text-5xl font-bold">
                    {character.name.charAt(0)}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-white text-3xl font-bold text-center mb-2">
              {character.name}
            </Text>
            <Text className="text-white/90 text-lg text-center font-semibold">
              {character.role}
            </Text>
          </View>
        </LinearGradient>

        {/* Tab Navigation */}
        <View className="bg-gray-900 border-b border-gray-800">
          <View className="flex-row">
            <TabButton tab="bio" title="Biography" />
            <TabButton tab="arc" title="Character Arc" />
            <TabButton tab="relationships" title="Relationships" />
          </View>
        </View>

        {/* Tab Content */}
        <View className="px-6 py-8">
          {activeTab === 'bio' && (
            <View className="space-y-6">
              <View>
                <Text className="text-white text-2xl font-bold mb-4">
                  Character Overview
                </Text>
                <Text className="text-gray-300 text-base leading-7 mb-6">
                  {character.description}
                </Text>
              </View>

              <View>
                <Text className="text-white text-xl font-bold mb-4">
                  Background
                </Text>
                <Text className="text-gray-300 text-base leading-7">
                  {character.background}
                </Text>
              </View>

              {/* Character Stats */}
              <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <Text className="text-white text-xl font-bold mb-4">
                  Character Attributes
                </Text>
                
                {character.stats ? (
                  <View className="space-y-4">
                    {character.stats.energy && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Energy</Text>
                        <View className="flex-row items-center">
                          <Text className="text-cyan-400 text-xl font-bold mr-2">{character.stats.energy}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full h-3" 
                              style={{ width: `${character.stats.energy}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {character.stats.intelligence && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Intelligence</Text>
                        <View className="flex-row items-center">
                          <Text className="text-cyan-400 text-xl font-bold mr-2">{character.stats.intelligence}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full h-3" 
                              style={{ width: `${character.stats.intelligence}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {character.stats.combat && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Combat</Text>
                        <View className="flex-row items-center">
                          <Text className="text-cyan-400 text-xl font-bold mr-2">{character.stats.combat}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full h-3" 
                              style={{ width: `${character.stats.combat}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {character.stats.love && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Love</Text>
                        <View className="flex-row items-center">
                          <Text className="text-cyan-400 text-xl font-bold mr-2">{character.stats.love}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full h-3" 
                              style={{ width: `${character.stats.love}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {character.stats.wisdom && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Wisdom</Text>
                        <View className="flex-row items-center">
                          <Text className="text-amber-400 text-xl font-bold mr-2">{character.stats.wisdom}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-full h-3" 
                              style={{ width: `${character.stats.wisdom}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {character.stats.spirituality && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Spirituality</Text>
                        <View className="flex-row items-center">
                          <Text className="text-amber-400 text-xl font-bold mr-2">{character.stats.spirituality}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-full h-3" 
                              style={{ width: `${character.stats.spirituality}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {character.stats.manipulation && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Manipulation</Text>
                        <View className="flex-row items-center">
                          <Text className="text-red-400 text-xl font-bold mr-2">{character.stats.manipulation}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-red-600 to-red-500 rounded-full h-3" 
                              style={{ width: `${character.stats.manipulation}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {character.stats.corruption && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Corruption</Text>
                        <View className="flex-row items-center">
                          <Text className="text-purple-400 text-xl font-bold mr-2">{character.stats.corruption}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-full h-3" 
                              style={{ width: `${character.stats.corruption}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {character.stats.psychic_power && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Psychic Power</Text>
                        <View className="flex-row items-center">
                          <Text className="text-violet-400 text-xl font-bold mr-2">{character.stats.psychic_power}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-violet-600 to-violet-500 rounded-full h-3" 
                              style={{ width: `${character.stats.psychic_power}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {character.stats.shadow_energy && (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-gray-300 text-lg uppercase tracking-wide font-semibold">Shadow Energy</Text>
                        <View className="flex-row items-center">
                          <Text className="text-rose-400 text-xl font-bold mr-2">{character.stats.shadow_energy}</Text>
                          <View className="bg-gray-700 rounded-full h-3 w-24">
                            <View 
                              className="bg-gradient-to-r from-rose-600 to-rose-500 rounded-full h-3" 
                              style={{ width: `${character.stats.shadow_energy}%` }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    
                    <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
                      <Text className="text-amber-400 text-sm font-semibold text-center">
                        💫 Maximum Heart Rating: The Perfect Balance of Power & Compassion
                      </Text>
                    </View>
                  </View>
                ) : (
                  // Default stats for characters without card stats
                  <View className="space-y-4">
                    <View>
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-300">Power Level</Text>
                        <Text className="text-amber-500">Cosmic</Text>
                      </View>
                      <View className="bg-gray-700 rounded-full h-2">
                        <View className="bg-amber-500 rounded-full h-2 w-5/6" />
                      </View>
                    </View>
                    
                    <View>
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-300">Influence</Text>
                        <Text className="text-amber-500">Legendary</Text>
                      </View>
                      <View className="bg-gray-700 rounded-full h-2">
                        <View className="bg-amber-500 rounded-full h-2 w-4/5" />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          {activeTab === 'arc' && (
            <View>
              <Text className="text-white text-2xl font-bold mb-6">
                Character Development
              </Text>
              
              <View className="space-y-4">
                {characterArcs[character.id as keyof typeof characterArcs]?.map((phase, index) => (
                  <View key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <View className="flex-row items-center mb-3">
                      <View className="bg-amber-500 rounded-full w-8 h-8 items-center justify-center mr-4">
                        <Text className="text-black font-bold text-sm">{index + 1}</Text>
                      </View>
                      <Text className="text-white text-lg font-bold">
                        {phase.phase}
                      </Text>
                    </View>
                    <Text className="text-gray-300 text-base leading-6 ml-12">
                      {phase.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'relationships' && (
            <View>
              <Text className="text-white text-2xl font-bold mb-6">
                Character Relationships
              </Text>
              
              <View className="space-y-4">
                {relationships[character.id as keyof typeof relationships]?.map((rel, index) => (
                  <View key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <View className="flex-row items-center justify-between mb-3">
                      <Text className="text-white text-lg font-bold">
                        {rel.with}
                      </Text>
                      <View className="bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-1">
                        <Text className="text-amber-400 text-sm font-semibold">
                          {rel.type}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-gray-300 text-base leading-6">
                      {rel.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Featured Appearances */}
        <View className="px-6 pb-8">
          <Text className="text-white text-xl font-bold mb-4">
            Featured In
          </Text>
          
          <View className="space-y-3">
            <View className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-white font-semibold">Book 1: The Eternal Chase</Text>
                  <Text className="text-gray-400 text-sm">Main character arc begins</Text>
                </View>
                <Ionicons name="book" size={20} color="#f59e0b" />
              </View>
            </View>
            
            <View className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-white font-semibold">Book 2: Shadows of Eternity</Text>
                  <Text className="text-gray-400 text-sm">Character development deepens</Text>
                </View>
                <Ionicons name="book" size={20} color="#f59e0b" />
              </View>
            </View>
            
            <View className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-white font-semibold">Book 3: Dawn of Reckoning</Text>
                  <Text className="text-gray-400 text-sm">Final resolution</Text>
                </View>
                <Ionicons name="book" size={20} color="#f59e0b" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}