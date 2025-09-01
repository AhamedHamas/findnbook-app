import {Text} from '@react-navigation/elements';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AppNavigator.types';
import globalStyles from '../../../../global.css';
import CustomButton from '../../../UI/atoms/customButton/CustomButton';

export const InitialScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigation.replace('mainTabs', {screen: 'Home'});
    }
  }, [token, navigation]);

  return (
    <View style={styles.container}>
      <Text style={globalStyles.text.title}>FindNBook</Text>
      <Text style={styles.subtitle}>
        Find and Book your required services easily.
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonLabel="Login"
          buttonBackgroundColor="#222222"
          onPress={() => navigation.navigate('signInScreen')}
        />

        <Text style={styles.orText}>Or</Text>

        <CustomButton
          buttonLabel="Sign up to FindNBook"
          buttonBackgroundColor="#ffffff"
          buttonTextColor="#000000"
          onPress={() => navigation.navigate('signUpScreen', {})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  orText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
