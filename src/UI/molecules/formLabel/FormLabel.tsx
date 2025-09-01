import {StyleSheet, Text, View} from 'react-native';
import {FormLabelProps} from './FormLabel.types';

export const FormLabel = ({label, required}: FormLabelProps) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={[styles.labelText]}>
        {label}
        {required && <Text style={[styles.requiredText]}>*</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  requiredText: {
    fontSize: 14,
    color: 'red',
  },
});
