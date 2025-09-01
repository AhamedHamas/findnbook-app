import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ServiceInputProps} from './ServiceInput.types';

export const ServiceInput: React.FC<ServiceInputProps> = ({
  value,
  onChange,
  onRemove,
  showRemove,
}) => (
  <View style={styles.serviceContainer}>
    <TextInput
      style={styles.input}
      placeholder="Service Name"
      value={value.name}
      onChangeText={text => onChange({...value, name: text})}
    />
    <TextInput
      style={styles.input}
      placeholder="Price"
      value={value.price}
      onChangeText={text => onChange({...value, price: text})}
      keyboardType="numeric"
    />
    {showRemove && (
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  removeButton: {
    width: '20%',
    marginTop: 10,
    backgroundColor: '#ff635bff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  serviceContainer: {
    backgroundColor: '#F5F7FB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    gap: 10,
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
  },
});
