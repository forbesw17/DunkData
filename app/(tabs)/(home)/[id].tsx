import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { defaultStyles } from "@/constants/Styles";
import { useTheme } from "@/providers/ThemeProvider";
import { TeamLogos } from "@/components/TeamLogos";

// API
import { getGameSummary } from "@/server/SportRadarAPI";

const GameDetails = () => {
  const { id } = useLocalSearchParams();
  const { styles, textColor, primaryColor, secondaryColor } = useTheme();

  const [selectedOption, setSelectedOption] = useState<string>("homeTeam");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  const [homeDetails, setHomeDetails] = useState({});
  const [awayDetails, setAwayDetails] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameSummary = async () => {
      try {
        const response = await getGameSummary(id);
        setHomeDetails(response.home);
        setAwayDetails(response.away);
        setLoading(false);
      } catch (error) {
        console.error("Error Box Scores:", error);

        // Error Code 403: QPS Limit Exceeded
        // Retry fetching box scores after 2 seconds (QPS limit for SportRadar API is 1 request per second)
        // setTimeout(() => {
        fetchGameSummary();
        // }, 5000);
      }
    };

    fetchGameSummary();

    // Clean-up function (optional)
    return () => {
      // You can do any clean-up here if needed
    };
  }, []); // Empty dependency array means this effect runs only once, on component mount

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={secondaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.gameDetailsContainer}>
      {/* Game Summary */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBlockColor: "lightgray",
          marginVertical: 10,
        }}
      >
        <Text style={{ color: textColor }}>Team</Text>
        <View
          style={{
            width: 150,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Text style={{ color: textColor }}>Q1</Text>
          <Text style={{ color: textColor }}>Q2</Text>
          <Text style={{ color: textColor }}>Q3</Text>
          <Text style={{ color: textColor }}>Q4</Text>
          <Text style={{ color: textColor }}> F</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: textColor }}>
            {(homeDetails as { market: string }).market}{" "}
            {(homeDetails as { name: string }).name}
            <Text style={{ fontSize: 10, color: textColor }}> (home)</Text>
          </Text>
          <Text style={{ color: textColor }}>
            {(awayDetails as { market: string }).market}{" "}
            {(awayDetails as { name: string }).name}
            <Text style={{ fontSize: 10, color: textColor }}> (away)</Text>
          </Text>
        </View>
        <View>
          <View
            style={{
              width: 150,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {(homeDetails as { scoring: any[] }).scoring.map(
              (score: any, index: number) => (
                <Text key={index} style={{ color: textColor }}>
                  {score.points}
                </Text>
              )
            )}
            <Text style={{ color: textColor }}>
              {(homeDetails as { points: number }).points}
            </Text>
          </View>
          <View
            style={{
              width: 150,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {(awayDetails as { scoring: any[] }).scoring.map(
              (score: any, index: number) => (
                <Text style={{ color: textColor }} key={index}>
                  {score.points}
                </Text>
              )
            )}
            <Text style={{ color: textColor }}>
              {(awayDetails as { points: number }).points}
            </Text>
          </View>
        </View>
      </View>

      {/* Header with options */}
      <View style={styles.headerGameDetails}>
        <Text
          style={[
            styles.headerOption,
            selectedOption === "homeTeam" && styles.selectedOption,
          ]}
          onPress={() => handleSelectOption("homeTeam")}
        >
          Home Team
        </Text>
        <Text
          style={[
            styles.headerOption,
            selectedOption === "awayTeam" && styles.selectedOption,
          ]}
          onPress={() => handleSelectOption("awayTeam")}
        >
          Away Team
        </Text>
        <Text
          style={[
            styles.headerOption,
            selectedOption === "teamOverall" && styles.selectedOption,
          ]}
          onPress={() => handleSelectOption("teamOverall")}
        >
          Team Overall
        </Text>
      </View>

      {/* Display selected stats */}
      {selectedOption === "homeTeam" && (
        <TeamPlayerStats teamDetails={homeDetails} />
      )}
      {selectedOption === "awayTeam" && (
        <TeamPlayerStats teamDetails={awayDetails} />
      )}
      {selectedOption === "teamOverall" && (
        <TeamOverallStats homeDetails={homeDetails} awayDetails={awayDetails} />
        // <Text>Team Overall</Text>
      )}
    </View>
  );
};

const TeamPlayerStats = ({ teamDetails }: { teamDetails: any }) => {
  const { styles, textColor } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.teamRow}>
        <View>
          <Text style={{ color: textColor }}>Player</Text>
        </View>
        <View
          style={{
            width: 125,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: textColor }}>Min</Text>
          <Text style={{ color: textColor }}>Reb</Text>
          <Text style={{ color: textColor }}>Ast</Text>
          <Text style={{ color: textColor }}>Pts</Text>
        </View>
      </View>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={teamDetails.players}
        keyExtractor={(player) => player.id}
        renderItem={({ item: player }) => (
          <View style={styles.playerRow}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ color: textColor }}>{player.jersey_number}</Text>
              <Text style={{ color: textColor }}>{player.full_name}</Text>
              <Text style={{ color: textColor }}>• {player.position}</Text>
            </View>
            <View
              style={{
                width: 125,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: textColor }}>
                {player.statistics.minutes}
              </Text>
              <Text style={{ color: textColor }}>
                {player.statistics.rebounds}
              </Text>
              <Text style={{ color: textColor }}>
                {player.statistics.assists}
              </Text>
              <Text style={{ color: textColor }}>
                {player.statistics.points}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const TeamOverallStats = ({
  homeDetails,
  awayDetails,
}: {
  homeDetails: any;
  awayDetails: any;
}) => {
  const { styles, textColor } = useTheme();

  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Image
          source={
            TeamLogos[
              `${homeDetails.market} ${homeDetails.name}` as keyof typeof TeamLogos
            ]
          }
          style={{ width: 50, height: 50 }}
        />
        <Text style={{ color: textColor }}>Team Stats</Text>
        <Image
          source={
            TeamLogos[
              `${awayDetails.market} ${awayDetails.name}` as keyof typeof TeamLogos
            ]
          }
          style={{ width: 50, height: 50 }}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {homeDetails.statistics.field_goals_made} /{" "}
          {homeDetails.statistics.field_goals_att}
        </Text>
        <Text style={styles.text}>Field Goals</Text>
        <Text style={styles.text}>
          {awayDetails.statistics.field_goals_made} /{" "}
          {awayDetails.statistics.field_goals_att}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {(
            homeDetails.statistics.field_goals_made /
            homeDetails.statistics.field_goals_att
          ).toFixed(2)}
        </Text>
        <Text style={styles.text}>Field Goal %</Text>
        <Text style={styles.text}>
          {(
            awayDetails.statistics.field_goals_made /
            awayDetails.statistics.field_goals_att
          ).toFixed(2)}
        </Text>
      </View>

      <View style={{ height: 20 }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {homeDetails.statistics.three_points_made} /{" "}
          {homeDetails.statistics.three_points_att}
        </Text>
        <Text style={styles.text}>3-Point Field Goals</Text>
        <Text style={styles.text}>
          {awayDetails.statistics.three_points_made} /{" "}
          {awayDetails.statistics.three_points_att}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {(
            homeDetails.statistics.three_points_made /
            homeDetails.statistics.three_points_att
          ).toFixed(2)}
        </Text>
        <Text style={styles.text}>3-Point Field Goal %</Text>
        <Text style={styles.text}>
          {(
            awayDetails.statistics.three_points_made /
            awayDetails.statistics.three_points_att
          ).toFixed(2)}
        </Text>
      </View>

      <View style={{ height: 20 }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {homeDetails.statistics.free_throws_made} /{" "}
          {homeDetails.statistics.free_throws_att}
        </Text>
        <Text style={styles.text}>Free Throws</Text>
        <Text style={styles.text}>
          {awayDetails.statistics.free_throws_made} /{" "}
          {awayDetails.statistics.free_throws_att}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {(
            homeDetails.statistics.free_throws_made /
            homeDetails.statistics.free_throws_att
          ).toFixed(2)}
        </Text>
        <Text style={styles.text}>Free Throw %</Text>
        <Text style={styles.text}>
          {(
            awayDetails.statistics.free_throws_made /
            awayDetails.statistics.free_throws_att
          ).toFixed(2)}
        </Text>
      </View>

      <View style={{ height: 20 }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {homeDetails.statistics.offensive_rebounds +
            homeDetails.statistics.defensive_rebounds}
        </Text>
        <Text style={styles.text}>Total Rebounds</Text>
        <Text style={styles.text}>
          {awayDetails.statistics.offensive_rebounds +
            awayDetails.statistics.defensive_rebounds}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {homeDetails.statistics.offensive_rebounds}
        </Text>
        <Text style={styles.text}>Offensive Rebounds</Text>
        <Text style={styles.text}>
          {awayDetails.statistics.offensive_rebounds}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {homeDetails.statistics.defensive_rebounds}
        </Text>
        <Text style={styles.text}>Defensive Rebounds</Text>
        <Text style={styles.text}>
          {awayDetails.statistics.defensive_rebounds}
        </Text>
      </View>

      <View style={{ height: 20 }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>{homeDetails.statistics.assists}</Text>
        <Text style={styles.text}>Assists</Text>
        <Text style={styles.text}>{awayDetails.statistics.assists}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>{homeDetails.statistics.blocks}</Text>
        <Text style={styles.text}>Blocks</Text>
        <Text style={styles.text}>{awayDetails.statistics.blocks}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>{homeDetails.statistics.steals}</Text>
        <Text style={styles.text}>Steals</Text>
        <Text style={styles.text}>{awayDetails.statistics.steals}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>{homeDetails.statistics.team_turnovers}</Text>
        <Text style={styles.text}>Turnovers</Text>
        <Text style={styles.text}>{awayDetails.statistics.team_turnovers}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          {homeDetails.statistics.points_in_paint}
        </Text>
        <Text style={styles.text}>Points in Paint</Text>
        <Text style={styles.text}>
          {awayDetails.statistics.points_in_paint}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>{homeDetails.statistics.personal_fouls}</Text>
        <Text style={styles.text}>Personal Fouls</Text>
        <Text style={styles.text}>{awayDetails.statistics.personal_fouls}</Text>
      </View>

    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 10,
//   },
//   headerOption: {
//     backgroundColor: "lightgray",
//     padding: 5,
//     color: "black",
//   },
//   selectedOption: {
//     color: "green",
//   },
//   playerRow: {
//     flexDirection: "row",
//     height: 40,
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: "lightgray",
//   },
//   teamRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: "lightgray",
//   },
// });

export default GameDetails;
