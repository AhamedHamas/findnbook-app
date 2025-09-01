import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TodaysOrders} from './todaysOrders/TodaysOrders';
import {UpcomingOrders} from './upcomingOrders/UpcomingOrders';

const PreviousOrders = () => (
  <Text style={styles.contentText}>No previous orders.</Text>
);

export const OrderScreen = () => {
  const [activeTab, setActiveTab] = useState<'Today' | 'Previous' | 'Upcoming'>(
    'Today',
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Today' && styles.activeTab]}
          onPress={() => setActiveTab('Today')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Today' && styles.activeTabText,
            ]}>
            Today's Orders
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
            Previous Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('Upcoming')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Upcoming' && styles.activeTabText,
            ]}>
            Upcoming Orders
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {activeTab === 'Today' && <TodaysOrders />}
        {activeTab === 'Previous' && <PreviousOrders />}
        {activeTab === 'Upcoming' && <UpcomingOrders />}
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
    fontSize: 15,
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
    color: '#222',
  },
});
