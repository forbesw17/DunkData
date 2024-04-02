import React from "react";
import { Link } from "expo-router";
import { View, Text, Pressable, Image } from "react-native";

import { useUser, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useTheme } from "@/providers/ThemeProvider";

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
  const { styles } = useTheme();
  const { user } = useUser();

  return (
    <View style={styles.topTabsContainer}>
      <View>
        <Image
          source={require("@/assets/images/DunkData.png")}
          style={{ width: 60, height: 60 }}
        />
      </View>

      <Link href="/(tabs)/(home)" style={{ padding: 10 }}>
        <Text style={styles.topTabText}>Schedule</Text>
      </Link>

      <Link href="/(tabs)/(home)/news" style={{ padding: 10 }}>
        <Text style={styles.topTabText}>News</Text>
      </Link>

      <SignedIn>
        <Pressable>
          <Image source={{ uri: user?.imageUrl }} style={styles.topTabAvatar} />
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

export default HomeTopTabs;
