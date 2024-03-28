import React, { createContext, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import TeamColors from "@/constants/TeamColors";
import Colors from "@/constants/Colors";

import { useUser } from "@clerk/clerk-react";

// Define your default styles function that takes a user object as parameter
interface Theme {
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
}

interface User {
  unsafeMetadata?: {
    theme?: string;
  };
  theme?: Theme;
}

const getDefaultStyles = (user: User) => {
console.log("User: ", user);

const themeSelected = user.unsafeMetadata?.theme || "default";
const primaryColor = TeamColors[themeSelected as keyof typeof TeamColors].primaryColor;
const secondaryColor = TeamColors[themeSelected as keyof typeof TeamColors].secondaryColor;
const text = TeamColors['default'].text;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: primaryColor,
      // paddingHorizontal: 10,
    },
    userAuthContainer: {
      flex: 1,
      backgroundColor: primaryColor,
      padding: 20,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: text,
    },
    inputField: {
      color: text,
      height: 44,
      borderWidth: 1,
      borderColor: "#ABABAB",
      borderRadius: 8,
      padding: 10,
    },
    btn: {
      backgroundColor: secondaryColor || TeamColors.default.secondaryColor,
      height: 50,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    btnText: {
      color: "#fff",
      fontSize: 16,
    },
    btnIcon: {
      position: "absolute",
      left: 16,
    },
    btnOutline: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "gray",
      height: 50,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      paddingHorizontal: 10,
    },
    btnOutlineText: {
      color: "#000",
      fontSize: 16,
    },
    footer: {
      position: "absolute",
      height: 100,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderTopColor: Colors.grey,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    text: {
      color: text,
    },
  });
};

// Create a context to hold the styles
const ThemeContext = createContext(getDefaultStyles);

// Create a custom hook to access the theme
export const useTheme = () => useContext(ThemeContext);

// Create a context to hold the styles
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  return (
    <ThemeContext.Provider value={getDefaultStyles}>
      {children}
    </ThemeContext.Provider>
  );
};
