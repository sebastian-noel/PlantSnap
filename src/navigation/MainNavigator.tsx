import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { MainTabParamList } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

                    switch (route.name) {
                        case 'History':
                            iconName = focused ? 'clock' : 'clock-outline';
                            break;
                        case 'Scan':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Search':
                            iconName = focused ? 'magnify' : 'magnify';
                            break;
                        default:
                            iconName = 'help';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
            initialRouteName="Scan"
        >
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Scan" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
    );
} 