import {faClock, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ServiceItemBarProps} from './ServiceItemBar.types';

const ServiceItemBar = ({duration, price, title}: ServiceItemBarProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        backgroundColor: '#ffffff',
      }}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#000',
            marginBottom: 8,
          }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              fontWeight: '500',
            }}>
            {`LKR ${price}`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            <FontAwesomeIcon icon={faClock} size={16} color="#666" />
            <Text
              style={{
                fontSize: 14,
                color: '#666',
              }}>
              {duration}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
        }}>
        <FontAwesomeIcon icon={faPlus} size={18} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ServiceItemBar;
