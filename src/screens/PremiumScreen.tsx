import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../state/app-store';

export default function PremiumScreen() {
  const insets = useSafeAreaInsets();
  const { isPremiumUser, setPremiumUser, deletedScenes } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleUpgradeToPremium = () => {
    Alert.alert(
      'Upgrade to Premium',
      'This would normally connect to your payment system. For this demo, you\'ll be upgraded automatically.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Upgrade', 
          onPress: () => setPremiumUser(true),
          style: 'default'
        }
      ]
    );
  };

  const handleRestorePurchases = () => {
    Alert.alert('Restore Purchases', 'No previous purchases found.');
  };

  const premiumFeatures = [
    {
      icon: 'document-text',
      title: 'Deleted Scenes Vault',
      description: 'Access exclusive deleted scenes and alternate endings'
    },
    {
      icon: 'camera',
      title: 'Behind the Scenes',
      description: 'Exclusive author insights and creation process videos'
    },
    {
      icon: 'musical-notes',
      title: 'Extended Soundtrack',
      description: 'Full orchestral scores and ambient soundscapes'
    },
    {
      icon: 'book',
      title: 'Early Access',
      description: 'Read new chapters before general release'
    },
    {
      icon: 'people',
      title: 'Character Deep Dives',
      description: 'Extended backstories and character development notes'
    },
    {
      icon: 'film',
      title: 'Future Film Updates',
      description: 'Exclusive updates on upcoming cinematic adaptations'
    }
  ];

  const DeletedSceneCard = ({ scene, index }: { scene: any, index: number }) => (
    <Pressable
      className={`mb-4 ${!isPremiumUser ? 'opacity-60' : ''}`}
      disabled={!isPremiumUser && scene.isPremium}
    >
      <LinearGradient
        colors={['#f59e0b', '#d97706', '#b45309']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="rounded-xl p-1"
      >
        <View className="bg-gray-900 rounded-xl p-6">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <View className="flex-row items-center mb-2">
                <Text className="text-amber-500 text-sm font-bold">
                  DELETED SCENE {index + 1}
                </Text>
                {scene.isPremium && !isPremiumUser && (
                  <View className="bg-amber-500 rounded-full px-2 py-1 ml-2">
                    <Text className="text-black text-xs font-bold">PREMIUM</Text>
                  </View>
                )}
              </View>
              <Text className="text-white text-lg font-bold mb-2">
                {scene.title}
              </Text>
              <Text className="text-gray-300 text-sm mb-2">
                Related to: {scene.chapterRelated}
              </Text>
              <Text className="text-gray-300 text-base leading-6">
                {scene.description}
              </Text>
            </View>
            
            <View className="items-center">
              {scene.isPremium && !isPremiumUser ? (
                <View className="bg-gray-700 rounded-full p-3">
                  <Ionicons name="lock-closed" size={20} color="#6b7280" />
                </View>
              ) : (
                <View className="bg-amber-500 rounded-full p-3">
                  <Ionicons name="play" size={20} color="#000" />
                </View>
              )}
            </View>
          </View>
          
          {scene.isPremium && !isPremiumUser && (
            <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
              <Text className="text-amber-400 text-sm text-center">
                Upgrade to Premium to unlock this exclusive content
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );

  if (isPremiumUser) {
    return (
      <View className="flex-1 bg-black">
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Premium Header */}
          <LinearGradient
            colors={['#000000', '#1a1a2e', '#f59e0b']}
            className="pt-16 pb-8 px-6"
          >
            <View className="items-center">
              <Ionicons name="diamond" size={48} color="#f59e0b" />
              <Text className="text-white text-3xl font-bold text-center mt-4 mb-2">
                Premium Member
              </Text>
              <Text className="text-gray-300 text-center">
                Welcome to the exclusive Eternal Chase experience
              </Text>
            </View>
          </LinearGradient>

          {/* Deleted Scenes */}
          <View className="px-6 py-6">
            <Text className="text-white text-2xl font-bold mb-6">
              Deleted Scenes Vault
            </Text>
            
            {deletedScenes.map((scene, index) => (
              <DeletedSceneCard key={scene.id} scene={scene} index={index} />
            ))}
          </View>

          {/* Premium Stats */}
          <View className="px-6 pb-8">
            <View className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <Text className="text-white text-xl font-bold mb-4">
                Your Premium Stats
              </Text>
              
              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-300">Deleted Scenes Unlocked</Text>
                  <Text className="text-amber-500 font-bold">{deletedScenes.length}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-300">Exclusive Content Hours</Text>
                  <Text className="text-amber-500 font-bold">12+</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-300">Behind-the-Scenes Videos</Text>
                  <Text className="text-amber-500 font-bold">8</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={['#000000', '#1a1a2e', '#f59e0b']}
          className="pt-16 pb-8 px-6"
        >
          <View className="items-center">
            <Ionicons name="diamond-outline" size={64} color="#f59e0b" />
            <Text className="text-white text-4xl font-bold text-center mt-4 mb-2">
              Go Premium
            </Text>
            <Text className="text-gray-300 text-center text-lg leading-6">
              Unlock the complete Eternal Chase cinematic universe experience
            </Text>
          </View>
        </LinearGradient>

        {/* Pricing Plans */}
        <View className="px-6 py-8">
          <Text className="text-white text-2xl font-bold text-center mb-6">
            Choose Your Plan
          </Text>
          
          <View className="space-y-4">
            {/* Yearly Plan */}
            <Pressable
              className={`border-2 rounded-2xl p-6 ${
                selectedPlan === 'yearly' 
                  ? 'border-amber-500 bg-amber-500/10' 
                  : 'border-gray-700 bg-gray-900'
              }`}
              onPress={() => setSelectedPlan('yearly')}
            >
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-white text-xl font-bold">Yearly</Text>
                  <Text className="text-amber-500 text-sm font-semibold">
                    Save 40% • Most Popular
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-white text-2xl font-bold">$59.99</Text>
                  <Text className="text-gray-400 text-sm">per year</Text>
                </View>
              </View>
              
              {selectedPlan === 'yearly' && (
                <View className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3">
                  <Text className="text-amber-400 text-sm text-center">
                    Best value - Only $4.99 per month
                  </Text>
                </View>
              )}
            </Pressable>

            {/* Monthly Plan */}
            <Pressable
              className={`border-2 rounded-2xl p-6 ${
                selectedPlan === 'monthly' 
                  ? 'border-amber-500 bg-amber-500/10' 
                  : 'border-gray-700 bg-gray-900'
              }`}
              onPress={() => setSelectedPlan('monthly')}
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-white text-xl font-bold">Monthly</Text>
                  <Text className="text-gray-400 text-sm">Cancel anytime</Text>
                </View>
                <View className="items-end">
                  <Text className="text-white text-2xl font-bold">$9.99</Text>
                  <Text className="text-gray-400 text-sm">per month</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Features List */}
        <View className="px-6 pb-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Premium Features
          </Text>
          
          <View className="space-y-4">
            {premiumFeatures.map((feature, index) => (
              <View key={index} className="flex-row items-start">
                <View className="bg-amber-500 rounded-full p-2 mr-4 mt-1">
                  <Ionicons name={feature.icon as any} size={16} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-semibold mb-1">
                    {feature.title}
                  </Text>
                  <Text className="text-gray-300 text-base leading-6">
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Preview of Locked Content */}
        <View className="px-6 pb-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Premium Preview
          </Text>
          
          {deletedScenes.slice(0, 2).map((scene, index) => (
            <DeletedSceneCard key={scene.id} scene={scene} index={index} />
          ))}
        </View>

        {/* CTA Buttons */}
        <View className="px-6 pb-8">
          <Pressable
            className="bg-amber-500 rounded-2xl p-6 mb-4"
            onPress={handleUpgradeToPremium}
          >
            <Text className="text-black text-xl font-bold text-center">
              Start Premium - {selectedPlan === 'yearly' ? '$59.99/year' : '$9.99/month'}
            </Text>
            <Text className="text-black/70 text-center mt-1">
              7-day free trial • Cancel anytime
            </Text>
          </Pressable>

          <Pressable
            className="border border-gray-600 rounded-2xl p-4"
            onPress={handleRestorePurchases}
          >
            <Text className="text-gray-300 text-center font-semibold">
              Restore Purchases
            </Text>
          </Pressable>
        </View>

        {/* Terms */}
        <View className="px-6 pb-8">
          <Text className="text-gray-500 text-sm text-center leading-6">
            By subscribing, you agree to our Terms of Service and Privacy Policy. 
            Subscription automatically renews unless auto-renewal is turned off at least 24 hours before the end of the current period.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}