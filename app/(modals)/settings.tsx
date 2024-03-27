import React, { useState } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TeamColors from "@/constants/TeamColors";

const Settings = () => {
  // const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  // const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState("java");

  // const handleNotificationsToggle = () => {
  //     setNotificationsEnabled(!notificationsEnabled);
  // };

  // const handleDarkModeToggle = () => {
  //     setDarkModeEnabled(!darkModeEnabled);
  // };

  return (
    <View style={styles.container}>

    <View style={styles.themeSelectionContainer} >
      <Text style={styles.settingLabel}>Select a theme</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        selectionColor={TeamColors.default.primaryColor}
      >
        {Object.entries(TeamColors).map(([key, value]) => {
            return (
                <Picker.Item
                key={key}
                label={key}
                value={value.primaryColor + value.secondaryColor}
                color={TeamColors.default.primaryColor}
                />
            );
        }
        )}
      </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TeamColors.default.primaryColor,
    padding: 20,
  },
  themeSelectionContainer: {
    backgroundColor: TeamColors.default.secondaryColor,
    // borderWidth: 1,
    borderRadius: 15,
    // borderColor: TeamColors.default.text,
    padding: 10,
  },
  settingLabel: {
    color: TeamColors.default.primaryColor,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Settings;
