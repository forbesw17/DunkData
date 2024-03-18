import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

// API call to get the upcoming games
import { getUpcomingGames } from "@/server/SportRadarAPI";

// Styles and colors
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

import { TeamLogos } from "@/components/TeamLogos";

// Component retrieves the upcoming games from the SportRadar API and displays them in a list
const UpcomingGames = () => {
  //   const [upcomingGames, setUpcomingGames] = useState<
  //     { date: any; games: any[] } | undefined
  //   >();

  //   const [currentDate, setCurrentDate] = useState(new Date());

  //   useEffect(() => {
  //     let currentYear = currentDate.getFullYear();
  //     let currentMonth = currentDate.getMonth() + 1; // getMonth returns a zero-based value (0-11), so we add 1 to get the correct month number
  //     let currentDay = currentDate.getDate();

  //     getUpcomingGames(currentYear, currentMonth, currentDay).then((data) => {
  //       setUpcomingGames(data);
  //     });
  //   }, [upcomingGames === undefined, currentDate]);

  const upcomingGames = {
    date: "2024-03-18",
    games: [
      {
        away: "Cleveland Cavaliers",
        awayID: "583ec773-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Indiana Pacers",
        homeID: "583ec7cd-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "93e11913-58a3-4fae-9013-43c1561a5d21",
        scheduledTime: "7:00 PM",
        status: "scheduled",
      },
      {
        away: "Miami Heat",
        awayID: "583ecea6-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Philadelphia 76ers",
        homeID: "583ec87d-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "27fa5951-b6d6-430a-9a07-b4cbef5587dd",
        scheduledTime: "7:30 PM",
        status: "scheduled",
      },
      {
        away: "Detroit Pistons",
        awayID: "583ec928-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Boston Celtics",
        homeID: "583eccfa-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "79bd87b1-c57b-42b3-9d58-683d64aadcae",
        scheduledTime: "7:30 PM",
        status: "scheduled",
      },
      {
        away: "Portland Trail Blazers",
        awayID: "583ed056-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Chicago Bulls",
        homeID: "583ec5fd-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "aff71d57-0fcd-456a-a4ca-3f321371e2cf",
        scheduledTime: "8:00 PM",
        status: "scheduled",
      },
      {
        away: "Minnesota Timberwolves",
        awayID: "583eca2f-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Utah Jazz",
        homeID: "583ece50-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "796a7d8f-3cbf-42fc-8af6-6cc2bd2f7746",
        scheduledTime: "9:00 PM",
        status: "scheduled",
      },
      {
        away: "Memphis Grizzlies",
        awayID: "583eca88-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Sacramento Kings",
        homeID: "583ed0ac-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "9adfce69-aa88-40f3-8fd5-d5aca41ff7f7",
        scheduledTime: "10:00 PM",
        status: "scheduled",
      },
      {
        away: "New York Knicks",
        awayID: "583ec70e-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Golden State Warriors",
        homeID: "583ec825-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "bd9f13c8-6cb8-459a-a87f-8b679fdc1142",
        scheduledTime: "10:00 PM",
        status: "scheduled",
      },
      {
        away: "Atlanta Hawks",
        awayID: "583ecb8f-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Los Angeles Lakers",
        homeID: "583ecae2-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "f2ffd19c-544c-412f-b63b-4ccc617c7910",
        scheduledTime: "10:30 PM",
        status: "scheduled",
      },
    ],
  };

  return (
    <View>
      {upcomingGames?.games.map((game, index) => {
        if (game.status === "scheduled" || game.status === "inprogress") {
          return (
            <View key={index} style={styles.gamesContainer}>
              <View style={styles.teams}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                  >
                    Home
                  </Text>
                  <Image
                    source={TeamLogos[game.home as keyof typeof TeamLogos]}
                    style={{ height: 70, width: 70 }}
                  />
                  <Text style={{ color: "white", fontSize: 9 }}>
                    {game.home}
                  </Text>
                </View>
                <Text style={{ fontSize: 15, color: 'white'}}>VS</Text>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                  >
                    Away
                  </Text>

                  <Image
                    source={TeamLogos[game.away as keyof typeof TeamLogos]}
                    style={{ height: 70, width: 70 }}
                  />
                  <Text style={{ color: "white", fontSize: 9 }}>
                    {game.away}
                  </Text>
                </View>
              </View>
              <View style={styles.time}>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {game.status === "inprogress" ? "Live" : `@ ${game.scheduledTime}`}
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {game.homeScore}
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {game.awayScore}
                </Text>
              </View>
            </View>
          );
        }
        // else {
        //   return (
            // <View key={index} style={styles.gamesContainer}>
            //   <View style={styles.teams}>
            //     <Text
            //       style={{
            //         color:
            //           game.homeScore > game.awayScore
            //             ? Colors.primary
            //             : "white",
            //         fontSize: 16,
            //       }}
            //     >
            //       {game.home}
            //     </Text>
            //     <Text
            //       style={{
            //         color:
            //           game.homeScore > game.awayScore
            //             ? "white"
            //             : Colors.primary,
            //         fontSize: 16,
            //       }}
            //     >
            //       {game.away}
            //     </Text>
            //   </View>
            //   <View>
            //     <Text
            //       style={{
            //         color:
            //           game.homeScore > game.awayScore
            //             ? Colors.primary
            //             : "white",
            //         fontSize: 14,
            //       }}
            //     >
            //       {game.homeScore}
            //     </Text>
            //     <Text
            //       style={{
            //         color:
            //           game.homeScore > game.awayScore
            //             ? "white"
            //             : Colors.primary,
            //         fontSize: 14,
            //       }}
            //     >
            //       {game.awayScore}
            //     </Text>
            //   </View>
            // </View>
        //   );
        // }
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
    // borderColor: "white",
    // borderRadius: 15,
    // borderWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  teams: {
    padding: 10,
    // marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  time: {
    padding: 10,
  },
});

export default UpcomingGames;
