import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DateCardProps} from './DateCard.type';
import globalStyles from '../../../../global.css';

export const DateCard = ({
  day,
  date,
  selectedDate,
  onPress,
  isDisabled,
}: DateCardProps) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={[
          styles.container,
          selectedDate && {backgroundColor: globalStyles.colors.primary},
          isDisabled && {opacity: 0.5, backgroundColor: 'gray'},
        ]}
        onPress={onPress}>
        <Text style={[styles.day, selectedDate && {color: 'white'}]}>
          {day}
        </Text>
        <Text style={[styles.date, selectedDate && {color: 'white'}]}>
          {date}
        </Text>
      </TouchableOpacity>
      {isDisabled && <Text style={{color: 'gray', fontSize: 12}}>Closed</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
    gap: 5,
  },
  day: {
    color: 'gray',
    fontSize: 12,
  },
  date: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
