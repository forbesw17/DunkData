import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

// Styles
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import UpcomingGames from "@/components/UpcomingGames";
import TeamColors from "@/constants/TeamColors";
import HomeTopTabs from "@/components/HomeTopTabs";
import LastestNews from "@/components/LastestNews";
// import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [selectedTab, setSelectedTab] = useState("Schedule");

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }
    setFirstName(user.firstName);
  }, [user]);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("@/assets/images/DunkData.png")}
          style={{ width: 75, height: 75 }}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>

      <HomeTopTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "Schedule" && (
        <UpcomingGames />
      )}

        {/* News component */}
        {selectedTab === "News" && (
          <LastestNews/>
        )}

        {/* Past games component */}
      {/* </ScrollView> */}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    // fontWeight: "bold",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
});

export default Page;
