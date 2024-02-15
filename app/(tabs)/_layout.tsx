import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TeamColors from '@/constants/TeamColors';

const Layout = () => {
  return (
    <Tabs
      
      screenOptions={{
        tabBarStyle: {
          backgroundColor: TeamColors.default.primaryColor,
          borderTopWidth: 0.2,
          borderTopColor: TeamColors.default.text,
          paddingVertical: 10,
          height: 90,
        },
        tabBarActiveTintColor: TeamColors.default.secondaryColor,
        tabBarInactiveTintColor: TeamColors.default.text,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <Ionicons name="home" size={size} color={color} /> : <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarLabel: 'Stats',
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <Ionicons name="stats-chart" size={size} color={color} /> : <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="predictions"
        options={{
          tabBarLabel: 'Predictions',
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <Ionicons name="analytics" size={size} color={color} /> : <Ionicons name="analytics-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <Ionicons name="person-circle" size={size} color={color} /> : <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
