import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type BackButtonHeaderProps = {
  title?: string;
};

const BackButtonHeader = ({title}: BackButtonHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
      }}>
      <TouchableOpacity
        style={{padding: 5}}
        onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faChevronLeft} size={20} color="#000" />
      </TouchableOpacity>
      {title && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
          }}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default BackButtonHeader;
