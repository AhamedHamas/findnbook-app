import {Control, FieldValues, Path} from 'react-hook-form';
import {ViewStyle} from 'react-native';

export type FormOptionsPickerProps<IFormInput extends FieldValues> = {
  control: Control<IFormInput, object>;
  name: Path<IFormInput>;
  label?: string;
  containerStyle?: ViewStyle;
  modalTitle?: string;
  options: string[];
  error?: boolean;
  helperText?: string;
};
