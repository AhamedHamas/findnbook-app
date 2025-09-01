import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../UI/atoms/loader/Loader';
import {
  useGetBusinessByOwnerId,
  useGetBusinessDashboardData,
} from '../../../api/business/business';
import {createAxiosClient} from '../../../api';
import {useGetTodaysBookings} from '../../../api/booking/booking';
import {setBusiness} from '../../../store/business/businessReducer';

export const OwnerHome = () => {
  const client = createAxiosClient({});
  const owner = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const {data: businessData, isLoading} = useGetBusinessByOwnerId({
    client,
    ownerId: owner.id,
  });

  useEffect(() => {
    if (businessData) {
      dispatch(setBusiness(businessData as any));
    }
  }, [businessData, dispatch]);

  const {data: dashboardData, isLoading: dashboardLoading} =
    useGetBusinessDashboardData({
      client,
      businessId: businessData?.id ?? '',
    });

  const {data: todaysBookings, isLoading: todaysBookingsLoading} =
    useGetTodaysBookings({
      client,
      businessId: businessData?.id ?? '',
    });

  console.log('businessData: ', businessData);

  if (isLoading || dashboardLoading || todaysBookingsLoading) {
    return <Loader />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 30}}>
      <Text style={styles.header}>Dashboard</Text>
      <View style={styles.dashboardCard}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Completed Orders</Text>
          <Text style={styles.statValue}>
            {dashboardData?.completedOrders ?? 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Revenue</Text>
          <Text style={styles.statValue}>
            LKR {dashboardData?.totalRevenue ?? 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Pending Orders</Text>
          <Text style={styles.statValue}>
            {dashboardData?.pendingOrders ?? 0}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Today's Orders</Text>
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
    backgroundColor: '#F5F7FB',
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  dashboardCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 24,
    elevation: 1,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 15,
    color: '#888',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#007AFF',
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
