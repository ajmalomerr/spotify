import * as React from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import MusicPlayer from '../Component/MusicPlayer';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: "black"
                },
                headerTitleStyle: {
                    color: "white"
                },
                tabBarStyle: {
                    backgroundColor: "black",
                },
                tabBarActiveTintColor: "white",
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Favourite') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }

                    // Return the icon component
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBar={(props) => (
                <View>
                    <MusicPlayer />
                    <BottomTabBar {...props} />
                </View>
            )}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Favourite" component={FavouriteScreen} options={{ unmountOnBlur: true }} />

        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
