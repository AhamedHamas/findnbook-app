import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../../../../global.css';
import {createAxiosClient} from '../../../api';
import {useGetAvailableTimeSlots} from '../../../api/booking/booking';
import {BusinessData} from '../../../api/business/business.types';
import {deviceWidth} from '../../../config/constant';
import {RootStackParamList} from '../../../navigation/AppNavigator.types';
import CustomButton from '../../../UI/atoms/customButton/CustomButton';
import {BackButtonHeader} from '../../../UI/molecules/backButtonHeader/BackButtonHeader';
import {CustomModal} from '../../../UI/molecules/customModal/CustomModal';
import {DatePickerRow} from '../../../UI/molecules/datePickerRow/DatePickerRow';
import {BookingDetails} from '../bookingSummary/BookingSummary.types';
import {getMinDate, weekdayIndex} from './DatePickerScreen.utils';

export const DatePickerScreen = () => {
  const client = createAxiosClient({});
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
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const {mutate: fetchAvailableSlots} = useGetAvailableTimeSlots({
    onSuccess: data => {
      console.log('Available slots fetched:', data);
      setAvailableSlots(data.availableSlots || []);
    },
    onError: error => {
      console.error('Error fetching available slots:', error);
      setAvailableSlots([]);
    },
  });

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots({
        client: client,
        body: {
          businessId: businessData.id,
          serviceId: bookingDetails.id,
          bookingDate: selectedDate,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const formattedSlots = availableSlots.map(slot =>
    moment(slot, 'HH:mm:ss').format('hh:mm A'),
  );

  const minDate = getMinDate();
  // const timeSlots = getTimeSlots(
  //   selectedDate ? selectedDate : minDate,
  //   moment(businessData.openingTime, 'hh:mm A').format('HH:mm'),
  //   moment(businessData.closingTime, 'hh:mm A').format('HH:mm'),
  // );

  const enabledIndexes = businessData.workingDays.map(day => weekdayIndex[day]);

  const isWorkingDay = selectedDate
    ? enabledIndexes.includes(new Date(selectedDate).getDay())
    : false;

  console.log('Selected Date:', selectedDate);
  console.log('Selected Time:', selectedTime);
  console.log('Is Working Day:', isWorkingDay);

  return (
    <>
      <CustomModal
        visible={calendarModalVisible}
        handleClose={() => setCalendarModalVisible(false)}>
        <Calendar
          onDayPress={day => {
            setSelectedDate(day.dateString);
            setCalendarModalVisible(false);
          }}
          minDate={minDate}
        />
      </CustomModal>
      <SafeAreaView style={styles.safeArea}>
        <BackButtonHeader title="Select Date and Time" />
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <Text style={styles.title}>Select Date</Text>
            <DatePickerRow
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onSelectCalender={() => setCalendarModalVisible(true)}
              isNotWorkingDay={!isWorkingDay && !!selectedDate}
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.title}>Select Time</Text>
            {!isWorkingDay && selectedDate ? (
              <View>
                <Text style={{marginHorizontal: 20, color: 'gray'}}>
                  The selected date is not a working day.
                </Text>
              </View>
            ) : formattedSlots.length ? (
              <ScrollView contentContainerStyle={styles.timeOptions}>
                {formattedSlots.map((slot, id) => (
                  <TouchableOpacity
                    onPress={() => setSelectedTime(slot)}
                    key={id}>
                    <View
                      style={[
                        styles.timeOption,
                        {
                          backgroundColor:
                            selectedTime === slot
                              ? globalStyles.colors.primary
                              : 'white',
                        },
                      ]}>
                      <Text
                        style={{
                          color: selectedTime === slot ? 'white' : 'black',
                          fontWeight: selectedTime === slot ? 'bold' : 'normal',
                        }}>
                        {slot}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text style={{marginHorizontal: 20, color: 'gray'}}>
                No available time slots for the selected date.
              </Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonLabel="Confirm Booking"
            isDisabled={!selectedDate || !selectedTime || !isWorkingDay}
            onPress={() =>
              navigation.navigate('bookingSummary', {
                businessData,
                bookingDetails: {
                  id: bookingDetails.id,
                  title: bookingDetails.title,
                  date: selectedDate,
                  time: selectedTime,
                  price: bookingDetails.price,
                },
              })
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 20,
    gap: 10,
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: deviceWidth,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'column',
    width: deviceWidth,
    gap: 10,
    flex: 1,
  },
  timeOptions: {
    flexDirection: 'column',
    marginHorizontal: 20,
    gap: 5,
  },
  timeOption: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
    marginVertical: 5,
    width: 'auto',
  },
  buttonContainer: {
    padding: 20,
  },
});
