import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../../../global.css';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {RootStackParamList} from '../../../navigation/AppNavigator.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const VendorCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('vendorCardScreen')}>
      <View
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{flexBasis: '30%', height: 100}}>Image</Text>
          <View style={{width: '70%', gap: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingEnd: 10,
              }}>
              <Text style={{fontSize: 18, fontWeight: '500'}}>Hair Avenue</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: globalStyles.colors.secondary,
                }}>
                2 KM
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <FontAwesomeIcon
                icon={faLocationDot}
                size={18}
                color={globalStyles.colors.secondary}
              />
              <Text style={{color: globalStyles.colors.secondary}}>
                Kolonnawa, Colombo
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VendorCard;
