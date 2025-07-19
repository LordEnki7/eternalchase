import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FutureFilmsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filmProjects = [
    {
      id: 'movie1',
      title: 'Eternal Chase: The Beginning',
      status: 'Pre-Production',
      releaseWindow: '2026',
      description: 'The epic first film adaptation covering Kael\'s awakening and the start of his immortal journey.',
      director: 'TBA',
      studio: 'Major Studio Partnership in Development',
      budget: '$75-100M',
      genre: 'Fantasy/Action Epic',
      details: [
        'Covers Books 1-2 of the trilogy',
        'Focus on Kael and Lyra\'s first encounter',
        'Practical effects combined with cutting-edge CGI',
        'Original orchestral score expansion'
      ]
    },
    {
      id: 'movie2',
      title: 'Eternal Chase: Shadows Rise',
      status: 'Development',
      releaseWindow: '2028',
      description: 'The darker second installment exploring the depths of immortal conflict and Magnus\'s corruption.',
      director: 'TBA',
      studio: 'Sequel Rights Secured',
      budget: '$100-125M',
      genre: 'Dark Fantasy/Thriller',
      details: [
        'Darker tone reflecting Book 2 themes',
        'Magnus as the central antagonist',
        'Expanded character backstories',
        'International filming locations'
      ]
    },
    {
      id: 'series1',
      title: 'Chronicles of Eternity (Series)',
      status: 'Concept Phase',
      releaseWindow: '2027-2030',
      description: 'A premium streaming series exploring the extended universe and character backstories.',
      director: 'Episodic Directors',
      studio: 'Streaming Platform Interest',
      budget: '$10-15M per episode',
      genre: 'Fantasy Drama Series',
      details: [
        '3 seasons planned (8-10 episodes each)',
        'Prequel stories and character origins',
        'Lyra and Magnus backstory arcs',
        'Connections to main film narrative'
      ]
    }
  ];

  const productionUpdates = [
    {
      date: 'January 2025',
      title: 'Film Rights Optioned',
      description: 'Major Hollywood studio secures adaptation rights for the complete trilogy'
    },
    {
      date: 'March 2025',
      title: 'Screenplay Development',
      description: 'Award-winning screenwriter attached to adapt the first book'
    },
    {
      date: 'June 2025',
      title: 'Director Meetings',
      description: 'In talks with A-list directors known for fantasy epics'
    },
    {
      date: 'September 2025',
      title: 'Casting Process Begins',
      description: 'Character breakdown completed, casting director hired'
    }
  ];

  const castingWishlist = [
    {
      character: 'Kael Thorne',
      description: 'The immortal protagonist seeking redemption',
      requirements: 'Age 25-35, action experience, dramatic range for complex character'
    },
    {
      character: 'Lyra Shadowheart',
      description: 'Mysterious ally with hidden agenda',
      requirements: 'Age 22-32, ethereal presence, ability to convey ancient wisdom'
    },
    {
      character: 'Magnus the Eternal',
      description: 'Corrupted immortal antagonist',
      requirements: 'Age 35-50, commanding presence, capability for intimidating villain role'
    },
    {
      character: 'Vera Lightbringer',
      description: 'Mortal champion fighting against fate',
      requirements: 'Age 20-30, strong physical presence, inspiring heroic qualities'
    }
  ];

  const ProjectCard = ({ project }: { project: any }) => (
    <Pressable 
      className="mb-6"
      onPress={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
    >
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6', '#1e40af']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="rounded-2xl p-1"
      >
        <View className="bg-gray-900 rounded-2xl p-6">
          {/* Project Header */}
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <View className="flex-row items-center mb-2">
                <View className={`px-3 py-1 rounded-full ${
                  project.status === 'Pre-Production' ? 'bg-green-500/20 border border-green-500/30' :
                  project.status === 'Development' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                  'bg-blue-500/20 border border-blue-500/30'
                }`}>
                  <Text className={`text-xs font-bold ${
                    project.status === 'Pre-Production' ? 'text-green-400' :
                    project.status === 'Development' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}>
                    {project.status}
                  </Text>
                </View>
                <Text className="text-gray-400 text-sm ml-3">
                  {project.releaseWindow}
                </Text>
              </View>
              
              <Text className="text-white text-xl font-bold mb-2">
                {project.title}
              </Text>
              <Text className="text-gray-300 text-base leading-6">
                {project.description}
              </Text>
            </View>
            
            <Ionicons 
              name={selectedProject === project.id ? 'chevron-up' : 'chevron-down'} 
              size={24} 
              color="#f59e0b" 
            />
          </View>
          
          {/* Basic Info */}
          <View className="space-y-2 mb-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Genre</Text>
              <Text className="text-white">{project.genre}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Budget</Text>
              <Text className="text-white">{project.budget}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Studio</Text>
              <Text className="text-white">{project.studio}</Text>
            </View>
          </View>
          
          {/* Expanded Details */}
          {selectedProject === project.id && (
            <View className="border-t border-gray-800 pt-4">
              <Text className="text-white text-lg font-bold mb-3">
                Project Details
              </Text>
              {project.details.map((detail: string, index: number) => (
                <View key={index} className="flex-row items-start mb-2">
                  <View className="bg-amber-500 rounded-full w-2 h-2 mt-2 mr-3" />
                  <Text className="text-gray-300 text-sm flex-1">
                    {detail}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <LinearGradient
          colors={['#000000', '#1a1a2e', '#1e3a8a']}
          className="pt-20 pb-8 px-6"
        >
          <View className="items-center">
            <Ionicons name="film" size={48} color="#f59e0b" />
            <Text className="text-white text-3xl font-bold text-center mt-4 mb-2">
              Future Films
            </Text>
            <Text className="text-gray-300 text-center text-lg leading-6">
              The Eternal Chase cinematic universe is coming to screens worldwide
            </Text>
          </View>
        </LinearGradient>

        {/* Production Status */}
        <View className="px-6 py-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Production Pipeline
          </Text>
          
          <View className="flex-row justify-around mb-8">
            <View className="items-center">
              <View className="bg-green-500 rounded-full w-12 h-12 items-center justify-center mb-2">
                <Text className="text-white font-bold">1</Text>
              </View>
              <Text className="text-green-400 font-semibold">Pre-Production</Text>
              <Text className="text-gray-400 text-sm">Film 1</Text>
            </View>
            
            <View className="items-center">
              <View className="bg-yellow-500 rounded-full w-12 h-12 items-center justify-center mb-2">
                <Text className="text-black font-bold">1</Text>
              </View>
              <Text className="text-yellow-400 font-semibold">Development</Text>
              <Text className="text-gray-400 text-sm">Film 2</Text>
            </View>
            
            <View className="items-center">
              <View className="bg-blue-500 rounded-full w-12 h-12 items-center justify-center mb-2">
                <Text className="text-white font-bold">1</Text>
              </View>
              <Text className="text-blue-400 font-semibold">Concept</Text>
              <Text className="text-gray-400 text-sm">Series</Text>
            </View>
          </View>
        </View>

        {/* Film Projects */}
        <View className="px-6">
          <Text className="text-white text-2xl font-bold mb-6">
            Upcoming Projects
          </Text>
          
          {filmProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </View>

        {/* Production Updates */}
        <View className="px-6 py-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Production Timeline
          </Text>
          
          <View className="space-y-4">
            {productionUpdates.map((update, index) => (
              <View key={index} className="flex-row items-start">
                <View className="bg-amber-500 rounded-full w-4 h-4 mt-2 mr-4" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-white font-semibold">
                      {update.title}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {update.date}
                    </Text>
                  </View>
                  <Text className="text-gray-300 text-sm">
                    {update.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Dream Cast */}
        <View className="px-6 pb-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Character Casting
          </Text>
          
          <Text className="text-gray-300 text-base mb-6 leading-6">
            While casting is still in early stages, here's what we're looking for in our main characters:
          </Text>
          
          <View className="space-y-4">
            {castingWishlist.map((role, index) => (
              <View key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <Text className="text-white text-lg font-bold mb-2">
                  {role.character}
                </Text>
                <Text className="text-gray-300 text-sm mb-3">
                  {role.description}
                </Text>
                <Text className="text-amber-400 text-sm">
                  Requirements: {role.requirements}
                </Text>
              </View>
            ))}
          </div>
        </View>

        {/* Fan Engagement */}
        <View className="px-6 pb-8">
          <View className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <View className="flex-row items-center mb-4">
              <Ionicons name="people" size={24} color="#f59e0b" />
              <Text className="text-white text-xl font-bold ml-3">
                Stay Connected
              </Text>
            </View>
            
            <Text className="text-gray-300 text-base leading-6 mb-6">
              Be the first to know about casting announcements, behind-the-scenes content, and exclusive previews from the film adaptation.
            </Text>
            
            <View className="space-y-3">
              <Pressable className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-amber-400 font-semibold">
                    🎬 Join Film Updates List
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#f59e0b" />
                </View>
              </Pressable>
              
              <Pressable className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-300 font-semibold">
                    📱 Follow Social Media
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                </View>
              </Pressable>
              
              <Pressable className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-300 font-semibold">
                    💌 Newsletter Subscription
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}