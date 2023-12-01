import { FlatList, SafeAreaView, View, StyleSheet, TextInput, Text } from 'react-native';
import TrackListItem from '../../Component/TrackListItem';
import { tracks } from '../../../assets/data/tracks';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

const SearchScreen = () => {
    const [search, setSearch] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="search" size={16} color="gray" />
                <TextInput
                    value={search}
                    placeholderTextColor={"grey"}
                    placeholder="What do you want to listen to?"
                    onChangeText={setSearch}
                    style={styles.input}
                />
                <Text onPress={() => setSearch('')} style={{ color: "#fff" }}>Cancel</Text>
            </View>

            <FlatList
                data={tracks}
                renderItem={({ item }) => <TrackListItem track={item} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#121314',
        color: 'white',
        flex: 1,
        marginHorizontal: 10,
        padding: 8,
        borderRadius: 5,
    },
});

export default SearchScreen

