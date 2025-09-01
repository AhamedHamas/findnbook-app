import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButtonHeader} from '../../../../UI/molecules/backButtonHeader/BackButtonHeader';
import {CustomerSignUp} from '../customerSigup/CustomerSignup';
import {BusinessSignUp} from '../businessSignup/BusinessSignUp';
import {useRoute, RouteProp} from '@react-navigation/native';
import {SignupScreenRouteParams} from './SignUpScreen.types';

export const SignupScreen = () => {
  const route =
    useRoute<RouteProp<{params: SignupScreenRouteParams}, 'params'>>();
  const {email} = route.params;
  const [activeTab, setActiveTab] = useState<'customer' | 'business'>(
    'customer',
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButtonHeader title="Sign Up" />
      {!!email && (
        <View style={styles.infoHeader}>
          <Text style={styles.infoHeaderText}>
            Looks like you don't have an account yet. Please sign up.
          </Text>
        </View>
      )}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'customer' && styles.activeTab]}
          onPress={() => setActiveTab('customer')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'customer' && styles.activeTabText,
            ]}>
            Customer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'business' && styles.activeTab]}
          onPress={() => setActiveTab('business')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'business' && styles.activeTabText,
            ]}>
            Business
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        {activeTab === 'customer' ? (
          <CustomerSignUp email={email} />
        ) : (
          <BusinessSignUp email={email} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    height: 48,
    marginLeft: 5,
    flex: 1,
    fontSize: 14,
    color: 'darkgray',
    padding: 5,
  },
  infoHeader: {
    backgroundColor: '#EAF4FF',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  infoHeaderText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
