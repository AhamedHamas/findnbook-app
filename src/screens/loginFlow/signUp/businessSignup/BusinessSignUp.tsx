import React, {useState} from 'react';
import {Alert, ScrollView, Text, View, Image, StyleSheet} from 'react-native';
import {FormTextInput} from '../../../../UI/molecules/formTextInput/FormTextInput';
import CustomButton from '../../../../UI/atoms/customButton/CustomButton';
import {FormLabel} from '../../../../UI/molecules/formLabel/FormLabel';
import {BusinessSignUpInput, BusinessSignUpProps} from './BusinessSignUp.types';
import {FormTimePicker} from '../../../../UI/molecules/formTimePicker/FormTimePicker';
import {useForm} from 'react-hook-form';
import {FormWeekDayPicker} from '../../../../UI/molecules/formWeekdayPicker/FormWeekDayPicker';
import {useRegisterBusiness} from '../../../../api/auth/auth';
import {joiResolver} from '@hookform/resolvers/joi';
import {businessSignupSchema} from './BusinessSignup.utils';
import {createAxiosClient} from '../../../../api';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../navigation/AppNavigator.types';
import {ImagePicker} from '../../../../UI/organisms/ImagePicker/ImagePicker';
import {useUploadImage} from '../../../../api/uploadFile/uploadImage';
import {FormOptionsPicker} from '../../../../UI/molecules/formOptionsPicker/FormOptionsPicker';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../../store/user/userReducer';
import {onLogin} from '../../../../store/auth/authReducer';

export const BusinessSignUp = ({email}: BusinessSignUpProps) => {
  const client = createAxiosClient({});
  const formDataClient = createAxiosClient({isFormData: true});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  );
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setError,
  } = useForm<BusinessSignUpInput>({
    resolver: joiResolver(businessSignupSchema),
    mode: 'onChange',
    defaultValues: {
      businessName: '',
      email: email || '',
      phoneNumber: '',
      address: '',
      openingTime: '',
      closingTime: '',
      workingDays: [],
      category: '',
      description: '',
    },
  });

  console.log('Form data:', errors);

  const {mutate} = useRegisterBusiness({
    onSuccess: data => {
      console.log('Business registered successfully:', data);

      dispatch(setUser(data.user));
      dispatch(onLogin(data.token));
      Alert.alert('Success', 'Business registered successfully', [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('addServiceScreen', {
              businessId: data.business.id,
            }),
        },
      ]);
    },
    onError(error) {
      console.log('API Error: ', error.response);
      if (error.status === 400 && error.response?.data) {
        setError('email', {
          type: 'manual',
          message: 'Email already exists',
        });
      }
    },
  });

  const {mutate: uploadImageMutate} = useUploadImage({
    onSuccess: data => {
      console.log('Image uploaded successfully:', data);
    },
    onError(error) {
      console.log('Image upload error:', error);
    },
  });

  const handleImagePick = (uri: string | undefined) => {
    setProfileImage(uri);
    if (uri) {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });
      uploadImageMutate({client: formDataClient, file: formData});
    }
  };

  const onSubmit = (data: BusinessSignUpInput) => {
    console.log('Submitting business sign-up data:', data);
    mutate({body: data, client});
  };

  return (
    <View style={styles.container}>
      <View style={styles.formSection}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <ImagePicker onPick={handleImagePick}>
            <View style={styles.imagePickerContainer}>
              <View style={styles.imageCircle}>
                {profileImage ? (
                  <Image
                    source={{uri: profileImage}}
                    style={styles.profileImage}
                  />
                ) : (
                  <Text style={styles.uploadText}>Upload Logo</Text>
                )}
              </View>
              <Text style={styles.imageHint}>Tap to upload business logo</Text>
            </View>
          </ImagePicker>

          <FormTextInput
            control={control}
            name="name"
            placeholder="Owner Name"
            label="Owner Name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <FormTextInput
            control={control}
            name="businessName"
            placeholder="Business Name"
            label="Business Name"
            error={!!errors.businessName}
            helperText={errors.businessName?.message}
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
            label="Phone Number"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <FormTextInput
            control={control}
            name="address"
            placeholder="Address"
            label="Address"
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <FormOptionsPicker
            control={control}
            name="category"
            label="Category"
            modalTitle="Select Category"
            options={['Salon', 'Barbeshop', 'Vehicle Repair']}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
          <View>
            <FormLabel label="Business Hours" />
            <View style={styles.businessHoursRow}>
              <View style={styles.businessHourPicker}>
                <FormTimePicker
                  control={control}
                  name="openingTime"
                  label="Opening Time"
                  modalTitle="Select Opening Time"
                  error={!!errors.openingTime}
                  helperText={errors.openingTime?.message}
                />
              </View>
              <View style={styles.businessHourPicker}>
                <FormTimePicker
                  control={control}
                  name="closingTime"
                  label="Closing Time"
                  modalTitle="Select Closing Time"
                  error={!!errors.closingTime}
                  helperText={errors.closingTime?.message}
                />
              </View>
            </View>
          </View>
          <View>
            <FormLabel label="Working Days" />
            <FormWeekDayPicker
              control={control}
              name="workingDays"
              label="Working Days"
              modalTitle="Select Working Days"
              error={!!errors.workingDays}
              helperText={errors.workingDays?.message}
            />
          </View>
          <FormTextInput
            control={control}
            name="description"
            label="Description"
            placeholder="Business Description"
            multiline={true}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </ScrollView>
      </View>
      <View style={styles.buttonSection}>
        <CustomButton
          buttonLabel="Submit"
          onPress={handleSubmit(onSubmit)}
          isDisabled={!isValid}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formSection: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    gap: 20,
  },
  scrollContent: {
    gap: 20,
    paddingBottom: 20,
  },
  imagePickerContainer: {
    alignItems: 'center',
  },
  imageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    overflow: 'hidden',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  imageHint: {
    color: '#555',
    fontSize: 12,
  },
  businessHoursRow: {
    flexDirection: 'row',
    gap: 20,
  },
  businessHourPicker: {
    flex: 1,
  },
  buttonSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
