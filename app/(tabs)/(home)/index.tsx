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

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }
    setFirstName(user.firstName);
  }, [user]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView>
        <UpcomingGames />
        {/* <LastestNews /> */}
      </ScrollView>
    </View>
  );
};

export default Page;
