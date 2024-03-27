import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

// API
import { getGameBoxScore } from "@/server/SportRadarAPI"; // Import the function from your API file

import TeamColors from "@/constants/TeamColors";

interface BoxScoreProps {
  gameID: string;
  children: React.ReactNode;
}

const BoxScore: React.FC<BoxScoreProps> = ({ gameID, children }) => {
  const [homeScore, setHomeScore] = useState<number | null>(null);
  const [awayScore, setAwayScore] = useState<number | null>(null);

  // const homeScore = 101;
  // const awayScore = 96;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoxScores = async () => {
      try {
        const response = (await getGameBoxScore(gameID));
        
        const home = response.home.points;
        const away = response.away.points;


        console.log(response);
        setHomeScore(home);
        setAwayScore(away);
        setLoading(false);
      } catch (error) {
        console.error("Error Box Scores:", error);

        // Error Code 403: QPS Limit Exceeded
        // Retry fetching box scores after 2 seconds (QPS limit for SportRadar API is 1 request per second)
        setTimeout(fetchBoxScores, 2000);
      }
    };

    setTimeout(() => {
    fetchBoxScores();
    }, 5000);

    // Clean-up function (optional)
    return () => {
      // You can do any clean-up here if needed
    };
  }, []); // Empty dependency array means this effect runs only once, on component mount

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="small"
          color={TeamColors.default.secondaryColor}
        />
        {children}
        <ActivityIndicator
          size="small"
          color={TeamColors.default.secondaryColor}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{homeScore}</Text>
        {children}
        <Text style={styles.text}>{awayScore}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default BoxScore;
