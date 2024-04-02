
import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TeamColors from "@/constants/TeamColors";
import { useTheme } from "@/providers/ThemeProvider";

interface ThemeSelectionProps {
  selectedValue: string;
  onSelectionChange: (theme: string) => void;
}

const ThemeSelection: React.FC<ThemeSelectionProps> = ({ selectedValue, onSelectionChange }) => {  

  const { styles , primaryColor, textColor } = useTheme();
return (
    <View>
      <View style={styles.themeSelectionContainer}>
        {/* <Text style={styles.settingLabel}>Select a theme</Text> */}
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => onSelectionChange(itemValue)}
          selectionColor={TeamColors.default.light.primaryColor}
        >
          {Object.entries(TeamColors).map(([key, value]) => {
            return (
              <Picker.Item
                key={key}
                label={key}
                value={key}
                color={"black"}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  themeSelectionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
  },
  settingLabel: {
    color: TeamColors.default.light.primaryColor,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ThemeSelection;