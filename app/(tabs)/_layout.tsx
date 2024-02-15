import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TeamColors from '@/constants/TeamColors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

const Layout = () => {
  return (
    <Tabs
      
      screenOptions={{
        // tabBarActiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: TeamColors.default.primaryColor,
          borderTopColor: TeamColors.default.primaryColor,
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
