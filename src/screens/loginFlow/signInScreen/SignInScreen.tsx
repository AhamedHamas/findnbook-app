import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../navigation/AppNavigator.types';
import globalStyles from '../../../../global.css';
import CustomButton from '../../../UI/atoms/customButton/CustomButton';
import {BackButtonHeader} from '../../../UI/molecules/backButtonHeader/BackButtonHeader';
import {useForm} from 'react-hook-form';
import {FormTextInput} from '../../../UI/molecules/formTextInput/FormTextInput';
import {SignInInput} from './SignInScreen.types';
import {signInSchema} from './SignInScreen.utils';
import {joiResolver} from '@hookform/resolvers/joi';
import {useRequestOTP} from '../../../api/auth/auth';
import {createAxiosClient} from '../../../api';
import Loader from '../../../UI/atoms/loader/Loader';

export const SignInScreen = () => {
  const client = createAxiosClient({});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<SignInInput>({
    resolver: joiResolver(signInSchema),
    mode: 'onSubmit',
  });

  const {mutate, isPending} = useRequestOTP({
    onSuccess: data => {
      navigation.navigate('verifyScreen', {email: data.email});
    },
    onError: error => {
      if (error.status === 404) {
        navigation.replace('signUpScreen', {email: email});
      } else {
        console.error('API Error', error);
      }
    },
  });

  const onSubmit = (data: SignInInput) => {
    setEmail(data.email);
    mutate({
      client: client,
      body: {
        email: data.email,
      },
    });
  };

  if (isPending) {
    return <Loader visible={isPending} size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButtonHeader
        title=""
        containerStyle={{backgroundColor: globalStyles.colors.primary}}
        arrowColor="#fff"
      />
      <View style={styles.bottomContainer}>
        <View style={styles.header}>
          <Text style={globalStyles.text.title}>
            Please enter your email to Sign In
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <FormTextInput
            control={control}
            name="email"
            placeholder="example@email.com"
            containerStyle={{alignSelf: 'center', width: '100%'}}
            error={!!errors}
            helperText={errors.email?.message}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            buttonLabel="Continue"
            buttonBackgroundColor="#000000"
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isValid}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.primary,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  header: {
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#000000',
  },
  orText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
