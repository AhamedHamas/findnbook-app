import {faScissors} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const ServicePill = () => {
  return (
    <TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '#ddd',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}>
        <FontAwesomeIcon icon={faScissors} size={16} />
        <Text style={{marginStart: 10, fontWeight: '500'}}>Barbershop</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServicePill;
