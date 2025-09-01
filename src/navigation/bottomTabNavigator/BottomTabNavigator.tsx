import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useSelector} from 'react-redux';
import {BottomTabsParamsList} from './BottomTabNavigator.types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faUser,
  faCalendarCheck,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import {StyleSheet} from 'react-native';
import {HomeScreen} from '../../screens/homeScreen/HomeScreen';
import {Account} from '../../screens/account/Account';
import {BookingScreen} from '../../screens/booking/BookingScreen';
import {OrderScreen} from '../../screens/orders/OrderScreen';

const Tab = createBottomTabNavigator<BottomTabsParamsList>();

const tabBarIcon = (routeName: string, color: string) => {
  if (routeName === 'Home') {
    return <FontAwesomeIcon icon={faHouse} color={color} />;
  }
  if (routeName === 'Booking') {
    return <FontAwesomeIcon icon={faCalendarCheck} color={color} />;
  }
  if (routeName === 'Orders') {
    return <FontAwesomeIcon icon={faClipboardList} color={color} />;
  }
  if (routeName === 'Account') {
    return <FontAwesomeIcon icon={faUser} color={color} />;
  }
  return null;
};

const BottomTabNavigator = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({color}) => tabBarIcon(route.name, color),
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      {user.role === 'OWNER' ? (
        <Tab.Screen name="Orders" component={OrderScreen} />
      ) : (
        <Tab.Screen name="Booking" component={BookingScreen} />
      )}
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 6,
    height: 70,
  },
  accountContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    backgroundColor: 'white',
  },
});

export default BottomTabNavigator;
