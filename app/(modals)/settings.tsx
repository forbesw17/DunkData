import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useUser } from "@clerk/clerk-expo";

// Constants
import TeamColors from "@/constants/TeamColors";

// Components
import ThemeSelection from "@/components/ThemeSelection";
import SwitchSelection from "@/components/SwitchSelection";

const Settings = () => {
  const { user } = useUser();

  const [notificationsEnabled, setNotificationEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false); 
  const [themeSelection, setThemeSelection] = useState("default");

  console.log("Notifications Enabled: ", notificationsEnabled);
  console.log("Dark Mode Enabled: ", darkModeEnabled);
  console.log("Theme Selected: ", themeSelection);

  const updateSettings = () => {
    // Update user settings
    user?.update({
      unsafeMetadata: {
        notificationsEnabled,
        darkModeEnabled,
        theme: themeSelection,
      },
    });
    
    console.log("Settings updated!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.settingLabel}>Enable notifications</Text>
        <SwitchSelection onSelectionChange={setNotificationEnabled} />
      </View>

      <View style={styles.group}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <SwitchSelection onSelectionChange={setDarkModeEnabled} />
      </View>

      <>
        <Text style={styles.settingLabel}>Select your theme</Text>
        <ThemeSelection selectedValue={themeSelection} onSelectionChange={setThemeSelection} />
      </>

      <Pressable style={styles.buttonContainer} onPress={updateSettings}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TeamColors.default.primaryColor,
    padding: 20,
    gap: 20,
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  themeSelectionContainer: {
    backgroundColor: TeamColors.default.secondaryColor,
    // borderWidth: 1,
    borderRadius: 15,
    // borderColor: TeamColors.default.text,
    padding: 10,
  },
  settingLabel: {
    color: TeamColors.default.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: TeamColors.default.secondaryColor,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: TeamColors.default.text,
    fontSize: 20,
  },
});

export default Settings;
