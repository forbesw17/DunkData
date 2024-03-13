import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";

// Styles
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

// Components
import Seperator from "@/components/Seperator";
import TeamColors from "@/constants/TeamColors";

const Page = () => {
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
    <SafeAreaView style={defaultStyles.container}>
      <View style={defaultStyles.headerContainer}>
        <Text style={defaultStyles.header}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" color={'white'} size={26} />
        </TouchableOpacity>
      </View>

      {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {!edit && (
              <View style={styles.editRow}>
                <Text style={{ fontSize: 22, color: TeamColors.default.primaryColor, fontWeight: 'bold' }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name="create-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
            {edit && (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName || ''}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ''}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={{color: TeamColors.default.primaryColor}}>{email}</Text>
          <Text style={{color: TeamColors.default.primaryColor}}>Since {user?.createdAt!.toLocaleDateString()}</Text>
        </View>
      )}

      <SignedIn>
        <Button title="Log Out" onPress={() => signOut()} color={TeamColors.default.text} />
      </SignedIn>

      <SignedOut>
        <Link href={'/(modals)/login'} asChild>
          <Button title="Log In" color={TeamColors.default.text} />
        </Link>
        
        <Seperator placeholder="or" />

        <Link href={'/(modals)/signup'} asChild>
          <Button title="Sign Up" color={TeamColors.default.text} />
        </Link>
      </SignedOut>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: TeamColors.default.secondaryColor,
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});

export default Page;