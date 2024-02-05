import React from "react";

import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";

// Components
import CustomLink from "@/components/CustomLink";


export default function Page() {
  const handleLogin = () => {
    // Perform login logic here
    console.log("Heading to Login...");
  };

  const handleRegister = () => {
    // Perform register logic here
    console.log("Heading to Register...");
  };

  const handleGuest = () => {
    // Continue as a guest
    console.log("Continuing as a guest...");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundSmall.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/DDLogo.png")}
            style={styles.image}
          />
        </View>

        <Text style={styles.title}>Welcome to DunkData!</Text>
        <Text style={styles.subtitle}>
          Day-tuh... Dat-tuh what does it matter
        </Text>

        <CustomLink
          href="/login"
          text="Login"
          bgColor="white"
          textColor="#063f5a"
        />

        <CustomLink
          href="/signup"
          text="Register"
          bgColor="#063f5a"
          textColor="white"
        />

        <CustomLink href="/one" text="Continue as a guest?" size="small" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 12,
    // backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 16,
  },

  imageContainer: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.3, // Adjust the opacity as needed
    shadowRadius: 4, // Adjust the radius as needed
    elevation: 6, // Required for Android shadow
    marginBottom: 140,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
});
