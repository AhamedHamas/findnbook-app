import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {OngoingBookings} from './ongoingBooking/OngoingBookings';
import {PreviousBookings} from './previousBooking/PreviousBookings';

export const BookingScreen = () => {
  const [activeTab, setActiveTab] = useState<'Ongoing' | 'Previous'>('Ongoing');

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Ongoing' && styles.activeTab]}
          onPress={() => setActiveTab('Ongoing')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Ongoing' && styles.activeTabText,
            ]}>
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Previous' && styles.activeTab]}
          onPress={() => setActiveTab('Previous')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Previous' && styles.activeTabText,
            ]}>
            Previous
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {activeTab === 'Ongoing' ? <OngoingBookings /> : <PreviousBookings />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#F5F7FB',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#888',
  },
});
