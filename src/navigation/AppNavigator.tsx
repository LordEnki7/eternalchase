import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ChapterGuideScreen from '../screens/ChapterGuideScreen';
import CharacterUniverseScreen from '../screens/CharacterUniverseScreen';
import PremiumScreen from '../screens/PremiumScreen';
import ChapterDetailScreen from '../screens/ChapterDetailScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import BehindScenesScreen from '../screens/BehindScenesScreen';
import FutureFilmsScreen from '../screens/FutureFilmsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  ChapterDetail: { chapterId: string };
  CharacterDetail: { characterId: string };
  BehindScenes: undefined;
  FutureFilms: undefined;
};

export type TabParamList = {
  Home: undefined;
  Chapters: undefined;
  Characters: undefined;
  Premium: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chapters') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Characters') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Premium') {
            iconName = focused ? 'diamond' : 'diamond-outline';
          } else {
            iconName = 'help-outline';
          }

          return (
            <View className="items-center justify-center">
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#f59e0b',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#1f2937',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chapters" component={ChapterGuideScreen} />
      <Tab.Screen name="Characters" component={CharacterUniverseScreen} />
      <Tab.Screen name="Premium" component={PremiumScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen 
        name="ChapterDetail" 
        component={ChapterDetailScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#f59e0b',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen 
        name="CharacterDetail" 
        component={CharacterDetailScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#f59e0b',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen 
        name="BehindScenes" 
        component={BehindScenesScreen}
        options={{
          headerShown: true,
          headerTitle: 'Behind the Scenes',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#f59e0b',
          headerBackVisible: true,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen 
        name="FutureFilms" 
        component={FutureFilmsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Future Films',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#f59e0b',
          headerBackVisible: true,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}