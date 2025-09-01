import {TextStyle, ViewStyle} from 'react-native';

export type CustomButtonProps = {
  buttonLabel: string;
  buttonTextColor?: string;
  buttonBackgroundColor?: string;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isDisabled?: boolean;
};
