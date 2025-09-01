import React, {useState} from 'react';
import {Controller, FieldValues} from 'react-hook-form';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {CustomModal} from '../customModal/CustomModal';
import {FormError} from '../formError/FormError';
import {FormOptionsPickerProps} from './FormOptionsPicker.types';
import {FormLabel} from '../formLabel/FormLabel';

export const FormOptionsPicker = <IFormInput extends FieldValues>({
  control,
  name,
  label,
  containerStyle,
  modalTitle,
  options,
  error,
  helperText,
}: FormOptionsPickerProps<IFormInput>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <View>
      {label && <FormLabel label={label} />}

      <View style={[styles.inputContainer, containerStyle]}>
        <Controller
          control={control}
          name={name}
          render={({field: {onChange, value}}) => (
            <>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  setSelectedOption(value || null);
                  setModalVisible(true);
                }}>
                <Text style={styles.textField}>
                  {value ? value : label || 'Select Option'}
                </Text>
              </TouchableOpacity>
              <CustomModal
                visible={modalVisible}
                handleClose={() => setModalVisible(false)}
                title={modalTitle || 'Select Option'}>
                <View style={styles.modalContent}>
                  {options.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.option,
                        selectedOption === option
                          ? styles.optionSelected
                          : null,
                      ]}
                      onPress={() => setSelectedOption(option)}>
                      <Text
                        style={[
                          styles.optionText,
                          selectedOption === option
                            ? styles.optionTextSelected
                            : null,
                        ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <View style={styles.okButtonContainer}>
                    <Button
                      title="OK"
                      onPress={() => {
                        onChange(selectedOption);
                        setModalVisible(false);
                      }}
                      color="#007AFF"
                      disabled={!selectedOption}
                    />
                  </View>
                </View>
              </CustomModal>
              {error && helperText && <FormError errorString={helperText} />}
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    width: '100%',
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
  touchable: {
    flex: 1,
    padding: 5,
  },
  textField: {
    height: 48,
    marginLeft: 5,
    flex: 1,
    fontSize: 12,
    color: 'black',
    textAlignVertical: 'center',
    padding: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: '#f0f0f0',
    width: '100%',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  optionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  okButtonContainer: {
    width: '100%',
    marginTop: 16,
  },
});
