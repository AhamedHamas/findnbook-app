import {FormErrorProps} from './FormError.types';
import {StyleSheet, Text} from 'react-native';
import {deviceWidth} from '../../../config/constant';

export const FormError = ({errorString, textStyle}: FormErrorProps) => {
  return <Text style={[styles.errorText, textStyle]}>{errorString}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    marginStart: 3,
    marginTop: 5,
    width: deviceWidth - 50,
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});
