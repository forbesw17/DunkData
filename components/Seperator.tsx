import TeamColors from '@/constants/TeamColors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

const Seperator = ({ placeholder }: { placeholder: string }) => {
    const { styles, textColor } = useTheme();
    return (
        <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: textColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>{placeholder}</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: textColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
    );
}


export default Seperator;