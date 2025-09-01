import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {CustomModal} from '../customModal/CustomModal';
import {Controller, FieldValues} from 'react-hook-form';
import moment from 'moment';

import {
  TextInput,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import {FormTimePickerProps} from './FormTimePicker.types';
import {FormError} from '../formError/FormError';

export const FormTimePicker = <IFormInput extends FieldValues>({
  control,
  name,
  label,
  containerStyle,
  modalTitle,
  error,
  helperText,
}: FormTimePickerProps<IFormInput>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const [isChanged, setIsChanged] = useState(false);
  const [shadowOpacity, setShadowOpacity] = useState(0);
  const [elevation, setElevation] = useState(0);

  return (
    <View
      style={[
        styles.inputContainer,
        {shadowOpacity, elevation},
        containerStyle,
      ]}>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
          <>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                if (value && moment(value, 'hh:mm A').isValid()) {
                  setTime(moment(value, 'hh:mm A').toDate());
                } else {
                  setTime(new Date());
                }
                setIsChanged(false);
                setModalVisible(true);
              }}>
              <TextInput
                editable={false}
                value={value}
                placeholder={label || 'Select Time'}
                pointerEvents="none"
                style={[styles.textField]}
                onFocus={() => {
                  setShadowOpacity(0.25);
                  setElevation(5);
                }}
                onBlur={() => {
                  setShadowOpacity(0);
                  setElevation(0);
                }}
              />
            </TouchableOpacity>
            <CustomModal
              visible={modalVisible}
              handleClose={() => setModalVisible(false)}
              title={modalTitle}>
              <View style={styles.modalContent}>
                <DatePicker
                  mode="time"
                  date={time}
                  onDateChange={date => {
                    setTime(date);
                    const formatted = moment(date).format('hh:mm A');
                    setIsChanged(formatted !== value);
                  }}
                  is24hourSource="locale"
                  minuteInterval={15}
                />
                <View style={styles.okButtonContainer}>
                  <Button
                    title="OK"
                    onPress={() => {
                      const formatted = moment(time).format('hh:mm A');
                      onChange(formatted);
                      setModalVisible(false);
                    }}
                    disabled={!isChanged}
                    color={isChanged ? '#007AFF' : '#ccc'}
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
  },
  textField: {
    height: 48,
    marginLeft: 5,
    flex: 1,
    fontSize: 12,
    color: 'black',
    padding: 5,
    textAlignVertical: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  okButtonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 16,
  },
});
