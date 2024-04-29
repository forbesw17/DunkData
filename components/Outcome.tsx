import React, { useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { StyleSheet } from 'react-native';

import { TeamLogos } from "./TeamLogos";
import Colors from "@/constants/Colors";
import TeamColors from "@/constants/TeamColors";

interface DynamicContentProps {
    home: string;
    //homeImg: string;
    away: string;
    //awayImg: string;
    prediction: number;
}

export const DynamicContent = ({ home, away, prediction}: DynamicContentProps) => {
    const isHomeWinner = prediction === 1;

    return (
            <View style={styles.gameContainer}>
            <View style={styles.teamContainer}>
                <Text style={[styles.teamText, isHomeWinner ? styles.textWinner : styles.textLoser]}>{home}</Text>
                <Image source={TeamLogos[home as keyof typeof TeamLogos]} style={styles.teamLogo} />
            </View>
            <View style={styles.teamContainer}>
                <Text style={[styles.teamText, !isHomeWinner ? styles.textWinner : styles.textLoser]}>{away}</Text>
                <Image source={TeamLogos[away as keyof typeof TeamLogos]} style={styles.teamLogo} />
            </View>
        </View>
    )
    } 
        // return (
        //     <View style={styles.gameContainer}>
        //         <View style={styles.winnerContainer}>
        //             <Text style= {styles.text}>{away}</Text>
        //             <Image source={TeamLogos[away as keyof typeof TeamLogos]} style={styles.winnerImage} />
        //         </View>
              
        //         <View style={styles.loserContainer}>
        //             <Image source={TeamLogos[home as keyof typeof TeamLogos]} style={styles.loserImage} />
        //             <Text style= {styles.text}>{home}</Text>
        //         </View>
              
        //     </View>
        //   );
    
  


const styles = StyleSheet.create({
    gameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
        padding: 20,
        borderRadius: 10,
        marginVertical: 8,
    },
    teamContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    teamText: {
        fontSize: 18,
        fontWeight: 'bold',
        
        marginBottom: 5,
    },
    teamLogo: {
        width: 80,
        height: 80,
        borderRadius: 40, 
    },
    textWinner: {
        color: 'green', 
    },
    textLoser: {
        color: 'red', 
    }
});




export default DynamicContent;

