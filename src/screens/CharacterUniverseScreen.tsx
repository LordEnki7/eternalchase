import React from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppStore } from '../state/app-store';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CharacterUniverseScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { characters } = useAppStore();

  const handleCharacterPress = (characterId: string) => {
    navigation.navigate('CharacterDetail', { characterId });
  };

  const CosmicEntityCard = ({ character }: { character: any }) => (
    <Pressable
      className="mb-6"
      onPress={() => handleCharacterPress(character.id)}
    >
      <LinearGradient
        colors={['#000000', '#1a1a2e', '#f59e0b', '#000000'] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-1"
      >
        <View className="bg-gray-900 rounded-2xl p-6">
          {/* Cosmic Entity Image */}
          <View className="bg-gray-800 rounded-xl h-64 mb-4 items-center justify-center overflow-hidden">
            {character.imageUrl && character.imageUrl.startsWith('http') ? (
              <Image
                source={{ uri: character.imageUrl }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
                className="rounded-xl"
              />
            ) : (
              <LinearGradient
                colors={['#f59e0b', '#d97706', '#b45309'] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="w-32 h-32 rounded-full items-center justify-center"
              >
                <Text className="text-black text-4xl font-bold">
                  {character.name.charAt(0)}
                </Text>  
              </LinearGradient>
            )}
          </View>

          {/* Cosmic Entity Info */}
          <View className="space-y-3">
            <View className="items-center">
              <Text className="text-amber-500 text-2xl font-bold mb-1 text-center">
                {character.name}
              </Text>
              <Text className="text-amber-400 text-sm font-semibold text-center">
                {character.role}
              </Text>
            </View>

            <Text className="text-gray-300 text-base leading-6 text-center italic">
              "{character.description.split('.')[0]}."
            </Text>

            {/* Cosmic Power Indicators */}
            <View className="flex-row justify-around mt-4 pt-4 border-t border-amber-500/30">
              <View className="items-center">
                <Text className="text-amber-500 text-xl font-bold">∞</Text>
                <Text className="text-gray-400 text-xs">Wisdom</Text>
              </View>
              <View className="items-center">
                <Text className="text-amber-500 text-xl font-bold">∞</Text>
                <Text className="text-gray-400 text-xs">Power</Text>
              </View>
              <View className="items-center">
                <Text className="text-amber-500 text-xl font-bold">∞</Text>
                <Text className="text-gray-400 text-xs">Presence</Text>
              </View>
            </View>

            {/* Action Button */}
            <Pressable className="bg-amber-500/20 border border-amber-500/40 rounded-xl p-4 mt-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-amber-400 font-semibold">
                  Explore Cosmic Entity
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#f59e0b" />
              </View>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );

  const CharacterCard = ({ character, index }: { character: any, index: number }) => {
    const gradientColors = [
      ['#1e3a8a', '#3b82f6', '#1e40af'] as const, // Kael - Blue
      ['#7c2d12', '#dc2626', '#991b1b'] as const, // Lyra - Red  
      ['#4c1d95', '#8b5cf6', '#7c3aed'] as const, // Magnus - Purple
      ['#365314', '#16a34a', '#15803d'] as const  // Vera - Green
    ];

    return (
      <Pressable
        className="mb-6"
        onPress={() => handleCharacterPress(character.id)}
      >
        <LinearGradient
          colors={gradientColors[index % gradientColors.length]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-1"
        >
          <View className="bg-gray-900 rounded-2xl p-6">
            {/* Character Image */}
            <View className="bg-gray-800 rounded-xl h-48 mb-4 items-center justify-center overflow-hidden">
              {character.imageUrl && character.imageUrl.startsWith('http') ? (
                <Image
                  source={{ uri: character.imageUrl }}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                  className="rounded-xl"
                />
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
            </View>

            {/* Character Info */}
            <View className="space-y-3">
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

              {/* Character Stats */}
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

              {/* Action Button */}
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
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <LinearGradient
          colors={['#000000', '#1a1a2e', '#16213e']}
          className="pt-16 pb-8 px-6"
        >
          <Text className="text-white text-3xl font-bold text-center mb-2">
            Character Universe
          </Text>
          <Text className="text-gray-400 text-center mb-6">
            Meet the immortal beings who shape eternity
          </Text>
          
          {/* Stats */}
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-amber-500 text-2xl font-bold">5</Text>
              <Text className="text-gray-400 text-sm">Characters</Text>
            </View>
            <View className="items-center">
              <Text className="text-amber-500 text-2xl font-bold">1</Text>
              <Text className="text-gray-400 text-sm">Cosmic Entity</Text>
            </View>
            <View className="items-center">
              <Text className="text-amber-500 text-2xl font-bold">∞</Text>
              <Text className="text-gray-400 text-sm">Years of History</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Main Characters */}
        <View className="px-6 py-6">
          <Text className="text-white text-2xl font-bold mb-6">
            Main Characters
          </Text>
          {characters.filter(char => char.id !== 'source').map((character, index) => (
            <CharacterCard key={character.id} character={character} index={index} />
          ))}
        </View>

        {/* Cosmic Entities */}
        <View className="px-6 pb-6">
          <Text className="text-white text-2xl font-bold mb-6">
            Cosmic Entities
          </Text>
          {characters.filter(char => char.id === 'source').map((character, index) => (
            <CosmicEntityCard key={character.id} character={character} />
          ))}
        </View>

        {/* Universe Lore Section */}
        <View className="px-6 pb-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Universe Lore
          </Text>
          
          <View className="space-y-4">
            <View className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6">
              <View className="flex-row items-center mb-4">
                <Ionicons name="radio-button-on" size={24} color="#f59e0b" />
                <Text className="text-white text-xl font-bold ml-3">
                  The Source
                </Text>
              </View>
              <Text className="text-gray-300 text-base leading-6">
                Origin of All. Memory of What Was. Destiny Yet To Be. Not a being, but a balance woven into the multiverse itself - responding to cosmic disruption, maintaining the eternal order.
              </Text>
            </View>

            <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <View className="flex-row items-center mb-4">
                <Ionicons name="time" size={24} color="#f59e0b" />
                <Text className="text-white text-xl font-bold ml-3">
                  The Starborn Legacy  
                </Text>
              </View>
              <Text className="text-gray-300 text-base leading-6">
                Kael, Lyra, and Riven were once cosmic guardians whose memories were erased. As they rediscover their true identities as Auron, Zahra, and their cosmic purpose, they face the choice between serving or replacing The Source.
              </Text>
            </View>

            <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <View className="flex-row items-center mb-4">
                <Ionicons name="planet" size={24} color="#f59e0b" />
                <Text className="text-white text-xl font-bold ml-3">
                  The Eternal Realm
                </Text>
              </View>
              <Text className="text-gray-300 text-base leading-6">
                A world between worlds where immortals gather, bound by ancient laws and driven by conflicts that span millennia.
              </Text>
            </View>

            <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <View className="flex-row items-center mb-4">
                <Ionicons name="flash" size={24} color="#f59e0b" />
                <Text className="text-white text-xl font-bold ml-3">
                  Powers & Abilities
                </Text>
              </View>
              <Text className="text-gray-300 text-base leading-6">
                Each immortal possesses unique abilities shaped by their origins, experiences, and the depth of their eternal suffering.
              </Text>
            </View>
          </View>
        </View>

        {/* Relationships Map */}
        <View className="px-6 pb-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Character Connections
          </Text>
          
          <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <Text className="text-gray-300 text-base leading-6 mb-4">
              The relationships between immortal beings are complex webs of alliance, betrayal, love, and eternal conflict.
            </Text>
            
            <View className="space-y-3">
              <View className="flex-row items-center">
                <View className="w-3 h-3 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-300 flex-1">Kael ↔ Lyra: Allies bound by destiny</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-3 h-3 bg-red-500 rounded-full mr-3" />
                <Text className="text-gray-300 flex-1">Kael ⚔ Magnus: Eternal adversaries</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-3 h-3 bg-green-500 rounded-full mr-3" />
                <Text className="text-gray-300 flex-1">Vera → All: The mortal bridge</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}