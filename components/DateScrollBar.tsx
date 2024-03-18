import React, { useEffect, useRef } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import TeamColors from "@/constants/TeamColors";

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  const diffInDays = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffInDays === -1
    ? "Today"
    : date.toLocaleDateString(undefined, options);
};

interface DateScrollBarProps {
  dates: Date[];
  selectedDate: number;
  setSelectedDate: (date: number) => void;
}

const DateScrollBar: React.FC<DateScrollBarProps> = ({
  dates,
  selectedDate,
  setSelectedDate,
}) => {

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToSelectedDate();
  }, [[], selectedDate]);

  const scrollToSelectedDate = () => {
    scrollViewRef.current?.scrollTo({ x: selectedDate * 140, animated: true });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        {dates !== undefined && dates.map((date, index) => (
          <Text
            key={index}
            style={[styles.date, index === selectedDate && styles.currentDate]}
            onPress={() => setSelectedDate(index)}
          >
            {formatDate(date)}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  date: {
    marginHorizontal: 5,
    color: "white",
    borderWidth: 0.5,
    borderColor: TeamColors.default.secondaryColor,
    borderRadius: 10,
    padding: 10,
  },
  currentDate: {
    fontWeight: "bold",
  },
});

export default DateScrollBar;