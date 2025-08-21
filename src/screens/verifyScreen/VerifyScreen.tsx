import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../UI/atoms/customButton/CustomButton';
import globalStyles from '../../../global.css';
import {styles} from './VerifyScreen.styles';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/AppNavigator.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const VerifyScreen = () => {
  const [otpCode, setOtpCode] = useState(['', '', '', '']);

  const handleChange = (text: string, index: number) => {
    const newCode = [...otpCode];
    newCode[index] = text;
    setOtpCode(newCode);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={[globalStyles.text.title, {color: 'black'}]}>
          Verify Your Identity
        </Text>
        <Text style={styles.subheader}>
          We've sent a 4-digit code to your email address.
        </Text>
        <Text style={styles.subheader}>Please enter it below.</Text>
        <View style={styles.codeContainer}>
          {otpCode.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={text => handleChange(text, index)}
            />
          ))}
        </View>
        <TouchableOpacity>
          <Text style={styles.resendText}>
            Didn't receive a code? <Text style={styles.resendLink}>Resend</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        buttonLabel="Continue"
        buttonBackgroundColor={globalStyles.colors.primary}
        onPress={() => navigation.navigate('mainTabs', {screen: 'Home'})}
      />
    </View>
  );
};

export default VerifyScreen;
