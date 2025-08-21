import {Text} from '@react-navigation/elements';
import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../UI/atoms/customButton/CustomButton';
import {styles} from './InitialScreen.styles';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/AppNavigator.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import globalStyles from '../../../global.css';

const InitialScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
        />
      </View>
    </View>
  );
};

export default InitialScreen;
