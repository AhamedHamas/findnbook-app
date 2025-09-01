import {FlatList, StyleSheet, Text, View} from 'react-native';
import {createAxiosClient} from '../../../api';
import {useSelector} from 'react-redux';
import {useGetPreviousBookings} from '../../../api/booking/booking';
import Loader from '../../../UI/atoms/loader/Loader';
import {BookingCard} from '../bookingCard/BookingCard';

export const PreviousBookings = () => {
  const client = createAxiosClient({});
  const user = useSelector((state: any) => state.user);

  const {data: previousBookings, isLoading} = useGetPreviousBookings({
    client,
    customerId: user.id,
  });

  if (isLoading) return <Loader />;

  return (
    <View style={{flex: 1, padding: 16}}>
      <FlatList
        data={previousBookings}
        keyExtractor={item => item.bookingId}
        renderItem={({item}) => <BookingCard booking={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Previous bookings found.</Text>
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
