import {StyleSheet, TextInput, View} from 'react-native';
import {FormLabel} from '../formLabel/FormLabel';
import {FormTextInputProps} from './FormTextInput.types';
import {Controller, FieldValues} from 'react-hook-form';
import {deviceWidth} from '../../../config/constant';
import {useState} from 'react';
import {FormError} from '../formError/FormError';

export const FormTextInput = <IFormInput extends FieldValues>({
  control,
  name,
  keyboardType,
  placeholder,
  label = '',
  error,
  helperText,
  style,
  containerStyle,
  maxLength,
  multiline = false,
  ...props
}: FormTextInputProps<IFormInput>) => {
  const [shadowOpacity, setShadowOpacity] = useState(0);
  const [elevation, setElevation] = useState(0);
  return (
    <View>
      {!!label && <FormLabel label={label} {...props} />}
      <View
        style={[styles.container, {shadowOpacity, elevation}, containerStyle]}>
        <Controller
          control={control}
          name={name}
          render={({field: {onChange, value}}) => {
            return (
              <TextInput
                placeholderTextColor={'gray'}
                placeholder={placeholder}
                style={[
                  styles.textField,
                  style,
                  multiline && {height: 80, textAlignVertical: 'top'},
                ]}
                onChangeText={onChange}
                value={value?.toString()}
                keyboardType={keyboardType}
                onFocus={() => {
                  setShadowOpacity(0.25);
                  setElevation(5);
                }}
                onBlur={() => {
                  setShadowOpacity(0);
                  setElevation(0);
                }}
                maxLength={maxLength}
                multiline={multiline}
              />
            );
          }}
        />
      </View>
      {error && helperText && <FormError errorString={helperText} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: deviceWidth - 50,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowRadius: 2.5,
    shadowOpacity: 0.25,
    elevation: 5,
  },
  textField: {
    height: 48,
    marginLeft: 5,
    flex: 1,
    fontSize: 12,
    color: 'black',
    padding: 5,
  },
});
