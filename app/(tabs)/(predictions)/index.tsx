import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, SafeAreaView, View, Text, RefreshControl, ScrollView } from "react-native";

// Styles
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

import { getUpcomingGames } from "@/server/SportRadarAPI";
import { Ionicons } from "@expo/vector-icons";
import { predictGame } from "@/server/PredictionModel";
import * as teamAbbreviationData from "@/server/team_abbreviation.json"
import { DynamicContent } from "@/components/Outcome";
import DateScrollBar from "@/components/DateScrollBar";
import userpredictions from "./userprediction";
import Predictions from "@/components/Predictions";
import { useTheme } from "@/providers/ThemeProvider";

type TeamAbbreviation = {
  [key: string]: string;
};

const team_abbreviation: TeamAbbreviation = teamAbbreviationData;

const Page = () => {
  const [upcomingGames, setUpcomingGames] = useState<{ date: any; games: any[] } | undefined>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [predictions, setPredictions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState(7);
  const { styles, primaryColor, secondaryColor, textColor } = useTheme();


  useEffect(() => {
    for (let i = -7; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    setLoading(false);
    /*const fetchGamesAndPredictions = async () => {
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth() + 1;
      let currentDay = currentDate.getDate();

      for (let i = -7; i <= 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
      setLoading(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
      }, []);
  
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
      }*/
    }, []);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 2000);
    }, []);
  
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
  
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[secondaryColor]}
            tintColor={textColor}
          />
        }
      >
      <DateScrollBar
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
        <Text style={styles2.header}>Dunk Data's Picks for the Day</Text>
        <Predictions currentDate={dates[selectedDate]} />
      </ScrollView>
    </View>
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
    //flexDirection: "row",
    justifyContent: "flex-start",
    padding: 20,
    alignContent: 'center',
  },
  teams: {
    marginHorizontal: 10,
    flexDirection: "column",
  },
  time: {},
});


export default Page;

const styles2 = StyleSheet.create({
  header: {
    fontSize: 24,       
    fontWeight: 'bold', 
    padding: 10,        
    color: 'white',      
    textAlign: 'center' 
  }
});
