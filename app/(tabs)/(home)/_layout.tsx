import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import HomeTopTabs from "@/components/HomeTopTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";

export default function HomeLayout() {

  const [selectedTab, setSelectedTab] = useState("Schedule");

  const router = useRouter();

  return (
    <View style={defaultStyles.container}>
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
      <Stack.Screen name="news" options={{
        headerShown: false,
        gestureEnabled: false,
      }} />
    </Stack>
  );
}
