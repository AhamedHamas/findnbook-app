import {faClock, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ServiceItemBarProps} from './ServiceItemBar.types';

const ServiceItemBar = ({
  duration,
  price,
  title,
  onTap,
}: ServiceItemBarProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onTap}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceDurationRow}>
          <Text style={styles.price}>{`LKR ${price}`}</Text>
          <View style={styles.durationRow}>
            <FontAwesomeIcon icon={faClock} size={16} color="#666" />
            <Text style={styles.duration}>{`  ${duration} Minutes `}</Text>
          </View>
        </View>
      </View>
      <View style={styles.addButton}>
        <FontAwesomeIcon icon={faPlus} size={18} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  priceDurationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  price: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});

export default ServiceItemBar;
