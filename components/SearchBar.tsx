import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "@/providers/ThemeProvider";

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { styles, primaryColor } = useTheme();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchBarContainer}>
      <FontAwesome
        name="search"
        size={20}
        color={primaryColor}
        style={styles.searchBarIcon}
      />
      <TextInput
        style={styles.searchBarInput}
        placeholder="Search..."
        placeholderTextColor={primaryColor}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        value={searchText}
      />
    </View>
  );
};

export default SearchBar;