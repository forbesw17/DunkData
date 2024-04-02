import React, { useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import HomeTopTabs from "@/components/HomeTopTabs";
import { useTheme } from "@/providers/ThemeProvider";

export default function HomeLayout() {
  const [selectedTab, setSelectedTab] = useState("Schedule");
  const { styles } = useTheme();
  
  return (
    <View style={styles.container}>
      <HomeTopTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <View style={{ flex: 1 }}>
        <HomeLayoutNav />
      </View>
    </View>
  );
}

function HomeLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="news"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
