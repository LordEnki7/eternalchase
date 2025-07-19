import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BehindScenesScreen() {
  const insets = useSafeAreaInsets();

  const behindScenesContent = [
    {
      id: 1,
      type: 'video',
      title: 'The Birth of Eternal Chase',
      description: 'How the concept of immortal conflict came to life',
      duration: '12:45',
      isPremium: false
    },
    {
      id: 2,
      type: 'article',
      title: 'Creating Kael: The Reluctant Immortal',
      description: 'Character development insights and inspiration',
      readTime: '8 min read',
      isPremium: true
    },
    {
      id: 3,
      type: 'video',
      title: 'Soundtrack Composition Process',
      description: 'Working with composers to create the cinematic score',
      duration: '18:30',
      isPremium: true
    },
    {
      id: 4,
      type: 'interview',
      title: 'Author Q&A: The Trilogy Journey',
      description: 'Personal insights into the three-book saga',
      duration: '25:15',
      isPremium: false
    },
    {
      id: 5,
      type: 'article',
      title: 'World Building: The Eternal Realm',
      description: 'How the immortal universe was constructed',
      readTime: '12 min read',
      isPremium: true
    },
    {
      id: 6,
      type: 'video',
      title: 'From Page to Screen: Adaptation Challenges',
      description: 'The journey toward cinematic adaptation',
      duration: '22:10',
      isPremium: false
    }
  ];

  const ContentCard = ({ content }: { content: any }) => {
    const getIcon = () => {
      switch (content.type) {
        case 'video': return 'videocam';
        case 'article': return 'document-text';
        case 'interview': return 'mic';
        default: return 'document';
      }
    };

    const getTypeColor = () => {
      switch (content.type) {
        case 'video': return 'bg-red-500';
        case 'article': return 'bg-blue-500';
        case 'interview': return 'bg-green-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <Pressable className="mb-6">
        <View className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          {/* Content Type Badge */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className={`${getTypeColor()} rounded-full p-2 mr-3`}>
                <Ionicons name={getIcon() as any} size={16} color="white" />
              </View>
              <Text className="text-gray-400 text-sm font-semibold uppercase">
                {content.type}
              </Text>
            </View>
            
            {content.isPremium && (
              <View className="bg-amber-500 rounded-full px-3 py-1">
                <Text className="text-black text-xs font-bold">PREMIUM</Text>
              </View>
            )}
          </View>

          {/* Content Info */}
          <Text className="text-white text-xl font-bold mb-2">
            {content.title}
          </Text>
          <Text className="text-gray-300 text-base leading-6 mb-4">
            {content.description}
          </Text>

          {/* Duration/Read Time */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons 
                name={content.duration ? 'time' : 'book'} 
                size={16} 
                color="#6b7280" 
              />
              <Text className="text-gray-400 text-sm ml-2">
                {content.duration || content.readTime}
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Text className="text-amber-500 font-semibold mr-2">
                {content.isPremium ? 'Watch Premium' : 'Watch Free'}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#f59e0b" />
            </View>
          </View>
        </View>
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
          colors={['#000000', '#1a1a2e', '#4c1d95']}
          className="pt-20 pb-8 px-6"
        >
          <View className="items-center">
            <Ionicons name="camera" size={48} color="#f59e0b" />
            <Text className="text-white text-3xl font-bold text-center mt-4 mb-2">
              Behind the Scenes
            </Text>
            <Text className="text-gray-300 text-center text-lg leading-6">
              Discover the creative journey behind the Eternal Chase universe
            </Text>
          </View>
        </LinearGradient>

        {/* Author Introduction */}
        <View className="px-6 py-8">
          <View className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <View className="flex-row items-center mb-4">
              <View className="bg-amber-500 rounded-full w-16 h-16 items-center justify-center mr-4">
                <Text className="text-black text-2xl font-bold">A</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-bold">
                  From the Author
                </Text>
                <Text className="text-gray-400">
                  Creator of the Eternal Chase Universe
                </Text>
              </View>
            </View>
            
            <Text className="text-gray-300 text-base leading-7">
              "Creating the Eternal Chase has been my own journey through immortality—not literally, of course, but emotionally and creatively. Each character represents a different aspect of the human condition when faced with eternity."
            </Text>
          </View>
        </View>

        {/* Content Categories */}
        <View className="px-6 pb-6">
          <Text className="text-white text-2xl font-bold mb-6">
            Explore the Process
          </Text>
          
          <View className="flex-row space-x-4 mb-8">
            <View className="flex-1 bg-red-500/20 border border-red-500/30 rounded-xl p-4 items-center">
              <Ionicons name="videocam" size={24} color="#ef4444" />
              <Text className="text-red-400 font-semibold mt-2">Videos</Text>
              <Text className="text-gray-400 text-sm">4 episodes</Text>
            </View>
            
            <View className="flex-1 bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 items-center">
              <Ionicons name="document-text" size={24} color="#3b82f6" />
              <Text className="text-blue-400 font-semibold mt-2">Articles</Text>
              <Text className="text-gray-400 text-sm">8 insights</Text>
            </View>
            
            <View className="flex-1 bg-green-500/20 border border-green-500/30 rounded-xl p-4 items-center">
              <Ionicons name="mic" size={24} color="#10b981" />
              <Text className="text-green-400 font-semibold mt-2">Interviews</Text>
              <Text className="text-gray-400 text-sm">3 sessions</Text>
            </View>
          </View>
        </View>

        {/* Content List */}
        <View className="px-6">
          {behindScenesContent.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </View>

        {/* Creation Timeline */}
        <View className="px-6 py-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Creation Timeline
          </Text>
          
          <View className="space-y-4">
            <View className="flex-row items-start">
              <View className="bg-amber-500 rounded-full w-4 h-4 mt-2 mr-4" />
              <View className="flex-1">
                <Text className="text-white font-semibold">2019 - The Concept</Text>
                <Text className="text-gray-300 text-sm">Initial idea sparked during a philosophical discussion about immortality</Text>
              </View>
            </View>
            
            <View className="flex-row items-start">
              <View className="bg-amber-500 rounded-full w-4 h-4 mt-2 mr-4" />
              <View className="flex-1">
                <Text className="text-white font-semibold">2020-2021 - Book One</Text>
                <Text className="text-gray-300 text-sm">Writing and refining "The Eternal Chase"</Text>
              </View>
            </View>
            
            <View className="flex-row items-start">
              <View className="bg-amber-500 rounded-full w-4 h-4 mt-2 mr-4" />
              <View className="flex-1">
                <Text className="text-white font-semibold">2022 - Expansion</Text>
                <Text className="text-gray-300 text-sm">"Shadows of Eternity" explores deeper themes</Text>
              </View>
            </View>
            
            <View className="flex-row items-start">
              <View className="bg-amber-500 rounded-full w-4 h-4 mt-2 mr-4" />
              <View className="flex-1">
                <Text className="text-white font-semibold">2023 - Conclusion</Text>
                <Text className="text-gray-300 text-sm">"Dawn of Reckoning" brings the trilogy to its epic finale</Text>
              </View>
            </View>
            
            <View className="flex-row items-start">
              <View className="bg-amber-500 rounded-full w-4 h-4 mt-2 mr-4" />
              <View className="flex-1">
                <Text className="text-white font-semibold">2024 - Multimedia</Text>
                <Text className="text-gray-300 text-sm">Soundtrack development and cinematic platform creation</Text>
              </View>
            </View>
            
            <View className="flex-row items-start">
              <View className="bg-green-500 rounded-full w-4 h-4 mt-2 mr-4" />
              <View className="flex-1">
                <Text className="text-white font-semibold">2025 - Present</Text>
                <Text className="text-gray-300 text-sm">Film adaptation pre-production and expanded universe development</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Awards & Recognition */}
        <View className="px-6 pb-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Recognition
          </Text>
          
          <View className="space-y-4">
            <View className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <View className="flex-row items-center">
                <Ionicons name="trophy" size={24} color="#f59e0b" />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-semibold">Fantasy Novel of the Year</Text>
                  <Text className="text-gray-400 text-sm">Independent Publishing Awards 2023</Text>
                </View>
              </View>
            </View>
            
            <View className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <View className="flex-row items-center">
                <Ionicons name="star" size={24} color="#f59e0b" />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-semibold">Reader's Choice Award</Text>
                  <Text className="text-gray-400 text-sm">Goodreads Fantasy Community 2023</Text>
                </View>
              </View>
            </View>
            
            <View className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <View className="flex-row items-center">
                <Ionicons name="musical-notes" size={24} color="#f59e0b" />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-semibold">Best Original Soundtrack</Text>
                  <Text className="text-gray-400 text-sm">Audio Drama Excellence Awards 2024</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}