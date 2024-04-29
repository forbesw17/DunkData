import React from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useTheme } from "@/providers/ThemeProvider";

// Components
import SearchBar from "@/components/SearchBar";
import Standings from "@/components/Standings";

const Page = () => {
  const { styles } = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Stats</Text>
        {/* <SearchBar onSearch={(text) => console.log(text)} /> */}
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
