
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getStandings } from '@/server/SportRadarAPI';

import TeamColors from '@/constants/TeamColors';



const Standings = () => {

    type TeamData = {
      name: string;
      wins: number;
      losses: number;
      win_pct: number;
      calc_rank: number;
    };
    type StandingsType = Record<string, Record<string, TeamData[]>>;

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
        }
      };
  
      fetchStandings();
    }, []);
  
    return (
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          Object.keys(standings).map((conference) => (
            <View key={conference}>
              <Text style={styles.conference}>{conference}</Text>
              {Object.keys(standings[conference]).map((division) => (
                <View key={division}>
                  <Text style={styles.division}>{division}</Text>
                  {standings[conference][division].map((team: TeamData) => (
                    <View key={team.name} style={styles.team}>
                      <Text>{team.name}</Text>
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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: TeamColors.default.primaryColor,
    },
    conference: {
      fontSize: 20,
      fontWeight: 'bold',
      color: TeamColors.default.secondaryColor,
      marginTop: 10,
    },
    division: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
      marginTop: 8,
    },
    team: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginTop: 5,
      backgroundColor: '#FFF',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
  });

  export default Standings;