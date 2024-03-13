import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// API call to get the upcoming games
import { getUpcomingGames } from "@/server/SportRadarAPI";

// Styles and colors
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

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
  }, [upcomingGames === undefined, currentDate]);

  return (
    <View>
      
      {upcomingGames?.games.map((game, index) => {
        if (game.status === "scheduled" || game.status === "inprogress") {
          return (
            <TouchableOpacity key={index} style={styles.gamesContainer}>
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
                  {game.status === "inprogress" ? "Live" : game.scheduledTime}
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {game.homeScore}
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {game.awayScore}
                </Text>
              </View>
            </TouchableOpacity>
          );
        } else {
          return (
            <View key={index} style={styles.gamesContainer}>
              <View style={styles.teams}>
                <Text
                  style={{
                    color:
                      game.homeScore > game.awayScore
                        ? Colors.primary
                        : "white",
                    fontSize: 16,
                  }}
                >
                  {game.home}
                </Text>
                <Text
                  style={{
                    color:
                      game.homeScore > game.awayScore
                        ? "white"
                        : Colors.primary,
                    fontSize: 16,
                  }}
                >
                  {game.away}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color:
                      game.homeScore > game.awayScore
                        ? Colors.primary
                        : "white",
                    fontSize: 14,
                  }}
                >
                  {game.homeScore}
                </Text>
                <Text
                  style={{
                    color:
                      game.homeScore > game.awayScore
                        ? "white"
                        : Colors.primary,
                    fontSize: 14,
                  }}
                >
                  {game.awayScore}
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  gamesContainer: {
    // backgroundColor: "black",
    borderColor: Colors.primary,
    borderRadius: 15,
    borderWidth: 1,
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
