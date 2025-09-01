import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './AppNavigator.types';
import {InitialScreen} from '../screens/loginFlow/initialScreen/InitialScreen';
import {SignInScreen} from '../screens/loginFlow/signInScreen/SignInScreen';
import {VerifyScreen} from '../screens/loginFlow/verifyScreen/VerifyScreen';
import {VendorCardScreen} from '../screens/bookingFlow/vendorCardScreen/VendorCardScreen';
import BottomTabNavigator from './bottomTabNavigator/BottomTabNavigator';
import {DatePickerScreen} from '../screens/bookingFlow/datePickerScreen/DatePickerScreen';
import {SignupScreen} from '../screens/loginFlow/signUp/signupScreen/SignupScreen';
import {SplashRedirectScreen} from '../screens/loginFlow/splashRedirectScreen/SplashRedirectScreen';
import {AddServiceScreen} from '../screens/loginFlow/signUp/businessSignup/addServiceScreen/AddServiceScreen';
import {BookingSummary} from '../screens/bookingFlow/bookingSummary/BookingSummary';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="splashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="splashScreen" component={SplashRedirectScreen} />
      <Stack.Screen name="initialScreen" component={InitialScreen} />
      <Stack.Screen name="signInScreen" component={SignInScreen} />
      <Stack.Screen name="verifyScreen" component={VerifyScreen} />
      <Stack.Screen name="vendorCardScreen" component={VendorCardScreen} />
      <Stack.Screen name="mainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="datePickerScreen" component={DatePickerScreen} />
      <Stack.Screen name="signUpScreen" component={SignupScreen} />
      <Stack.Screen name="addServiceScreen" component={AddServiceScreen} />
      <Stack.Screen name="bookingSummary" component={BookingSummary} />
    </Stack.Navigator>
  );
}
