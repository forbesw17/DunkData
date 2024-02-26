import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import Colors from "@/constants/Colors";

import { getUpcomingGames } from "@/server/SportRadarAPI";

// Component retrieves the upcoming games from the SportRadar API and displays them in a list
const UpcomingGames = () => {
  const [upcomingGames, setUpcomingGames] = useState<
    { date: any; games: any[] } | undefined
  >();

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; // getMonth returns a zero-based value (0-11), so we add 1 to get the correct month number
    let currentDay = currentDate.getDate();

    getUpcomingGames(currentYear, currentMonth, currentDay).then((data) => {
      setUpcomingGames(data);
    });
  }, [upcomingGames === undefined]);

  return (
    <View>
      <Text style={styles.header}>Today's Schedule</Text>

      {upcomingGames?.games.map((game, index) => {
        if (game.status === "scheduled" || game.status === "inprogress") {
          return (
            <View key={index} style={styles.gamesContainer}>
              <View style={styles.teams}>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {game.home}
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {game.away}
                </Text>
              </View>
              <View style={styles.time}>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {game.status === "inprogress"
                    ? "Watch Now"
                    : game.scheduledTime}
                </Text>
              </View>
            </View>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "white",
    fontSize: 24,
  },
  gamesContainer: {
    // backgroundColor: "black",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  teams: {
    marginHorizontal: 10,
    flexDirection: "column",
  },
  time: {},
});

export default UpcomingGames;
