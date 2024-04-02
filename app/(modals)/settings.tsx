import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useTheme } from "@/providers/ThemeProvider";

// Components
import ThemeSelection from "@/components/ThemeSelection";
import SwitchSelection from "@/components/SwitchSelection";

const Settings = () => {
  const { user } = useUser();
  const { styles } = useTheme();

  const [notificationsEnabled, setNotificationEnabled] = useState(user?.unsafeMetadata?.notificationsEnabled || false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(user?.unsafeMetadata?.darkModeEnabled || false); 
  const [themeSelection, setThemeSelection] = useState(user?.unsafeMetadata?.theme || "default");

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
    <View style={styles.settingsContainer}>
      <View style={styles.settingsGroup}>
        <Text style={styles.settingLabel}>Enable notifications</Text>
        <SwitchSelection isEnabled={notificationsEnabled as boolean} onSelectionChange={setNotificationEnabled} />
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <SwitchSelection isEnabled={darkModeEnabled as boolean} onSelectionChange={setDarkModeEnabled} />
      </View>

      <>
        <Text style={styles.settingLabel}>Select your theme</Text>
        <ThemeSelection selectedValue={themeSelection as string} onSelectionChange={setThemeSelection} />
      </>

      <Pressable style={styles.settingsButtonContainer} onPress={updateSettings}>
        <Text style={styles.settingsButtonText}>Save Settings</Text>
      </Pressable>

    </View>
  );
};

export default Settings;
