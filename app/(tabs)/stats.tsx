import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

// Components
import SearchBar from "@/components/SearchBar";
import Standings from "@/components/Standings";

// Styles
import { defaultStyles } from "@/constants/Styles";
import TeamColors from "@/constants/TeamColors";

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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {refreshing ? (
          <View>
            <ActivityIndicator
              size="large"
              color={TeamColors.default.secondaryColor}
            />
          </View>
        ) : (
          <Standings />
        )}
      </ScrollView>
    </View>
  );
};

export default Page;
