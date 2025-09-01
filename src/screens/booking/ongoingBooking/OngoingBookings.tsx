import {Text} from '@react-navigation/elements';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Loader from '../../../UI/atoms/loader/Loader';
import {createAxiosClient} from '../../../api';
import {
  useCancelBooking,
  useGetOngoingBookings,
} from '../../../api/booking/booking';
import {BookingCard} from '../bookingCard/BookingCard';

export const OngoingBookings = () => {
  const client = createAxiosClient({});
  const user = useSelector((state: any) => state.user);

  const {
    data: ongoingBookings,
    isLoading,
    refetch: refetchOngoingBookings,
  } = useGetOngoingBookings({
    client,
    customerId: user.id,
  });

  const {mutate} = useCancelBooking({
    onSuccess: data => {
      console.log('Booking cancelled successfully', data);
      refetchOngoingBookings();
    },
    onError: error => {
      console.error('API Error: ', error);
    },
  });

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => mutate({client, bookingId}),
        },
      ],
    );
  };

  if (isLoading) return <Loader />;

  return (
    <View style={{flex: 1, padding: 16}}>
      <FlatList
        data={ongoingBookings}
        keyExtractor={item => item.bookingId}
        renderItem={({item}) => (
          <TouchableOpacity>
            <BookingCard
              booking={item}
              isOngoing={true}
              onCancel={() => handleCancelBooking(item.bookingId)}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No ongoing bookings found.</Text>
        }
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },

  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 15,
  },
});
