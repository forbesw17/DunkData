import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { useUser } from "@clerk/clerk-react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface SafeAreaProps {
  children: React.ReactNode;
}

const SafeArea: React.FC<SafeAreaProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const { primaryColor } = useTheme();
  const darkModeEnabled = user?.unsafeMetadata?.darkModeEnabled === true;

  return (
    <>
      <StatusBar style={darkModeEnabled ? "light" : "dark"} />
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
            backgroundColor: primaryColor,
          }}
        >
          {children}
        </View>
      </SafeAreaProvider>
    </>
  );
};

export default SafeArea;
