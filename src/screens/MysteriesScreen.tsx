import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MysteriesScreen() {
  const insets = useSafeAreaInsets();
  const [decodedClues, setDecodedClues] = useState<string[]>([]);

  const mysteries = [
    {
      id: 'shadows-source',
      title: 'Shadows of the Source',
      cipher: 'XVII. The dawn conceals the dusk. Seek the veiled light where the spiral turns. Only unity births the true flame.',
      difficulty: 'Master Level',
      clues: [
        'XVII represents Chapter 17 - the final revelation',
        'Dawn conceals dusk = new hope hides past shadows',
        'Veiled light = hidden truth within the Spiral\'s core',
        'Unity births flame = only together can they unlock ultimate power'
      ],
      isDecoded: false
    }
  ];

  const handleDecodeAttempt = (mysteryId: string) => {
    if (!decodedClues.includes(mysteryId)) {
      setDecodedClues([...decodedClues, mysteryId]);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <LinearGradient
          colors={['#000000', '#1a1a2e', '#4c1d95']}
          className="pt-20 pb-8 px-6"
        >
          <View className="items-center">
            <Ionicons name="eye" size={48} color="#f59e0b" />
            <Text className="text-white text-3xl font-bold text-center mt-4 mb-2">
              Decode the Source
            </Text>
            <Text className="text-gray-300 text-center text-lg leading-6">
              Hidden messages await those brave enough to seek the truth
            </Text>
          </View>
        </LinearGradient>

        {/* The Great Mystery */}
        <View className="px-6 py-8">
          <Text className="text-white text-2xl font-bold mb-6">
            🔍 Active Mysteries
          </Text>
          
          {mysteries.map((mystery) => (
            <View key={mystery.id} className="mb-8">
              <LinearGradient
                colors={['#4c1d95', '#7c3aed', '#4c1d95']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-2xl p-1"
              >
                <View className="bg-gray-900 rounded-2xl p-6">
                  {/* Mystery Header */}
                  <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-white text-xl font-bold">
                      {mystery.title}
                    </Text>
                    <View className="bg-purple-500/20 border border-purple-500/30 rounded-full px-3 py-1">
                      <Text className="text-purple-400 text-xs font-bold">
                        {mystery.difficulty}
                      </Text>
                    </View>
                  </View>

                  {/* The Cipher */}
                  <View className="bg-black/50 border border-amber-500/30 rounded-lg p-4 mb-6">
                    <Text className="text-amber-400 text-sm font-bold mb-2 tracking-wide">
                      ENCRYPTED MESSAGE
                    </Text>
                    <Text className="text-amber-300 text-base leading-7 font-mono">
                      "{mystery.cipher}"
                    </Text>
                  </View>

                  {/* Decode Button */}
                  <Pressable
                    className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 mb-6"
                    onPress={() => handleDecodeAttempt(mystery.id)}
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="key" size={20} color="#f59e0b" />
                      <Text className="text-amber-400 font-semibold ml-2">
                        Attempt to Decode
                      </Text>
                    </View>
                  </Pressable>

                  {/* Revealed Clues */}
                  {decodedClues.includes(mystery.id) && (
                    <View className="space-y-3">
                      <Text className="text-green-400 text-lg font-bold mb-3">
                        🎯 Decoded Elements:
                      </Text>
                      {mystery.clues.map((clue, index) => (
                        <View key={index} className="flex-row items-start">
                          <View className="bg-green-500 rounded-full w-2 h-2 mt-2 mr-3" />
                          <Text className="text-gray-300 text-sm flex-1 leading-6">
                            {clue}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>

        {/* Community Theories */}
        <View className="px-6 pb-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Fan Theories
          </Text>
          
          <View className="space-y-4">
            <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <View className="flex-row items-center mb-3">
                <View className="bg-blue-500 rounded-full w-8 h-8 items-center justify-center mr-3">
                  <Text className="text-white text-sm font-bold">A</Text>
                </View>
                <Text className="text-white font-semibold">Anonymous Reader</Text>
              </View>
              <Text className="text-gray-300 text-base leading-6">
                The "veiled light" could be Lyra's hidden power that she hasn't fully unlocked yet. What if she's the key to stopping the Spiral?
              </Text>
            </View>

            <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <View className="flex-row items-center mb-3">
                <View className="bg-green-500 rounded-full w-8 h-8 items-center justify-center mr-3">
                  <Text className="text-white text-sm font-bold">M</Text>
                </View>
                <Text className="text-white font-semibold">Mystery Solver</Text>
              </View>
              <Text className="text-gray-300 text-base leading-6">
                XVII = 17. But what if it's not just Chapter 17? What if it represents 17 different timelines converging into one final reality?
              </Text>
            </View>

            <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <View className="flex-row items-center mb-3">
                <View className="bg-purple-500 rounded-full w-8 h-8 items-center justify-center mr-3">
                  <Text className="text-white text-sm font-bold">S</Text>
                </View>
                <Text className="text-white font-semibold">Spiral Hunter</Text>
              </View>
              <Text className="text-gray-300 text-base leading-6">
                "Only unity births the true flame" - I think this refers to the fusion card we've seen. Kael and Lyra's bond is literally the key!
              </Text>
            </View>
          </div>
        </View>

        {/* Decode Challenge */}
        <View className="px-6 pb-8">
          <View className="bg-gradient-to-r from-amber-900/30 to-red-900/30 border border-amber-700/50 rounded-2xl p-6">
            <View className="flex-row items-center mb-4">
              <Ionicons name="trophy" size={24} color="#f59e0b" />
              <Text className="text-white text-xl font-bold ml-3">
                Master Decoder Challenge
              </Text>
            </View>
            
            <Text className="text-gray-300 text-base leading-6 mb-4">
              Think you can crack the ultimate mystery? The Source is stirring, and only the brave can unlock its secrets.
            </Text>
            
            <View className="bg-black/30 rounded-lg p-4">
              <Text className="text-amber-400 text-sm font-bold mb-2">
                🌀 CHALLENGE CIPHER 🌀
              </Text>
              <Text className="text-amber-300 text-sm font-mono">
                "The spiral turns again... XVII awaits the unity of flame."
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}