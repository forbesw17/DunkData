import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image
} from "react-native";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

// Styles
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
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

        <SignedIn>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require("@/assets/images/DunkData.png")} style={{ width: 75, height: 75 }} />
          {/* <Text style={styles.header}>Hello, {firstName}</Text> */}
        </View>
        {/* <Image source={{ uri: user?.imageUrl }} style={styles.avatar} /> */}
        </SignedIn>

        <SignedOut>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
          <Image source={require("@/assets/images/DunkData.png")} style={{ width: 100, height: 100 }} />
          {/* <Text style={styles.header}>Dunk Data</Text> */}
        {/* </View> */}
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
