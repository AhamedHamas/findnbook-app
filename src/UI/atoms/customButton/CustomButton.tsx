import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {CustomButtonProps} from './CustomButton.types';

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonLabel,
  buttonTextColor = 'white',
  buttonBackgroundColor = 'blue',
  onPress,
  buttonStyle,
  textStyle,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: buttonBackgroundColor,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      ...buttonStyle,
    },
    text: {
      color: buttonTextColor,
      fontSize: 16,
      fontWeight: 'bold',
      ...textStyle,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{buttonLabel}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
