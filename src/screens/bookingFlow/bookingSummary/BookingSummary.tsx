import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {BackButtonHeader} from '../../../UI/molecules/backButtonHeader/BackButtonHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {BusinessData} from '../../../api/business/business.types';
import VendorCard from '../../../UI/molecules/vendorCard/VendorCard';
import {BookingDetails} from './BookingSummary.types';
import CustomButton from '../../../UI/atoms/customButton/CustomButton';
import {useCreateBooking} from '../../../api/booking/booking';
import {createAxiosClient} from '../../../api';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AppNavigator.types';

export const BookingSummary = () => {
  const client = createAxiosClient({});
  const user = useSelector((root: any) => root.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<
      RouteProp<
        {params: {businessData: BusinessData; bookingDetails: BookingDetails}},
        'params'
      >
    >();
  const {businessData, bookingDetails} = route.params;

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'salon'>(
    'online',
  );

  const {mutate} = useCreateBooking({
    onSuccess: data => {
      console.log('Booking created successfully:', data);
      Alert.alert(
        'Booking Successful',
        'Your booking has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.popToTop(),
          },
        ],
      );
    },
    onError: error => {
      console.error('API Error:', error);
    },
  });

  const onConfirmBooking = () => {
    mutate({
      client,
      body: {
        businessId: businessData.id,
        serviceId: bookingDetails.id,
        customerId: user.id,
        bookingDate: bookingDetails.date,
        bookingTime: moment(bookingDetails.time, ['hh:mm A']).format(
          'HH:mm:ss',
        ),
      },
    });
  };

  const serviceName = bookingDetails.title;
  const servicePrice = Number(bookingDetails.price) || 0;

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButtonHeader title="Booking Summary" />
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingTop: 10,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}>
          <VendorCard businessData={businessData} />
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Booking Details</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Service</Text>
              <Text style={styles.value}>{serviceName}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{bookingDetails.date}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{bookingDetails.time}</Text>
            </View>
          </View>
          <View style={styles.paymentContainer}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.radioOptions}>
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  styles.radioOptionDisabled,
                  paymentMethod === 'online' && styles.radioOptionSelected,
                ]}
                activeOpacity={1}
                disabled={true}>
                <View style={styles.radioCircleOuter}>
                  {paymentMethod === 'online' && (
                    <View style={styles.radioCircleInner} />
                  )}
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.radioLabel, styles.radioLabelDisabled]}>
                    Pay Online
                  </Text>
                  <Text style={[styles.radioDesc, styles.radioLabelDisabled]}>
                    Coming soon
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  paymentMethod === 'salon' && styles.radioOptionSelected,
                ]}
                onPress={() => setPaymentMethod('salon')}
                activeOpacity={0.8}>
                <View style={styles.radioCircleOuter}>
                  {paymentMethod === 'salon' && (
                    <View style={styles.radioCircleInner} />
                  )}
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.radioLabel}>Pay at Salon</Text>
                  <Text style={styles.radioDesc}>
                    Pay when you visit the salon
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.pricingContainer}>
            <Text style={styles.sectionTitle}>Pricing Details</Text>
            <View style={styles.pricingRow}>
              <Text style={styles.label}>{serviceName}</Text>
              <Text style={styles.value}>LKR {servicePrice.toFixed(2)}</Text>
            </View>
            <View style={styles.pricingTotalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                LKR {bookingDetails.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <CustomButton
            buttonLabel="Confirm Booking"
            onPress={onConfirmBooking}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  paymentContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
    color: '#222',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    color: '#222',
    fontSize: 14,
    fontWeight: '400',
  },
  radioOptions: {
    gap: 16,
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 4,
  },
  radioOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E6F0FF',
  },
  radioOptionDisabled: {
    opacity: 0.5,
  },
  radioCircleOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  radioLabelDisabled: {
    color: '#aaa',
  },
  radioDesc: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  pricingContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pricingTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  totalLabel: {
    color: '#222',
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bottomButtonContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
});
