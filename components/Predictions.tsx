import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from "react-native";

// Styles
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

import { getUpcomingGames } from "@/server/SportRadarAPI";
import { Ionicons } from "@expo/vector-icons";
import { predictGame } from "@/server/PredictionModel";
import * as teamAbbreviationData from "@/server/team_abbreviation.json"
import { DynamicContent } from "@/components/Outcome";
import { useTheme } from "@/providers/ThemeProvider";
import TeamColors from "@/constants/TeamColors";

type TeamAbbreviation = {
  [key: string]: string;
};



const team_abbreviation: TeamAbbreviation = teamAbbreviationData;

interface UpcomingGamesProps {
  currentDate: Date;
}

function Predictions({ currentDate }: UpcomingGamesProps) {
  const [upcomingGames, setUpcomingGames] = useState<{ date: any; games: any[] } | undefined>();
  let [predictions, setPredictions] = useState<number[]>([]);
  const { styles } = useTheme();
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState<{ date: String; games: any[] }>({
    date: "",
    games: [],
  });

  useEffect(() => {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    
     const fetchGamesAndPredictions = async () => {
      
      let data = await getUpcomingGames(year, month, day);
  
      if (data) {
        console.log(data);
        try{
          setUpcomingGames(data);
        }catch (error) {
          console.log('games not set');
          setTimeout(setGamesData, 8000)
        }
        //setUpcomingGames(data);
  
        const predictions = await Promise.all(data.games.map(async (game) => {
          let home = game.home.toLowerCase();
          let newHome: string = home.replace(/ /g, '_');
          let away = game.away.toLowerCase();
          let newAway: string = away.replace(/ /g, '_');
          
          //console.log(newHome, newAway);

          newAway = newAway.replace(/la_/g, 'los_angeles_');
          newHome = newHome.replace(/la_/g, 'los_angeles_');

          
          //console.log(newHome, newAway);
          //console.log(teamAbbreviationData[newHome], teamAbbreviationData[newAway], '\n')
          try {
            if (newHome in team_abbreviation && newAway in team_abbreviation) {
              return predictGame(team_abbreviation[newHome], team_abbreviation[newAway]);
            }
          } catch (error) {
            console.log(error);
          }

          
          if (team_abbreviation.hasOwnProperty(newHome) && team_abbreviation.hasOwnProperty(newAway)) {
            console.log('yes');
            return predictGame(team_abbreviation[newHome], team_abbreviation[newAway]);
          }
        }));
        
        try{
          setPredictions(predictions);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setTimeout(fetchGamesAndPredictions, 8000)
        }
        //setPredictions(predictions);
      } else {
        console.error("No data returned from getUpcomingGames");
        setTimeout(fetchGamesAndPredictions, 8000)
      }
    }; 
  
    fetchGamesAndPredictions();
  }, [ /*upcomingGames,*/ currentDate]);

  // Loading State Render
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={TeamColors.default.light.secondaryColor}
      />
    );
  }

  if (!upcomingGames || upcomingGames.games.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No games available or data is loading...</Text>
      </View>
    );
  }
  
  else return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
      {predictions.map((prediction, index) => {
        let game = upcomingGames?.games[index];
        return (
          <View key={index} style={[styles2.gamesContainer]}>
            <DynamicContent
              home={game.home}
              away={game.away}
              prediction={prediction}
            />
          </View>
        
        )
      
        /*if (prediction === 1) {
          return (
            <View key={index} style={[styles.gamesContainer]}>
              <DynamicContent
              home={game.home}
              away={game.away}
              prediction={prediction}
            />
            </View>
          );
        } else if (prediction === 0) {
          return (
            <View key={index} style={[styles.gamesContainer]}>
             <DynamicContent 
              home={game.home}
              away={game.away}
              prediction={prediction}
            />
            </View>
          );
        }*/
      })}
      </ScrollView>
      </View>
    
  );
};

export default Predictions;
// ...styles and export statement...

const styles2 = StyleSheet.create({
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
    //flexDirection: "row",
    justifyContent: "center",
    //padding: 10,
    alignItems: 'center',
  },
  teams: {
    marginHorizontal: 10,
    flexDirection: "column",
  },
  time: {},
});



