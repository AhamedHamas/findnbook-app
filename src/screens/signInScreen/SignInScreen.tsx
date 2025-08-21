import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import CustomButton from '../../UI/atoms/customButton/CustomButton';
import globalStyles from '../../../global.css';
import {styles} from './SignInScreen.styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator.types';

const SignInScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.text.title}>
          Book Your Service in Few Taps
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#BDBDBD"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          buttonLabel="Continue"
          buttonBackgroundColor="#000000"
          onPress={() => navigation.navigate('verifyScreen')}
        />

        <Text style={styles.orText}>Or</Text>

        <CustomButton
          buttonLabel="Continue with Google"
          buttonBackgroundColor="#FFFFFF"
          buttonTextColor="#000000"
        />
      </View>
    </View>
  );
};

export default SignInScreen;
