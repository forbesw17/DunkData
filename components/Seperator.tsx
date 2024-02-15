import TeamColors from '@/constants/TeamColors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Seperator = ({ placeholder }: { placeholder: string }) => {
    
    return (
        <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: TeamColors.default.text,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>{placeholder}</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: TeamColors.default.text,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
    );
}


const styles = StyleSheet.create({
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
      },
      seperator: {
        color: TeamColors.default.text,
        fontSize: 16,
      },
});


export default Seperator;