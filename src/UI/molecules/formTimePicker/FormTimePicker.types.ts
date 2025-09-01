import {Control, FieldValues, Path} from 'react-hook-form';

export type FormTimePickerProps<IFormInput extends FieldValues> = {
  control: Control<IFormInput>;
  name: Path<IFormInput>;
  label?: string;
  containerStyle?: any;
  modalTitle?: string;
  error?: boolean;
  helperText?: string;
};
