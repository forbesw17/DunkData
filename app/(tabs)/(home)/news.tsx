
import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";

// Styles
import { defaultStyles } from "@/constants/Styles";
import LatestNews from "@/components/LastestNews";

const Page = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
        <LatestNews />
        </ScrollView>
    </SafeAreaView>
  );
};

export default Page;