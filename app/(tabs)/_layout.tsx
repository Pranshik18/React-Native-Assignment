import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomTabBar from '@/components/tabBar/TabBar';

const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: 'none',
        },
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Space',
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          title: 'Yoga',
        }}
      />
      <Tabs.Screen
        name="tab3"
        options={{
          title: 'Handshake',
        }}
      />
      <Tabs.Screen
        name="tab4"
        options={{
          title: 'Play',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
