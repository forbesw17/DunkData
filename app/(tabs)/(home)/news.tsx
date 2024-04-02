import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

// Styles
import { useTheme } from "@/providers/ThemeProvider";
import LatestNews from "@/components/LastestNews";

const Page = () => {
  const { styles } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LatestNews />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;