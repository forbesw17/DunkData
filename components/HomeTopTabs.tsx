import React from "react";
import { Link } from "expo-router";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";

import { useUser, SignedIn, SignedOut } from "@clerk/clerk-expo";

import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type HomeTopTabsProps = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const HomeTopTabs: React.FC<HomeTopTabsProps> = ({
  selectedTab,
  setSelectedTab,
}) => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("@/assets/images/DunkData.png")}
          style={{ width: 60, height: 60 }}
        />
      </View>

      <Link href="/(tabs)/(home)" style={{ padding: 10 }}>
        <Text style={styles.tabText}>Schedule</Text>
      </Link>

      <Link href="/(tabs)/(home)/news" style={{ padding: 10 }}>
        <Text style={styles.tabText}>News</Text>
      </Link>

      <SignedIn>
        <Pressable>
          <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
        </Pressable>
      </SignedIn>

      <SignedOut>
        <Link href={'/(modals)/login'}>
          <Ionicons
            name="person-circle"
            size={40}
            color={Colors.primary}
          />
        </Link>
      </SignedOut>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
});

export default HomeTopTabs;
