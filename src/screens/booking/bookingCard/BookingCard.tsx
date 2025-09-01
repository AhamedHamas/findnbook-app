import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {deviceWidth} from '../../../config/constant';
import moment from 'moment';
import {BookingCardProps} from './BookingCard.types';
import {BookingStatus} from '../../../api/booking/booking.types';

export const BookingCard = ({
  booking,
  isOngoing,
  onCancel,
}: BookingCardProps) => {
  let statusColor = '#aaa';
  switch (booking.status) {
    case BookingStatus.BOOKED:
      statusColor = '#2ECC40';
      break;
    case BookingStatus.COMPLETED:
      statusColor = '#007AFF';
      break;
    case BookingStatus.CANCELLED:
      statusColor = '#FF3B30';
      break;
    default:
      statusColor = '#aaa';
  }

  return (
    <View style={styles.minCard}>
      <View style={styles.minRow}>
        <Text style={styles.minService}>{booking.serviceName}</Text>

        <Text style={styles.minPrice}>LKR {booking.servicePrice}</Text>
      </View>
      <View style={styles.minRow}>
        <Text style={styles.minDateTime}>
          {booking.bookingDate} •{' '}
          {moment(booking.bookingTime, 'HH:mm:ss').format('h:mm A')}
        </Text>
        <Text style={[styles.minStatus, {color: statusColor}]}>
          {booking.status}
        </Text>
      </View>
      <View style={styles.minRow}>
        <Text style={styles.minBusiness}>{booking.businessName}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.bookingId}>ID: {booking.bookingId}</Text>
        {isOngoing && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  minCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 1,
    width: deviceWidth - 50,
  },
  minService: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  minDateTime: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
  },
  minRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  minBusiness: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  minPrice: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  minStatus: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 2,
    fontWeight: '600',
    textAlign: 'right',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  bookingId: {
    fontSize: 11,
    color: '#bbb',
    fontStyle: 'italic',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  cancelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
