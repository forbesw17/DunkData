
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

import { getStandings } from '@/server/SportRadarAPI';


type TeamData = {
  name: string;
  wins: number;
  losses: number;
  win_pct: number;
  calc_rank: number;
};
type StandingsType = Record<string, Record<string, TeamData[]>>;

const Standings = () => {

    const { styles, secondaryColor } = useTheme();
    const [standings, setStandings] = useState<StandingsType>({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchStandings = async () => {
        try {
          const response = await getStandings();
  
          const teamsData: Record<string, Record<string, TeamData[]>> = {};
          // Parse the response data into a more readable format for the standings
          for (let i = 0; i < response.conferences.length; i++) {
            teamsData[response.conferences[i].name] = {};
          
            for (let j = 0; j < response.conferences[i].divisions.length; j++) {
              teamsData[response.conferences[i].name][response.conferences[i].divisions[j].name] = [];
          
              for (let k = 0; k < response.conferences[i].divisions[j].teams.length; k++) {
                const team = response.conferences[i].divisions[j].teams[k];
                teamsData[response.conferences[i].name][response.conferences[i].divisions[j].name].push({
                  name: team.market + " " + team.name,
                  wins: team.wins,
                  losses: team.losses,
                  win_pct: team.win_pct,
                  calc_rank: team.calc_rank,
                });
              }
            }
          }
  
          // console.log(JSON.stringify(teamsData, null, 2));
          setStandings(teamsData);
          setLoading(false);
  
        } catch (error) {
          console.error(error);

          // Retry fetching standings every 5 seconds
          setTimeout(() => fetchStandings(), 5000);
        }
      };
  
      fetchStandings();
    }, []);
  
    return (
      <View style={styles.standingsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={secondaryColor} />
        ) : (
          Object.keys(standings).map((conference) => (
            <View key={conference}>
              <Text style={styles.standingsConference}>{conference}</Text>
              {Object.keys(standings[conference]).map((division) => (
                <View key={division}>
                  <Text style={styles.standingsDivision}>{division}</Text>
                  {standings[conference][division].map((team: TeamData) => (
                    <View key={team.name} style={styles.standingsTeam}>
                      <Text style={{width: '50%'}}>{team.name}</Text>
                      <Text>{team.wins} - {team.losses}</Text>
                      <Text>{team.win_pct.toFixed(3)}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))
        )}
      </View>
    );
  };

  export default Standings;