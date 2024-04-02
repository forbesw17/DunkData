import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useTheme } from "@/providers/ThemeProvider";

export default function SignUpScreen() {
  const router = useRouter();
  const { styles, secondaryColor, textColor } = useTheme();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    // check if clerk is loaded.
    if (!isLoaded) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].message);
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      router.back();
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.userAuthContainer}>
      {!pendingVerification && (
        <View style={{ gap: 20 }}>
          <TextInput
            style={styles.inputField}
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name"
            placeholderTextColor={textColor}
            onChangeText={(firstName) => setFirstName(firstName)}
          />

          <TextInput
            style={styles.inputField}
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor={textColor}
            onChangeText={(lastName) => setLastName(lastName)}
          />

          <TextInput
            style={styles.inputField}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            placeholderTextColor={textColor}
            onChangeText={(email) => setEmailAddress(email)}
          />

          <TextInput
            style={styles.inputField}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={textColor}
            onChangeText={(password) => setPassword(password)}
          />

          <TextInput
            style={styles.inputField}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor={textColor}
            secureTextEntry={true}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          />

          {password !== confirmPassword && (
            <Text style={{ color: textColor, fontWeight: 'bold' }}>Passwords do not match</Text>
          )}

          <Text style={{ color: secondaryColor }}>
            - Password must be 8 characters in length
          </Text>

          <TouchableOpacity style={styles.btn} onPress={onSignUpPress}>
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>

          <Text style={{ color: secondaryColor }}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </Text>

          <Button
            title="Already have an account?"
            onPress={() => router.replace("/(modals)/login")}
            color={secondaryColor}
          />
        </View>
      )}
      {pendingVerification && (
        <View style={{ gap: 20 }}>
          <Text style={{ color: secondaryColor, fontWeight: 'bold' }}>
            A verification code has been sent to your email.
          </Text>
          <View>
            <TextInput
              value={code}
              placeholder="Code"
              onChangeText={(code) => setCode(code)}
              style={styles.inputField}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={onPressVerify}>
            <Text style={styles.btnText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
