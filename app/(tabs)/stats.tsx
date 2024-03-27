import React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";

// Components
import SearchBar from "@/components/SearchBar";
import Standings from "@/components/Standings";

// Styles
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={defaultStyles.headerContainer}>
        <Text style={defaultStyles.header}>Stats</Text>
      </View>
      <ScrollView>
        <SearchBar onSearch={(text) => console.log(text)} />
        <Standings />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
