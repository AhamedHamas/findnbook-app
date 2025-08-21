import {NavigatorScreenParams} from '@react-navigation/native';
import {BottomTabsParamsList} from './bottomTabNavigator/BottomTabNavigator.types';

export type RootStackParamList = {
  initialScreen: undefined;
  signInScreen: undefined;
  verifyScreen: undefined;
  mainTabs: NavigatorScreenParams<BottomTabsParamsList>;
  vendorCardScreen: undefined;
};
