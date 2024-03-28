import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";

// Styles
import { defaultStyles } from "@/constants/Styles";
import DateScrollBar from "@/components/DateScrollBar";
import Schedule from "@/components/Schedule";
import TeamColors from "@/constants/TeamColors";

const Page = () => {
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }

  if (loading) {
    return (
      <View style={defaultStyles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[TeamColors.default.secondaryColor]}
            tintColor={TeamColors.default.text}
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
