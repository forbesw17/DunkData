import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

// Styles
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={defaultStyles.headerContainer}>
        <Text style={defaultStyles.header}>Stats</Text>
      </View>
    </SafeAreaView>
  );
};

export default Page;
