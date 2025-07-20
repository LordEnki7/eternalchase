import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import InteractiveTimeline from '../components/InteractiveTimeline';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TimelineScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleChapterPress = (chapterId: string) => {
    navigation.navigate('ChapterDetail', { chapterId });
  };

  return (
    <View className="flex-1 bg-black">
      <InteractiveTimeline onChapterPress={handleChapterPress} />
    </View>
  );
}