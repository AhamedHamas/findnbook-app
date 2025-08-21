import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faComment,
  faPhone,
  faMapMarkerAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import ServiceItemBar from '../../UI/molecules/serviceItemBar/ServiceItemBar';
import BackButtonHeader from '../../UI/molecules/backButtonHeader/BackButtonHeader';

const VendorCardScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <BackButtonHeader title="Vendor Details" />

      <View style={{flex: 1}}>
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 20,
          }}>
          <Image
            style={{
              width: '100%',
              height: 200,
              borderRadius: 12,
              backgroundColor: '#f0f0f0',
            }}
            resizeMode="cover"
          />
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#000',
                marginBottom: 15,
              }}>
              Hair Avenue
            </Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity style={{padding: 5}}>
                <FontAwesomeIcon icon={faPhone} size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={{padding: 5}}>
                <FontAwesomeIcon icon={faComment} size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size={14} color="#666" />
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginLeft: 8,
                flex: 1,
              }}>
              No 03,Kadalana Road, Kadalana, Moratuwa
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <FontAwesomeIcon icon={faClock} size={14} color="#666" />
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginLeft: 8,
              }}>
              9AM-10PM, Mon -Sun
            </Text>
          </View>

          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 20,
            }}>
            Hair Avenue provides expert haircuts, styling, along with services
            like facials, cleanups, skincare and makeup to keep you looking your
            best.
          </Text>
        </View>

        <ScrollView
          style={{paddingHorizontal: 15}}
          contentContainerStyle={{gap: 20}}
          showsVerticalScrollIndicator={false}>
          <ServiceItemBar title="Hair Cut" price="750.00" duration="30 Mins" />
          <ServiceItemBar title="Hair Wash" price="500.00" duration="30 Mins" />
          <ServiceItemBar title="Hair Cut" price="750.00" duration="30 Mins" />
          <ServiceItemBar title="Hair Wash" price="500.00" duration="30 Mins" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VendorCardScreen;
