import React from "react";
import { Link } from "expo-router";
import { StyleSheet, Pressable, Text } from "react-native";

interface CustomLinkProps {
  href: any;
  text: string;
  bgColor?: string;
  textColor?: string;
  size?: "large" | "medium" | "small";
  borderPresent?: boolean;
  onPress?: () => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  text,
  bgColor,
  textColor,
  size,
  borderPresent,
  onPress,
}) => {
  return (
    <Link
      replace
      href={href}
      asChild
      style={[
        styles.buttonBase,
        {
          backgroundColor: bgColor,
          borderWidth: borderPresent ? 2 : 0,
          borderColor: borderPresent ? "#063f5a" : bgColor,
          minWidth:
            size === "medium" ? "50%" : size === "small" ? "auto" : "100%",
        },
      ]}
    >
      <Pressable>
        <Text
          style={[
            styles.buttonText,
            { color: textColor ? textColor : "white" },
          ]}
        >
          {text}
        </Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    // backgroundColor: "#063f5a",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomLink;
