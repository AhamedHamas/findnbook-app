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
  isDisabled = false,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: !isDisabled ? buttonBackgroundColor : 'gray',
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
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isDisabled}>
      <Text style={styles.text}>{buttonLabel}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
