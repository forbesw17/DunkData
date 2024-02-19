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


        {/* Upcoming games component */}
        <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 20}}>
          <Text style={[defaultStyles.text, {fontSize: 20 }]}>Upcoming Games</Text>
          <View
            style={{ height: 240, width: '100%', backgroundColor: "white", borderRadius: 15 }}
          >
            
          </View>
        </View>

        {/* Past games component */}
        <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 20}}>
          <Text style={[defaultStyles.text, {fontSize: 20 }]}>Recent Games</Text>
          <View
            style={{ height: 240, width: '100%', backgroundColor: "white", borderRadius: 15 }}
          >
            
          </View>
        </View>

        {/* Past games component */}
        <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 20}}>
          <Text style={[defaultStyles.text, {fontSize: 20 }]}>Recent Games</Text>
          <View
            style={{ height: 240, width: '100%', backgroundColor: "white", borderRadius: 15 }}
          >
            
          </View>
        </View>


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
