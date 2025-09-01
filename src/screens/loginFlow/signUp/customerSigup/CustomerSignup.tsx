import {View} from 'react-native';
import {FormTextInput} from '../../../../UI/molecules/formTextInput/FormTextInput';
import {useForm} from 'react-hook-form';
import CustomButton from '../../../../UI/atoms/customButton/CustomButton';
import {CustomerSignUpInput, CustomerSignUpProps} from './CustomerSignUp.types';
import {joiResolver} from '@hookform/resolvers/joi';
import {customerSignupSchema} from './CustomerSignup.utils';
import {createAxiosClient} from '../../../../api';
import {useRegisterUser} from '../../../../api/auth/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../navigation/AppNavigator.types';

export const CustomerSignUp = ({email}: CustomerSignUpProps) => {
  const client = createAxiosClient({});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setError,
  } = useForm<CustomerSignUpInput>({
    resolver: joiResolver(customerSignupSchema),
    defaultValues: {
      email: email,
    },
    mode: 'onChange',
  });

  const {mutate} = useRegisterUser({
    onSuccess: data => {
      console.log('User registered successfully:', data);
      navigation.replace('signInScreen');
    },
    onError(error) {
      if (error.status === 404) {
        setError('email', {type: 'manual', message: 'Email is already in use'});
      }
      console.error('API Error: ', error.response);
    },
  });

  const onSubmit = (data: CustomerSignUpInput) => {
    console.log(data);
    mutate({client: client, body: {...data, role: 'CUSTOMER'}});
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{flex: 1, width: '100%', paddingHorizontal: 20, gap: 20}}>
        <FormTextInput
          control={control}
          name="name"
          placeholder="Name"
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <FormTextInput
          control={control}
          name="email"
          placeholder="Email"
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <FormTextInput
          control={control}
          name="phoneNumber"
          placeholder="Phone"
          label="Phone"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
      </View>
      <View style={{paddingHorizontal: 20, marginBottom: 20}}>
        <CustomButton
          buttonLabel="Submit"
          onPress={handleSubmit(onSubmit)}
          isDisabled={!isValid}
        />
      </View>
    </View>
  );
};
