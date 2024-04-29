import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
} from "react-native";

// API
import { getUpcomingGames } from "@/server/SportRadarAPI"; // Import the function from your API file

// Assets
import { TeamLogos } from "./TeamLogos";
import Colors from "@/constants/Colors";
import TeamColors from "@/constants/TeamColors";
import BoxScore from "./BoxScore";
import { useTheme } from "@/providers/ThemeProvider";

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

function UserPredictions({ currentDate }: UpcomingGamesProps) {
  const { styles, secondaryColor, textColor } = useTheme();
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
        color={TeamColors.default.light.secondaryColor}
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
                          ? secondaryColor
                          : textColor,
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
                          ? secondaryColor
                          : textColor,
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
                  <Text style={{ color: textColor, fontSize: 12 }}>
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
                    <Text style={{ color: textColor, fontSize: 12 }}>
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

export default UserPredictions;
