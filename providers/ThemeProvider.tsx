import React, { createContext, useContext } from "react";
import { StyleSheet } from "react-native";
import TeamColors from "@/constants/TeamColors";
import Colors from "@/constants/Colors";

import { useUser } from "@clerk/clerk-react";

// interface User {
//   unsafeMetadata?: {
//     theme?: string;
//   };
// }

const getDefaultStyles = (theme: string, darkMode: boolean) => {
  const themeColors = TeamColors[theme as keyof typeof TeamColors];

  let primaryColor;
  let secondaryColor;
  let textColor;

  if (darkMode) {
    primaryColor = themeColors.dark.primaryColor;
    secondaryColor = themeColors.dark.secondaryColor;
    textColor = themeColors.dark.text;
  } else {
    primaryColor = themeColors.light.primaryColor;
    secondaryColor = themeColors.light.secondaryColor;
    textColor = themeColors.light.text;
  }

  const styles =  StyleSheet.create({
    // Constants

    tabBarStyle: {
      backgroundColor: primaryColor,
      borderTopColor: secondaryColor
    },
    safeAreaView: {
      flex: 1,
      backgroundColor: secondaryColor,
    },
    container: {
      flex: 1,
      backgroundColor: primaryColor,
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
      color: secondaryColor,
    },

    // Auth.tsx

    inputField: {
      color: textColor,
      height: 44,
      borderWidth: 1,
      borderColor: textColor,
      borderRadius: 8,
      padding: 10,
    },
    btn: {
      backgroundColor: secondaryColor,
      height: 50,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    btnText: {
      color: primaryColor,
      fontSize: 16,
    },
    oppositeBtn: {
      backgroundColor: primaryColor,
      height: 50,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    oppositeBtnText: {
      color: secondaryColor,
      fontSize: 16,
    },
    btnIcon: {
      position: "absolute",
      left: 16,
    },
    btnOutline: {
      backgroundColor: "#fff",
      // borderWidth: 1,
      // borderColor: "gray",
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
      color: textColor,
    },

    // HomeTopTabs.tsx
    topTabsContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    topTabsTab: {
      width: 95,
      alignItems: "center",
      padding: 5,
    },
    topTabActive: {
      borderBottomColor: Colors.primary,
      borderBottomWidth: 1,
    },
    topTabText: {
      color: secondaryColor,
      fontWeight: "bold",
      fontSize: 14,
    },
    topTabAvatar: {
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: Colors.grey,
    },

    // LatestNews.tsx
    articleContainer: {
      flexDirection: "column",
      // backgroundColor: secondaryColor,
      borderRadius: 15,
      marginBottom: 15,
    },
    articleTitle: {
      color: textColor,
      fontSize: 16,
      fontWeight: "bold",
    },

    // DateScrollBar.tsx
    dateScrollBarContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    date: {
      marginHorizontal: 5,
      color: textColor,
      borderWidth: 1,
      borderColor: secondaryColor,
      borderRadius: 10,
      padding: 10,
    },
    currentDate: {
      fontWeight: "bold",
    },

    // Schedule.tsx

    gameListContainer: {
      borderColor: secondaryColor,
      borderBottomWidth: 1,
      marginVertical: 5,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    gameContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    teamsAndTimeContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    teamsContainer: {
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    teamContainer: {
      alignItems: "center",
      width: 90,
      height: 100,
    },
    time: {
      alignItems: "center",
      gap: 10,
    },
    teamLogo: {
      height: 70,
      width: 70,
    },
    finalScore: {
      fontSize: 30,
      fontWeight: "bold",
    },

    homeAwayText: {
      color: textColor,
      fontSize: 9,
      fontWeight: "bold",
    },
    teamNameText: {
      color: textColor,
      fontSize: 10,
      textAlign: "center",
      fontWeight: "bold",
    },
    vsText: {
      fontSize: 15,
      color: textColor,
      fontWeight: "bold",
    },

    // BoxScore.tsx
    boxscoreContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    boxScoreText: {
      color: textColor,
      fontSize: 30,
      fontWeight: "bold",
    },

    // SearchBar.tsx
    searchBarContainer: {
      flexDirection: "row",
      width: '75%',
      backgroundColor: textColor,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 20,
    },
    searchBarInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 14,
      color: primaryColor,
    },
    searchBarIcon: {
      marginRight: 10,
    },

    // Standings.tsx
    standingsContainer: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: primaryColor,
    },
    standingsConference: {
      fontSize: 20,
      fontWeight: 'bold',
      color: secondaryColor,
      marginTop: 10,
    },
    standingsDivision: {
      fontSize: 18,
      fontWeight: '600',
      color: textColor,
      marginTop: 8,
    },
    standingsTeam: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginTop: 5,
      backgroundColor: '#FFF',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },

    // Profile.tsx
    profileCard: {
      backgroundColor: secondaryColor,
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
    profileAvatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: Colors.grey,
    },
    profileEditRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },

    // Settings.tsx
    settingsContainer: {
      flex: 1,
      backgroundColor: primaryColor,
      padding: 20,
      gap: 20,
    },
    settingsGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    settingLabel: {
      color: textColor,
      fontSize: 20,
      fontWeight: "bold",
    },
    settingsButtonContainer: {
      backgroundColor: secondaryColor,
      padding: 10,
      borderRadius: 15,
      alignItems: "center",
      marginBottom: 40,
    },
    settingsButtonText: {
      color: primaryColor,
      fontSize: 20,
    },

    // ThemeSelection.tsx

    themeSelectionContainer: {
      backgroundColor: "white",
      borderRadius: 15,
    },

    // Seperator.tsx

    seperatorView: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      marginVertical: 30,
      paddingHorizontal: 20,
    },
    seperator: {
      color: textColor,
      fontSize: 16,
    },
  });
  return { styles, primaryColor, secondaryColor, textColor };
};

const ThemeContext = createContext(getDefaultStyles("default", false));

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const theme = user?.unsafeMetadata?.theme || "default";
  const darkMode = user?.unsafeMetadata?.darkModeEnabled || false;

  console.log("theme", theme);
  console.log("darkMode", darkMode);

  return (
    <ThemeContext.Provider
      value={getDefaultStyles(theme as string, darkMode as boolean)}
    >
      {children}
    </ThemeContext.Provider>
  );
};
