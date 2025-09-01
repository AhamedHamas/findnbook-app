// SplashRedirectScreen handles the logic for redirecting after splash
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AppNavigator.types';
import {SplashScreen} from '../splashScreen/SplashScreen';

export const SplashRedirectScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isAuthorized = useSelector((state: any) => state.auth.isAuthorized);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuthorized) {
        navigation.replace('mainTabs', {screen: 'Home'});
      } else {
        navigation.replace('initialScreen');
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [isAuthorized, navigation]);

  return <SplashScreen />;
};
