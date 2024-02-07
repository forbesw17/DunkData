import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Seperator = ({ placeholder }: { placeholder: string }) => {
    
    return (
        <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>{placeholder}</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
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
        color: 'gray',
        fontSize: 16,
      },
});


export default Seperator;