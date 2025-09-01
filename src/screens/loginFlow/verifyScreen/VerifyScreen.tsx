import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AppNavigator.types';
import globalStyles from '../../../../global.css';
import CustomButton from '../../../UI/atoms/customButton/CustomButton';
import {VerifyScreenRouteParams} from './VerifyScreen.types';
import {useRequestOTP, useVerifyOTP} from '../../../api/auth/auth';
import {FormTextInput} from '../../../UI/molecules/formTextInput/FormTextInput';
import {useForm} from 'react-hook-form';
import {createAxiosClient} from '../../../api';
import Loader from '../../../UI/atoms/loader/Loader';
import {joiResolver} from '@hookform/resolvers/joi';
import {otpSchema} from './VerifyScreen.utils';
import {FormError} from '../../../UI/molecules/formError/FormError';
import {useDispatch} from 'react-redux';
import {onLogin} from '../../../store/auth/authReducer';
import {setUser} from '../../../store/user/userReducer';

export const VerifyScreen = () => {
  const client = createAxiosClient({});
  const route =
    useRoute<RouteProp<{params: VerifyScreenRouteParams}, 'params'>>();
  const {email} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    resolver: joiResolver(otpSchema),
    defaultValues: {
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
    },
    mode: 'onSubmit',
  });

  const {mutate: requestOTPMutate, isPending: isRequestPending} = useRequestOTP(
    {
      onSuccess: data => {
        console.log('OTP sent successfully', data);
        navigation.navigate('verifyScreen', {email: data.email});
      },
      onError: error => {
        if (error.status === 404) {
          navigation.replace('signUpScreen', {email: email});
        } else {
          console.error('API Error', error);
        }
      },
    },
  );

  const handleResend = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    requestOTPMutate({
      client: client,
      body: {
        email: email,
      },
    });
  };

  const {mutate, isPending} = useVerifyOTP({
    onSuccess: data => {
      console.log('VerifyData: ', data);
      dispatch(onLogin(data.token));
      dispatch(
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          role: data.user.role,
        }),
      );
      navigation.navigate('mainTabs', {screen: 'Home'});
    },
    onError: error => {
      console.log('OTP Verification Failed: ', error.response?.data);
      setOtpError(error.response?.data.error as string);
    },
  });

  const onSubmit = () => {
    const otp =
      getValues('otp0') +
      getValues('otp1') +
      getValues('otp2') +
      getValues('otp3');
    console.log('email: ', email);
    console.log('OTP Submitted: ', otp);
    mutate({client: client, body: {email: email, otp: otp}});
  };

  if (isPending || isRequestPending) {
    return <Loader visible={isPending} size="large" />;
  }

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
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <View style={styles.codeContainer}>
            {[0, 1, 2, 3].map(index => (
              <FormTextInput
                key={index}
                control={control}
                name={`otp${index}` as 'otp0' | 'otp1' | 'otp2' | 'otp3'}
                keyboardType="number-pad"
                style={styles.codeInput}
                containerStyle={{width: 60, marginHorizontal: 10}}
                maxLength={1}
              />
            ))}
          </View>
          {Object.keys(errors).length !== 0 && (
            <FormError
              errorString="Please Enter 4 Numbers"
              textStyle={styles.centeredError}
            />
          )}
          {otpError && (
            <FormError
              errorString={otpError}
              textStyle={styles.centeredError}
            />
          )}
        </View>

        <TouchableOpacity disabled={!canResend} onPress={handleResend}>
          <Text style={[styles.resendText, !canResend && {color: 'lightgray'}]}>
            {canResend ? (
              <>
                Didn't receive a code?{' '}
                <Text style={styles.resendLink}>Resend</Text>
              </>
            ) : (
              `Resend available in ${timer}s`
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        buttonLabel="Continue"
        buttonBackgroundColor={globalStyles.colors.primary}
        onPress={handleSubmit(onSubmit)}
        isDisabled={!isValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  resendText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  resendLink: {
    color: globalStyles.colors.primary,
  },
  centeredError: {
    textAlign: 'center',
  },
});
