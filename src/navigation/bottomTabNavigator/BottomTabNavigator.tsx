import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../../screens/homeScreen/HomeScreen';
import {BottomTabsParamsList} from './BottomTabNavigator.types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator<BottomTabsParamsList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: -2},
          shadowRadius: 6,
          height: 70,
        },
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outlined';
          }

          return <FontAwesomeIcon icon={faHouse} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
