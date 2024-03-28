import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";

// Components
import SearchBar from "@/components/SearchBar";
import Standings from "@/components/Standings";

// Styles
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <View style={defaultStyles.container}>
      <View style={defaultStyles.headerContainer}>
        <Text style={defaultStyles.header}>Stats</Text>
        <SearchBar onSearch={(text) => console.log(text)} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['white']} tintColor={'white'} />
        }
      >
          <Standings />
      </ScrollView>
    </View>
  );
};

export default Page;
