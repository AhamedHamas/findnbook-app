import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {BackButtonHeaderProps} from './BackButtonHeader.types';

export const BackButtonHeader = ({
  title,
  containerStyle,
  arrowColor,
}: BackButtonHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size={20}
          color={arrowColor || '#000'}
        />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
