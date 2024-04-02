import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { useUser } from "@clerk/clerk-react";

interface SafeAreaProps {
  children: React.ReactNode;
}

const SafeArea: React.FC<SafeAreaProps> = ({ children }) => {
  const { user } = useUser();
  const { styles } = useTheme();
  const darkModeEnabled = user?.unsafeMetadata?.darkModeEnabled === true;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={darkModeEnabled ? 'dark' : 'light'} />
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
