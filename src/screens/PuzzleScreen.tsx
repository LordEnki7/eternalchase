import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PuzzleScreen() {
  const insets = useSafeAreaInsets();
  const [userGuess, setUserGuess] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [solvedClues, setSolvedClues] = useState<string[]>([]);

  const puzzle = {
    title: 'Shadows of the Source',
    cipher: 'XVII. The dawn conceals the dusk. Seek the veiled light where the spiral turns. Only unity births the true flame.',
    description: 'The void whispers secrets in a tongue forgotten by time. Can you decode the message from the Source?'
  };

  const clues = [
    {
      id: 'xvii',
      symbol: 'XVII',
      hint: 'This Roman numeral points to a significant chapter...',
      answer: 'Chapter 17',
      explanation: 'XVII represents Chapter 17, the final chapter that holds the ultimate secret'
    },
    {
      id: 'dawn_dusk',
      symbol: 'Dawn conceals the dusk',
      hint: 'Think about duality - what beginnings hide endings?',
      answer: 'New hope hides sacrifice',
      explanation: 'The dawn (new beginning) conceals the dusk (sacrifice or ending)'
    },
    {
      id: 'veiled_light',
      symbol: 'Veiled light where the spiral turns',
      hint: 'The Spiral is central to the story - what truth lies within?',
      answer: 'Hidden power in the Spiral',
      explanation: 'A hidden truth or power exists within the Spiral\'s core or turning points'
    },
    {
      id: 'unity_flame',
      symbol: 'Unity births the true flame',
      hint: 'Remember the cosmic bond between our heroes...',
      answer: 'Combined strength of three',
      explanation: 'Only by uniting (Kael, Lyra, Riven) can the ultimate power emerge'
    }
  ];

  const checkAnswer = (clueId: string, answer: string) => {
    const clue = clues.find(c => c.id === clueId);
    if (clue && answer.toLowerCase().includes(clue.answer.toLowerCase())) {
      if (!solvedClues.includes(clueId)) {
        setSolvedClues([...solvedClues, clueId]);
      }
      return true;
    }
    return false;
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
              The Spiral holds secrets only the brave can unlock
            </Text>
          </View>
        </LinearGradient>

        {/* Main Cipher */}
        <View className="px-6 py-8">
          <View className="bg-gray-900 border border-purple-500/30 rounded-2xl p-6 mb-6">
            <Text className="text-purple-400 text-sm font-bold mb-4 text-center tracking-wide">
              ENCRYPTED MESSAGE FROM THE SOURCE
            </Text>
            
            <Text className="text-white text-lg font-mono text-center leading-8 mb-4">
              {puzzle.cipher}
            </Text>
            
            <Text className="text-gray-400 text-center text-base">
              {puzzle.description}
            </Text>
          </View>

          {/* Progress Indicator */}
          <View className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
            <Text className="text-white text-lg font-bold mb-3">
              Decoding Progress: {solvedClues.length}/{clues.length}
            </Text>
            <View className="flex-row space-x-2">
              {clues.map((_, index) => (
                <View 
                  key={index}
                  className={`flex-1 h-2 rounded-full ${
                    index < solvedClues.length ? 'bg-amber-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Individual Clues */}
        <View className="px-6">
          <Text className="text-white text-2xl font-bold mb-6">
            Cipher Components
          </Text>
          
          {clues.map((clue, index) => {
            const isSolved = solvedClues.includes(clue.id);
            
            return (
              <View key={clue.id} className="mb-6">
                <LinearGradient
                  colors={isSolved ? ['#f59e0b', '#d97706'] : ['#374151', '#4b5563']}
                  className="rounded-xl p-1"
                >
                  <View className="bg-gray-900 rounded-xl p-6">
                    <View className="flex-row items-center mb-4">
                      <View className={`w-8 h-8 rounded-full items-center justify-center mr-4 ${
                        isSolved ? 'bg-amber-500' : 'bg-gray-600'
                      }`}>
                        <Text className="text-white font-bold">{index + 1}</Text>
                      </View>
                      <Text className="text-white text-lg font-bold flex-1">
                        "{clue.symbol}"
                      </Text>
                      {isSolved && (
                        <Ionicons name="checkmark-circle" size={24} color="#f59e0b" />
                      )}
                    </View>
                    
                    {!isSolved ? (
                      <View>
                        <Text className="text-gray-400 text-base mb-4">
                          {clue.hint}
                        </Text>
                        <TextInput
                          className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-white"
                          placeholder="Enter your interpretation..."
                          placeholderTextColor="#9ca3af"
                          value={userGuess}
                          onChangeText={setUserGuess}
                          onSubmitEditing={() => {
                            if (checkAnswer(clue.id, userGuess)) {
                              setUserGuess('');
                            }
                          }}
                        />
                      </View>
                    ) : (
                      <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <Text className="text-amber-400 font-semibold mb-2">
                          ✅ Solved: {clue.answer}
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          {clue.explanation}
                        </Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>

        {/* Final Revelation */}
        {solvedClues.length === clues.length && (
          <View className="px-6 py-8">
            <LinearGradient
              colors={['#f59e0b', '#d97706', '#b45309']}
              className="rounded-2xl p-1"
            >
              <View className="bg-gray-900 rounded-2xl p-6">
                <View className="items-center mb-4">
                  <Ionicons name="flash" size={48} color="#f59e0b" />
                  <Text className="text-white text-2xl font-bold mt-4 mb-2">
                    Cipher Decoded!
                  </Text>
                </View>
                
                <Text className="text-gray-300 text-center leading-6 mb-4">
                  You have unlocked the Source's message. The final chapter holds the key to everything - 
                  where dawn and dusk converge, where the Spiral's hidden power awaits, and where only 
                  unity can birth the true flame that will either save or consume all existence.
                </Text>
                
                <View className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4">
                  <Text className="text-amber-400 text-center font-semibold">
                    🔥 The chase continues in Chapter XVII... 🔥
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Hints Toggle */}
        <View className="px-6 pb-8">
          <Pressable
            className="bg-gray-800 border border-gray-600 rounded-xl p-4"
            onPress={() => setShowHints(!showHints)}
          >
            <Text className="text-gray-300 text-center font-semibold">
              {showHints ? 'Hide' : 'Show'} Additional Hints
            </Text>
          </Pressable>
          
          {showHints && (
            <View className="mt-4 bg-gray-900 border border-gray-800 rounded-xl p-6">
              <Text className="text-white font-bold mb-4">Decoding Tips:</Text>
              <Text className="text-gray-300 text-sm leading-6 mb-2">
                • Think about the story's major themes: unity, sacrifice, cosmic power
              </Text>
              <Text className="text-gray-300 text-sm leading-6 mb-2">
                • Consider the relationships between Kael, Lyra, and Riven
              </Text>
              <Text className="text-gray-300 text-sm leading-6 mb-2">
                • Remember the Spiral's role as both threat and key to salvation
              </Text>
              <Text className="text-gray-300 text-sm leading-6">
                • The final chapter number XVII is crucial to the puzzle
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}