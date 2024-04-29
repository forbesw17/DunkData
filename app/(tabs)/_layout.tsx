import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';

const Layout = () => {
  const { styles, primaryColor, secondaryColor, textColor } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: secondaryColor,
        tabBarInactiveTintColor: textColor,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: { fontSize: 9 },
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <Ionicons name="home" size={20} color={color} /> : <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarLabel: 'Stats',
          tabBarLabelStyle: { fontSize: 9 },
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <Ionicons name="stats-chart" size={20} color={color} /> : <Ionicons name="stats-chart-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(predictions)"
        options={{
          tabBarLabel: 'Predictions',
          tabBarLabelStyle: { fontSize: 9 },
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <Ionicons name="analytics" size={20} color={color} /> : <Ionicons name="analytics-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: { fontSize: 9 },
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <Ionicons name="person-circle" size={20} color={color} /> : <Ionicons name="person-circle-outline" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
