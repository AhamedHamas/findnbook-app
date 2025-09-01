import {Text} from '@react-navigation/elements';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {createAxiosClient} from '../../../api';
import {useGetTodaysBookings} from '../../../api/booking/booking';
import Loader from '../../../UI/atoms/loader/Loader';

export const TodaysOrders = () => {
  const client = createAxiosClient({});
  const businessData = useSelector((state: any) => state.business);

  console.log('businessData in TodaysOrders: ', businessData);

  const {data: todaysBookings, isLoading} = useGetTodaysBookings({
    client,
    businessId: businessData.businessId,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      {todaysBookings && todaysBookings.length > 0 ? (
        todaysBookings.map(order => (
          <View key={order.bookingId} style={styles.orderCard}>
            <View style={styles.orderTopRow}>
              <Text style={styles.orderService}>{order.serviceName}</Text>
              <Text style={styles.orderStatus}>{order.status}</Text>
            </View>
            <Text style={styles.orderTime}>
              {order.bookingTime} • {order.customerName}
            </Text>
            <Text style={styles.orderPrice}>LKR {order.servicePrice}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No orders for today.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 1,
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  orderService: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  orderStatus: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  orderTime: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  orderPrice: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: 'bold',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 15,
  },
});
