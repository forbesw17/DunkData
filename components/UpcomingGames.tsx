import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View, Text, Image } from "react-native";

// API 
import { getUpcomingGames } from "@/server/SportRadarAPI"; // Import the function from your API file

// Assets
import { TeamLogos } from "./TeamLogos";
import Colors from "@/constants/Colors";
import TeamColors from "@/constants/TeamColors";

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
      }
    };

    fetchUpcomingGames();

    // Clean-up function (optional)
    return () => {
      // You can do any clean-up here if needed
    };
  }, [currentDate]); // Empty dependency array means this effect runs only once, on component mount

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={TeamColors.default.secondaryColor}
      />
    );
  }

  return (
    <View style={{ paddingHorizontal: 10 }}>
      {gamesData.games.map((game, index) => {
        if (game.status === "scheduled" || game.status === "inprogress") {
          return (
            <View key={index} style={styles.gamesContainer}>
              <View style={styles.teams}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
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
                <Text style={{ fontSize: 15, color: "white" }}>VS</Text>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
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
                  {game.status === "inprogress"
                    ? "Live"
                    : `@ ${game.scheduledTime}`}
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
  gamesContainer: {
    borderColor: Colors.primary,
    borderBottomWidth: 1,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  teams: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  time: {
    padding: 10,
  },
});

export default UpcomingGames;
