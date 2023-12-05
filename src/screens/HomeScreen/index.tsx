import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import TrackListItem from '../../Component/TrackListItem';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query MyQuery($genres: String!) {
    recommendations(seed_genres: $genres) {
      tracks {
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
`

const HomeScreen = () => {

  const { data, loading, error } = useQuery(query, {
    variables: { genres: 'pop' },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={"#fff"} size={"large"} />
      </View>
    );
  }

  if (error) {
    return <Text style={{ color: "#fff" }}>Failed to fetch recommendations. {error.message}</Text>;
  }

  const tracks = data?.recommendations?.tracks || [];

  return (
    <View style={{ backgroundColor: "black" }}>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  }
})