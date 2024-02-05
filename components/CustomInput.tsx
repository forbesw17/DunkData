import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

interface CustomInputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            style={styles.input} 
            secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        minWidth: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 35,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default CustomInput;
