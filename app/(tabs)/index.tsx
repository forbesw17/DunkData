import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

// Styles
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import UpcomingGames from "@/components/UpcomingGames";
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
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("@/assets/images/DunkData.png")}
          style={{ width: 75, height: 75 }}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 25 }}>

        <UpcomingGames />

        {/* Past games component */}
        

        {/* Past games component */}


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
