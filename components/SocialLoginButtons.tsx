
import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

const SignInWithGoogle = () => {
    console.log('Signing in with Google...');
};

const SignInWithFacebook = () => {
    console.log('Signing in with Facebook...');
};

const SignInWithApple = () => {
    console.log('Signing in with Apple...');
};


const SocialLoginButtons: React.FC = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={SignInWithGoogle} style={styles.buttonContainer} >
                <Image source={require('../assets/images/icons/google.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={SignInWithFacebook} style={styles.buttonContainer} >
                <Image source={require('../assets/images/icons/facebook.png')} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={SignInWithApple} style={styles.buttonContainer} > 
                <Image source={require('../assets/images/icons/apple.png')} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        flexDirection: 'row',
        // backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'space-around',
    },
    buttonContainer: {
        width: 60,
        height: 60,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SocialLoginButtons;
