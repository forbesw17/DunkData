import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";

// API
import { getUpcomingGames } from "@/server/SportRadarAPI"; // Import the function from your API file

// Assets
import { TeamLogos } from "../../../components/TeamLogos";
import Colors from "@/constants/Colors";
import TeamColors from "@/constants/TeamColors";
//import BoxScore from "../../../components/BoxScore";
import { useTheme } from "@/providers/ThemeProvider";
import  PredictionButton  from "@/components/PredictionButton";

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

function userpredictions() {
  const { styles, secondaryColor, textColor } = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(7); // Inital date index is today (7)
  const [dates, setDates] = useState<Date[]>([]);
  const [gamesData, setGamesData] = useState<{ date: String; games: any[] }>({
    date: "",
    games: [],
  });

  useEffect(() => {
    
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns a zero-based value (where 0 indicates the first month)
    const day = date.getDate();

    const fetchUpcomingGames = async () => {
      try {
        const response = await getUpcomingGames(year, month, day);
        if (response) {
          const { date, games } = response as {
            date: any;
            games: any[];
          };
          setGamesData({ date, games });
        } else {
          console.error("No data returned from getUpcomingGames");
        }
        
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
  }, []); // Empty dependency array means this effect runs only once, on component mount

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
    
    <View style={styles.container}>
      <View>
         <Text style={styles2.titleText}>Predict Todays Games!</Text> 
      </View>
      <ScrollView>
      {gamesData.games.map((game, index) => {
        
        // Closed Game Render
        // if (game.status === "closed") {
        //   return (
            
        //     <View key={index} style={styles.gameListContainer}>
        //       <View style={{ flexDirection: "row", alignItems: "center" }}>
        //         <Text
        //           style={[
        //             styles.finalScore,
        //             {
        //               color:
        //                 game.homeScore > game.awayScore
        //                   ? secondaryColor
        //                   : textColor,
        //             },
        //           ]}
        //         >
        //           {game.homeScore}
        //         </Text>

        //         <View style={styles.teamsAndTimeContainer}>
        //           <View style={styles.teamsContainer}>
        //             <View style={styles.teamContainer}>
        //               <Text style={styles.homeAwayText}>Home</Text>
        //               <Image
        //                 source={TeamLogos[game.home as keyof typeof TeamLogos]}
        //                 //style={styles.teamLogo}
        //               />
        //               <Text style={styles.teamNameText}>{game.home}</Text>
        //             </View>
        //             <Text style={styles.vsText}>VS</Text>
        //             <View style={styles.teamContainer}>
        //               <Text style={styles.homeAwayText}>Away</Text>

        //               <Image
        //                 source={TeamLogos[game.away as keyof typeof TeamLogos]}
        //                 //style={styles.teamLogo}
        //               />
        //               <Text style={styles.teamNameText}>{game.away}</Text>
        //             </View>
        //           </View>

        //           <View style={styles.time}>
        //             <Text style={{ color: "white", fontSize: 12 }}>
        //               {getStatusText(game.status, game.scheduledTime)}
        //             </Text>
        //           </View>
        //         </View>
        //         <Text
        //           style={[
        //             styles.finalScore,
        //             {
        //               color:
        //                 game.homeScore < game.awayScore
        //                   ? secondaryColor
        //                   : textColor,
        //             },
        //           ]}
        //         >
        //           {game.awayScore}
        //         </Text>
        //       </View>
        //     </View>
        //   );
        // }

        // Scheduled Game Render
        if (game.status === "scheduled") {
          return (
            <View key={index} style={styles.gameListContainer}>
              <PredictionButton winningTeam = {game.home} losingTeam = {game.away}>
              <View style={styles2.teamsAndTimeContainer}>
                <View style={styles2.teamsContainer} >
                  {/* <PredictionButton winningTeam = {game.home} /> */}
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
                  {/* <PredictionButton winningTeam = {game.away} /> */}
                </View>

                <View style={styles.time}>
                  <Text style={{ color: textColor, fontSize: 12 }}>
                    {getStatusText(game.status, game.scheduledTime)}
                  </Text>
                </View>
              </View>
              </PredictionButton>
            </View>
          );
        }

        // In Progress Game Render
         else /*(game.status === "inprogress")*/ {
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
      })}
      </ScrollView>
    </View>
    
  );
}

export default userpredictions;

const styles2 = StyleSheet.create({
  teamContainer2:{
    alignItems: "flex-start",
    width: 90,
    height: 110,
    flexDirection: "row",
    paddingHorizontal: 2,
    marginBottom: 10
  },

  titleText:{
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },

  gameListContainer: {
    //borderColor: secondaryColor,
    borderBottomWidth: 1,
    marginVertical: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  teamsAndTimeContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 15,
    paddingHorizontal: 20
  },

  teamsContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  }
})
