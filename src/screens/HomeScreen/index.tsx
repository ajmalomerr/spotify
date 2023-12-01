import { FlatList, View } from 'react-native';
import TrackListItem from '../../Component/TrackListItem';
import { tracks } from '../../../assets/data/tracks';

const HomeScreen = () => {
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