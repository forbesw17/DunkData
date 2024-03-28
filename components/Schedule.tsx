import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View, Text, Image, ScrollView } from "react-native";

// API
import { getUpcomingGames, getGameBoxScore } from "@/server/SportRadarAPI"; // Import the function from your API file

// Assets
import { TeamLogos } from "./TeamLogos";
import Colors from "@/constants/Colors";
import TeamColors from "@/constants/TeamColors";
import BoxScore from "./BoxScore";

/* Returns the status text for a game
    If the game is in progress, return "Live"
    If the game is scheduled, return the scheduled time
    If the game is closed, return "Final"
*/
function getStatusText(status: string, scheduledTime: string): string {
  if (status === "inprogress") {
    return "Live";
  } else if (status === "scheduled") {
    return scheduledTime;
  } else {
    return "Final";
  }
}

interface UpcomingGamesProps {
  currentDate: Date;
}

function Schedule({ currentDate }: UpcomingGamesProps) {
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState<{ date: String; games: any[] }>({
    date: "",
    games: [],
  });

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = currentDate.getDate();

    const fetchUpcomingGames = async () => {
      try {
        const { date, games } = (await getUpcomingGames(year, month, day)) as {
          date: any;
          games: any[];
        };
        setGamesData({ date, games });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching in Schedule:", error);

        // Retry fetching upcoming games after 2 seconds
        setTimeout(fetchUpcomingGames, 2000);
      }
    };

    fetchUpcomingGames();

    // Clean-up function (optional)
    return () => {
      // You can do any clean-up here if needed
    };
  }, [currentDate]); // Empty dependency array means this effect runs only once, on component mount

  // Loading State Render
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={TeamColors.default.secondaryColor}
      />
    );
  }

  return (
    // List of Games
    // Loop through the games and render each game
    <View style={{ paddingHorizontal: 10 }}>
      {gamesData.games.map((game, index) => {

        // Closed Game Render
        if (game.status === "closed") {
          return (
            <View key={index} style={styles.gameListContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    styles.finalScore,
                    {
                      color:
                        game.homeScore > game.awayScore
                          ? TeamColors.default.secondaryColor
                          : "white",
                    },
                  ]}
                >
                  {game.homeScore}
                </Text>

                <View style={styles.teamsAndTimeContainer}>
                  <View style={styles.teamsContainer}>
                    <View style={styles.teamContainer}>
                      <Text style={styles.homeAwayText}>Home</Text>
                      <Image
                        source={TeamLogos[game.home as keyof typeof TeamLogos]}
                        style={styles.teamLogo}
                      />
                      <Text style={styles.teamNameText}>{game.home}</Text>
                    </View>
                    <Text style={styles.vsText}>VS</Text>
                    <View style={styles.teamContainer}>
                      <Text style={styles.homeAwayText}>Away</Text>

                      <Image
                        source={TeamLogos[game.away as keyof typeof TeamLogos]}
                        style={styles.teamLogo}
                      />
                      <Text style={styles.teamNameText}>{game.away}</Text>
                    </View>
                  </View>

                  <View style={styles.time}>
                    <Text style={{ color: "white", fontSize: 12 }}>
                      {getStatusText(game.status, game.scheduledTime)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.finalScore,
                    {
                      color:
                        game.homeScore < game.awayScore
                          ? TeamColors.default.secondaryColor
                          : "white",
                    },
                  ]}
                >
                  {game.awayScore}
                </Text>
              </View>
            </View>
          );
        }

        // Scheduled Game Render
        if (game.status === "scheduled") {
          return (
            <View key={index} style={styles.gameListContainer}>
              <View style={styles.teamsAndTimeContainer}>
                <View style={styles.teamsContainer}>
                  <View style={styles.teamContainer}>
                    <Text style={styles.homeAwayText}>Home</Text>
                    <Image
                      source={TeamLogos[game.home as keyof typeof TeamLogos]}
                      style={styles.teamLogo}
                    />
                    <Text style={styles.teamNameText}>{game.home}</Text>
                  </View>
                  <Text style={styles.vsText}>VS</Text>
                  <View style={styles.teamContainer}>
                    <Text style={styles.homeAwayText}>Away</Text>

                    <Image
                      source={TeamLogos[game.away as keyof typeof TeamLogos]}
                      style={styles.teamLogo}
                    />
                    <Text style={styles.teamNameText}>{game.away}</Text>
                  </View>
                </View>

                <View style={styles.time}>
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {getStatusText(game.status, game.scheduledTime)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }

        // In Progress Game Render
        if (game.status === "inprogress") {
          return (
            <View key={index} style={styles.gameListContainer}>
                <BoxScore gameID={game.id}>
                <View style={styles.teamsAndTimeContainer}>
                  <View style={styles.teamsContainer}>
                    <View style={styles.teamContainer}>
                      <Text style={styles.homeAwayText}>Home</Text>
                      <Image
                        source={TeamLogos[game.home as keyof typeof TeamLogos]}
                        style={styles.teamLogo}
                      />
                      <Text style={styles.teamNameText}>{game.home}</Text>
                    </View>
                    <Text style={styles.vsText}>VS</Text>
                    <View style={styles.teamContainer}>
                      <Text style={styles.homeAwayText}>Away</Text>

                      <Image
                        source={TeamLogos[game.away as keyof typeof TeamLogos]}
                        style={styles.teamLogo}
                      />
                      <Text style={styles.teamNameText}>{game.away}</Text>
                    </View>
                  </View>

                  <View style={styles.time}>
                    <Text style={{ color: "white", fontSize: 12 }}>
                      {getStatusText(game.status, game.scheduledTime)}
                    </Text>
                  </View>
                </View>
                </BoxScore>
            </View>
          );
        }

      })}
    </View>
  );
}

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
  gameListContainer: {
    borderColor: TeamColors.default.secondaryColor,
    borderBottomWidth: 1,
    marginVertical: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  gameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamsAndTimeContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  teamsContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  teamContainer: {
    alignItems: "center",
    width: 90,
    height: 100,
  },
  time: {
    alignItems: "center",
    gap: 10,
  },
  teamLogo: {
    height: 70,
    width: 70,
  },
  finalScore: {
    fontSize: 30,
    fontWeight: "bold",
  },

  homeAwayText: {
    color: "white",
    fontSize: 9,
    fontWeight: "bold",
  },
  teamNameText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

  vsText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});

export default Schedule;
