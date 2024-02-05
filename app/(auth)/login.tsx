import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";

// Components
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import Divider from "@/components/Divider";
import CustomLink from "@/components/CustomLink";

export default function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = () => {
      // Perform login logic here
      console.log("Logging in...");
    };
  
    const handleRegister = () => {
      // Navigate to Register screen
      console.log("Navigating to Register screen...");
    }
  
    return (
      <ImageBackground
        source={require("../../assets/images/BackgroundSmall.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Welcome back!</Text>
  
          <CustomInput
            value={username}
            placeholder="Username"
            setValue={setUsername}
          />
          <CustomInput
            value={password}
            placeholder="Password"
            setValue={setPassword}
            secureTextEntry={true}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
          <CustomLink href="/forgot-password" text="Forgot password?" size="small" />
          </View>
  
          {/* <CustomButton title="Submit" bgColor="#063f5a" onPress={handleLogin} /> */}
          <CustomLink href="/one" text="Submit" bgColor="#063f5a" />
  
          <Divider placeholder="Or login with" />
          <SocialLoginButtons />

          {/* <CustomButton title="Don't have an account?" onPress={handleRegister} /> */}
          <CustomLink href="/signup" text="Don't have an account" />
        </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      gap: 12,
    },
    imageContainer: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 5,
        height: 10,
      },
      shadowOpacity: 0.3, // Adjust the opacity as needed
      shadowRadius: 4, // Adjust the radius as needed
      elevation: 6, // Required for Android shadow
      marginBottom: 0,
    },
    image: {
      width: 300,
      height: 300,
      resizeMode: 'cover'
    },
    title: {
      fontSize: 38,
      fontWeight: "bold",
      marginBottom: 16,
      color: "white",
      shadowColor: "#000000",
  
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.3, // Adjust the opacity as needed
      shadowRadius: 4, // Adjust the radius as needed
      elevation: 6, // Required for Android shadow
    },
    input: {
      width: "100%",
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    text: {
      marginTop: 16,
      color: "white",
    },
  });