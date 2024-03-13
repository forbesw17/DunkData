import React, { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import Colors from "@/constants/Colors";
import TeamColors from "@/constants/TeamColors";

type HomeTopTabsProps = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const HomeTopTabs: React.FC<HomeTopTabsProps> = ({ selectedTab, setSelectedTab }) => {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("@/assets/images/DunkData.png")}
          style={{ width: 60, height: 60 }}
        />
      </View>

      <Pressable
        style={[styles.tab, selectedTab === "Schedule" && styles.tabActive]}
        onPress={() => { setSelectedTab("Schedule"); router.replace("/(tabs)/(home)") }}
      >
        <Text style={styles.tabText}>Schedule</Text>
      </Pressable>
      <Pressable
        style={[styles.tab, selectedTab === "News" && styles.tabActive]}
        onPress={() => {setSelectedTab("News"); router.replace("/(tabs)/(home)/news")}}
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
    alignItems: "center",
    paddingHorizontal: 15,
    // marginBottom: 10,
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
    fontSize: 14,
  },
});

export default HomeTopTabs;
