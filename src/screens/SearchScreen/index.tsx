import { FlatList, SafeAreaView, View, StyleSheet, TextInput, Text, ActivityIndicator } from 'react-native';
import TrackListItem from '../../Component/TrackListItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const query = gql`
query MyQuery($q: String!) {
    search(q: $q) {
      tracks {
        items {
          id
          name
          preview_url
          artists {
            id
            name
          }
          album {
            id
            name
            images {
              url
              height
              width
            }
          }
        }
      }
    }
  }`

const SearchScreen = () => {
  const [search, setSearch] = useState('');

  const { data, loading, error } = useQuery(query, { variables: { q: search } });

  const tracks = data?.search?.tracks?.items || []

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

      {loading && <View style={{}}>
        <ActivityIndicator color={"#fff"} size={"large"} />
      </View>}

      {/* {error && <Text style={{ color: "#fff" }}>
        Failed to fetch recommendations. {error.message}
      </Text>} */}

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

