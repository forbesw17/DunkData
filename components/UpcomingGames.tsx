import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View, Text, Image } from "react-native";

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

function UpcomingGames({ currentDate }: UpcomingGamesProps) {
  const [gamesData, setGamesData] = useState<{ date: String; games: any[] }>({
    date: "",
    games: [],
  });

  const [loading, setLoading] = useState(true);

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
        console.error("Error fetching upcoming games:", error);

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

  // Mock Data
  // Comment out the useEffect and gamesData state variable above and uncomment the code below to use mock data
  // const gamesData = {
  //   date: "2024-03-18",
  //   games: [
  //     {
  //       away: "Cleveland Cavaliers",
  //       awayID: "583ec773-fb46-11e1-82cb-f4ce4684ea4c",
  //       awayScore: undefined,
  //       home: "Indiana Pacers",
  //       homeID: "583ec7cd-fb46-11e1-82cb-f4ce4684ea4c",
  //       homeScore: undefined,
  //       id: "93e11913-58a3-4fae-9013-43c1561a5d21",
  //       scheduledTime: "7:00 PM",
  //       status: "inprogress",
  //     },
  //     {
  //       away: "Miami Heat",
  //       awayID: "583ecea6-fb46-11e1-82cb-f4ce4684ea4c",
  //       awayScore: undefined,
  //       home: "Philadelphia 76ers",
  //       homeID: "583ec87d-fb46-11e1-82cb-f4ce4684ea4c",
  //       homeScore: undefined,
  //       id: "27fa5951-b6d6-430a-9a07-b4cbef5587dd",
  //       scheduledTime: "7:30 PM",
  //       status: "inprogress",
  //     },
  //     {
  //       away: "Detroit Pistons",
  //       awayID: "583ec928-fb46-11e1-82cb-f4ce4684ea4c",
  //       awayScore: undefined,
  //       home: "Boston Celtics",
  //       homeID: "583eccfa-fb46-11e1-82cb-f4ce4684ea4c",
  //       homeScore: undefined,
  //       id: "79bd87b1-c57b-42b3-9d58-683d64aadcae",
  //       scheduledTime: "7:30 PM",
  //       status: "inprogress",
  //     },
  //     {
  //       away: "Portland Trail Blazers",
  //       awayID: "583ed056-fb46-11e1-82cb-f4ce4684ea4c",
  //       awayScore: undefined,
  //       home: "Chicago Bulls",
  //       homeID: "583ec5fd-fb46-11e1-82cb-f4ce4684ea4c",
  //       homeScore: undefined,
  //       id: "aff71d57-0fcd-456a-a4ca-3f321371e2cf",
  //       scheduledTime: "8:00 PM",
  //       status: "inprogress",
  //     },
  //     {
  //       away: "Minnesota Timberwolves",
  //       awayID: "583eca2f-fb46-11e1-82cb-f4ce4684ea4c",
  //       awayScore: undefined,
  //       home: "Utah Jazz",
  //       homeID: "583ece50-fb46-11e1-82cb-f4ce4684ea4c",
  //       homeScore: undefined,
  //       id: "796a7d8f-3cbf-42fc-8af6-6cc2bd2f7746",
  //       scheduledTime: "9:00 PM",
  //       status: "inprogress",
  //     },
  //     {
  //       away: "Memphis Grizzlies",
  //       awayID: "583eca88-fb46-11e1-82cb-f4ce4684ea4c",
  //       awayScore: undefined,
  //       home: "Sacramento Kings",
  //       homeID: "583ed0ac-fb46-11e1-82cb-f4ce4684ea4c",
  //       homeScore: undefined,
  //       id: "9adfce69-aa88-40f3-8fd5-d5aca41ff7f7",
  //       scheduledTime: "10:00 PM",
  //       status: "scheduled",
  //     },
  //     {
  //       away: "New York Knicks",
  //       awayID: "583ec70e-fb46-11e1-82cb-f4ce4684ea4c",
  //       awayScore: undefined,
  //       home: "Golden State Warriors",
  //       homeID: "583ec825-fb46-11e1-82cb-f4ce4684ea4c",
  //       homeScore: undefined,
  //       id: "bd9f13c8-6cb8-459a-a87f-8b679fdc1142",
  //       scheduledTime: "10:00 PM",
  //       status: "scheduled",
  //     },
  //     {
  //       away: "Atlanta Hawks",
  //       awayID: "583ecb8f-fb46-11e1-82cb-f4ce4684ea4c",
  //       awayScore: undefined,
  //       home: "Los Angeles Lakers",
  //       homeID: "583ecae2-fb46-11e1-82cb-f4ce4684ea4c",
  //       homeScore: undefined,
  //       id: "f2ffd19c-544c-412f-b63b-4ccc617c7910",
  //       scheduledTime: "10:30 PM",
  //       status: "scheduled",
  //     },
  //   ],
  // };

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

export default UpcomingGames;
