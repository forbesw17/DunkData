import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";


// Components
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomLink from "@/components/CustomLink";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import Divider from "@/components/Divider";



export default function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignUp = () => {
    // Perform sign-up logic here
    console.log("Signing up...");

  };

  const handleLogin = () => {
    // Navigate to Login screen
    console.log("Navigating to Login screen...");
  };

  const handleForgotPassword = () => {
    // Navigate to Forgot Password screen
    console.log("Navigating to Forgot Password screen...");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundSmall.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Hello there, register to get started</Text>

        <CustomInput value={name} placeholder="Name" setValue={setName} />

        <CustomInput value={email} placeholder="Email" setValue={setEmail} />
        <CustomInput
          value={password}
          placeholder="Password"
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomInput
          value={passwordConfirm}
          placeholder="Confirm Password"
          setValue={setPasswordConfirm}
          secureTextEntry={true}
        />

        {/* <CustomLink href="/forgotPassword" text="Forgot Password?" /> */}

        {/* <CustomButton title="Submit" bgColor="#063f5a" onPress={handleSignUp} /> */}
        <CustomLink href="/one" text="Submit" bgColor="#063f5a" />
  

        <Divider placeholder="Or register with" />
        <SocialLoginButtons />

        {/* <CustomButton title="Already have an account?" onPress={handleLogin} /> */}
        <CustomLink href="/login" text="Already have an account?" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'gray',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 12,
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
    marginBottom: 0,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
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
