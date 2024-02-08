import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

// Styles
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
    

  
    return (
      <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Stats</Text>
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
    },
  });
  
  export default Page;