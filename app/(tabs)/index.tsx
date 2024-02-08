import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

// Styles
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

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

        <SignedIn>
        <Text style={styles.header}>Welcome back, {firstName}</Text>
        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
        </SignedIn>

        <SignedOut>
        <Text style={styles.header}>DunkData</Text>
        </SignedOut>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24
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
