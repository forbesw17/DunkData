import React, { useEffect, useRef } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";

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
  const { styles } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: selectedDate * 140, animated: true });
  }, [[], [selectedDate]]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: 45 }}
    >
      <View style={styles.dateScrollBarContainer}>
        {dates !== undefined &&
          dates.map((date, index) => (
            <Text
              key={index}
              style={[
                styles.date,
                index === selectedDate && styles.currentDate,
              ]}
              onPress={() => setSelectedDate(index)}
            >
              {formatDate(date)}
            </Text>
          ))}
      </View>
    </ScrollView>
  );
};

export default DateScrollBar;
