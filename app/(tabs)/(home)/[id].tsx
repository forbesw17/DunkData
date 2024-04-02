import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { defaultStyles } from "@/constants/Styles";

// API
import { getGameBoxScore } from "@/server/SportRadarAPI";

const GameDetails = () => {
  const { id } = useLocalSearchParams();
  // const [homeDetails, setHomeDetails] = useState({});
  // const [awayDetails, setAwayDetails] = useState({});


  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchBoxScores = async () => {
  //     try {
  //       const response = await getGameBoxScore(id);
  //       console.log(response);
  //       setHomeDetails(response.home);
  //       setAwayDetails(response.away);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error Box Scores:", error);

  //       // Error Code 403: QPS Limit Exceeded
  //       // Retry fetching box scores after 2 seconds (QPS limit for SportRadar API is 1 request per second)
  //       // setTimeout(() => {
  //       fetchBoxScores();
  //       // }, 5000);
  //     }
  //   };

  //   fetchBoxScores();

  //   // Clean-up function (optional)
  //   return () => {
  //     // You can do any clean-up here if needed
  //   };
  // }, []); // Empty dependency array means this effect runs only once, on component mount

  
  
  
  //Mock Data
  const data = {
    attendance: 17274,
    away: {
      alias: "CLE",
      bonus: true,
      id: "583ec773-fb46-11e1-82cb-f4ce4684ea4c",
      leaders: { assists: [Array], points: [Array], rebounds: [Array] },
      market: "Cleveland",
      name: "Cavaliers",
      points: 108,
      record: { losses: 25, wins: 43 },
      reference: "1610612739",
      remaining_timeouts: 2,
      scoring: [[Object], [Object], [Object], [Object]],
      sr_id: "sr:team:3432",
    },
    clock: "00:00",
    clock_decimal: "00:00",
    coverage: "full",
    duration: "2:17",
    entry_mode: "WEBSOCKET",
    home: {
      alias: "IND",
      bonus: true,
      id: "583ec7cd-fb46-11e1-82cb-f4ce4684ea4c",
      leaders: { assists: [Array], points: [Array], rebounds: [Array] },
      market: "Indiana",
      name: "Pacers",
      points: 103,
      record: { losses: 31, wins: 38 },
      reference: "1610612754",
      remaining_timeouts: 1,
      scoring: [[Object], [Object], [Object], [Object]],
      sr_id: "sr:team:3419",
    },
    id: "93e11913-58a3-4fae-9013-43c1561a5d21",
    lead_changes: 2,
    quarter: 4,
    reference: "0022300983",
    scheduled: "2024-03-18T23:00:00+00:00",
    sr_id: "sr:match:43067199",
    status: "closed",
    time_zones: { away: "US/Eastern", home: "US/Eastern", venue: "US/Eastern" },
    times_tied: 7,
    track_on_court: true,
  };

  let homeDetails = data.home;
  let awayDetails = data.away;

  if (loading) {
    return (
      <View style={defaultStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
  
  <View style={[defaultStyles.container, { padding: 20 }]}>
    <Text style={{color: 'white'}}>Game Details</Text>
    <Text style={{color: 'white'}}>Home: {homeDetails.points}</Text>
    <Text style={{color: 'white'}}>Away: {awayDetails.points}</Text>
  </View>
  );
};

export default GameDetails;
