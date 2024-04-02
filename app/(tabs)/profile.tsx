import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";

// Styles
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";

// Components
import Seperator from "@/components/Seperator";

const Page = () => {
  const { styles, primaryColor, secondaryColor, textColor } = useTheme();
  const { signOut } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  // Update Clerk user data
  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  // Capture image from camera roll
  // Upload to Clerk as avatar
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <SignedIn>
        <Link href={'/(modals)/settings'} asChild>
          <Ionicons name="settings-outline" color={secondaryColor} size={26} />
        </Link>
        </SignedIn>
       
      </View>

      {user && (
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.profileAvatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {!edit && (
              <View style={styles.profileEditRow}>
                <Text style={{ fontSize: 22, color: primaryColor, fontWeight: 'bold' }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name="create-outline" size={24} color={primaryColor} />
                </TouchableOpacity>
              </View>
            )}
            {edit && (
              <View style={styles.profileEditRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName || ''}
                  onChangeText={setFirstName}
                  style={[styles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ''}
                  onChangeText={setLastName}
                  style={[styles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={primaryColor} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={{color: primaryColor}}>{email}</Text>
          <Text style={{color: primaryColor}}>Since {user?.createdAt!.toLocaleDateString()}</Text>
        </View>
      )}

      <SignedIn>
        <Button title="Log Out" onPress={() => signOut()} color={textColor} />
      </SignedIn>

      <SignedOut>
        <Link href={'/(modals)/login'} asChild>
          <Button title="Log In" color={textColor} />
        </Link>
        
        <Seperator placeholder="or" />

        <Link href={'/(modals)/signup'} asChild>
          <Button title="Sign Up" color={textColor} />
        </Link>
      </SignedOut>


    </SafeAreaView>
  );
};


export default Page;