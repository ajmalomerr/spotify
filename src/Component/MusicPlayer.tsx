import { View, Text, StyleSheet, Image, Alert, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayerContext } from '../Provider/PlayerProvider';
import Sound from 'react-native-sound';
import { useEffect, useRef, useState } from 'react';


const MusicPlayer = () => {
    const { track } = usePlayerContext();
    const soundRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause status

    useEffect(() => {
        if (track?.preview_url) {
            playTrack()
        }
    }, [track]);

    const playTrack = () => {
        Sound.setCategory('Playback'); // Set the audio category for playback

        const sound = new Sound(track?.preview_url, null, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            soundRef.current = sound;
        });

        return () => {
            // Clean up resources when the component unmounts
            if (soundRef.current) {
                soundRef.current.release(); // Release the sound object
            }
        };
    }

    if (!track) {
        return null;
    }

    const image = track.album.images?.[0];

    const playSoundFromURL = () => {
        if (!soundRef?.current?.isPlaying()) {
            setIsPlaying(true);
        }
        if (soundRef.current && isPlaying) {
            soundRef?.current?.pause(); // Pause the sound if it's already playing
            setIsPlaying(false);
        } else if (soundRef.current) {
            soundRef.current.play((success) => {
                if (success) {
                    setIsPlaying(false); // Update the state to indicate sound is playing
                } else {
                    console.log('Sound did not play');
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.player}>
                {image && <Image source={{ uri: image.url }} style={styles.image} />}

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{track.name}</Text>
                    <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
                </View>

                <Icon
                    name={'heart-outline'}
                    size={20}
                    color={'white'}
                    style={{ marginHorizontal: 10 }}
                />

                <Pressable disabled={!track?.preview_url} onPress={() => playSoundFromURL()}>
                    <Icon
                        name={isPlaying ? 'pause' : 'play'} // Toggle between play and pause icon
                        size={22}
                        color={'white'}
                    />
                </Pressable>
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