
import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface SearchBarProps {
    onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    input: {
        backgroundColor: 'white',
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        marginHorizontal: 20,
        paddingHorizontal: 20,
    },
});

export default SearchBar;