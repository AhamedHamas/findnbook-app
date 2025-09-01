import React, {useState} from 'react';
import {Controller, FieldValues} from 'react-hook-form';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {FormWeekDayPickerProps} from './FormWeekDayPicker.types';
import {CustomModal} from '../customModal/CustomModal';
import {FormError} from '../formError/FormError';

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const FormWeekDayPicker = <IFormInput extends FieldValues>({
  control,
  name,
  label,
  containerStyle,
  modalTitle,
  error,
  helperText,
}: FormWeekDayPickerProps<IFormInput>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
          <>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                setSelectedDays(Array.isArray(value) ? value : []);
                setModalVisible(true);
              }}>
              <Text style={styles.textField}>
                {value && Array.isArray(value) && value.length > 0
                  ? value.join(', ')
                  : label || 'Select Working Days'}
              </Text>
            </TouchableOpacity>
            <CustomModal
              visible={modalVisible}
              handleClose={() => setModalVisible(false)}
              title={modalTitle || 'Select Working Days'}>
              <View style={styles.modalContent}>
                {WEEKDAYS.map(day => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayOption,
                      selectedDays.includes(day)
                        ? styles.dayOptionSelected
                        : null,
                    ]}
                    onPress={() => {
                      setSelectedDays(prev =>
                        prev.includes(day)
                          ? prev.filter(d => d !== day)
                          : [...prev, day],
                      );
                    }}>
                    <Text
                      style={[
                        styles.dayText,
                        selectedDays.includes(day)
                          ? styles.dayTextSelected
                          : null,
                      ]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.okButtonContainer}>
                  <Button
                    title="OK"
                    onPress={() => {
                      onChange(selectedDays);
                      setModalVisible(false);
                    }}
                    color="#007AFF"
                  />
                </View>
              </View>
            </CustomModal>
            {error && helperText && <FormError errorString={helperText} />}
          </>
        )}
      />
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
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007AFF',
  },
  dayOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: '#f0f0f0',
    width: '100%',
    alignItems: 'center',
  },
  dayOptionSelected: {
    backgroundColor: '#007AFF',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  dayTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  okButtonContainer: {
    width: '100%',
    marginTop: 16,
  },
});
