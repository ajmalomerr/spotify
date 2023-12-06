import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { tracks } from '../../../assets/data/tracks';
import TrackListItem from '../../Component/TrackListItem';
import { gql, useQuery } from '@apollo/client';


const query = gql`
query MyQuery($userId: String!) {
  favoritesByUserid(userid: $userId) {
    id
    trackid
    userid
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

const FavouriteScreen = () => {

  const { data, loading, error, refetch } = useQuery(query, { variables: { userId: "omer" } });

  useEffect(() => {
    refetch()
  }, [])

  const tracks = (data?.favoritesByUserid || [])?.map((fav: any) => fav?.tracks)

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

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </View>
  );
}
export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  }
})