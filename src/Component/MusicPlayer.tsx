import { View, Text, StyleSheet, Image, Alert, Pressable, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayerContext } from '../Provider/PlayerProvider';
import Sound from 'react-native-sound';
import { useEffect, useRef, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const createFavoriteMutation = gql`
mutation MyMutation ($userId : String!, $trackId : String!) {
    insertFavorites(userid: $userId, trackid:  $trackId) {
      id
      trackid
      userid
    }
  }
`

const isFavoriteQuery = gql`
query MyQuery ($trackId : String!, $userId : String! ) {
    favoritesByTrackidAndUserid(trackid: $trackId , userid: $userId) {
      id
      trackid
      userid
    }
  }
`


const removeFavoriteMutation = gql`
mutation MyMutation ($trackId : String!, $userId : String!) {
    deleteFavorites(trackid: $trackId, userid: $userId) {
      id
    }
  }
`

const MusicPlayer = () => {
    const { track } = usePlayerContext();
    const [currentTrack, setCurrentTrack] = useState(null);
    const [soundInstance, setSoundInstance] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [createFavorite] = useMutation(createFavoriteMutation);
    const [removeFavorite] = useMutation(removeFavoriteMutation);

    const { data, refetch } = useQuery(isFavoriteQuery, { variables: { userId: "omer", trackId: track?.id || "" } })

    const isLiked = data?.favoritesByTrackidAndUserid?.length > 0

    if (!track) {
        return null;
    }

    const image = track.album.images?.[0];

    const playTrack = () => {
        if (currentTrack === track.preview_url && soundInstance) {
            if (soundInstance.isPlaying()) {
                setIsPlaying(false)
                soundInstance.pause();
            } else {
                setIsPlaying(true)
                soundInstance.play();
            }
        } else {
            // If a different track is selected, stop the current one and play the new one
            soundInstance?.stop();
            const sound = new Sound(track.preview_url, null, (error) => {
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }
                setCurrentTrack(track.preview_url);
                setSoundInstance(sound);
                setIsPlaying(true)
                sound.play((success) => {
                    if (success) {
                        console.log('Sound played successfully');
                    } else {
                        console.log('Sound did not play');
                    }
                });
            });
        }
    };

    const onClickFav = async () => {
        if (!track) return;
        if (isLiked) {
            await removeFavorite({ variables: { userId: "omer", trackId: track?.id } })
        } else {
            await createFavorite({ variables: { userId: "omer", trackId: track?.id } });
        }
        refetch()
    }

    return (
        <View style={styles.container}>
            <View style={styles.player}>
                {image && <Image source={{ uri: image.url }} style={styles.image} />}

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{track.name}</Text>
                    <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
                </View>

                <Icon
                    onPress={() => onClickFav()}
                    name={isLiked ? 'heart' : 'heart-outline'}
                    size={20}
                    color={'white'}
                    style={{ marginHorizontal: 10 }}
                />

                {/* </Pressable> */}

                {(currentTrack != track?.preview_url) || currentTrack == null || !isPlaying ?
                    <Pressable disabled={!track?.preview_url} onPress={() => playTrack()}>
                        <Icon
                            name={"play"}
                            size={22}
                            color={track?.preview_url ? 'white' : "grey"}
                        />
                    </Pressable> : null}

                {isPlaying && currentTrack == track?.preview_url ?
                    <Pressable disabled={!track?.preview_url} onPress={() => playTrack()}>
                        <Icon
                            name={"pause"}
                            size={22}
                            color={'white'}
                        />
                    </Pressable> : null}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        top: -75,
        height: 75,
        padding: 10,
    },
    player: {
        backgroundColor: '#286660',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 3,
        paddingRight: 15,
    },
    title: {
        color: 'white',
    },
    subtitle: {
        color: 'lightgray',
        fontSize: 12,
    },
    image: {
        height: '100%',
        aspectRatio: 1,
        marginRight: 10,
        borderRadius: 5,
    },
});


export default MusicPlayer