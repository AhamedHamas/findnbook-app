import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {deviceWidth} from '../../../config/constant';
import {DateCard} from '../../atoms/dateCard/DateCard';
import {formatSelectedDate, getLastThreeDates} from './DatePickerRow.utils';

type DatePickerRowProps = {
  onSelectCalender: () => void;
  selectedDate?: string;
  setSelectedDate?: (date: string) => void;
  isNotWorkingDay?: boolean;
};

export const DatePickerRow = ({
  onSelectCalender,
  selectedDate,
  setSelectedDate,
  isNotWorkingDay,
}: DatePickerRowProps) => {
  const lastThreeDates = getLastThreeDates();

  const isQuickDate = lastThreeDates.some(d => d.value === selectedDate);

  return (
    <View style={styles.row}>
      {lastThreeDates.map((d, index) => (
        <DateCard
          key={index}
          day={d.day}
          date={d.date}
          selectedDate={selectedDate === d.value}
          onPress={() => setSelectedDate && setSelectedDate(d.value)}
          isDisabled={selectedDate === d.value && isNotWorkingDay}
        />
      ))}
      {!isQuickDate && selectedDate ? (
        <DateCard
          day={
            selectedDate ? formatSelectedDate(new Date(selectedDate)).day : ''
          }
          date={
            selectedDate ? formatSelectedDate(new Date(selectedDate)).date : ''
          }
          selectedDate={true}
          onPress={() => setSelectedDate && setSelectedDate('')}
          isDisabled={!!selectedDate && isNotWorkingDay}
        />
      ) : (
        <TouchableOpacity style={styles.selectDate} onPress={onSelectCalender}>
          <FontAwesomeIcon size={21} icon={faCalendar} />
          <Text style={styles.selectDateText}>More Dates</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    width: deviceWidth - 20,
    height: 100,
    paddingHorizontal: 10,
  },
  selectDate: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    width: 90,
    gap: 5,
  },
  selectDateText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
