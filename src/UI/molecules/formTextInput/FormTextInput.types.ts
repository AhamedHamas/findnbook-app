import {FieldValues, Path, UseFormReturn} from 'react-hook-form';
import {
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type FormTextInputProps<IFormInput extends FieldValues> = {
  control: UseFormReturn<IFormInput>['control'];
  name: Path<IFormInput>;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | 'default';
  label?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean | false;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  maxLength?: number;
  multiline?: boolean;
};
