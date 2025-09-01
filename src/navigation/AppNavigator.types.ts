import {NavigatorScreenParams} from '@react-navigation/native';
import {BottomTabsParamsList} from './bottomTabNavigator/BottomTabNavigator.types';
import {BusinessData} from '../api/business/business.types';
import {BookingDetails} from '../screens/bookingFlow/bookingSummary/BookingSummary.types';
import {ImageSourcePropType} from 'react-native';

export type RootStackParamList = {
  splashScreen: undefined;
  initialScreen: undefined;
  signInScreen: undefined;
  signUpScreen: {email?: string};
  verifyScreen: {email: string};
  mainTabs: NavigatorScreenParams<BottomTabsParamsList>;
  vendorCardScreen: {
    businessData: BusinessData;
    profileImage: ImageSourcePropType;
  };
  datePickerScreen: {
    businessData: BusinessData;
    bookingDetails: BookingDetails;
  };
  addServiceScreen: {businessId: string};
  bookingSummary: {businessData: BusinessData; bookingDetails: BookingDetails};
};
