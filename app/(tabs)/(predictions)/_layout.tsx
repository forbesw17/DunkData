import React, { useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import PredictionsTopTabs from "@/components/PredictionsTopTabs";

import { useTheme } from "@/providers/ThemeProvider";



export default function PredictionsLayout() {
  const [selectedTab, setSelectedTab] = useState("Outcome");
  const { styles } = useTheme();
  
  return (
    <View style={styles.container}>
      <PredictionsTopTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <View style={{ flex: 1 }}>
        <PredictionsLayoutNav />
      </View>
    </View>
  );
}

//may need to add stack screen back
function PredictionsLayoutNav() {
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
        name="userprediction"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    
    </Stack>
  );
}
