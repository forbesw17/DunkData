
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TeamColors from "@/constants/TeamColors";

interface ThemeSelectionProps {
  selectedValue: string;
  onSelectionChange: (theme: string) => void;
}

const ThemeSelection: React.FC<ThemeSelectionProps> = ({ selectedValue, onSelectionChange }) => {  

return (
    <View style={styles.container}>
      <View style={styles.themeSelectionContainer}>
        {/* <Text style={styles.settingLabel}>Select a theme</Text> */}
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => onSelectionChange(itemValue)}
          selectionColor={TeamColors.default.primaryColor}
        >
          {Object.entries(TeamColors).map(([key, value]) => {
            return (
              <Picker.Item
                key={key}
                label={key}
                value={key}
                color={TeamColors[key as keyof typeof TeamColors].primaryColor}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeSelectionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
  },
  settingLabel: {
    color: TeamColors.default.primaryColor,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ThemeSelection;