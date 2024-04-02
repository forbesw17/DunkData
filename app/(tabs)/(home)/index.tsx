import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";

// Styles
import { useTheme } from "@/providers/ThemeProvider";
import DateScrollBar from "@/components/DateScrollBar";
import Schedule from "@/components/Schedule";
import TeamColors from "@/constants/TeamColors";

const Page = () => {
  const { styles, primaryColor, secondaryColor, textColor } = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(7); // Inital date index is today (7)
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    for (let i = -7; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    setLoading(false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[secondaryColor]}
            tintColor={textColor}
          />
        }
      >
      <DateScrollBar
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
        <Schedule currentDate={dates[selectedDate]} />
      </ScrollView>
    </View>
  );
};

export default Page;
