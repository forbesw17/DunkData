import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import Seperator from "@/components/Seperator";
import { useTheme } from "@/providers/ThemeProvider";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

export default function Page() {
  useWarmUpBrowser();
  const { styles, secondaryColor, textColor } = useTheme();
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn()
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({strategy: "oauth_facebook" });

  // start the sign in process.
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      router.back();

    } catch (err: any) {
      console.log(err);
      Alert.alert("Error", err.errors[0].message);
    }
  };

  // This function is called when the user selects a social auth provider.
  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View style={styles.userAuthContainer}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        placeholderTextColor={textColor}
        onChangeText={(email) => setEmailAddress(email)}
        style={[styles.inputField, { marginBottom: 20 }]}
      />

      <TextInput
        autoCapitalize="none"
        value={password}
        placeholder="Password"
        placeholderTextColor={textColor}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={[styles.inputField, { marginBottom: 20 }]}
      />

      <TouchableOpacity style={styles.btn} onPress={onSignInPress}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>

      <Seperator placeholder="or" />

      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons name="logo-apple" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="logo-google"
            size={24}
            color={'#DB4437'}
            style={styles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            color={'#3b5998'}
            style={styles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oppositeBtn} onPress={() => router.replace("/(modals)/signup")}>
            <Text style={styles.oppositeBtnText}>Don't have an account?</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
