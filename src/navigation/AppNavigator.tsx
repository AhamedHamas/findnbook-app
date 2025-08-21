import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitialScreen from '../screens/initialScreen/InitialScreen';
import SignInScreen from '../screens/signInScreen/SignInScreen';
import {RootStackParamList} from './AppNavigator.types';
import VerifyScreen from '../screens/verifyScreen/VerifyScreen';
import BottomTabNavigator from './bottomTabNavigator/BottomTabNavigator';
import {Text} from '@react-navigation/elements';
import VendorCardScreen from '../screens/vendorCardScreen/VendorCardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="initialScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="initialScreen" component={InitialScreen} />
      <Stack.Screen name="signInScreen" component={SignInScreen} />
      <Stack.Screen name="verifyScreen" component={VerifyScreen} />
      <Stack.Screen name="vendorCardScreen" component={VendorCardScreen} />
      <Stack.Screen name="mainTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
