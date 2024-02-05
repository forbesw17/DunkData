import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface DividerProps {
  placeholder?: string;
}

const Divider: React.FC<DividerProps> = ({ placeholder }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>

      {/** This is the line that is the divider */}
      <View style={{ flex: 1, height: 0.4, backgroundColor: "white" }} />

      {/** This is the text in the middle */}
      <Text
        style={{
          flexDirection: "row",
          width: 100,
          textAlign: "center",
          color: "white",
        }}
      >
        {placeholder}
      </Text>

      {/** This is the line that is the divider */}
      <View style={{ flex: 1, height: 0.4, backgroundColor: "white" }} />
    </View>
  );
};

export default Divider;
