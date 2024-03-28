import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <FontAwesome
        name="search"
        size={20}
        color="black"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={"#333"}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        value={searchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: '75%',
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  searchIcon: {
    marginRight: 10,
  },
});

export default SearchBar;