import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ServicePillProps} from './ServicePill.types';

const ServicePill: React.FC<ServicePillProps> = ({
  label,
  icon,
  onPress,
  selected,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.pill, selected && styles.selectedPill]}>
        <FontAwesomeIcon
          icon={icon}
          size={16}
          color={selected ? '#fff' : 'black'}
        />
        <Text style={[styles.label, selected && styles.selectedLabel]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  label: {
    marginStart: 10,
    fontWeight: '500',
  },
  selectedPill: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  selectedLabel: {
    color: '#fff',
  },
});

export default ServicePill;
