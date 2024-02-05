import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// Global Styles
// import { colors } from "../styles/AppStyles";

interface CustomButtonProps {
  title: string;
  bgColor?: string;
  textColor?: string;
  size?: "large" | "medium" | "small";
  borderPresent?: boolean;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  bgColor,
  textColor,
  size,
  borderPresent,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgColor },
        size === "medium"
          ? { minWidth: "50%" }
          : size === "small"
          ? { minWidth: "auto" }
          : { minWidth: "100%" },
        borderPresent ? { borderWidth: 1, borderColor: `${textColor}` } : {},
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          textColor ? { color: textColor } : { color: "white" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: colors.bgSecondary,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    // minWidth: "100%",
    height: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
