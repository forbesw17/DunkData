import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "@/constants/Colors";

type HomeTopTabsProps = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const HomeTopTabs: React.FC<HomeTopTabsProps> = ({ selectedTab, setSelectedTab }) => {

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.tab, selectedTab === "Schedule" && styles.tabActive]}
        onPress={() => setSelectedTab("Schedule")}
      >
        <Text style={styles.tabText}>Schedule</Text>
      </Pressable>
      <Pressable
        style={[styles.tab, selectedTab === "News" && styles.tabActive]}
        onPress={() => setSelectedTab("News")}
      >
        <Text style={styles.tabText}>News</Text>
      </Pressable>
      <Pressable
        style={[styles.tab, selectedTab === "More" && styles.tabActive]}
        onPress={() => setSelectedTab("More")}
      >
        <Text style={styles.tabText}>More</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  tab: {
    width: 95,
    alignItems: "center",
    padding: 5,
  },
  tabActive: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  tabText: {
    color: "white",
    fontSize: 20,
  },
});

export default HomeTopTabs;
