import React, { useState } from "react";
import { useRouter, Link } from "expo-router";
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

      {/* <Pressable
        style={[styles.tab, selectedTab === "Schedule" && styles.tabActive]}
        onPress={() => { setSelectedTab("Schedule"); router.navigate("/(tabs)/(home)") }}
      > */}
      <Link href="/(tabs)/(home)" style={{padding: 10 }} >

        <Text style={styles.tabText}>Schedule</Text>
      </Link>
      {/* </Pressable> */}
      {/* <Pressable
        style={[styles.tab, selectedTab === "News" && styles.tabActive]}
        onPress={() => {setSelectedTab("News"); router.navigate("/(tabs)/(home)/news")}}
      > */}
      <Link href="/(tabs)/(home)/news" style={{padding: 10 }} >
        <Text style={styles.tabText}>News</Text>
      </Link>
      {/* </Pressable> */}
      {/* <Pressable
        style={[styles.tab, selectedTab === "More" && styles.tabActive]}
        onPress={() => setSelectedTab("More")}
      > */}
      <Link href={"/"} style={{padding: 10 }} >
        <Text style={styles.tabText}>More</Text>
      {/* </Pressable> */}
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // paddingHorizontal: 15,
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
