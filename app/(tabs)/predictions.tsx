import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from "react-native";

// Styles
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

import { getUpcomingGames } from "@/server/SportRadarAPI";
import { Ionicons } from "@expo/vector-icons";
import { predictGame } from "@/server/PredictionModel";
import * as teamAbbreviationData from "@/server/team_abbreviation.json"

type TeamAbbreviation = {
  [key: string]: string;
};

const team_abbreviation: TeamAbbreviation = teamAbbreviationData;

const Page = () => {
  const [upcomingGames, setUpcomingGames] = useState<{ date: any; games: any[] } | undefined>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [predictions, setPredictions] = useState<number[]>([]);

  useEffect(() => {
    const fetchGamesAndPredictions = async () => {
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth() + 1;
      let currentDay = currentDate.getDate();
  
      const data = await getUpcomingGames(currentYear, currentMonth, currentDay);
  
      if (data) {
        setUpcomingGames(data);
  
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
  
        setPredictions(predictions);
      }
    };
  
    fetchGamesAndPredictions();
  }, [upcomingGames === undefined, currentDate]);
  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={defaultStyles.headerContainer}>
        <Text style={defaultStyles.header}>Predictions</Text>
      </View>
    

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setCurrentDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)))}>
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{currentDate.toDateString()}</Text>
        <TouchableOpacity onPress={() => setCurrentDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() + 1)))}>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
      {predictions.map((prediction, index) => {
        const game = upcomingGames?.games[index];
        if (prediction === 1) {
          return (
            <View key={index} style={styles.gamesContainer}>
              <View style={styles.teams}>
                <Text style={{ color: "green", fontSize: 16 }}>{game.home}</Text>
                <Text style={{ color: "white", fontSize: 16 }}>{game.away}</Text>
              </View>
            </View>
          );
        } else if (prediction === 0) {
          return (
            <View key={index} style={styles.gamesContainer}>
              <View style={styles.teams}>
                <Text style={{ color: "white", fontSize: 16 }}>{game.home}</Text>
                <Text style={{ color: "green", fontSize: 16 }}>{game.away}</Text>
              </View>
            </View>
          );
        }
      })}
      </ScrollView>
    </SafeAreaView>
  );
};
// ...styles and export statement...

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


export default Page;
