import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackButtonHeader} from '../../../../../UI/molecules/backButtonHeader/BackButtonHeader';
import {AddServiceInputs} from '../../../../../UI/molecules/serviceInput/ServiceInput.types';
import {useForm} from 'react-hook-form';
import {FormTextInput} from '../../../../../UI/molecules/formTextInput/FormTextInput';
import CustomButton from '../../../../../UI/atoms/customButton/CustomButton';
import {joiResolver} from '@hookform/resolvers/joi';
import {addServiceSchema} from './AddServiceScreen.utils';
import {createAxiosClient} from '../../../../../api';
import {
  useAddBusinesService,
  useDeleteServiceById,
  useGetServicesByBusinessId,
} from '../../../../../api/business/business';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';
import Loader from '../../../../../UI/atoms/loader/Loader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../../navigation/AppNavigator.types';

export const AddServiceScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const token = useSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<{params: {businessId: string}}, 'params'>>();
  const {businessId} = route.params;
  const client = createAxiosClient({});
  const {
    control,
    handleSubmit,
    formState: {isValid, errors},
  } = useForm<AddServiceInputs>({
    resolver: joiResolver(addServiceSchema),
    mode: 'onChange',
    defaultValues: {name: '', price: ''},
  });

  const {mutate: addServiceMutate, isPending} = useAddBusinesService({
    onSuccess: data => {
      console.log('Service added successfully', data);
      refetchServices();
    },
    onError: error => {
      console.error('Error adding service', error);
    },
  });

  const {mutate: deleteServiceMutate} = useDeleteServiceById({
    onSuccess: data => {
      console.log('Service deleted successfully', data);
      refetchServices();
    },
    onError: error => {
      console.error('Error deleting service', error);
    },
  });

  const {
    data: serviceData,
    isLoading,
    refetch: refetchServices,
  } = useGetServicesByBusinessId({
    client,
    businessId,
  });

  const handleAddService = (values: AddServiceInputs) => {
    console.log('add values', values);
    const body = {
      name: values.name,
      price: Number(values.price),
      businessId: businessId,
      durationMinutes: 30,
    };
    console.log('Request Body:', token);
    addServiceMutate({
      client,
      body,
    });
  };

  const handleRemoveService = (serviceId: string) => {
    console.log('Removing service with ID:', serviceId);
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this service?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteServiceMutate({
              client,
              serviceId,
            });
          },
        },
      ],
    );
  };

  if (isLoading || isPending) return <Loader />;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader title="Add Service" />
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 20, marginVertical: 10}}>
          <Text style={[styles.headerText, {textAlign: 'center'}]}>
            Add Your Services
          </Text>
          {serviceData?.length === 0 && (
            <Text style={styles.mandatoryLabel}>
              You must add at least one service to continue.
            </Text>
          )}
          <View style={styles.inputContainer}>
            <FormTextInput
              control={control}
              name="name"
              placeholder="Service Name"
              label="Service Name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <FormTextInput
              control={control}
              name="price"
              placeholder="Price"
              label="Price"
              keyboardType="numeric"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </View>
          <CustomButton
            buttonLabel="＋ Add Service"
            onPress={handleSubmit(handleAddService)}
            isDisabled={!isValid}
            buttonStyle={{width: '60%', alignSelf: 'center'}}
          />
        </View>
        <View style={{flex: 1, paddingHorizontal: 20, marginTop: 20}}>
          <Text style={styles.headerText}>Services Added:</Text>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {serviceData?.map((service, idx) => (
              <View key={idx} style={styles.serviceItem}>
                <View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>Rs. {service.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveService(service.id)}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.bottomButtonContainer}>
          <CustomButton
            buttonLabel="Continue"
            onPress={() => navigation.navigate('mainTabs', {screen: 'Home'})}
            isDisabled={!serviceData?.length}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    gap: 16,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 10,
    color: 'gray',
  },
  inputContainer: {
    gap: 10,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceItem: {
    backgroundColor: '#F5F7FB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
  },
  servicePrice: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomButtonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  mandatoryLabel: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
});
