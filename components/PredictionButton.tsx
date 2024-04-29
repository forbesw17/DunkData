import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type PredictionButtonProps = {
    winningTeam: string;
    losingTeam: string;
    children: React.ReactNode;
};

const PredictionButton: React.FC<PredictionButtonProps> = ({ children, winningTeam, losingTeam }) => {
    const { styles } = useTheme();
    const [buttonPressed, setButtonPressed] = useState(false);
    const [pickedTeam, setPickedTeam] = useState<string | null>(null);

    const handleHomePress = () => {
        Alert.alert(
            "Confirm Pick",
            `Are you sure you want to pick ${winningTeam} to win?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", 
                    onPress: () => {
                        Alert.alert(`${winningTeam} picked to win`);
                        setButtonPressed(true);
                        setPickedTeam('winning');
                    } 
                }
            ]
        );
    };

    const handleAwayPress = () => {
        Alert.alert(
            "Confirm Pick",
            `Are you sure you want to pick ${losingTeam} to win?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", 
                    onPress: () => {
                        Alert.alert(`${losingTeam} picked to win`);
                        setButtonPressed(true);
                        setPickedTeam('losing');
                    } 
                }
            ]
        );
    };

    // Function to determine button style based on which team is picked
    const getButtonStyle = (team: string) => ({
        ...styles2.button,
        opacity: !buttonPressed || pickedTeam === team ? 1 : 0.5, // Full opacity for the picked team or if no team is picked yet
    });

    return (
        <View style={styles.boxscoreContainer}>
            <TouchableOpacity 
                style={getButtonStyle('winning')}
                onPress={handleHomePress}
                disabled={buttonPressed}
            >
                <Text style={styles2.text}>{pickedTeam === 'winning' ? 'Picked' : 'Pick'}</Text>
            </TouchableOpacity>

            {children}

            <TouchableOpacity
                style={getButtonStyle('losing')}
                onPress={handleAwayPress}
                disabled={buttonPressed}
            >
                <Text style={styles2.text}>{pickedTeam === 'losing' ? 'Picked' : 'Pick'}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PredictionButton;

const styles2 = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        height: '25%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1,
    },
    text: {
        color: 'white',
        
    },
});
